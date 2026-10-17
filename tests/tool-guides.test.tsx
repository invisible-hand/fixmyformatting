import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { GuidePage } from "../src/components/guide-page";
import { ToolPage } from "../src/components/tool-page";
import { allGuides } from "../src/lib/guides";
import { coreTools, getTool } from "../src/lib/tools";
import {
  TOOL_GUIDES,
  countWords,
  getToolGuide,
  toolGuidePath,
  toolGuidesFor,
  validateToolGuides,
} from "../src/lib/tool-guides";
import type { ToolGuide } from "../src/lib/tool-guides";
import { languageAlternates, localeCodes, toolGuideSlugsForLocale } from "../src/lib/i18n";
import sitemap from "../src/app/sitemap";
import { GET as llms } from "../src/app/llms.txt/route";

const sample = getToolGuide("remove-line-breaks", "what-are-line-breaks")!;
const today = "2026-10-17";
const problemsFor = (patch: Partial<ToolGuide>) => validateToolGuides([{ ...sample, ...patch }], today);

describe("tool sub-guide registry", () => {
  it("passes the writer contract for every registered guide", () => {
    expect(validateToolGuides()).toEqual([]);
    expect(TOOL_GUIDES.length).toBeGreaterThan(0);
  });

  it("indexes guides by parent tool", () => {
    expect(sample).toBeDefined();
    expect(toolGuidesFor("remove-line-breaks")).toContain(sample);
    expect(toolGuidesFor("markdown-to-word")).not.toContain(sample);
    expect(toolGuidePath(sample)).toBe("/remove-line-breaks/what-are-line-breaks");
  });

  it("keeps the sample within the contract's numbers", () => {
    expect(countWords(sample.answer)).toBeLessThanOrEqual(60);
    expect(sample.sections.reduce((total, section) => total + countWords(section.body), 0)).toBeGreaterThanOrEqual(900);
    expect(sample.faqs.length).toBeGreaterThanOrEqual(4);
    const headlines = [...allGuides.flatMap((guide) => [guide.h1, guide.title]), ...coreTools.map((tool) => tool.title)];
    expect(headlines.map((text) => text.toLowerCase())).not.toContain(sample.h1.toLowerCase());
  });
});

describe("tool sub-guide validator", () => {
  const cases: [string, Partial<ToolGuide>, RegExp][] = [
    ["brand-variant parent", { parentTool: "chatgpt-to-word" }, /not a core tool/],
    ["unknown parent", { parentTool: "nope" }, /not a core tool/],
    ["bad slug", { slug: "What_Are" }, /slug must match/],
    ["long title", { title: "x".repeat(61) }, /title is 61 chars/],
    ["long description", { description: "x".repeat(156) }, /description is 156 chars/],
    ["long answer", { answer: "word ".repeat(61) }, /answer is 61 words/],
    ["link in answer", { answer: "See [the tool](/remove-line-breaks) for details." }, /must not contain a link/],
    ["evasive answer", { answer: "In this guide we look at line breaks." }, /open by answering/],
    ["thin sections", { sections: sample.sections.slice(0, 1) }, /sections total \d+ words/],
    ["too few FAQs", { faqs: sample.faqs.slice(0, 3) }, /has 3 FAQs/],
    ["FAQ repeats H1", { faqs: [...sample.faqs, { question: "What are line breaks?", answer: "Yes." }] }, /FAQ repeats the H1/],
    ["parent missing from relatedTools", { relatedTools: ["show-invisible-characters"] }, /must include the parent tool/],
    ["future update", { updated: "2026-10-18" }, /in the future/],
    ["bad date", { updated: "2026-13-01" }, /real YYYY-MM-DD/],
    ["H1 equals a guide title", { h1: allGuides[0].h1 }, /h1 equals an existing guide or tool title/],
    ["H1 equals a tool title", { h1: getTool("remove-line-breaks")!.title }, /h1 equals an existing guide or tool title/],
    ["no link to the parent tool", { sections: sample.sections.map((section) => ({ ...section, body: section.body.replaceAll("(/remove-line-breaks)", "(/word-counter)") })) }, /must link to \/remove-line-breaks/],
  ];

  for (const [name, patch, message] of cases) {
    it(`rejects ${name}`, () => {
      expect(problemsFor(patch).join("\n")).toMatch(message);
    });
  }

  it("rejects duplicate slugs under the same tool", () => {
    expect(validateToolGuides([sample, sample], today).join("\n")).toMatch(/duplicate parentTool\/slug/);
  });
});

describe("tool sub-guide publishing", () => {
  it("renders the sample with breadcrumb, CTAs and structured data", () => {
    const html = renderToStaticMarkup(<GuidePage guide={sample} />);
    expect(html).toContain("<h1>What are line breaks?</h1>");
    expect(html).toContain('href="/remove-line-breaks"');
    expect(html.match(/class="tool-guide-cta"/g)).toHaveLength(2);
    expect(html).toContain("Do it now →");
    // The direct answer comes before the first CTA link.
    expect(html.indexOf("guide-answer")).toBeLessThan(html.indexOf("tool-guide-cta"));
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const types = schemas.map((schema) => schema["@type"]);
    expect(types).toEqual(expect.arrayContaining(["Article", "FAQPage", "BreadcrumbList"]));
    const article = schemas.find((schema) => schema["@type"] === "Article");
    expect(article.dateModified).toBe(sample.updated);
    expect(article.mainEntityOfPage["@id"]).toBe("https://fixmyformatting.com/remove-line-breaks/what-are-line-breaks");
    const crumbs = schemas.find((schema) => schema["@type"] === "BreadcrumbList").itemListElement;
    // Home keeps the trailing slash, as on /guides/<slug> breadcrumbs.
    expect(crumbs.map((item: { item: string }) => item.item)).toEqual([
      "https://fixmyformatting.com/",
      "https://fixmyformatting.com/remove-line-breaks",
      "https://fixmyformatting.com/remove-line-breaks/what-are-line-breaks",
    ]);
    const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(sample.faqs.length);
  });

  it("lists the question on the parent tool page only", () => {
    const html = renderToStaticMarkup(<ToolPage tool={getTool("remove-line-breaks")!} />);
    expect(html).toContain("Questions about Fix Copy-Paste Line Breaks");
    expect(html).toContain('href="/remove-line-breaks/what-are-line-breaks"');
    const other = renderToStaticMarkup(<ToolPage tool={getTool("json-formatter")!} />);
    expect(other).not.toContain("Questions about");
  });

  it("publishes the guide in the sitemap and llms.txt", async () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://fixmyformatting.com/remove-line-breaks/what-are-line-breaks");
    expect(new Set(urls).size).toBe(urls.length);
    const text = await llms().text();
    expect(text).toMatch(/\n- \[Fix Copy-Paste Line Breaks\][^\n]*\n {2}- \[What are line breaks\?\]\(https:\/\/fixmyformatting\.com\/remove-line-breaks\/what-are-line-breaks\)/);
  });

  it("serves no localized tool guide until a translation exists", () => {
    for (const locale of localeCodes) expect(toolGuideSlugsForLocale(locale)).toEqual([]);
    expect(Object.keys(languageAlternates("remove-line-breaks/what-are-line-breaks")).sort()).toEqual(["en", "x-default"]);
  });
});
