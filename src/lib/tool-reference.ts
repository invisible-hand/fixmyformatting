import type { InvisibleType, ReferenceSlug } from "./i18n/types";
import { invisibleExpression, invisibleMarkers } from "./processors";

/**
 * Data behind the static reference tables on four tool pages. The invisible
 * character rows are derived from the same expression and marker map the
 * processors use, so the table cannot drift from what the tools do. Names are
 * the official Unicode character names; they are identifiers, not prose.
 */

export const referenceSlugs: readonly ReferenceSlug[] = [
  "remove-invisible-characters",
  "show-invisible-characters",
  "remove-smart-quotes",
  "remove-em-dashes",
];

export const isReferenceSlug = (slug: string): slug is ReferenceSlug =>
  (referenceSlugs as readonly string[]).includes(slug);

/** Guide that answers the matching "what is this" question, per tool. */
export const referenceGuide: Record<ReferenceSlug, string> = {
  "remove-invisible-characters": "invisible-unicode-characters",
  "show-invisible-characters": "invisible-unicode-characters",
  "remove-smart-quotes": "smart-quotes-break-code",
  "remove-em-dashes": "em-dash-vs-en-dash-vs-hyphen",
};

const unicodeNames: Record<number, string> = {
  0x0009: "CHARACTER TABULATION",
  0x00a0: "NO-BREAK SPACE",
  0x00ad: "SOFT HYPHEN",
  0x200b: "ZERO WIDTH SPACE",
  0x200c: "ZERO WIDTH NON-JOINER",
  0x200d: "ZERO WIDTH JOINER",
  0x200e: "LEFT-TO-RIGHT MARK",
  0x200f: "RIGHT-TO-LEFT MARK",
  0x2028: "LINE SEPARATOR",
  0x2029: "PARAGRAPH SEPARATOR",
  0x202a: "LEFT-TO-RIGHT EMBEDDING",
  0x202b: "RIGHT-TO-LEFT EMBEDDING",
  0x202c: "POP DIRECTIONAL FORMATTING",
  0x202d: "LEFT-TO-RIGHT OVERRIDE",
  0x202e: "RIGHT-TO-LEFT OVERRIDE",
  0x202f: "NARROW NO-BREAK SPACE",
  0x2060: "WORD JOINER",
  0x2061: "FUNCTION APPLICATION",
  0x2062: "INVISIBLE TIMES",
  0x2063: "INVISIBLE SEPARATOR",
  0x2064: "INVISIBLE PLUS",
  0x2066: "LEFT-TO-RIGHT ISOLATE",
  0x2067: "RIGHT-TO-LEFT ISOLATE",
  0x2068: "FIRST STRONG ISOLATE",
  0x2069: "POP DIRECTIONAL ISOLATE",
  0x206a: "INHIBIT SYMMETRIC SWAPPING",
  0x206b: "ACTIVATE SYMMETRIC SWAPPING",
  0x206c: "INHIBIT ARABIC FORM SHAPING",
  0x206d: "ACTIVATE ARABIC FORM SHAPING",
  0x206e: "NATIONAL DIGIT SHAPES",
  0x206f: "NOMINAL DIGIT SHAPES",
  0xfeff: "ZERO WIDTH NO-BREAK SPACE",
  0x201c: "LEFT DOUBLE QUOTATION MARK",
  0x201d: "RIGHT DOUBLE QUOTATION MARK",
  0x2018: "LEFT SINGLE QUOTATION MARK",
  0x2019: "RIGHT SINGLE QUOTATION MARK",
  0x0022: "QUOTATION MARK",
  0x0027: "APOSTROPHE",
  0x2014: "EM DASH",
  0x2013: "EN DASH",
  0x2212: "MINUS SIGN",
  0x002d: "HYPHEN-MINUS",
};

export const hex = (codePoint: number) => codePoint.toString(16).toUpperCase().padStart(4, "0");
export const unicodeName = (codePoint: number) => {
  const name = unicodeNames[codePoint];
  if (!name) throw new Error(`No Unicode name recorded for U+${hex(codePoint)}`);
  return name;
};

function invisibleType(cp: number): InvisibleType {
  if (cp === 0xad) return "softHyphen";
  if (cp >= 0x200b && cp <= 0x200d) return "zeroWidth";
  if (cp === 0x200e || cp === 0x200f) return "directionMark";
  if (cp >= 0x202a && cp <= 0x202e) return "bidiEmbedding";
  if (cp === 0x2060) return "wordJoiner";
  if (cp >= 0x2061 && cp <= 0x2064) return "mathOperator";
  if (cp >= 0x2066 && cp <= 0x2069) return "isolate";
  if (cp >= 0x206a && cp <= 0x206f) return "deprecated";
  if (cp === 0xfeff) return "bom";
  if (cp === 0x2028 || cp === 0x2029) return "separator";
  return "whitespace";
}

export type InvisibleRow = {
  id: string;
  codePoint: number;
  name: string;
  type: InvisibleType;
  /** Removed by the Invisible Character Scanner. */
  removed: boolean;
  /** The [LABEL] the Invisible Character Viewer inserts, if it marks this character. */
  marker?: string;
};

const removalTest = new RegExp(invisibleExpression.source);

/** Unassigned code points inside the removal ranges have no name and no row. */
export const invisibleRows: InvisibleRow[] = (() => {
  const rows: InvisibleRow[] = [];
  for (let cp = 0; cp <= 0xffff; cp += 1) {
    const char = String.fromCharCode(cp);
    const removed = removalTest.test(char);
    const marker = invisibleMarkers[char];
    if (!removed && !marker) continue;
    if (!(cp in unicodeNames)) continue;
    rows.push({ id: `u${hex(cp).toLowerCase()}`, codePoint: cp, name: unicodeNames[cp], type: invisibleType(cp), removed, marker });
  }
  return rows;
})();

export const removedCount = invisibleRows.filter((row) => row.removed).length;
export const markedCount = invisibleRows.filter((row) => row.marker).length;

export type MappingRow = { id: string; char: string; codePoint: number; name: string };

/** Mirrors the replacement in the remove-smart-quotes processor. */
export const quoteRows: (MappingRow & { becomes: string; becomesCodePoint: number })[] = [
  { char: "“", becomes: '"', becomesCodePoint: 0x22 },
  { char: "”", becomes: '"', becomesCodePoint: 0x22 },
  { char: "‘", becomes: "'", becomesCodePoint: 0x27 },
  { char: "’", becomes: "'", becomesCodePoint: 0x27 },
].map((row) => {
  const codePoint = row.char.codePointAt(0)!;
  return { ...row, id: `u${hex(codePoint).toLowerCase()}`, codePoint, name: unicodeName(codePoint) };
});

/** The dash and hyphen characters the em dash page covers; only the em dash is replaced. */
export const dashRows: (MappingRow & { replaced: boolean })[] = [
  { char: "—", replaced: true },
  { char: "–", replaced: false },
  { char: "−", replaced: false },
  { char: "-", replaced: false },
].map((row) => {
  const codePoint = row.char.codePointAt(0)!;
  return { ...row, id: `u${hex(codePoint).toLowerCase()}`, codePoint, name: unicodeName(codePoint) };
});

/** Replacement the em dash processor writes for each setting. */
export const dashReplacements = [
  { key: "comma", output: ",", isDefault: true },
  { key: "semicolon", output: ";", isDefault: false },
  { key: "hyphen", output: "-", isDefault: false },
  { key: "remove", output: "", isDefault: false },
] as const;
