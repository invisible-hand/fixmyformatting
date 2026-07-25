/**
 * Stage 8: the 10 long-form guides, into every locale.
 *
 * Guide-major ordering (one guide across all locales, then the next) so that
 * hreflang stays reciprocal per guide and the guides index lights up in every
 * locale at the same time, rather than one locale racing ahead.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { allGuides } from "../src/lib/guides";
import { localeCodes } from "../src/lib/i18n/locales";
import {
  callKimi, descriptionLimit, glossary, languageNames, mapLimit, parseJson, renderedLength, styleReference, titleLimit,
} from "./translate.mjs";

const CONCURRENCY = 6;
const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("-"));
const targets = only.length ? only : [...localeCodes];

const failures: string[] = [];
let totalIn = 0;
let totalOut = 0;
const q = (s: string) => JSON.stringify(s);

/** Structural features of the English markdown that a translation must keep. */
function shapeOf(body: string) {
  return {
    links: (body.match(/\]\((\/[^)\s]*)\)/g) ?? []).sort(),
    fences: (body.match(/```/g) ?? []).length,
    tableRows: (body.match(/^\|/gm) ?? []).length,
    listItems: (body.match(/^[-*] /gm) ?? []).length,
  };
}

async function translateGuide(guide: (typeof allGuides)[number], locale: string) {
  const system = `You are a native ${languageNames[locale as keyof typeof languageNames]} translator localizing long-form technical articles for a text-formatting tools website.

STYLE REFERENCE — this locale's published copy. Match its register, formality and terminology exactly.
--------
${styleReference(locale)}
--------

RULES
- Return ONLY a JSON object with exactly the keys given. No markdown fences around the JSON.
- "title" MAX ${titleLimit(locale)} characters. "description" MAX ${descriptionLimit(locale)} characters.
- Section keys are anchor ids — copy them EXACTLY, never translate them, never add or drop one.
- "body" is Markdown. Preserve every structural element exactly:
  * Markdown links keep their URL unchanged: [translated text](/same-path). Translate only the link text.
  * Keep the same number of tables, and the same number of rows and columns. Translate cell text.
  * Keep code fences (\`\`\`) and their contents UNCHANGED — code, JSON, regex and shell samples are English by nature.
  * Keep inline \`code\` spans, <kbd> tags, and bold/italic markers.
  * Keep the same number of list items.
- Never translate: ${glossary.join(", ")}. Also keep Unicode code points (U+200B etc.), key names, file extensions and CSS/JS identifiers as-is.
- These are specimens of English AI output being discussed. Sample text INSIDE code fences stays English; prose ABOUT it is translated.
- Write for a native reader researching this problem — natural, not word-for-word.`;

  const payload = {
    title: guide.title,
    description: guide.description,
    h1: guide.h1,
    dek: guide.dek,
    answer: guide.answer,
    sections: Object.fromEntries(guide.sections.map((s) => [s.id, { heading: s.heading, body: s.body }])),
    faqs: guide.faqs,
  };

  const { text, usage } = await callKimi(system, `Translate this article.\n\n${JSON.stringify(payload, null, 1)}`);
  totalIn += usage?.prompt_tokens ?? 0;
  totalOut += usage?.completion_tokens ?? 0;
  const parsed = parseJson(text);

  const problems: string[] = [];
  for (const key of ["title", "description", "h1", "dek", "answer"] as const) {
    if (!parsed[key]?.trim()) problems.push(`${key} missing`);
  }

  // German and Hindi routinely overshoot the SERP budget. Rather than discarding
  // a good article over its title, ask once for a shorter one.
  const tooLong = () =>
    renderedLength(parsed.title ?? "") > titleLimit(locale) || renderedLength(parsed.description ?? "") > descriptionLimit(locale);
  if (!problems.length && tooLong()) {
    const retry = await callKimi(
      system,
      `These two strings are too long. Rewrite them shorter in ${languageNames[locale as keyof typeof languageNames]}, keeping the meaning and the keyword.

title (${parsed.title.length} chars, MAX ${titleLimit(locale)}): ${parsed.title}
description (${parsed.description.length} chars, MAX ${descriptionLimit(locale)}): ${parsed.description}

Return only: {"title": "...", "description": "..."}`,
    );
    totalIn += retry.usage?.prompt_tokens ?? 0;
    totalOut += retry.usage?.completion_tokens ?? 0;
    try {
      const shorter = parseJson(retry.text);
      if (shorter.title?.trim()) parsed.title = shorter.title.trim();
      if (shorter.description?.trim()) parsed.description = shorter.description.trim();
    } catch {
      // Fall through to the length check below, which reports it as a failure.
    }
  }

  if (parsed.title && renderedLength(parsed.title) > titleLimit(locale)) {
    problems.push(`title ${renderedLength(parsed.title)} rendered chars exceeds ${titleLimit(locale)}`);
  }
  if (parsed.description && renderedLength(parsed.description) > descriptionLimit(locale)) {
    problems.push(`description ${renderedLength(parsed.description)} exceeds ${descriptionLimit(locale)}`);
  }
  const gotIds = Object.keys(parsed.sections ?? {}).sort();
  const wantIds = guide.sections.map((s) => s.id).sort();
  if (JSON.stringify(gotIds) !== JSON.stringify(wantIds)) {
    problems.push(`section ids differ: got ${gotIds.join(",")} want ${wantIds.join(",")}`);
  } else {
    for (const section of guide.sections) {
      const got = parsed.sections[section.id];
      if (!got?.heading?.trim() || !got?.body?.trim()) { problems.push(`${section.id} incomplete`); continue; }
      const want = shapeOf(section.body);
      const have = shapeOf(got.body);
      if (JSON.stringify(want.links) !== JSON.stringify(have.links)) {
        problems.push(`${section.id} link targets changed: ${have.links.join(" ")} vs ${want.links.join(" ")}`);
      }
      if (want.fences !== have.fences) problems.push(`${section.id} code fences ${have.fences} vs ${want.fences}`);
      if (want.tableRows !== have.tableRows) problems.push(`${section.id} table rows ${have.tableRows} vs ${want.tableRows}`);
      if (want.listItems !== have.listItems) problems.push(`${section.id} list items ${have.listItems} vs ${want.listItems}`);
    }
  }
  if (!Array.isArray(parsed.faqs) || parsed.faqs.length !== guide.faqs.length) {
    problems.push(`expected ${guide.faqs.length} faqs, got ${parsed.faqs?.length}`);
  }
  if (problems.length) {
    failures.push(...problems.map((p) => `${locale}/${guide.slug}: ${p}`));
    return false;
  }

  const dir = new URL(`../src/content/i18n/${locale}/guides/`, import.meta.url).pathname;
  mkdirSync(dir, { recursive: true });
  const sections = guide.sections
    .map((s) => `    ${q(s.id)}: {\n      heading: ${q(parsed.sections[s.id].heading)},\n      body: ${q(parsed.sections[s.id].body)},\n    },`)
    .join("\n");
  const faqs = parsed.faqs
    .map((f: { question: string; answer: string }) => `    { question: ${q(f.question)}, answer: ${q(f.answer)} },`)
    .join("\n");

  writeFileSync(
    `${dir}${guide.slug}.ts`,
    `import type { GuideTranslation } from "@/lib/i18n";

export const guide: GuideTranslation = {
  title: ${q(parsed.title)},
  description: ${q(parsed.description)},
  h1: ${q(parsed.h1)},
  dek: ${q(parsed.dek)},
  answer: ${q(parsed.answer)},
  sections: {
${sections}
  },
  faqs: [
${faqs}
  ],
};
`,
  );
  return true;
}

async function main() {
  for (const guide of allGuides) {
    const pending = targets.filter(
      (locale) => force || !existsSync(new URL(`../src/content/i18n/${locale}/guides/${guide.slug}.ts`, import.meta.url).pathname),
    );
    if (!pending.length) { console.log(`${guide.slug}: already complete`); continue; }
    const done = await mapLimit(pending, CONCURRENCY, (locale: string) => translateGuide(guide, locale));
    console.log(`${guide.slug}: ${done.filter(Boolean).length}/${pending.length} locales`);
  }

  console.log(`\ntokens in=${totalIn} out=${totalOut}  (~$${((totalIn / 1e6) * 3 + (totalOut / 1e6) * 15).toFixed(2)})`);
  if (failures.length) {
    console.log(`\n${failures.length} validation failures:`);
    for (const f of failures.slice(0, 60)) console.log("  " + f);
    process.exitCode = 1;
  }
}

main();
