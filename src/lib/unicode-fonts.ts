/**
 * Unicode text styles, the things people call "fonts you can copy and paste".
 * None of them is a font: each style swaps a plain letter or digit for a
 * different Unicode character that looks styled, so the look travels with the
 * text when it is pasted.
 *
 * Every code point below was checked against UnicodeData.txt of the Unicode
 * Character Database (version 18.0). Three rules hold for all styles:
 *
 * - A character with no styled form passes through unchanged: digits in the
 *   styles that have none, punctuation, accented and non-Latin letters.
 * - The Mathematical Alphanumeric Symbols block has reserved gaps where a
 *   letter was already encoded in Letterlike Symbols (script B is U+212C, not
 *   U+1D49D). Those are listed per style as `holes`.
 * - Characters added in Unicode 14 (2021) or later are not used, because
 *   many system fonts still lack them (superscript q, the superscript
 *   capitals C F Q S, subscript w y z).
 *
 * Pure and dependency-free on purpose: the client workspace imports this
 * module, so it must never pull in the copy corpus.
 */

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

type Mapper = (char: string) => string;

/** Applies a per-character mapper to every code point, so astral input is never split. */
const each = (map: Mapper) => (input: string) => Array.from(input, map).join("");

type Offsets = {
  /** Code point of the styled capital A; B to Z follow in order. */
  upper?: number;
  /** Code point of the styled small a. */
  lower?: number;
  /** Code point of the styled digit zero. */
  digit?: number;
  /** Letters whose slot in the block is reserved; the value is where the letter really lives. */
  holes?: Record<string, number>;
};

function ranged({ upper, lower, digit, holes }: Offsets): Mapper {
  return (char) => {
    const hole = holes?.[char];
    if (hole) return String.fromCodePoint(hole);
    const code = char.codePointAt(0)!;
    if (upper && code >= 0x41 && code <= 0x5a) return String.fromCodePoint(upper + code - 0x41);
    if (lower && code >= 0x61 && code <= 0x7a) return String.fromCodePoint(lower + code - 0x61);
    if (digit && code >= 0x30 && code <= 0x39) return String.fromCodePoint(digit + code - 0x30);
    return char;
  };
}

/** Pairs each character of `from` with the code point at the same position. */
function pairs(from: string, to: number[]): [string, string][] {
  return Array.from(from, (char, index) => [char, String.fromCodePoint(to[index])]);
}

function lookup(...groups: [string, string][][]): Mapper {
  const map = new Map<string, string>();
  for (const group of groups) for (const [from, to] of group) map.set(from, to);
  return (char) => map.get(char) ?? char;
}

// ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘꞯʀꜱᴛᴜᴠᴡxʏᴢ: LATIN LETTER SMALL CAPITAL A to Z. Unicode has no small capital X.
const SMALL_CAPS = [
  0x1d00, 0x0299, 0x1d04, 0x1d05, 0x1d07, 0xa730, 0x0262, 0x029c, 0x026a, 0x1d0a, 0x1d0b, 0x029f, 0x1d0d,
  0x0274, 0x1d0f, 0x1d18, 0xa7af, 0x0280, 0xa731, 0x1d1b, 0x1d1c, 0x1d20, 0x1d21, 0x0078, 0x028f, 0x1d22,
];

// ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ: MODIFIER LETTER SMALL A to Z, with SUPERSCRIPT LATIN SMALL LETTER I and N. No q.
const SUPER_LOWER = [
  0x1d43, 0x1d47, 0x1d9c, 0x1d48, 0x1d49, 0x1da0, 0x1d4d, 0x02b0, 0x2071, 0x02b2, 0x1d4f, 0x02e1, 0x1d50,
  0x207f, 0x1d52, 0x1d56, 0x0071, 0x02b3, 0x02e2, 0x1d57, 0x1d58, 0x1d5b, 0x02b7, 0x02e3, 0x02b8, 0x1dbb,
];

// ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ: MODIFIER LETTER CAPITAL A to W. C F S X Y Z borrow the small form; Q has none.
const SUPER_UPPER = [
  0x1d2c, 0x1d2e, 0x1d9c, 0x1d30, 0x1d31, 0x1da0, 0x1d33, 0x1d34, 0x1d35, 0x1d36, 0x1d37, 0x1d38, 0x1d39,
  0x1d3a, 0x1d3c, 0x1d3e, 0x0051, 0x1d3f, 0x02e2, 0x1d40, 0x1d41, 0x2c7d, 0x1d42, 0x02e3, 0x02b8, 0x1dbb,
];

// ⁰¹²³⁴⁵⁶⁷⁸⁹: one, two and three live in Latin-1 Supplement, the rest in Superscripts and Subscripts.
const SUPER_DIGITS = [0x2070, 0x00b9, 0x00b2, 0x00b3, 0x2074, 0x2075, 0x2076, 0x2077, 0x2078, 0x2079];

// Plus, hyphen-minus, minus sign, equals and parentheses: ⁺⁻⁻⁼⁽⁾ and ₊₋₋₌₍₎.
const SIGNS = "+-−=()";
const SUPER_SIGNS = [0x207a, 0x207b, 0x207b, 0x207c, 0x207d, 0x207e];
const SUB_SIGNS = [0x208a, 0x208b, 0x208b, 0x208c, 0x208d, 0x208e];

// ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz: LATIN SUBSCRIPT SMALL LETTER, where one exists. Capitals borrow these.
const SUB_LOWER = [
  0x2090, 0x0062, 0x0063, 0x0064, 0x2091, 0x0066, 0x0067, 0x2095, 0x1d62, 0x2c7c, 0x2096, 0x2097, 0x2098,
  0x2099, 0x2092, 0x209a, 0x0071, 0x1d63, 0x209b, 0x209c, 0x1d64, 0x1d65, 0x0077, 0x2093, 0x0079, 0x007a,
];
/** Capitals have no subscript form: use the small subscript where there is one, else keep the capital. */
const SUB_UPPER = SUB_LOWER.map((code, index) => (code === LOWER.charCodeAt(index) ? UPPER.charCodeAt(index) : code));

// ₀₁₂₃₄₅₆₇₈₉
const SUB_DIGITS = [0x2080, 0x2081, 0x2082, 0x2083, 0x2084, 0x2085, 0x2086, 0x2087, 0x2088, 0x2089];

/**
 * Upside-down text has no alphabet of its own in Unicode. These are
 * look-alikes: turned letters from the phonetic alphabet where they exist,
 * otherwise the closest shape from another block.
 */
// ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz
const FLIP_LOWER = [
  0x0250, 0x0071, 0x0254, 0x0070, 0x01dd, 0x025f, 0x0183, 0x0265, 0x1d09, 0x027e, 0x029e, 0x006c, 0x026f,
  0x0075, 0x006f, 0x0064, 0x0062, 0x0279, 0x0073, 0x0287, 0x006e, 0x028c, 0x028d, 0x0078, 0x028e, 0x007a,
];
// ∀ᗺƆᗡƎℲ⅁HIſʞ⅂WNOԀΌᴚS⊥∩ɅMX⅄Z
const FLIP_UPPER = [
  0x2200, 0x15fa, 0x0186, 0x15e1, 0x018e, 0x2132, 0x2141, 0x0048, 0x0049, 0x017f, 0x029e, 0x2142, 0x0057,
  0x004e, 0x004f, 0x0500, 0x038c, 0x1d1a, 0x0053, 0x22a5, 0x2229, 0x0245, 0x004d, 0x0058, 0x2144, 0x005a,
];
// 0ƖᄅƐㄣϛ9ㄥ86
const FLIP_DIGITS = [0x0030, 0x0196, 0x1105, 0x0190, 0x3123, 0x03db, 0x0039, 0x3125, 0x0038, 0x0036];
// Brackets swap sides because the order of the text is reversed afterwards.
const FLIP_PUNCTUATION = ".,'\"?!()[]{}<>&_";
const FLIP_PUNCTUATION_TO = [
  0x02d9, 0x0027, 0x002c, 0x201e, 0x00bf, 0x00a1, 0x0029, 0x0028, 0x005d, 0x005b, 0x007d, 0x007b, 0x003e,
  0x003c, 0x214b, 0x203e,
];

const flipCharacter = lookup(
  pairs(LOWER, FLIP_LOWER),
  pairs(UPPER, FLIP_UPPER),
  pairs(DIGITS, FLIP_DIGITS),
  pairs(FLIP_PUNCTUATION, FLIP_PUNCTUATION_TO),
);

/**
 * User-perceived characters. Reversing or decorating code points one by one
 * would tear apart emoji sequences and letters that carry a combining accent.
 */
let segmenter: Intl.Segmenter | null | undefined;

function graphemes(input: string): string[] {
  if (segmenter === undefined) {
    // Older browsers without Intl.Segmenter fall back to code points.
    segmenter = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
  }
  return segmenter ? Array.from(segmenter.segment(input), (part) => part.segment) : Array.from(input);
}

/** Adds a combining mark after every character except line breaks. */
const overlay = (mark: string) => (input: string) =>
  graphemes(input).map((part) => (/^[\r\n]+$/.test(part) ? part : part + mark)).join("");

/** Characters from U+0021 to U+007E each have a fullwidth form exactly 0xFEE0 higher. */
const fullwidth: Mapper = (char) => {
  const code = char.codePointAt(0)!;
  return code >= 0x21 && code <= 0x7e ? String.fromCodePoint(code + 0xfee0) : char;
};

/** Styles that exist as capitals only: small letters are converted as their capital. */
const capitalsOnly = (map: Mapper): Mapper => (char) => map(/^[a-z]$/.test(char) ? char.toUpperCase() : char);

const mathematical = "Mathematical Alphanumeric Symbols";
const lettersAndDigits = "Letters and digits";
const lettersOnly = "Letters; digits stay as typed";

/** Shown in every row of the workspace until the visitor types something. */
export const fontSample = "Fonts copy and paste";

/** Shown in every row of the printed style table: capitals, small letters and digits. */
export const fontTableSample = "ABC abc 123";

export type FontStyle = {
  id: string;
  name: string;
  /** Where the characters come from in Unicode, printed in the style table. */
  source: string;
  /** What the style converts and what it has to leave as typed. */
  covers: string;
  convert: (input: string) => string;
};

export const fontStyles: FontStyle[] = [
  {
    id: "bold",
    name: "Bold",
    source: mathematical,
    covers: lettersAndDigits,
    convert: each(ranged({ upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce })),
  },
  {
    id: "italic",
    name: "Italic",
    source: `${mathematical}; h is U+210E in Letterlike Symbols`,
    covers: lettersOnly,
    convert: each(ranged({ upper: 0x1d434, lower: 0x1d44e, holes: { h: 0x210e } })),
  },
  {
    id: "bold-italic",
    name: "Bold italic",
    source: mathematical,
    covers: lettersOnly,
    convert: each(ranged({ upper: 0x1d468, lower: 0x1d482 })),
  },
  {
    id: "script",
    name: "Script (cursive)",
    source: `${mathematical}; B E F H I L M R e g o are in Letterlike Symbols`,
    covers: lettersOnly,
    convert: each(ranged({
      upper: 0x1d49c,
      lower: 0x1d4b6,
      holes: { B: 0x212c, E: 0x2130, F: 0x2131, H: 0x210b, I: 0x2110, L: 0x2112, M: 0x2133, R: 0x211b, e: 0x212f, g: 0x210a, o: 0x2134 },
    })),
  },
  {
    id: "bold-script",
    name: "Bold script",
    source: mathematical,
    covers: lettersOnly,
    convert: each(ranged({ upper: 0x1d4d0, lower: 0x1d4ea })),
  },
  {
    id: "fraktur",
    name: "Fraktur (gothic)",
    source: `${mathematical}; C H I R Z are in Letterlike Symbols`,
    covers: lettersOnly,
    convert: each(ranged({ upper: 0x1d504, lower: 0x1d51e, holes: { C: 0x212d, H: 0x210c, I: 0x2111, R: 0x211c, Z: 0x2128 } })),
  },
  {
    id: "bold-fraktur",
    name: "Bold fraktur",
    source: mathematical,
    covers: lettersOnly,
    convert: each(ranged({ upper: 0x1d56c, lower: 0x1d586 })),
  },
  {
    id: "double-struck",
    name: "Double-struck (outline)",
    source: `${mathematical}; C H N P Q R Z are in Letterlike Symbols`,
    covers: lettersAndDigits,
    convert: each(ranged({
      upper: 0x1d538,
      lower: 0x1d552,
      digit: 0x1d7d8,
      holes: { C: 0x2102, H: 0x210d, N: 0x2115, P: 0x2119, Q: 0x211a, R: 0x211d, Z: 0x2124 },
    })),
  },
  {
    id: "monospace",
    name: "Monospace (typewriter)",
    source: mathematical,
    covers: lettersAndDigits,
    convert: each(ranged({ upper: 0x1d670, lower: 0x1d68a, digit: 0x1d7f6 })),
  },
  {
    id: "sans",
    name: "Sans-serif",
    source: mathematical,
    covers: lettersAndDigits,
    convert: each(ranged({ upper: 0x1d5a0, lower: 0x1d5ba, digit: 0x1d7e2 })),
  },
  {
    id: "sans-bold",
    name: "Sans-serif bold",
    source: mathematical,
    covers: lettersAndDigits,
    convert: each(ranged({ upper: 0x1d5d4, lower: 0x1d5ee, digit: 0x1d7ec })),
  },
  {
    id: "sans-italic",
    name: "Sans-serif italic",
    source: mathematical,
    covers: lettersOnly,
    convert: each(ranged({ upper: 0x1d608, lower: 0x1d622 })),
  },
  {
    id: "sans-bold-italic",
    name: "Sans-serif bold italic",
    source: mathematical,
    covers: lettersOnly,
    convert: each(ranged({ upper: 0x1d63c, lower: 0x1d656 })),
  },
  {
    id: "small-caps",
    name: "Small caps",
    source: "Phonetic Extensions, IPA Extensions and Latin Extended-D",
    covers: "Small letters except x; capitals and digits stay as typed",
    convert: each(lookup(pairs(LOWER, SMALL_CAPS))),
  },
  {
    id: "superscript",
    name: "Superscript",
    source: "Phonetic Extensions and its Supplement, Superscripts and Subscripts, Spacing Modifier Letters, Latin-1 Supplement (¹ ² ³) and Latin Extended-C (ⱽ)",
    covers: "Digits, + - = ( ) and letters except q; C F S X Y Z use the small letter",
    convert: each(lookup(pairs(LOWER, SUPER_LOWER), pairs(UPPER, SUPER_UPPER), pairs(DIGITS, SUPER_DIGITS), pairs(SIGNS, SUPER_SIGNS))),
  },
  {
    id: "subscript",
    name: "Subscript",
    source: "Superscripts and Subscripts, Phonetic Extensions (ᵢ ᵣ ᵤ ᵥ) and Latin Extended-C (ⱼ)",
    covers: "Digits, + - = ( ) and the letters a e h i j k l m n o p r s t u v x",
    convert: each(lookup(pairs(LOWER, SUB_LOWER), pairs(UPPER, SUB_UPPER), pairs(DIGITS, SUB_DIGITS), pairs(SIGNS, SUB_SIGNS))),
  },
  {
    id: "circled",
    name: "Circled (bubble)",
    source: "Enclosed Alphanumerics",
    covers: lettersAndDigits,
    convert: each(lookup(
      pairs(UPPER, Array.from(UPPER, (_, index) => 0x24b6 + index)),
      pairs(LOWER, Array.from(LOWER, (_, index) => 0x24d0 + index)),
      // Circled zero sits apart from one to nine.
      pairs(DIGITS, [0x24ea, ...Array.from({ length: 9 }, (_, index) => 0x2460 + index)]),
    )),
  },
  {
    id: "circled-black",
    name: "Circled, black",
    source: "Enclosed Alphanumeric Supplement; digits in Enclosed Alphanumerics and Dingbats",
    covers: "Capitals and digits; small letters become capitals",
    convert: each(capitalsOnly(lookup(
      pairs(UPPER, Array.from(UPPER, (_, index) => 0x1f150 + index)),
      pairs(DIGITS, [0x24ff, ...Array.from({ length: 9 }, (_, index) => 0x2776 + index)]),
    ))),
  },
  {
    id: "squared",
    name: "Squared",
    source: "Enclosed Alphanumeric Supplement",
    covers: "Capitals; small letters become capitals, digits stay as typed",
    convert: each(capitalsOnly(ranged({ upper: 0x1f130 }))),
  },
  {
    id: "fullwidth",
    name: "Fullwidth (wide)",
    source: "Halfwidth and Fullwidth Forms",
    covers: "Letters, digits and ASCII punctuation; spaces stay as typed",
    convert: each(fullwidth),
  },
  {
    id: "strikethrough",
    name: "Strikethrough",
    source: "Combining Diacritical Marks: U+0336 after each character",
    covers: "Every character; the letters themselves do not change",
    convert: overlay("̶"),
  },
  {
    id: "underline",
    name: "Underline",
    source: "Combining Diacritical Marks: U+0332 after each character",
    covers: "Every character; the letters themselves do not change",
    convert: overlay("̲"),
  },
  {
    id: "upside-down",
    name: "Upside down (flipped)",
    source: "Look-alikes, mostly from IPA Extensions and Latin Extended-B, in reversed order",
    covers: "Letters, digits and common punctuation",
    convert: (input) => graphemes(input).reverse().map(flipCharacter).join(""),
  },
  {
    id: "backwards",
    name: "Backwards (reversed)",
    source: "No new characters: the same text in reversed order",
    covers: "Every character",
    convert: (input) => graphemes(input).reverse().join(""),
  },
];

export function getFontStyle(id: string) {
  return fontStyles.find((style) => style.id === id);
}

/** Converts `input` into the given style; an unknown style returns the input unchanged. */
export function applyFontStyle(id: string, input: string) {
  return getFontStyle(id)?.convert(input) ?? input;
}
