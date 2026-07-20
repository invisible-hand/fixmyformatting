import type { MetadataRoute } from "next";
import { allTools } from "@/lib/tools";
import { isLocalizedToolSlug, languageAlternates, localeCodes, localizedPath, localizedToolSlugs } from "@/lib/i18n";

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
      ...localizedToolSlugs.map((slug) => ({
        url: `${base}${localizedPath(locale, slug)}`,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: { languages: languageAlternates(slug) },
      })),
    ]),
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
