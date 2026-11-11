import { beforeAll, describe, expect, it, vi } from "vitest";
import { lazy } from "react";
import type { ComponentType, ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { prerender } from "react-dom/static";
import { GuidePage } from "../src/components/guide-page";
import { ToolPage } from "../src/components/tool-page";
import { fontGuide } from "../src/content/i18n/en/fonts";
import { getGuide } from "../src/lib/guides";
import { isLocalizedToolSlug, languageAlternates, localizeGuide } from "../src/lib/i18n";
import { getTool } from "../src/lib/tools";
import { applyFontStyle, fontSample, fontStyles, fontTableSample } from "../src/lib/unicode-fonts";
import sitemap from "../src/app/sitemap";
import { GET as llms } from "../src/app/llms.txt/route";
import { GET as llmsFull } from "../src/app/llms-full.txt/route";

// Outside the Next bundler, next/dynamic resolves to its Pages Router build, which renders
// nothing on the server. The App Router build is a plain React.lazy, so stand that in.
vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<ComponentType>) => lazy(() => loader().then((component) => ({ default: component }))),
}));

const tool = getTool("fonts-copy-and-paste")!;
const schemasOf = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
const text = (html: string) => html.replace(/<[^>]+>/g, "");

/** Waits for lazily loaded components, the way the production prerender does. */
async function renderComplete(element: ReactElement) {
  const { prelude } = await prerender(element);
  return new Response(prelude).text();
}

describe("fonts copy and paste page", () => {
  let html = "";
  beforeAll(async () => {
    html = await renderComplete(<ToolPage tool={tool} />);
  });

  it("answers the head question in the headline and the first paragraphs", () => {
    expect(html).toContain("<h1>Fonts Copy and Paste</h1>");
    expect(html.match(/<h1[ >]/g)).toHaveLength(1);
    expect(tool.description.toLowerCase()).toMatch(/^fonts copy and paste/);
    expect(html).toContain(`<p class="tool-answer">${tool.answer}</p>`);
    expect(html.indexOf("tool-answer")).toBeLessThan(html.indexOf("font-workspace"));
    expect(tool.answer).toMatch(/Unicode characters/);
    expect(tool.answer).toMatch(/not font files/);
  });

  it("prints every style into the HTML with a copy button, before any script runs", () => {
    expect(html.match(/class="font-row"/g)).toHaveLength(fontStyles.length);
    expect(html.match(/class="font-copy"/g)).toHaveLength(fontStyles.length);
    for (const style of fontStyles) {
      expect(html, style.id).toContain(`id="style-${style.id}"`);
      expect(text(html), style.id).toContain(style.convert(fontSample));
      expect(text(html), style.id).toContain(style.convert(fontTableSample));
    }
    // The count in the copy is the count in the code.
    expect(tool.intro).toContain(`${fontStyles.length} styles`);
    // This tool has its own workspace: no share, download or embed controls.
    expect(html).not.toContain("editor-grid");
  });

  it("has the question sections, with examples that match the converter", () => {
    for (const id of ["styles", "not-fonts", "upside-down-text", "superscript", "small-caps"]) {
      expect(html.match(new RegExp(`<section[^>]* id="${id}"`, "g")), id).toHaveLength(1);
    }
    expect(fontGuide.sections.map((section) => section.heading)).toEqual([
      "Are copy and paste fonts really fonts?",
      "How do you make upside-down text?",
      "How do you copy and paste superscript text?",
      "How do you get small caps you can copy and paste?",
    ]);
    const body = (id: string) => fontGuide.sections.find((section) => section.id === id)!.body;
    expect(body("upside-down-text")).toContain(`*hello world* becomes *${applyFontStyle("upside-down", "hello world")}*`);
    expect(body("upside-down-text")).toContain(`*hello world* becomes *${applyFontStyle("backwards", "hello world")}*`);
    expect(body("small-caps")).toContain(`*small caps* becomes *${applyFontStyle("small-caps", "small caps")}*`);
    expect(body("superscript")).toContain(Array.from(applyFontStyle("superscript", "0123456789")).join(" "));
    expect(body("superscript")).toContain(Array.from(applyFontStyle("subscript", "0123456789")).join(" "));
    expect(body("superscript")).toContain(`x${applyFontStyle("superscript", "2")}`);
    expect(body("superscript")).toContain(`H${applyFontStyle("subscript", "2")}O`);
    // Every anchor on the page is unique.
    const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((match) => match[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("says plainly what the characters are and where not to use them", () => {
    const page = text(html);
    expect(page).toMatch(/different Unicode character/);
    expect(page).toMatch(/Screen readers may read a styled word letter by letter or skip it/);
    expect(page).toMatch(/Search in some apps and some search engines does not match/);
    expect(page).toMatch(/Where they work: social media bios, posts and comments, chat messages/);
    expect(page).toMatch(/Where to avoid them: your name or job title on a résumé or in any document, image alt text/);
    expect(html).toContain('href="/remove-fancy-text"');
    expect(html).toContain('href="https://www.unicode.org/charts/PDF/U1D400.pdf"');
  });

  it("emits the tool family's structured data and how-to steps", () => {
    const schemas = schemasOf(html);
    expect(schemas.map((schema) => schema["@type"])).toEqual(["WebApplication", "FAQPage", "BreadcrumbList"]);
    expect(schemas[0].url).toBe("https://fixmyformatting.com/fonts-copy-and-paste");
    expect(schemas[0].dateModified).toBe(tool.updated);
    expect(schemas[1].mainEntity).toHaveLength(tool.faqs.length);
    expect(tool.faqs.length).toBeGreaterThanOrEqual(5);
    for (const step of tool.steps!) expect(text(html)).toContain(step);
    expect(html).not.toContain("Copy, download, share, or embed the finished result.");
  });

  it("is linked from the sibling tool and listed in the sitemap and llms files", async () => {
    expect(html.indexOf('href="/remove-fancy-text"')).toBeGreaterThan(-1);
    const sibling = renderToStaticMarkup(<ToolPage tool={getTool("remove-fancy-text")!} />);
    expect(sibling).toContain('href="/fonts-copy-and-paste"');
    // English only for now: no locale serves it, so no hreflang points at a 404.
    expect(isLocalizedToolSlug(tool.slug)).toBe(false);
    expect(Object.keys(languageAlternates(tool.slug)).sort()).toEqual(["en", "x-default"]);
    const entry = sitemap().filter((item) => item.url === "https://fixmyformatting.com/fonts-copy-and-paste");
    expect(entry).toHaveLength(1);
    expect(entry[0].alternates).toBeUndefined();
    expect(await llms().text()).toContain("- [Fonts Copy and Paste](https://fixmyformatting.com/fonts-copy-and-paste): Fonts copy and paste:");
    expect(await llmsFull().text()).toContain("URL: https://fixmyformatting.com/fonts-copy-and-paste");
  });

  it("keeps the generic how-to steps and related tools on every other tool", () => {
    const other = renderToStaticMarkup(<ToolPage tool={getTool("case-converter")!} />);
    expect(other).toContain("Copy, download, share, or embed the finished result.");
    expect(other).toContain("editor-grid");
    expect(other).not.toContain("font-workspace");
  });
});

describe("em dash guide quick-copy block", () => {
  const guide = getGuide("em-dash-copy-paste")!;
  const html = renderToStaticMarkup(<GuidePage guide={guide} />);
  const block = html.slice(html.indexOf('class="quick-copy"'), html.indexOf('class="guide-answer"'));

  it("comes first on the page, ahead of the existing answer and body", () => {
    expect(html.indexOf('class="quick-copy"')).toBeGreaterThan(html.indexOf("</h1>"));
    expect(html.indexOf('class="quick-copy"')).toBeLessThan(html.indexOf('class="guide-answer"'));
    expect(html.indexOf('class="guide-answer"')).toBeLessThan(html.indexOf('class="guide-toc"'));
    // The block replaces the two older copy buttons instead of stacking on top of them.
    expect(html).not.toContain('class="char-copy"');
    expect(html).toContain(guide.answer.slice(0, 60));
    for (const section of guide.sections) expect(html).toContain(`<section id="${section.id}">`);
  });

  it("answers in the plain wording, then gives the character with a copy button", () => {
    expect(text(block)).toMatch(/^[^]*?Em dash copy paste: the em dash is — \(U\+2014\)\./);
    expect(block).toContain('<span class="quick-copy-glyph">—</span>');
    expect(block).toMatch(/<button type="button" class="primary-action quick-copy-button">Copy em dash<\/button>/);
  });

  it("lists en dash, hyphen-minus and minus as a copyable row with code points and uses", () => {
    const rows = [...block.matchAll(/<button type="button" class="quick-copy-item">(.*?)<\/button>/g)].map((match) => text(match[1]));
    expect(rows).toHaveLength(3);
    expect(rows[0]).toMatch(/^–En dashU\+2013CopyRanges of numbers and dates: 2020–2024$/);
    expect(rows[1]).toMatch(/^-Hyphen-minusU\+002DCopy/);
    expect(rows[2]).toMatch(/^−Minus signU\+2212CopySubtraction and negative numbers: 5 − 3$/);
    expect(guide.quickCopy!.others.map((item) => item.char.codePointAt(0))).toEqual([0x2013, 0x2d, 0x2212]);
    expect(guide.quickCopy!.lead.char.codePointAt(0)).toBe(0x2014);
  });

  it("gives the keyboard shortcuts for Mac, Windows and Word in one sentence", () => {
    const note = text(block.slice(block.indexOf("quick-copy-note")));
    expect(note).toMatch(/on a Mac press Option \+ Shift \+ -;/);
    expect(note).toMatch(/on Windows hold Alt and type 0151 on the numeric keypad, or press Win \+ \. and pick it under Symbols;/);
    expect(note).toMatch(/in Word press Ctrl \+ Alt \+ - on the numeric keypad\./);
    expect(guide.quickCopy!.note.match(/\.(\s|$)/g)).toHaveLength(1);
  });

  it("keeps the Chinese edition on its own copy buttons", () => {
    const zh = renderToStaticMarkup(<GuidePage guide={localizeGuide(guide, "zh")} locale="zh" />);
    expect(zh).toContain('class="char-copy"');
    expect(zh).not.toContain('class="quick-copy"');
    expect(zh).not.toContain("Em dash copy paste");
  });
});
