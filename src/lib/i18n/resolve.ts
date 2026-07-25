import type { ToolDefinition } from "../tools";
import { getTool } from "../tools";
import type { LocaleCode } from "./locales";
import type { Faq, UiMessages } from "./types";
import { bundles } from "./bundles";
import { interpolate } from "./format";

export function uiFor(locale: LocaleCode): UiMessages {
  return bundles[locale].ui;
}

export function categoryLabel(category: ToolDefinition["category"], ui: UiMessages) {
  if (category === "Markdown & documents") return ui.categories.markdown;
  if (category === "AI cleanup") return ui.categories.cleanup;
  return ui.categories.data;
}

/** The three shared FAQs, used until a tool has authored ones for this locale. */
function templateFaqs(ui: UiMessages, name: string): Faq[] {
  return [
    { question: interpolate(ui.freeQuestion, { name }), answer: ui.freeAnswer },
    { question: ui.privacyQuestion, answer: ui.privacyAnswer },
    { question: ui.mobileQuestion, answer: ui.mobileAnswer },
  ];
}

/**
 * Merges translated prose onto the English ToolDefinition, so structure
 * (category, download, report, outputLabel) can never drift per locale.
 */
export function localizeTool(slug: string, locale: LocaleCode): ToolDefinition {
  const source = getTool(slug);
  if (!source) throw new Error(`Unknown tool: ${slug}`);
  const copy = bundles[locale].tools[slug];
  if (!copy) throw new Error(`Tool ${slug} is not translated for ${locale}`);
  const ui = bundles[locale].ui;
  return {
    ...source,
    name: copy.name,
    title: copy.title ?? copy.name,
    description: copy.description,
    intro: copy.intro ?? `${copy.description} ${ui.introSuffix}`,
    placeholder: copy.placeholder ?? ui.placeholder,
    faqs: copy.faqs ?? templateFaqs(ui, copy.name),
  };
}
