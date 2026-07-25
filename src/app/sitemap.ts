import type { MetadataRoute } from "next";
import { allTools } from "@/lib/tools";
import { allGuides } from "@/lib/guides";
import { isLocalizedToolSlug, languageAlternates, localeCodes, localizedPath, staticPaths, toolSlugsForLocale } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fixmyformatting.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1, alternates: { languages: languageAlternates() } },
    ...allTools.map((tool) => ({
      url: `${base}/${tool.slug}`,
      changeFrequency: "monthly" as const,
      priority: tool.category === "Markdown & documents" ? 0.9 : 0.8,
      ...(isLocalizedToolSlug(tool.slug) ? { alternates: { languages: languageAlternates(tool.slug) } } : {}),
    })),
    ...localeCodes.flatMap((locale) => [
      {
        url: `${base}${localizedPath(locale)}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: languageAlternates() },
      },
      ...toolSlugsForLocale(locale).map((slug) => ({
        url: `${base}${localizedPath(locale, slug)}`,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: { languages: languageAlternates(slug) },
      })),
      ...staticPaths.map((path) => ({
        url: `${base}${localizedPath(locale, path)}`,
        changeFrequency: "yearly" as const,
        priority: 0.3,
        alternates: { languages: languageAlternates(path) },
      })),
    ]),
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.7 },
    ...allGuides.map((guide) => ({
      url: `${base}/guides/${guide.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: guide.updated,
    })),
    ...staticPaths.map((path) => ({
      url: `${base}/${path}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: languageAlternates(path) },
    })),
  ];
}
