import { describe, expect, it } from "vitest";
import { bundles, localeCodes } from "@/lib/i18n";
import { reference as english } from "@/content/i18n/en/reference";
import { invisibleExpression, invisibleMarkers } from "@/lib/processors";
import { dashRows, invisibleRows, markedCount, quoteRows, referenceGuide, referenceSlugs, removedCount } from "@/lib/tool-reference";
import { isGuideLocalized, isToolLocalized } from "@/lib/i18n";
import { getGuide } from "@/lib/guides";

describe("static reference tables", () => {
  it("lists every assigned code point the scanner removes and every character the viewer labels", () => {
    const expression = new RegExp(invisibleExpression.source);
    const ids = new Set(invisibleRows.map((row) => row.codePoint));
    for (let cp = 0; cp <= 0xffff; cp += 1) {
      const char = String.fromCharCode(cp);
      if (invisibleMarkers[char]) expect(ids.has(cp), `U+${cp.toString(16)} labelled by the viewer`).toBe(true);
      // U+2065 is the one unassigned code point inside the removal ranges.
      if (expression.test(char) && cp !== 0x2065) expect(ids.has(cp), `U+${cp.toString(16)} removed by the scanner`).toBe(true);
    }
    expect(removedCount).toBe(27);
    expect(markedCount).toBe(Object.keys(invisibleMarkers).length);
    expect(new Set(invisibleRows.map((row) => row.id)).size).toBe(invisibleRows.length);
    expect(invisibleRows.find((row) => row.id === "u200b")?.name).toBe("ZERO WIDTH SPACE");
  });

  it("maps quotes and dashes with unique anchors", () => {
    expect(quoteRows.map((row) => row.id)).toEqual(["u201c", "u201d", "u2018", "u2019"]);
    expect(dashRows.filter((row) => row.replaced).map((row) => row.id)).toEqual(["u2014"]);
  });

  it("links an existing guide for every page", () => {
    for (const slug of referenceSlugs) expect(getGuide(referenceGuide[slug])).toBeTruthy();
  });

  it("translates every page in every locale that serves these tools, with no copy left in English", () => {
    for (const locale of localeCodes) {
      const copy = bundles[locale].reference;
      for (const slug of referenceSlugs) {
        if (!isToolLocalized(slug, locale)) continue;
        expect(copy, `${locale} reference copy`).toBeTruthy();
        expect(copy!.pages[slug].heading).not.toBe(english.pages[slug].heading);
        expect(copy!.pages[slug].answer).not.toBe(english.pages[slug].answer);
        expect(isGuideLocalized(referenceGuide[slug], locale), `${locale} guide for ${slug}`).toBe(true);
      }
      if (copy) {
        expect(Object.keys(copy.invisibleTypes).sort()).toEqual(Object.keys(english.invisibleTypes).sort());
        expect(copy.pages["remove-invisible-characters"].answer).toContain("{count}");
        expect(copy.pages["show-invisible-characters"].answer).toContain("{count}");
      }
    }
  });
});
