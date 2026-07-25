/**
 * The English stat labels emitted by the processors, used as translation keys.
 *
 * Keying on the English string rather than introducing a separate StatKey means
 * processors.ts, the share API and the persisted ShareRecord shape all stay
 * untouched — shares written before this change keep rendering, because the
 * label they stored is the key. tests/seo-i18n.test.ts asserts every emitted
 * label has a translation, so renaming one fails loudly instead of silently
 * falling back to English.
 */

export const statLabelKeys = [
  "Words", "Elements", "HTML elements", "Symbols removed", "Rows", "Columns",
  "Em dashes replaced", "Em dashes", "Smart quotes", "Hidden characters", "Emojis",
  "Hidden characters found", "Zero-width", "Soft hyphens", "Quotes fixed", "Emojis removed",
  "Line breaks fixed", "Messages formatted", "Estimated tokens", "Characters",
  "Chunks produced", "Additions", "Deletions", "Status", "Lines", "Tables found",
  "Sentences", "Reading time", "Characters converted", "Equations converted",
  "GPT-4o tokens", "Claude estimate",
] as const;

export type StatLabelKey = (typeof statLabelKeys)[number];

/** Stat values that are words rather than numbers, so also need translating. */
export const statValueKeys = ["Valid JSON", "Invalid JSON"] as const;

export type StatTranslations = {
  labels: Record<string, string>;
  values: Record<string, string>;
  /** Unit appended to the reading-time stat, e.g. "min". */
  minutes: string;
};
