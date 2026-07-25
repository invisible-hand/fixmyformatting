/**
 * Stage 2: the report-card stat labels, which stayed English on every
 * localized tool page.
 */
import { writeFileSync } from "node:fs";
import { localeCodes } from "../src/lib/i18n/locales";
import { statLabelKeys, statValueKeys } from "../src/lib/stat-labels";
import { callKimi, glossary, languageNames, mapLimit, parseJson, styleReference } from "./translate.mjs";

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const targets = only.length ? only : [...localeCodes];
const failures: string[] = [];
let totalIn = 0;
let totalOut = 0;

async function run(locale: string) {
  const system = `You are a native ${languageNames[locale as keyof typeof languageNames]} translator localizing a text-tools website.

STYLE REFERENCE — this locale's published copy. Match its register and terminology.
--------
${styleReference(locale)}
--------

RULES
- Return ONLY a JSON object with exactly the keys given. No markdown fences.
- These are labels under big numbers on a compact statistics card. Keep them SHORT — ideally 1-3 words. Brevity matters more than completeness.
- Never translate: ${glossary.join(", ")}. "GPT-4o" and "Claude" are model names.
- "Zero-width" and "Soft hyphens" refer to invisible Unicode characters.
- "Status" is a field label; "Valid JSON" / "Invalid JSON" are its possible values.
- "minutes" is the unit shown after a reading-time number, e.g. "5 min". Use the conventional short form.`;

  const user = `Translate each value. Keep the keys exactly as given.

${JSON.stringify({
    labels: Object.fromEntries(statLabelKeys.map((k) => [k, k])),
    values: Object.fromEntries(statValueKeys.map((k) => [k, k])),
    minutes: "min",
  }, null, 1)}`;

  const { text, usage } = await callKimi(system, user);
  totalIn += usage?.prompt_tokens ?? 0;
  totalOut += usage?.completion_tokens ?? 0;
  const parsed = parseJson(text);

  const problems: string[] = [];
  for (const key of statLabelKeys) if (!parsed.labels?.[key]?.trim()) problems.push(`labels.${key} missing`);
  for (const key of statValueKeys) if (!parsed.values?.[key]?.trim()) problems.push(`values.${key} missing`);
  if (!parsed.minutes?.trim()) problems.push("minutes missing");
  if (problems.length) { failures.push(...problems.map((p) => `${locale}: ${p}`)); return false; }

  writeFileSync(
    new URL(`../src/content/i18n/${locale}/stats.ts`, import.meta.url).pathname,
    `import type { StatTranslations } from "@/lib/stat-labels";

export const stats: StatTranslations = {
  labels: ${JSON.stringify(parsed.labels, null, 4).replace(/\n/g, "\n  ")},
  values: ${JSON.stringify(parsed.values, null, 4).replace(/\n/g, "\n  ")},
  minutes: ${JSON.stringify(parsed.minutes)},
};
`,
  );
  return true;
}

async function main() {
  const done = await mapLimit(targets, 5, async (locale: string) => {
    const ok = await run(locale);
    console.log(`${locale}: ${ok ? "wrote stats.ts" : "FAILED"}`);
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
