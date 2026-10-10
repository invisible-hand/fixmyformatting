import type { ReferenceCopy } from "@/lib/i18n/types";

/** English source of truth for the static reference tables. */
export const reference: ReferenceCopy = {
  guideLead: "Guide",
  pages: {
    "remove-invisible-characters": {
      heading: "Every invisible character the scanner handles",
      answer:
        "The Invisible Character Scanner removes {count} invisible Unicode characters: zero-width spaces and joiners, soft hyphens, direction marks and other bidirectional controls, the word joiner, invisible math operators and the byte order mark. Ordinary spaces, tabs, no-break spaces and line breaks are kept.",
      note: "Printed below so you can read it without running the tool. U+2065 is unassigned in Unicode and is removed as well. Tabs, no-break spaces and line or paragraph separators are kept, because deleting them would join words or lines.",
    },
    "show-invisible-characters": {
      heading: "Every character the viewer labels",
      answer:
        "The Invisible Character Viewer labels {count} characters in place with markers such as [ZWSP] and [NBSP] and deletes nothing. It marks zero-width characters, soft hyphens, direction marks, the byte order mark, tabs, no-break spaces and line and paragraph separators.",
      note: "Printed below so you can read it without running the tool. The scanner column shows what the Invisible Character Scanner does with the same character. Characters without a label are not marked by the viewer.",
    },
    "remove-smart-quotes": {
      heading: "Which quotes are replaced",
      answer:
        "The Smart Quotes to Straight Quotes tool replaces the four curly quote characters with straight ASCII ones: both curly double quotes become \" and both curly single quotes, including the curly apostrophe, become '. Nothing else in the text is changed.",
      note: "Other quotation marks, such as „ ‚ « » ‹ ›, are not changed.",
    },
    "remove-em-dashes": {
      heading: "Which dashes are replaced",
      answer:
        "The em dash remover replaces only the em dash (—, U+2014): with a comma by default, or with a semicolon, a hyphen or nothing. En dashes, minus signs and hyphens are left as they are.",
      note: "After a replacement the space before the dash is removed, so no stray space is left. When the dash is removed entirely, runs of spaces collapse to one.",
    },
  },
  headers: {
    character: "Character",
    codePoint: "Code point",
    name: "Unicode name",
    type: "What it is",
    scanner: "Scanner",
    viewer: "Viewer label",
    becomes: "Becomes",
    output: "Tool output",
  },
  invisibleTypes: {
    softHyphen: "Hidden hyphen shown only at a line break",
    zeroWidth: "Zero-width space or joiner",
    directionMark: "Text direction mark",
    bidiEmbedding: "Bidirectional embedding or override",
    wordJoiner: "Word joiner (prevents a line break)",
    mathOperator: "Invisible math operator",
    isolate: "Bidirectional isolate",
    deprecated: "Deprecated format control",
    bom: "Byte order mark",
    whitespace: "Tab or no-break space",
    separator: "Line or paragraph separator",
  },
  removed: "Removed",
  kept: "Kept",
  notLabelled: "Not labelled",
  unchanged: "Unchanged",
  defaultLabel: "default",
};
