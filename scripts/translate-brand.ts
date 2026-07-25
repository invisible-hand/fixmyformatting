/**
 * Stage 4: brand tool templates. ~370 words per locale unlocks all 30
 * generated brand pages (chatgpt-to-word, claude-to-pdf, ...) — the best
 * words-to-pages ratio in the project.
 */
import { writeFileSync } from "node:fs";
import { brandActions, brands } from "../src/lib/tools";
import { localeCodes } from "../src/lib/i18n/locales";
import { callKimi, glossary, languageNames, mapLimit, parseJson, styleReference, titleLimit } from "./translate.mjs";

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const targets = only.length ? only : [...localeCodes];

const ENGLISH = {
  actionName: {
    "to-word": "{brand} to Word",
    "to-pdf": "{brand} to PDF",
    "to-google-docs": "{brand} to Google Docs",
    "table-to-excel": "{brand} Table to Excel",
    "remove-formatting": "{brand} Remove Formatting",
  },
  actionDescription: {
    "to-word": "Convert {brand} responses to editable Word documents with headings, lists, code, and tables preserved.",
    "to-pdf": "Convert {brand} responses to clean, print-ready PDF files without uploading your text.",
    "to-google-docs": "Move {brand} output into Google Docs while preserving headings, lists, links, emphasis, and tables.",
    "table-to-excel": "Convert {brand} Markdown tables into real Excel rows and columns, ready to sort and edit.",
    "remove-formatting": "Remove Markdown formatting from {brand} responses while keeping the readable text intact.",
  },
  actionGuidance: {
    "to-word": "Use this when a {brand} answer needs to become a report, brief, assignment, or document that other people can edit in Word.",
    "to-pdf": "The live preview shows how the {brand} response will print before you choose Save as PDF in your browser.",
    "to-google-docs": "Copy the rich-text result and paste it into Google Docs when a normal paste from {brand} leaves visible Markdown symbols.",
    "table-to-excel": "This fixes the pipe-and-dash table syntax {brand} displays in chat and downloads a genuine .xlsx spreadsheet.",
    "remove-formatting": "Use the clean text in email, forms, messaging apps, or editors that show {brand} asterisks and heading marks literally.",
  },
  reasons: {
    chatgpt: "ChatGPT often returns useful structure as Markdown, which exposes asterisks, hashes, and pipe tables when pasted into office software.",
    claude: "Claude frequently writes long, carefully structured answers whose headings and tables need conversion before they behave like a normal document.",
    gemini: "Gemini tables can paste as visible pipes and separator dashes because chat output uses Markdown rather than spreadsheet cells.",
    copilot: "Copilot responses mix prose, lists, and code-oriented Markdown, so a direct paste may not preserve the visual hierarchy.",
    perplexity: "Perplexity answers often combine Markdown structure with citation links, making clean conversion important when reusing research.",
    deepseek: "DeepSeek commonly formats technical answers in Markdown, including fenced code and formulas that plain pasting leaves exposed.",
  },
  faqs: [
    { question: "How do I use {name}?", answer: "Copy the relevant content from {brand}, paste it into the editor above, and use the live result immediately." },
    { question: "Does this upload my {brand} conversation?", answer: "No. Conversion runs in your browser. Text is stored only when you explicitly create a share link." },
    { question: "Can I edit the converted {brand} result?", answer: "Yes. The result remains editable when copied or downloaded in an editable format." },
  ],
};

const failures: string[] = [];
let totalIn = 0;
let totalOut = 0;
const q = (s: string) => JSON.stringify(s);

async function run(locale: string) {
  const system = `You are a native ${languageNames[locale as keyof typeof languageNames]} translator localizing a text-formatting tools website.

STYLE REFERENCE — this locale's published copy. Match its register, formality and terminology exactly.
--------
${styleReference(locale)}
--------

RULES
- Return ONLY a JSON object, no markdown fences.
- {brand} and {name} are placeholders. Keep them EXACTLY as written, and place them where the sentence reads naturally in ${languageNames[locale as keyof typeof languageNames]} — do not force English word order.
- Never translate: ${glossary.join(", ")}.
- "actionName" values become page H1s, e.g. "{brand} to Word". Keep them short.
- "actionTitle" values are search-engine titles, MAX ${titleLimit(locale)} characters AFTER {brand} is replaced by "Microsoft Copilot" (17 characters). Budget for that.
- Everything else is body copy: natural, not word-for-word.`;

  const user = `Translate every string in this object. Return the identical structure and keys.

${JSON.stringify(ENGLISH, null, 1)}

Additionally add an "actionTitle" object with the same five action keys: a search-engine title template for each, containing {brand}.`;

  const { text, usage } = await callKimi(system, user);
  totalIn += usage?.prompt_tokens ?? 0;
  totalOut += usage?.completion_tokens ?? 0;
  const parsed = parseJson(text);

  // Validate: every key present, placeholders intact, title budget respected.
  const problems: string[] = [];
  for (const group of ["actionName", "actionTitle", "actionDescription", "actionGuidance"] as const) {
    for (const action of brandActions) {
      const value = parsed[group]?.[action];
      if (!value) { problems.push(`${locale}: ${group}.${action} missing`); continue; }
      if (!value.includes("{brand}")) problems.push(`${locale}: ${group}.${action} lost {brand}`);
      if (group === "actionTitle") {
        const rendered = value.replace("{brand}", "Microsoft Copilot");
        if (rendered.length > titleLimit(locale)) {
          problems.push(`${locale}: actionTitle.${action} is ${rendered.length} chars with longest brand (max ${titleLimit(locale)})`);
        }
      }
    }
  }
  for (const brand of brands) {
    if (!parsed.reasons?.[brand]) problems.push(`${locale}: reasons.${brand} missing`);
  }
  if (!Array.isArray(parsed.faqs) || parsed.faqs.length !== 3) problems.push(`${locale}: expected 3 faqs`);

  if (problems.length) { failures.push(...problems); return false; }

  const rec = (obj: Record<string, string>) =>
    Object.entries(obj).map(([k, v]) => `    ${q(k)}: ${q(v)},`).join("\n");

  writeFileSync(
    new URL(`../src/content/i18n/${locale}/tools/brand.ts`, import.meta.url).pathname,
    `import type { BrandCopy } from "@/lib/i18n/types";

export const brand: BrandCopy = {
  actionName: {
${rec(parsed.actionName)}
  },
  actionTitle: {
${rec(parsed.actionTitle)}
  },
  actionDescription: {
${rec(parsed.actionDescription)}
  },
  actionGuidance: {
${rec(parsed.actionGuidance)}
  },
  reasons: {
${rec(parsed.reasons)}
  },
  faqs: [
${parsed.faqs.map((f: { question: string; answer: string }) => `    { question: ${q(f.question)}, answer: ${q(f.answer)} },`).join("\n")}
  ],
};
`,
  );
  return true;
}

async function main() {
  const done = await mapLimit(targets, 5, async (locale: string) => {
    const ok = await run(locale);
    console.log(`${locale}: ${ok ? "wrote brand.ts" : "FAILED"}`);
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
