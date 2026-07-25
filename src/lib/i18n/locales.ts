/**
 * Locale primitives only. This module must stay free of content imports:
 * next.config.ts imports it, and pulling the translation bundles into the
 * Next config loader would evaluate the whole corpus on every config read.
 */

export const localeCodes = ["es", "pt", "de", "fr", "it", "ja", "ko", "zh", "hi", "ar"] as const;
export type LocaleCode = (typeof localeCodes)[number];
export type SiteLocale = "en" | LocaleCode;

export const siteLocales = ["en", ...localeCodes] as const;

const rtlLocales = new Set<SiteLocale>(["ar"]);

export function isLocale(value: string): value is LocaleCode {
  return localeCodes.includes(value as LocaleCode);
}

export function localeDir(locale: SiteLocale): "ltr" | "rtl" {
  return rtlLocales.has(locale) ? "rtl" : "ltr";
}

export function localizedPath(locale: SiteLocale, path = "") {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";
  return locale === "en" ? suffix || "/" : `/${locale}${suffix}`;
}
