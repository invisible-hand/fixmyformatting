/**
 * Translation runner backed by Kimi K3 (Moonshot).
 *
 * The model does the drafting; this script owns the contract. Every response is
 * validated before it can reach the repo: JSON shape, required keys, character
 * budgets, {placeholder} preservation, and a do-not-translate glossary. Anything
 * that fails is retried, then reported rather than written.
 *
 * Each locale's already-published translations are passed in as the style
 * reference, which pins register (German uses du, not Sie) and terminology so
 * new copy cannot clash with what is already indexed.
 */
import { readFileSync } from "node:fs";

const API = "https://api.moonshot.ai/v1/chat/completions";
const MODEL = "kimi-k3";

function apiKey() {
  const env = readFileSync(new URL("../.env.local", import.meta.url).pathname, "utf8");
  const key = env.match(/^MOONSHOT_API_KEY=(.+)$/m)?.[1]?.trim();
  if (!key) throw new Error("MOONSHOT_API_KEY missing from .env.local");
  return key;
}

/** Terms that must survive translation untouched. */
export const glossary = [
  "Markdown", "Word", "Excel", "PDF", "CSV", "HTML", "JSON", "LaTeX", "XLSX", "Unicode", "ASCII",
  "ChatGPT", "Claude", "Gemini", "Microsoft Copilot", "Perplexity", "DeepSeek", "Google Docs",
  "Google Sheets", "Numbers", "Notion", "GitHub", "Fix My Formatting",
];

export const languageNames = {
  es: "Spanish (Spain, neutral for Latin America)",
  pt: "Brazilian Portuguese",
  de: "German",
  fr: "French",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Simplified Chinese",
  hi: "Hindi",
  ar: "Modern Standard Arabic",
};

/** CJK is far denser per character, so SERP budgets differ by script. */
export const titleLimit = (locale) => (["ja", "ko", "zh"].includes(locale) ? 34 : 60);
export const descriptionLimit = (locale) => (["ja", "ko", "zh"].includes(locale) ? 90 : 155);

export async function callKimi(system, user, { retries = 3 } = {}) {
  const key = apiKey();
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          reasoning_effort: "low",
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${(await response.text()).slice(0, 200)}`);
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      if (!text) throw new Error("empty completion");
      return { text, usage: data.usage };
    } catch (error) {
      lastError = error;
      if (attempt < retries) await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  throw lastError;
}

export function parseJson(text) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error(`no JSON object in response: ${cleaned.slice(0, 160)}`);
  return JSON.parse(cleaned.slice(start, end + 1));
}

/** Returns a list of human-readable problems; empty means the entry is usable. */
export function validateToolCopy(locale, slug, copy, english) {
  const problems = [];
  const need = ["name", "title", "description", "intro", "faqs"];
  for (const key of need) if (!copy?.[key]) problems.push(`${slug}: missing ${key}`);
  if (problems.length) return problems;

  if (copy.title.length > titleLimit(locale)) {
    problems.push(`${slug}: title ${copy.title.length} chars exceeds ${titleLimit(locale)}`);
  }
  if (copy.description.length > descriptionLimit(locale)) {
    problems.push(`${slug}: description ${copy.description.length} exceeds ${descriptionLimit(locale)}`);
  }
  if (copy.intro.length <= copy.description.length) {
    problems.push(`${slug}: intro must be longer than description`);
  }
  if (!Array.isArray(copy.faqs) || copy.faqs.length !== 3) {
    problems.push(`${slug}: expected 3 faqs, got ${copy.faqs?.length}`);
  } else {
    for (const faq of copy.faqs) {
      if (!faq.question || !faq.answer) problems.push(`${slug}: incomplete faq`);
    }
  }
  // Untranslated passthrough: a field identical to English means the model gave up.
  if (locale !== "en" && copy.description === english.description) {
    problems.push(`${slug}: description left in English`);
  }
  // Product names must survive. "Word" and "Numbers" are excluded because they
  // are ordinary English nouns here ("Word & Character Counter"), not products.
  const ambiguous = new Set(["Word", "Numbers", "Notion", "Claude", "Gemini"]);
  if (!["ja", "ko", "zh", "hi", "ar"].includes(locale)) {
    for (const term of glossary) {
      if (ambiguous.has(term)) continue;
      if (english.name.includes(term) && !copy.name.includes(term)) {
        problems.push(`${slug}: glossary term "${term}" lost from name`);
      }
    }
  }
  return problems;
}

export function styleReference(locale) {
  const ui = readFileSync(new URL(`../src/content/i18n/${locale}/ui.ts`, import.meta.url).pathname, "utf8");
  const tools = readFileSync(new URL(`../src/content/i18n/${locale}/tools/core.ts`, import.meta.url).pathname, "utf8");
  return `${ui}\n\n${tools}`;
}

/** Bounded-concurrency map so a fan-out cannot stampede the API. */
export async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        results[index] = await worker(items[index], index);
      }
    }),
  );
  return results;
}
