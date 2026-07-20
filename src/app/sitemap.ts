import type { MetadataRoute } from "next";
import { allTools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fixmyformatting.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...allTools.map((tool) => ({
      url: `${base}/${tool.slug}`,
      changeFrequency: "monthly" as const,
      priority: tool.category === "Markdown & documents" ? 0.9 : 0.8,
    })),
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
