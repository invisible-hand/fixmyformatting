import { localeCodes, localizedPath } from "./locales";
import type { LocaleCode, SiteLocale } from "./locales";
import { bundles } from "./bundles";
import { brandTools, getProcessorSlug } from "../tools";

export const siteUrl = "https://fixmyformatting.com";

/**
 * Which tool slugs this locale actually serves. Coverage is per-locale so a
 * partial rollout is an expressible state rather than a broken one — every
 * consumer (sitemap, generateStaticParams, hreflang, language menu) derives
 * from these functions rather than from a shared constant.
 */
export function toolSlugsForLocale(locale: LocaleCode): string[] {
  const core = Object.keys(bundles[locale].tools);
  if (!bundles[locale].brand) return core;
  // Brand templates unlock every generated variant whose core tool is covered.
  const branded = brandTools
    .filter((tool) => core.includes(getProcessorSlug(tool.slug)))
    .map((tool) => tool.slug);
  return [...core, ...branded];
}

export function isToolLocalized(slug: string, locale: LocaleCode) {
  if (bundles[locale].tools[slug]) return true;
  if (!bundles[locale].brand) return false;
  const source = getProcessorSlug(slug);
  return source !== slug && Boolean(bundles[locale].tools[source]);
}

/** Pages every locale serves, independent of tool coverage. */
export const staticPaths = ["about", "privacy"] as const;

/** Locales that serve a given public path ("" is the home page). */
export function localesForPath(path = ""): LocaleCode[] {
  const slug = path.replace(/^\/+/, "");
  if (!slug) return [...localeCodes];
  if ((staticPaths as readonly string[]).includes(slug)) return [...localeCodes];
  return localeCodes.filter((locale) => isToolLocalized(slug, locale));
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
