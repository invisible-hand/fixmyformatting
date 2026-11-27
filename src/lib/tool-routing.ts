/**
 * Tool routing only: which brand variants exist and which core processor each
 * maps to. Kept apart from tools.ts because the client workspace and the
 * worker need getProcessorSlug, and importing it from tools.ts would drag the
 * whole English copy corpus into the 200 KB tool-page bundle.
 */

export const brands = ["chatgpt", "claude", "gemini", "copilot", "perplexity", "deepseek", "grok", "mistral", "notebooklm"] as const;
export const brandActions = ["to-word", "to-pdf", "to-google-docs", "table-to-excel", "remove-formatting"] as const;

export const actionSource: Record<(typeof brandActions)[number], string> = {
  "to-word": "markdown-to-word",
  "to-pdf": "markdown-to-pdf",
  "to-google-docs": "markdown-to-google-docs",
  "table-to-excel": "markdown-table-to-excel",
  "remove-formatting": "remove-markdown-formatting",
};

export function getProcessorSlug(slug: string) {
  const brandMatch = brands.find((brand) => slug.startsWith(`${brand}-`));
  if (!brandMatch) return slug;
  const action = slug.slice(brandMatch.length + 1) as (typeof brandActions)[number];
  return actionSource[action] ?? slug;
}

/**
 * Brand variants of one action share most of their text. Only the English
 * ChatGPT variants are offered to Google's index; every other brand variant
 * (and every translated one) carries a googlebot-only noindex. Other search
 * engines and AI crawlers still see and may index all of them.
 */
export function hiddenFromGoogle(slug: string, locale = "en") {
  const brand = brands.find((b) => slug.startsWith(`${b}-`) && (brandActions as readonly string[]).includes(slug.slice(b.length + 1)));
  if (!brand) return false;
  return !(brand === "chatgpt" && locale === "en");
}

/** Robots metadata for a tool page: open to all, with the Google-only exception above. */
export function toolRobots(slug: string, locale = "en") {
  return hiddenFromGoogle(slug, locale)
    ? { index: true, follow: true, googleBot: { index: false, follow: true } }
    : { index: true, follow: true };
}
