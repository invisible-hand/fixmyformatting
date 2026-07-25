import { localeCodes, localizedPath } from "./locales";
import type { LocaleCode, SiteLocale } from "./locales";
import { bundles } from "./bundles";

export const siteUrl = "https://fixmyformatting.com";

/**
 * Which tool slugs this locale actually serves. Coverage is per-locale so a
 * partial rollout is an expressible state rather than a broken one — every
 * consumer (sitemap, generateStaticParams, hreflang, language menu) derives
 * from these functions rather than from a shared constant.
 */
export function toolSlugsForLocale(locale: LocaleCode): string[] {
  return Object.keys(bundles[locale].tools);
}

/** Locales that serve a given public path ("" is the home page). */
export function localesForPath(path = ""): LocaleCode[] {
  const slug = path.replace(/^\/+/, "");
  if (!slug) return [...localeCodes];
  return localeCodes.filter((locale) => Boolean(bundles[locale].tools[slug]));
}

export function isToolLocalized(slug: string, locale: LocaleCode) {
  return Boolean(bundles[locale].tools[slug]);
}

/** True when at least one locale serves this slug. */
export function isLocalizedToolSlug(slug: string) {
  return localesForPath(slug).length > 0;
}

/**
 * hreflang set for a path. Built from actual coverage, so alternates can never
 * advertise a locale that would 404 — reciprocity is structural because
 * sitemap.ts and both generateMetadata callers funnel through this function.
 */
export function languageAlternates(path = ""): Partial<Record<SiteLocale | "x-default", string>> {
  const url = (locale: SiteLocale) => `${siteUrl}${localizedPath(locale, path)}`;
  const languages: Partial<Record<SiteLocale | "x-default", string>> = {
    en: url("en"),
    "x-default": url("en"),
  };
  for (const locale of localesForPath(path)) languages[locale] = url(locale);
  return languages;
}
