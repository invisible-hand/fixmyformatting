/**
 * Stage 3: author ToolCopy for all 26 core tools in every locale.
 *
 * Already-published name/description pairs are preserved verbatim — those are
 * indexed H1s and meta descriptions, and this stage only adds the SEO title,
 * intro, and per-tool FAQs that were previously synthesised from templates.
 */
import { writeFileSync } from "node:fs";
import { coreTools } from "../src/lib/tools";
import { localeCodes } from "../src/lib/i18n/locales";
import { bundles } from "../src/lib/i18n/bundles";
import {
  callKimi, descriptionLimit, glossary, languageNames, mapLimit, parseJson, styleReference,
  titleLimit, validateToolCopy,
} from "./translate.mjs";

const BATCH = 5;
const CONCURRENCY = 6;
const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const targets = only.length ? only : [...localeCodes];

const system = (locale: string) => `You are a native ${languageNames[locale as keyof typeof languageNames]} translator localizing a free browser-based text-formatting tools website.

STYLE REFERENCE — this locale's already-published copy. Match its register, formality, tone and terminology exactly. This is the single most important constraint: new copy must be indistinguishable from what is already there.
--------
${styleReference(locale)}
--------

RULES
- Return ONLY a JSON object. No markdown fences, no commentary.
- Never translate these product names: ${glossary.join(", ")}.
- Preserve {name} placeholders exactly as written.
- "title" is a search-engine title: natural, keyword-bearing, MAX ${titleLimit(locale)} characters.
- "description" is a meta description, MAX ${descriptionLimit(locale)} characters.
- "intro" is one or two sentences explaining what the tool does and when to use it. It MUST be longer than the description.
- "faqs" is exactly 3 objects with "question" and "answer". Make them specific to this tool where the English is specific; keep the free/privacy/mobile questions natural otherwise.
- Write for people searching in ${languageNames[locale as keyof typeof languageNames]}. Do not translate word-for-word from English; write what a native speaker would search for.`;

type Copy = { name: string; title: string; description: string; intro: string; faqs: { question: string; answer: string }[] };

const failures: string[] = [];
let totalIn = 0;
let totalOut = 0;

async function translateBatch(locale: string, tools: typeof coreTools) {
  const existing = bundles[locale as keyof typeof bundles].tools;
  const payload = tools.map((tool) => ({
    slug: tool.slug,
    name: existing[tool.slug]?.name ?? tool.name,
    nameIsFinal: Boolean(existing[tool.slug]),
    english: {
      name: tool.name, title: tool.title, description: tool.description,
      intro: tool.intro, faqs: tool.faqs,
    },
    publishedDescription: existing[tool.slug]?.description ?? null,
  }));

  const user = `Produce localized copy for these ${tools.length} tools.

For every entry where "nameIsFinal" is true, COPY the given "name" verbatim into your output and COPY "publishedDescription" verbatim into "description" — those strings are already published and must not change. Author only "title", "intro" and "faqs" for those.
For entries where "nameIsFinal" is false, translate everything including "name" and "description".

INPUT:
${JSON.stringify(payload, null, 1)}

Return exactly: { "<slug>": { "name": ..., "title": ..., "description": ..., "intro": ..., "faqs": [{"question","answer"} x3] }, ... }`;

  const { text, usage } = await callKimi(system(locale), user);
  totalIn += usage?.prompt_tokens ?? 0;
  totalOut += usage?.completion_tokens ?? 0;
  const parsed = parseJson(text) as Record<string, Copy>;

  const good: Record<string, Copy> = {};
  for (const tool of tools) {
    const copy = parsed[tool.slug];
    const problems = validateToolCopy(locale, tool.slug, copy, tool);
    if (problems.length) failures.push(`${locale}: ${problems.join("; ")}`);
    else good[tool.slug] = copy;
  }
  return good;
}

const q = (s: string) => JSON.stringify(s);

async function main() {
  for (const locale of targets) {
    const batches: (typeof coreTools)[] = [];
    for (let i = 0; i < coreTools.length; i += BATCH) batches.push(coreTools.slice(i, i + BATCH));

    const results = await mapLimit(batches, CONCURRENCY, (batch: typeof coreTools) => translateBatch(locale, batch));
    const merged: Record<string, Copy> = Object.assign({}, ...results);

    // Never regress a published pair, even if the model returned something odd.
    const existing = bundles[locale as keyof typeof bundles].tools;
    for (const [slug, copy] of Object.entries(existing)) {
      if (merged[slug]) {
        merged[slug].name = copy!.name;
        merged[slug].description = copy!.description;
      }
    }

    const lines = coreTools
      .filter((tool) => merged[tool.slug])
      .map((tool) => {
        const c = merged[tool.slug];
        const faqs = c.faqs.map((f) => `      { question: ${q(f.question)}, answer: ${q(f.answer)} },`).join("\n");
        return `  ${q(tool.slug)}: {\n    name: ${q(c.name)},\n    title: ${q(c.title)},\n    description: ${q(c.description)},\n    intro: ${q(c.intro)},\n    faqs: [\n${faqs}\n    ],\n  },`;
      });

    writeFileSync(
      new URL(`../src/content/i18n/${locale}/tools/core.ts`, import.meta.url).pathname,
      `import type { ToolCopy } from "@/lib/i18n/types";\n\nexport const tools: Partial<Record<string, ToolCopy>> = {\n${lines.join("\n")}\n};\n`,
    );
    console.log(`${locale}: wrote ${lines.length}/${coreTools.length} tools`);
  }

  console.log(`\ntokens in=${totalIn} out=${totalOut}  (~$${((totalIn / 1e6) * 3 + (totalOut / 1e6) * 15).toFixed(2)})`);
  if (failures.length) {
    console.log(`\n${failures.length} validation failures:`);
    for (const f of failures.slice(0, 40)) console.log("  " + f);
    process.exitCode = 1;
  }

}

main();
