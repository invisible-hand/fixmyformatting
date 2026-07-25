/**
 * Generates subsetted TrueType fonts for the OG image routes.
 *
 * next/og (satori) cannot read WOFF2, and the OG routes previously used Arial
 * with no embedded font, so Japanese, Korean, Chinese, Hindi and Arabic social
 * cards rendered as tofu boxes.
 *
 * Google Fonts subsets to an exact character set via the `text=` parameter, and
 * serves TrueType rather than WOFF2 when the User-Agent is not recognised as
 * woff2-capable. The reachable text is small (260 glyphs at most, for Japanese)
 * because every renderable string is plain data in the bundles.
 *
 * Output is committed so builds stay hermetic; tests/og-fonts.test.ts fails if
 * new copy introduces a glyph the subsets do not cover.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { bundles } from "../src/lib/i18n/bundles";
import { localeCodes } from "../src/lib/i18n/locales";
import { toolSlugsForLocale } from "../src/lib/i18n/coverage";
import { localizeTool } from "../src/lib/i18n/resolve";
import { allGuides } from "../src/lib/guides";
import { coreTools } from "../src/lib/tools";

const OUT = new URL("../src/app/api/_og-fonts/", import.meta.url).pathname;

/** Chrome that appears on every card regardless of locale. */
const FIXED = "Fix My Formatting fixmyformatting.com F GUIDE Instant · Private · No signup FREE ONLINE TOOL Shared result 0123456789—-–…";

// Arabic is absent deliberately — see ogLocale() in src/lib/og-fonts.ts.
const SCRIPT_FONT: Record<string, string> = {
  ja: "Noto Sans JP",
  ko: "Noto Sans KR",
  zh: "Noto Sans SC",
  hi: "Noto Sans Devanagari",
};

function textForLocale(locale: string) {
  const parts: string[] = [FIXED];
  if (locale === "en") {
    for (const tool of coreTools) parts.push(tool.name, tool.description);
    for (const guide of allGuides) parts.push(guide.h1, guide.dek);
    parts.push("26 FREE BROWSER TOOLS", "Fix text copied from AI.");
  } else {
    const b = bundles[locale as keyof typeof bundles];
    parts.push(b.ui.homeTitle, b.ui.homeDescription, b.ui.homeEyebrow, b.ui.homeMetaTitle);
    parts.push(b.ui.free, b.ui.noSignup, b.ui.private, b.ui.share);
    for (const slug of toolSlugsForLocale(locale as keyof typeof bundles)) {
      const tool = localizeTool(slug, locale as keyof typeof bundles);
      parts.push(tool.name, tool.description);
    }
  }
  return [...new Set(parts.join(""))].sort().join("");
}

/**
 * Google serves TrueType when the UA is not known to support woff2. Sending a
 * bare tool UA is what gets us a satori-compatible file.
 */
async function fetchSubset(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, { headers: { "User-Agent": "og-font-builder" } }).then((r) => {
    if (!r.ok) throw new Error(`css ${r.status} for ${family} ${weight}`);
    return r.text();
  });
  const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error(`no font url in css for ${family}`);
  const bytes = await fetch(fontUrl, { headers: { "User-Agent": "og-font-builder" } }).then((r) => r.arrayBuffer());
  const buffer = Buffer.from(bytes as ArrayBuffer);
  const magic = buffer.subarray(0, 4).toString("hex");
  if (magic !== "00010000" && buffer.subarray(0, 4).toString() !== "OTTO") {
    throw new Error(`${family} ${weight}: expected TrueType, got magic ${magic}`);
  }
  return buffer;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const manifest: Record<string, { latin: string; script?: string; chars: string }> = {};

  for (const locale of ["en", ...localeCodes]) {
    const text = textForLocale(locale);
    const latinText = [...text].filter((c) => c.charCodeAt(0) < 0x0250 || "—–…·".includes(c)).join("");
    const scriptText = [...text].filter((c) => c.charCodeAt(0) >= 0x0250 && !"—–…·".includes(c)).join("");

    for (const weight of [400, 700]) {
      const latin = await fetchSubset("Noto Sans", weight, latinText || "A");
      writeFileSync(`${OUT}${locale}-latin-${weight}.ttf`, latin);
      const family = SCRIPT_FONT[locale];
      if (family && scriptText) {
        const script = await fetchSubset(family, weight, scriptText);
        writeFileSync(`${OUT}${locale}-script-${weight}.ttf`, script);
      }
    }
    manifest[locale] = {
      latin: `${locale}-latin`,
      ...(SCRIPT_FONT[locale] && scriptText ? { script: `${locale}-script` } : {}),
      chars: text,
    };
    const size = SCRIPT_FONT[locale] ? "latin+script" : "latin";
    console.log(`  ${locale}: ${text.length} glyphs (${size})`);
  }

  writeFileSync(`${OUT}manifest.json`, JSON.stringify(manifest, null, 1));
  console.log(`\nwrote ${OUT}`);
}

main();
