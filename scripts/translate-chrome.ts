/**
 * Stage 1: static pages (about, privacy, 404, guides index), the workspace
 * strings that were hardcoded English even on localized pages, and guide chrome.
 * Translated from the English source of truth in src/content/i18n/en/chrome.ts.
 */
import { writeFileSync } from "node:fs";
import { guideChrome, pages, workspace } from "../src/content/i18n/en/chrome";
import { localeCodes } from "../src/lib/i18n/locales";
import { callKimi, glossary, languageNames, mapLimit, parseJson, styleReference } from "./translate.mjs";

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const targets = only.length ? only : [...localeCodes];

const failures: string[] = [];
let totalIn = 0;
let totalOut = 0;

/** Walks two objects in parallel and reports any key the model dropped. */
function checkShape(path: string, english: unknown, got: unknown, out: string[]) {
  if (Array.isArray(english)) {
    if (!Array.isArray(got) || got.length !== english.length) {
      out.push(`${path}: expected array of ${english.length}`);
      return;
    }
    english.forEach((item, i) => checkShape(`${path}[${i}]`, item, got[i], out));
  } else if (english && typeof english === "object") {
    if (!got || typeof got !== "object") { out.push(`${path}: expected object`); return; }
    for (const key of Object.keys(english as object)) {
      checkShape(`${path}.${key}`, (english as Record<string, unknown>)[key], (got as Record<string, unknown>)[key], out);
    }
  } else if (typeof got !== "string" || !got.trim()) {
    out.push(`${path}: missing or empty`);
  }
}

async function run(locale: string) {
  const system = `You are a native ${languageNames[locale as keyof typeof languageNames]} translator localizing a free browser-based text-formatting tools website.

STYLE REFERENCE — this locale's published copy. Match its register, formality and terminology exactly.
--------
${styleReference(locale)}
--------

RULES
- Return ONLY a JSON object with EXACTLY the same keys and array lengths as the input. No markdown fences.
- Never translate: ${glossary.join(", ")}, and do not translate the cluster keys ("ai-tells", "how-to", "reference") — translate only their values.
- "workspace" strings appear on buttons, toasts, dropdown options and aria-labels. Keep them SHORT — a button label must not wrap.
- caseUpper and caseLower are demonstrations of letter case; render them in the target script so they still demonstrate upper vs lower case where that distinction exists, otherwise translate plainly.
- Keep the typographic quotes in the privacy text natural for this language.
- Write naturally, not word-for-word.`;

  const user = `Translate every string value in this object.

${JSON.stringify({ pages, workspace, guideChrome }, null, 1)}`;

  const { text, usage } = await callKimi(system, user);
  totalIn += usage?.prompt_tokens ?? 0;
  totalOut += usage?.completion_tokens ?? 0;
  const parsed = parseJson(text);

  const problems: string[] = [];
  checkShape("pages", pages, parsed.pages, problems);
  checkShape("workspace", workspace, parsed.workspace, problems);
  checkShape("guideChrome", guideChrome, parsed.guideChrome, problems);
  for (const key of Object.keys(pages.guidesIndex.clusters)) {
    if (!parsed.pages?.guidesIndex?.clusters?.[key]) problems.push(`cluster key ${key} renamed or dropped`);
  }
  if (problems.length) { failures.push(...problems.map((p) => `${locale}: ${p}`)); return false; }

  writeFileSync(
    new URL(`../src/content/i18n/${locale}/chrome.ts`, import.meta.url).pathname,
    `import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

export const pages: PageCopy = ${JSON.stringify(parsed.pages, null, 2)};

export const workspace: WorkspaceMessages = ${JSON.stringify(parsed.workspace, null, 2)};

export const guideChrome: GuideChrome = ${JSON.stringify(parsed.guideChrome, null, 2)};
`,
  );
  return true;
}

async function main() {
  const done = await mapLimit(targets, 5, async (locale: string) => {
    const ok = await run(locale);
    console.log(`${locale}: ${ok ? "wrote chrome.ts" : "FAILED"}`);
    return ok;
  });
  console.log(`\n${done.filter(Boolean).length}/${targets.length} locales  tokens in=${totalIn} out=${totalOut} (~$${((totalIn / 1e6) * 3 + (totalOut / 1e6) * 15).toFixed(2)})`);
  if (failures.length) {
    console.log(`\n${failures.length} validation failures:`);
    for (const f of failures.slice(0, 30)) console.log("  " + f);
    process.exitCode = 1;
  }
}

main();
