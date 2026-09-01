import { describe, expect, it } from "vitest";
import {
  languageAlternates,
  localeCodes,
  localizedPath,
  localizeGuide,
  localizeTool,
  guideSlugsForLocale,
  guidesNav,
  toolSlugsForLocale,
} from "../src/lib/i18n";
import { allTools, coreTools, getTool } from "../src/lib/tools";
import { processText } from "../src/lib/processors";
import { statLabelKeys } from "../src/lib/stat-labels";
import { bundles } from "../src/lib/i18n";
import { allGuides, getGuide } from "../src/lib/guides";

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
        ...toolSlugsForLocale(locale).map((slug) => `https://fixmyformatting.com/${locale}/${slug}`),
      ]),
      "https://fixmyformatting.com/guides",
      ...allGuides.map((guide) => `https://fixmyformatting.com/guides/${guide.slug}`),
      ...localeCodes.flatMap((locale) => [
        `https://fixmyformatting.com/${locale}/about`,
        `https://fixmyformatting.com/${locale}/privacy`,
      ]),
      "https://fixmyformatting.com/about",
      "https://fixmyformatting.com/privacy",
    ];
    expect(urls).toHaveLength(739);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://fixmyformatting.com"))).toBe(true);
  });
});

describe("localized SEO inventory", () => {
  it("fully translates every selected tool in every locale", () => {
    for (const locale of localeCodes) {
      const slugs = toolSlugsForLocale(locale);
      const localizedTools = slugs.map((slug) => localizeTool(slug, locale));
      expect(new Set(localizedTools.map((tool) => tool.title)).size).toBe(localizedTools.length);
      expect(new Set(localizedTools.map((tool) => tool.description)).size).toBe(localizedTools.length);
      for (const slug of slugs) {
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

  it("matches the hreflang self-reference to the canonical exactly", () => {
    // The homepage canonical is the bare origin, so its own en/x-default
    // alternate must be too — hreflang clusters are matched by string, and a
    // stray trailing slash silently drops the page out of its own cluster.
    const home = languageAlternates();
    expect(home.en).toBe("https://fixmyformatting.com");
    expect(home["x-default"]).toBe(home.en);
    for (const path of ["", "guides", "about", "markdown-to-word"]) {
      for (const url of Object.values(languageAlternates(path))) {
        expect(url.endsWith("/"), `${path || "(home)"} alternate ${url}`).toBe(false);
      }
    }
  });

  it("keeps guide metadata within search limits and unique", () => {
    for (const guide of allGuides) {
      expect(guide.title.length, `${guide.slug} title`).toBeLessThanOrEqual(60);
      expect(guide.description.length, `${guide.slug} description`).toBeLessThanOrEqual(155);
      expect(guide.h1.length).toBeGreaterThan(10);
      expect(guide.answer.length).toBeGreaterThan(120);
      expect(guide.sections.length).toBeGreaterThanOrEqual(3);
      expect(guide.faqs.length).toBeGreaterThanOrEqual(3);
      expect(guide.relatedTools.length).toBeGreaterThan(0);
    }
    expect(new Set(allGuides.map((guide) => guide.slug)).size).toBe(allGuides.length);
    expect(new Set(allGuides.map((guide) => guide.title)).size).toBe(allGuides.length);
    expect(new Set(allGuides.map((guide) => guide.description)).size).toBe(allGuides.length);
  });

  it("resolves every guide cross-reference", () => {
    for (const guide of allGuides) {
      for (const slug of guide.relatedTools) {
        expect(getTool(slug), `${guide.slug} → tool ${slug}`).toBeDefined();
      }
      for (const slug of guide.relatedGuides) {
        expect(getGuide(slug), `${guide.slug} → guide ${slug}`).toBeDefined();
        expect(slug, `${guide.slug} links to itself`).not.toBe(guide.slug);
      }
      const ids = guide.sections.map((section) => section.id);
      expect(new Set(ids).size, `${guide.slug} section ids`).toBe(ids.length);
    }
  });

  // These URLs are indexed. A refactor must never silently un-publish one.
  const launchedToolSlugs = [
    "markdown-to-word", "markdown-to-pdf", "markdown-to-google-docs", "remove-markdown-formatting",
    "markdown-table-to-excel", "markdown-table-to-csv", "markdown-viewer", "markdown-to-html",
    "word-to-markdown", "remove-em-dashes", "clean-ai-text", "remove-invisible-characters",
  ];

  it("never drops a tool slug that is already published in a locale", () => {
    for (const locale of localeCodes) {
      const covered = new Set(toolSlugsForLocale(locale));
      for (const slug of launchedToolSlugs) {
        expect(covered.has(slug), `${locale} lost ${slug}`).toBe(true);
      }
    }
  });

  it("advertises only locales that actually serve the path", () => {
    for (const slug of launchedToolSlugs) {
      const alternates = languageAlternates(slug);
      for (const locale of localeCodes) {
        expect(alternates[locale], `${slug} missing ${locale}`).toBe(`https://fixmyformatting.com/${locale}/${slug}`);
      }
    }
    // A path no locale serves must advertise English only, never a 404.
    const untranslated = languageAlternates("guides/not-a-real-guide");
    expect(Object.keys(untranslated).sort()).toEqual(["en", "x-default"]);
  });

  it("translates every stat label the processors can emit", () => {
    // Labels are the translation keys, so a rename in processors.ts must fail
    // here rather than silently falling back to English on localized pages.
    const emitted = new Set<string>();
    for (const tool of coreTools) {
      for (const sample of [tool.placeholder, "a b c", "{\"a\":1}"]) {
        try {
          for (const stat of processText(tool.slug, sample).stats) emitted.add(stat.label);
        } catch {
          // Some processors reject unrelated sample input; other samples cover them.
        }
      }
    }
    expect(emitted.size).toBeGreaterThan(10);
    for (const label of emitted) {
      expect(statLabelKeys as readonly string[], `${label} missing from statLabelKeys`).toContain(label);
    }
    for (const locale of localeCodes) {
      for (const label of statLabelKeys) {
        expect(bundles[locale].stats.labels[label], `${locale} missing stat label ${label}`).toBeTruthy();
      }
    }
  });

  it("keeps every guide translation structurally identical to English", () => {
    for (const locale of localeCodes) {
      for (const slug of guideSlugsForLocale(locale)) {
        const english = getGuide(slug);
        expect(english, `${locale} translates unknown guide ${slug}`).toBeDefined();
        const localized = localizeGuide(english!, locale);
        // Anchor ids and their order come from English, so the table of
        // contents and every #fragment link stay valid in every locale.
        expect(localized.sections.map((s) => s.id)).toEqual(english!.sections.map((s) => s.id));
        expect(localized.sections.every((s) => s.heading.trim() && s.body.trim())).toBe(true);
        expect(localized.faqs.length).toBe(english!.faqs.length);
        expect(localized.title.length, `${locale}/${slug} title`).toBeLessThanOrEqual(60);
        expect(localized.description.length, `${locale}/${slug} description`).toBeLessThanOrEqual(155);
      }
    }
  });

  it("links the guides index from every locale that serves guides", () => {
    // Without this the localized guide pages sit in the sitemap with no
    // internal link pointing at them — reachable only by typing the URL.
    expect(guidesNav("en")).toEqual({ href: "/guides", label: "Guides" });
    for (const locale of localeCodes) {
      const nav = guidesNav(locale);
      if (!guideSlugsForLocale(locale).length) {
        expect(nav, `${locale} has no guides but links the index`).toBeNull();
        continue;
      }
      expect(nav?.href, `${locale} guides href`).toBe(`/${locale}/guides`);
      // French legitimately spells it "Guides", so assert presence, not difference.
      expect(nav?.label?.trim(), `${locale} guides label`).toBeTruthy();
    }
  });

  it("keeps reserved path segments free of tool slugs", () => {
    const reserved = new Set(["guides", "about", "privacy", "s", "404", "api"]);
    for (const tool of allTools) {
      expect(reserved.has(tool.slug), `${tool.slug} collides with a reserved segment`).toBe(false);
    }
  });

  it("keeps public locale paths clean and prefix-based", () => {
    for (const locale of localeCodes) {
      expect(localizedPath(locale)).toBe(`/${locale}`);
      expect(localizedPath(locale, "clean-ai-text")).toBe(`/${locale}/clean-ai-text`);
    }
  });
});
