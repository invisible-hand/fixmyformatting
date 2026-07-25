/**
 * Stage 7: captions, prose and short labels for the guide diagrams.
 * Monospace specimens inside the figures stay English by design — see
 * src/content/i18n/en/figures.ts.
 */
import { writeFileSync } from "node:fs";
import { figures } from "../src/content/i18n/en/figures";
import { localeCodes } from "../src/lib/i18n/locales";
import { callKimi, glossary, languageNames, mapLimit, parseJson, styleReference } from "./translate.mjs";

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const targets = only.length ? only : [...localeCodes];
const failures: string[] = [];
let totalIn = 0;
let totalOut = 0;

async function run(locale: string) {
  const system = `You are a native ${languageNames[locale as keyof typeof languageNames]} translator localizing diagram text on a text-formatting tools website.

STYLE REFERENCE — this locale's published copy. Match its register and terminology.
--------
${styleReference(locale)}
--------

RULES
- Return ONLY a JSON object with exactly the same keys and array lengths. No markdown fences.
- Figure keys ("dash-widths" etc.) and label keys ("before", "hyphenName" etc.) are identifiers — never translate them, only their values.
- "labels" appear INSIDE a diagram box with limited width. Keep them very short — ideally 1-3 words. Brevity beats completeness.
- "caption" and "notes" render as ordinary paragraphs beneath the diagram and may be full sentences.
- Never translate: ${glossary.join(", ")}. Keep Unicode code points (U+002D, U+2013, U+2014) and the example strings "2020–2024" and "well-known" as they are.
- "Region", "You", "Assistant" label a table column and chat speakers respectively.`;

  const { text, usage } = await callKimi(system, `Translate every string value.\n\n${JSON.stringify(figures, null, 1)}`);
  totalIn += usage?.prompt_tokens ?? 0;
  totalOut += usage?.completion_tokens ?? 0;
  const parsed = parseJson(text);

  const problems: string[] = [];
  for (const [key, value] of Object.entries(figures)) {
    const got = parsed[key];
    if (!got) { problems.push(`${key} missing`); continue; }
    if (!got.caption?.trim()) problems.push(`${key}.caption missing`);
    if (!Array.isArray(got.notes) || got.notes.length !== value.notes.length) {
      problems.push(`${key}.notes expected ${value.notes.length}, got ${got.notes?.length}`);
    }
    for (const labelKey of Object.keys(value.labels)) {
      if (!got.labels?.[labelKey]?.trim()) problems.push(`${key}.labels.${labelKey} missing`);
    }
  }
  if (problems.length) { failures.push(...problems.map((p) => `${locale}: ${p}`)); return false; }

  writeFileSync(
    new URL(`../src/content/i18n/${locale}/figures.ts`, import.meta.url).pathname,
    `import type { FigureCopy } from "@/lib/i18n/types";\n\nexport const figures: FigureCopy = ${JSON.stringify(parsed, null, 2)};\n`,
  );
  return true;
}

async function main() {
  const done = await mapLimit(targets, 5, async (locale: string) => {
    const ok = await run(locale);
    console.log(`${locale}: ${ok ? "wrote figures.ts" : "FAILED"}`);
    return ok;
  });
  console.log(`\n${done.filter(Boolean).length}/${targets.length}  tokens in=${totalIn} out=${totalOut} (~$${((totalIn / 1e6) * 3 + (totalOut / 1e6) * 15).toFixed(2)})`);
  if (failures.length) {
    console.log(`\n${failures.length} failures:`);
    for (const f of failures.slice(0, 30)) console.log("  " + f);
    process.exitCode = 1;
  }
}

main();
