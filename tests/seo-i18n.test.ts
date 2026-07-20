import { describe, expect, it } from "vitest";
import {
  languageAlternates,
  localeCodes,
  localizedPath,
  localizedToolSlugs,
  localizeTool,
  messages,
} from "../src/lib/i18n";
import { allTools } from "../src/lib/tools";

describe("SEO metadata inventory", () => {
  it("keeps every English tool title and description within search limits", () => {
    for (const tool of allTools) {
      expect(tool.title.length, `${tool.slug} title`).toBeLessThanOrEqual(60);
      expect(tool.description.length, `${tool.slug} description`).toBeLessThanOrEqual(155);
    }
  });

  it("has no duplicate English titles or descriptions", () => {
    expect(new Set(allTools.map((tool) => tool.title)).size).toBe(allTools.length);
    expect(new Set(allTools.map((tool) => tool.description)).size).toBe(allTools.length);
  });

  it("publishes unique canonical sitemap URLs", () => {
    const urls = [
      "https://fixmyformatting.com",
      ...allTools.map((tool) => `https://fixmyformatting.com/${tool.slug}`),
      ...localeCodes.flatMap((locale) => [
        `https://fixmyformatting.com/${locale}`,
        ...localizedToolSlugs.map((slug) => `https://fixmyformatting.com/${locale}/${slug}`),
      ]),
      "https://fixmyformatting.com/about",
      "https://fixmyformatting.com/privacy",
    ];
    expect(urls).toHaveLength(189);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://fixmyformatting.com"))).toBe(true);
  });
});

describe("localized SEO inventory", () => {
  it("fully translates every selected tool in every locale", () => {
    for (const locale of localeCodes) {
      expect(Object.keys(messages[locale].tools).sort()).toEqual([...localizedToolSlugs].sort());
      const localizedTools = localizedToolSlugs.map((slug) => localizeTool(slug, locale));
      expect(new Set(localizedTools.map((tool) => tool.title)).size).toBe(localizedTools.length);
      expect(new Set(localizedTools.map((tool) => tool.description)).size).toBe(localizedTools.length);
      for (const slug of localizedToolSlugs) {
        const tool = localizeTool(slug, locale);
        expect(tool.name.length).toBeGreaterThan(3);
        expect(tool.title.length).toBeLessThanOrEqual(60);
        expect(tool.description.length).toBeLessThanOrEqual(155);
        expect(tool.intro.length).toBeGreaterThan(tool.description.length);
        expect(tool.faqs).toHaveLength(3);
      }
    }
  });

  it("generates reciprocal hreflang sets with x-default", () => {
    const alternates = languageAlternates("markdown-to-word");
    expect(Object.keys(alternates)).toHaveLength(localeCodes.length + 2);
    expect(alternates.en).toBe("https://fixmyformatting.com/markdown-to-word");
    expect(alternates.es).toBe("https://fixmyformatting.com/es/markdown-to-word");
    expect(alternates["x-default"]).toBe(alternates.en);
  });

  it("keeps public locale paths clean and prefix-based", () => {
    for (const locale of localeCodes) {
      expect(localizedPath(locale)).toBe(`/${locale}`);
      expect(localizedPath(locale, "clean-ai-text")).toBe(`/${locale}/clean-ai-text`);
    }
  });
});
