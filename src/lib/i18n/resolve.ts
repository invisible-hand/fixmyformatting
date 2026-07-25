import type { ToolDefinition } from "../tools";
import { actionSource, brandNames, brands, getTool } from "../tools";
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
/** Splits chatgpt-to-word into its brand and action, or null for a core tool. */
function brandParts(slug: string) {
  const brand = brands.find((candidate) => slug.startsWith(`${candidate}-`));
  return brand ? { brand, action: slug.slice(brand.length + 1) } : null;
}

function localizeBrandTool(slug: string, locale: LocaleCode, source: ToolDefinition): ToolDefinition | null {
  const parts = brandParts(slug);
  const brand = bundles[locale].brand;
  if (!parts || !brand) return null;
  const core = bundles[locale].tools[actionSource[parts.action as keyof typeof actionSource]];
  const template = brand.actionName[parts.action];
  if (!core || !template) return null;

  const brandName = brandNames[parts.brand];
  const vars = { brand: brandName };
  const name = interpolate(template, vars);
  return {
    ...source,
    name,
    title: interpolate(brand.actionTitle[parts.action], vars),
    description: interpolate(brand.actionDescription[parts.action], vars),
    intro: `${interpolate(brand.reasons[parts.brand], vars)} ${interpolate(brand.actionGuidance[parts.action], vars)} ${core.intro ?? core.description}`,
    placeholder: core.placeholder ?? bundles[locale].ui.placeholder,
    faqs: brand.faqs.map((faq) => ({
      question: interpolate(faq.question, { ...vars, name }),
      answer: interpolate(faq.answer, { ...vars, name }),
    })),
  };
}

export function localizeTool(slug: string, locale: LocaleCode): ToolDefinition {
  const source = getTool(slug);
  if (!source) throw new Error(`Unknown tool: ${slug}`);
  const branded = localizeBrandTool(slug, locale, source);
  if (branded) return branded;
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
