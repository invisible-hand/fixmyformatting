import type { SiteLocale } from "./locales";

/**
 * Every value here is plain data — no functions, no template literals with
 * embedded logic. Placeholders use {name} / {brand} and are resolved by
 * interpolate(). Keeping the corpus statically walkable is what lets the OG
 * font subsetter and the glyph-coverage test enumerate every renderable string.
 */

export type Faq = { question: string; answer: string };

export type UiMessages = {
  languageName: string;
  allTools: string;
  about: string;
  homeEyebrow: string;
  homeTitle: string;
  homeDescription: string;
  homeMetaTitle: string;
  input: string;
  output: string;
  placeholder: string;
  emptyResult: string;
  characters: string;
  report: string;
  preview: string;
  live: string;
  updating: string;
  copy: string;
  copied: string;
  download: string;
  share: string;
  shareCopied: string;
  embed: string;
  embedCopied: string;
  downloadImage: string;
  free: string;
  noSignup: string;
  private: string;
  howTo: string;
  faqTitle: string;
  relatedTools: string;
  stepCopy: string;
  stepPaste: string;
  stepFinish: string;
  /** "Is {name} free?" */
  freeQuestion: string;
  freeAnswer: string;
  privacyQuestion: string;
  privacyAnswer: string;
  mobileQuestion: string;
  mobileAnswer: string;
  introSuffix: string;
  categories: { markdown: string; cleanup: string; data: string };
};

/**
 * Prose only. Structure (category, download, report) comes from the English
 * ToolDefinition. Everything past name/description is optional and falls back
 * to the shared templates in resolve.ts — that fallback is exactly today's
 * behaviour, so a locale can be upgraded to authored copy one tool at a time.
 */
export type ToolCopy = {
  name: string;
  description: string;
  /** Authored SEO title. Falls back to `name`. */
  title?: string;
  /** Falls back to `description` + ui.introSuffix. */
  intro?: string;
  placeholder?: string;
  /** Falls back to the three shared template FAQs. */
  faqs?: Faq[];
};

/**
 * Templates for the 30 generated brand tools (chatgpt-to-word, ...). Strings
 * use {brand} and {name}; word order therefore stays natural per language
 * rather than being concatenated English-style.
 */
export type BrandCopy = {
  /** e.g. "{brand} to Word" / "{brand}をWordに変換" */
  actionName: Record<string, string>;
  actionTitle: Record<string, string>;
  /** Why this brand's output needs conversion. */
  reasons: Record<string, string>;
  actionDescription: Record<string, string>;
  actionGuidance: Record<string, string>;
  /** Exactly three, using {name} and {brand}. */
  faqs: Faq[];
};

export type LocaleBundle = {
  code: SiteLocale;
  ui: UiMessages;
  /** Coverage: only the slugs present are served in this locale. */
  tools: Partial<Record<string, ToolCopy>>;
  /** Presence unlocks all 30 brand tools for this locale. */
  brand?: BrandCopy;
};
