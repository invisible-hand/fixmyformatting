import { describe, expect, it } from "vitest";
import { applyFontStyle, fontStyles, getFontStyle } from "../src/lib/unicode-fonts";
import { processText } from "../src/lib/processors";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const ALL = UPPER + LOWER + DIGITS;

const convert = (id: string, input: string) => {
  const style = getFontStyle(id);
  if (!style) throw new Error(`Unknown style ${id}`);
  return style.convert(input);
};
const codes = (text: string) => Array.from(text, (char) => char.codePointAt(0)!);
const hex = (text: string) => codes(text).map((code) => code.toString(16).toUpperCase()).join(" ");
const nfkc = (text: string) => text.normalize("NFKC");
const toPlain = (text: string) => processText("remove-fancy-text", text).output;

/**
 * Block offsets and reserved holes as listed in UnicodeData.txt (Unicode 18.0):
 * the first capital, the first small letter, digit zero where the style has
 * digits, and the letters that live in Letterlike Symbols instead.
 */
const mathematical: [id: string, upper: number, lower: number, digit: number | null, holes: Record<string, number>][] = [
  ["bold", 0x1d400, 0x1d41a, 0x1d7ce, {}],
  ["italic", 0x1d434, 0x1d44e, null, { h: 0x210e }],
  ["bold-italic", 0x1d468, 0x1d482, null, {}],
  ["script", 0x1d49c, 0x1d4b6, null, { B: 0x212c, E: 0x2130, F: 0x2131, H: 0x210b, I: 0x2110, L: 0x2112, M: 0x2133, R: 0x211b, e: 0x212f, g: 0x210a, o: 0x2134 }],
  ["bold-script", 0x1d4d0, 0x1d4ea, null, {}],
  ["fraktur", 0x1d504, 0x1d51e, null, { C: 0x212d, H: 0x210c, I: 0x2111, R: 0x211c, Z: 0x2128 }],
  ["bold-fraktur", 0x1d56c, 0x1d586, null, {}],
  ["double-struck", 0x1d538, 0x1d552, 0x1d7d8, { C: 0x2102, H: 0x210d, N: 0x2115, P: 0x2119, Q: 0x211a, R: 0x211d, Z: 0x2124 }],
  ["monospace", 0x1d670, 0x1d68a, 0x1d7f6, {}],
  ["sans", 0x1d5a0, 0x1d5ba, 0x1d7e2, {}],
  ["sans-bold", 0x1d5d4, 0x1d5ee, 0x1d7ec, {}],
  ["sans-italic", 0x1d608, 0x1d622, null, {}],
  ["sans-bold-italic", 0x1d63c, 0x1d656, null, {}],
];

/** Styles that change the letters themselves, as opposed to adding marks or reordering. */
const substituting = fontStyles.filter((style) => !["strikethrough", "underline", "upside-down", "backwards"].includes(style.id));

describe("Unicode text styles", () => {
  it("offers every advertised style once", () => {
    expect(fontStyles.map((style) => style.id)).toEqual([
      "bold", "italic", "bold-italic", "script", "bold-script", "fraktur", "bold-fraktur", "double-struck", "monospace",
      "sans", "sans-bold", "sans-italic", "sans-bold-italic", "small-caps", "superscript", "subscript",
      "circled", "circled-black", "squared", "fullwidth", "strikethrough", "underline", "upside-down", "backwards",
    ]);
    expect(new Set(fontStyles.map((style) => style.name)).size).toBe(fontStyles.length);
    for (const style of fontStyles) {
      expect(style.source.length, `${style.id} source`).toBeGreaterThan(10);
      expect(style.covers.length, `${style.id} covers`).toBeGreaterThan(10);
    }
    expect(applyFontStyle("no-such-style", "abc")).toBe("abc");
  });

  it("puts every mathematical style at its own block offset", () => {
    for (const [id, upper, lower, digit, holes] of mathematical) {
      Array.from(UPPER).forEach((letter, index) => {
        expect(convert(id, letter).codePointAt(0), `${id} ${letter}`).toBe(holes[letter] ?? upper + index);
      });
      Array.from(LOWER).forEach((letter, index) => {
        expect(convert(id, letter).codePointAt(0), `${id} ${letter}`).toBe(holes[letter] ?? lower + index);
      });
      Array.from(DIGITS).forEach((figure, index) => {
        expect(convert(id, figure).codePointAt(0), `${id} ${figure}`).toBe(digit === null ? figure.charCodeAt(0) : digit + index);
      });
    }
  });

  it("fills the reserved holes from Letterlike Symbols", () => {
    expect(hex(convert("script", "BEFHILMR"))).toBe("212C 2130 2131 210B 2110 2112 2133 211B");
    expect(hex(convert("script", "ego"))).toBe("212F 210A 2134");
    expect(hex(convert("fraktur", "CHIRZ"))).toBe("212D 210C 2111 211C 2128");
    expect(hex(convert("double-struck", "CHNPQRZ"))).toBe("2102 210D 2115 2119 211A 211D 2124");
    expect(hex(convert("italic", "h"))).toBe("210E");
    // The slots those letters would have occupied are reserved and never assigned.
    const reserved = [
      0x1d455, 0x1d49d, 0x1d4a0, 0x1d4a1, 0x1d4a3, 0x1d4a4, 0x1d4a7, 0x1d4a8, 0x1d4ad, 0x1d4ba, 0x1d4bc, 0x1d4c4,
      0x1d506, 0x1d50b, 0x1d50c, 0x1d515, 0x1d51d, 0x1d53a, 0x1d53f, 0x1d545, 0x1d547, 0x1d548, 0x1d549, 0x1d551,
    ];
    const holes = mathematical.reduce((total, [, , , , list]) => total + Object.keys(list).length, 0);
    expect(holes).toBe(reserved.length);
    for (const code of reserved) expect(/\p{Cn}/u.test(String.fromCodePoint(code)), code.toString(16)).toBe(true);
    for (const style of fontStyles) {
      const produced = new Set(codes(style.convert(`${ALL} .,!?-+=()[]'"&_`)));
      for (const code of reserved) expect(produced.has(code), `${style.id} emits reserved U+${code.toString(16)}`).toBe(false);
    }
  });

  it("round-trips A–Z, a–z and 0–9 through compatibility normalization", () => {
    // NFKC is the engine's own Unicode data, so this checks each letter independently of the tables above.
    for (const id of [...mathematical.map(([style]) => style), "circled", "fullwidth"]) {
      expect(nfkc(convert(id, ALL)), id).toBe(ALL);
      for (const char of ALL) expect(nfkc(convert(id, char)), `${id} ${char}`).toBe(char);
    }
    // Squared letters exist as capitals only.
    expect(nfkc(convert("squared", UPPER))).toBe(UPPER);
    expect(nfkc(convert("squared", LOWER))).toBe(UPPER);
    expect(convert("squared", DIGITS)).toBe(DIGITS);
    expect(codes(convert("squared", "AZ"))).toEqual([0x1f130, 0x1f149]);
    // Black circled letters have no compatibility mapping, so invert them by offset.
    const blackCircled = (text: string) => codes(convert("circled-black", text));
    expect(blackCircled(UPPER).map((code) => String.fromCharCode(code - 0x1f150 + 0x41)).join("")).toBe(UPPER);
    expect(blackCircled(LOWER)).toEqual(blackCircled(UPPER));
    expect(blackCircled(DIGITS)).toEqual([0x24ff, 0x2776, 0x2777, 0x2778, 0x2779, 0x277a, 0x277b, 0x277c, 0x277d, 0x277e]);
    expect(codes(convert("circled", "AZaz019"))).toEqual([0x24b6, 0x24cf, 0x24d0, 0x24e9, 0x24ea, 0x2460, 0x2468]);
    expect(codes(convert("fullwidth", "Az09!~ "))).toEqual([0xff21, 0xff5a, 0xff10, 0xff19, 0xff01, 0xff5e, 0x20]);
  });

  it("converts small caps with the real small capitals and leaves x, capitals and digits alone", () => {
    expect(hex(convert("small-caps", LOWER))).toBe(
      "1D00 299 1D04 1D05 1D07 A730 262 29C 26A 1D0A 1D0B 29F 1D0D 274 1D0F 1D18 A7AF 280 A731 1D1B 1D1C 1D20 1D21 78 28F 1D22",
    );
    expect(convert("small-caps", UPPER + DIGITS)).toBe(UPPER + DIGITS);
    expect(toPlain(convert("small-caps", ALL))).toBe(ALL);
  });

  it("converts superscripts and subscripts where Unicode has them", () => {
    expect(convert("superscript", DIGITS)).toBe("⁰¹²³⁴⁵⁶⁷⁸⁹");
    expect(hex(convert("superscript", DIGITS))).toBe("2070 B9 B2 B3 2074 2075 2076 2077 2078 2079");
    expect(hex(convert("superscript", "+-−=()"))).toBe("207A 207B 207B 207C 207D 207E");
    expect(nfkc(convert("superscript", LOWER + DIGITS))).toBe(LOWER + DIGITS);
    // No widely supported superscript q or Q; C F S X Y Z borrow the small superscript letter.
    expect(convert("superscript", "qQ")).toBe("qQ");
    expect(nfkc(convert("superscript", UPPER))).toBe("ABcDEfGHIJKLMNOPQRsTUVWxyz");
    expect(hex(convert("superscript", "ainV"))).toBe("1D43 2071 207F 2C7D");

    expect(convert("subscript", DIGITS)).toBe("₀₁₂₃₄₅₆₇₈₉");
    expect(hex(convert("subscript", DIGITS))).toBe("2080 2081 2082 2083 2084 2085 2086 2087 2088 2089");
    expect(hex(convert("subscript", "+-−=()"))).toBe("208A 208B 208B 208C 208D 208E");
    expect(nfkc(convert("subscript", LOWER + DIGITS))).toBe(LOWER + DIGITS);
    expect(convert("subscript", "bcdfgqwyz")).toBe("bcdfgqwyz");
    expect(hex(convert("subscript", "aehijklmnoprstuvx"))).toBe("2090 2091 2095 1D62 2C7C 2096 2097 2098 2099 2092 209A 1D63 209B 209C 1D64 1D65 2093");
    // Capitals have no subscripts: they borrow the small one where it exists and otherwise stay.
    expect(nfkc(convert("subscript", UPPER))).toBe("aBCDeFGhijklmnopQrstuvWxYZ");
  });

  it("adds one combining mark per character for strikethrough and underline", () => {
    expect(convert("strikethrough", "ab 1")).toBe("a̶b̶ ̶1̶");
    expect(convert("underline", "ab 1")).toBe("a̲b̲ ̲1̲");
    for (const [id, mark] of [["strikethrough", "̶"], ["underline", "̲"]] as const) {
      expect(convert(id, ALL).replaceAll(mark, ""), id).toBe(ALL);
      expect(codes(convert(id, ALL)).length, id).toBe(ALL.length * 2);
      // Line breaks carry no mark, and an emoji sequence gets one mark, not one per code point.
      expect(convert(id, "a\nb\r\nc")).toBe(`a${mark}\nb${mark}\r\nc${mark}`);
      expect(convert(id, "👩‍👩‍👧")).toBe(`👩‍👩‍👧${mark}`);
    }
  });

  it("flips text upside down and reverses its order", () => {
    expect(convert("upside-down", "hello world")).toBe("plɹoʍ ollǝɥ");
    expect(convert("upside-down", "abc")).toBe("ɔqɐ");
    expect(hex(convert("upside-down", "zyxwvutsrqponmlkjihgfedcba"))).toBe(
      "250 71 254 70 1DD 25F 183 265 1D09 27E 29E 6C 26F 75 6F 64 62 279 73 287 6E 28C 28D 78 28E 7A",
    );
    expect(hex(convert("upside-down", "ZYXWVUTSRQPONMLKJIHGFEDCBA"))).toBe(
      "2200 15FA 186 15E1 18E 2132 2141 48 49 17F 29E 2142 57 4E 4F 500 38C 1D1A 53 22A5 2229 245 4D 58 2144 5A",
    );
    expect(hex(convert("upside-down", "9876543210"))).toBe("30 196 1105 190 3123 3DB 39 3125 38 36");
    // Brackets swap sides so they still enclose the same words after the reversal.
    expect(convert("upside-down", "(no) [on]")).toBe("[uo] (ou)");
    expect(convert("upside-down", "Wow, really?")).toBe("¿ʎllɐǝɹ 'ʍoM");
    // Small letters and digits map one-to-one, so the flip can be undone exactly.
    const forward = new Map(Array.from(LOWER + DIGITS, (char) => [convert("upside-down", char), char]));
    expect(forward.size).toBe(36);
    const unflip = (text: string) => Array.from(text).reverse().map((char) => forward.get(char) ?? char).join("");
    expect(unflip(convert("upside-down", LOWER + DIGITS))).toBe(LOWER + DIGITS);
    // Letters that are their own flip, or trade places in pairs, survive two flips.
    expect(convert("upside-down", convert("upside-down", "pond bud sox 6890 NOSHIX MW"))).toBe("pond bud sox 6890 NOSHIX MW");
    expect(convert("backwards", "hello world")).toBe("dlrow olleh");
    expect(convert("backwards", convert("backwards", ALL))).toBe(ALL);
    // Reversal keeps emoji sequences, accents and Windows line breaks in one piece.
    expect(convert("backwards", "ab👩‍👩‍👧é\r\nz")).toBe("z\r\né👩‍👩‍👧ba");
    expect(convert("upside-down", "ab👩‍👩‍👧")).toBe("👩‍👩‍👧qɐ");
  });

  it("passes characters with no styled form through unchanged", () => {
    const untouched = "é ñ ß Ω Ж 日本語 한글 مرحبا 😀 👩‍👩‍👧 — … \t\n";
    for (const style of substituting) {
      expect(style.convert(untouched), style.id).toBe(untouched);
      expect(style.convert(""), style.id).toBe("");
    }
    for (const id of ["italic", "bold-italic", "script", "bold-script", "fraktur", "bold-fraktur", "sans-italic", "sans-bold-italic", "small-caps", "squared"]) {
      expect(convert(id, DIGITS), id).toBe(DIGITS);
    }
    const punctuation = ".,;:!?'\"-()[]{}@#%&*/";
    for (const style of substituting) {
      if (["fullwidth", "superscript", "subscript"].includes(style.id)) continue;
      expect(style.convert(punctuation), style.id).toBe(punctuation);
    }
    expect(convert("superscript", ".,;:!?")).toBe(".,;:!?");
    expect(convert("upside-down", "é日😀")).toBe("😀日é");
    // Astral input is never split into surrogates.
    for (const style of fontStyles) expect(style.convert("𝐀😀").isWellFormed(), style.id).toBe(true);
  });

  it("only emits assigned characters", () => {
    for (const style of fontStyles) {
      expect(/\p{Cn}/u.test(style.convert(`${ALL} .,;:!?'"-+=()[]{}<>&_@#%*/`)), style.id).toBe(false);
    }
  });

  it("is undone by Fancy Text to Plain Text for the styles the tool page names", () => {
    const sample = "Fonts copy and paste 123";
    const reversible = [
      "bold", "italic", "bold-italic", "script", "bold-script", "fraktur", "bold-fraktur", "double-struck", "monospace",
      "sans", "sans-bold", "sans-italic", "sans-bold-italic", "small-caps", "superscript", "subscript",
      "circled", "squared", "fullwidth", "strikethrough", "underline",
    ];
    for (const id of reversible) expect(toPlain(convert(id, sample)).toLowerCase(), id).toBe(sample.toLowerCase());
    // The two the FAQ says are not converted back.
    expect(toPlain(convert("circled-black", sample))).not.toBe(sample.toUpperCase());
    expect(toPlain(convert("upside-down", "hello"))).not.toBe("hello");
  });
});
