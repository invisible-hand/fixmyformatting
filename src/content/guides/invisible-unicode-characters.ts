import type { GuideDefinition } from "../../lib/guides";

export const unicodeReference: GuideDefinition = {
  slug: "invisible-unicode-characters",
  title: "Invisible Unicode Characters: A Reference",
  description: "A reference to zero-width spaces, soft hyphens, BOMs, and direction marks — what each one does, where it comes from, and how to remove it.",
  h1: "Invisible Unicode characters: what they are and what they break",
  dek: "A working reference to the characters that are in your text but not on your screen.",
  cluster: "reference",
  published: "2026-07-25",
  updated: "2026-09-01",
  answer:
    "Invisible Unicode characters occupy no visible space but are still part of the string. The common ones are zero-width spaces, soft hyphens, byte-order marks, non-breaking spaces, and direction marks. Each has a legitimate typographic purpose, and each breaks search, validation, parsing, and deduplication when it survives a copy-paste.",
  sections: [
    {
      id: "the-reference",
      heading: "The characters you will actually meet",
      body: `| Character | Code point | Purpose | What it breaks |
| --- | --- | --- | --- |
| Zero-width space | U+200B | Suggests a line-break point | Search, string comparison |
| Zero-width non-joiner | U+200C | Prevents letters joining | Ligatures, Arabic and Indic text |
| Zero-width joiner | U+200D | Forces letters to join | Emoji sequences, text length |
| Soft hyphen | U+00AD | Hyphen shown only when wrapping | Search, copied text |
| Non-breaking space | U+00A0 | Space that never wraps | Trimming, CSV parsing, code |
| Narrow no-break space | U+202F | Thin space before punctuation | Same as above |
| Byte-order mark | U+FEFF | Marks encoding at file start | First CSV column, JSON parsing |
| Word joiner | U+2060 | Prevents a break, no width | Search |
| Left-to-right mark | U+200E | Sets text direction | Display order, trimming |
| Right-to-left mark | U+200F | Sets text direction | Display order |
| RTL override | U+202E | Forces right-to-left display | Filename spoofing |
| Line separator | U+2028 | Unicode line break | JavaScript string literals |
| Paragraph separator | U+2029 | Unicode paragraph break | JSON in older parsers |

Every one of these has a real job. The problem is never their existence — it is that they travel silently between systems that treat them differently.`,
    },
    {
      id: "where-they-come-from",
      heading: "Where they come from",
      body: `- **Copying from web pages.** Sites insert zero-width spaces to control where long strings wrap, and soft hyphens for justified text. Both come along with the copy.
- **Word processors.** Non-breaking spaces are inserted automatically to keep a number with its unit, or a name on one line.
- **PDF extraction.** Copying from a PDF frequently produces soft hyphens where the typesetter broke words across lines, plus non-breaking spaces from justified spacing.
- **AI chat interfaces.** Output is rendered as HTML, so copying carries whatever spacing characters that formatting used — usually U+00A0 and U+202F.
- **Encoding conversions.** A byte-order mark appears when a file is saved as UTF-8 with BOM, common on Windows.
- **Deliberate insertion.** Zero-width characters have been used to fingerprint documents for leak tracing, and to slip text past keyword filters.

The pattern is consistent: they enter when text moves from a *presentation* context into a *data* context.`,
    },
    {
      id: "how-they-break-things",
      heading: "How they break things",
      body: `**Search silently fails.** A zero-width space inside a word means searching for it returns nothing. Nothing indicates why — the word is visibly right there.

**Validation rejects correct input.** An email address with a trailing non-breaking space fails a format check. The user sees a correct address and an error message that makes no sense.

**Comparisons fail.** \`"Ada" === "Ada\\u200B"\` is false. Deduplication misses obvious duplicates; lookups return nothing; joins drop rows.

**Trimming does not help.** Two different reasons, and it is worth being precise about which one you are hitting. First, \`trim()\` only touches the ends of a string, so anything sitting between two words is untouched no matter how Unicode-aware it is. Second, the zero-width characters are not whitespace at all: in both JavaScript and Python, \`\\s\` does not match U+200B and \`trim()\`/\`strip()\` leaves it in place. A non-breaking space is the opposite case — it *is* whitespace by Unicode property, so JavaScript's \`trim()\` and Python's \`strip()\` do remove it, while trims defined against ASCII only, such as Java's \`String.trim()\` and PHP's default \`trim()\`, leave it behind. "I already trimmed it" is a dead end most often because the character is a zero-width one, or is in the middle.

**Code fails to compile — in some languages.** A non-breaking space where a normal space belongs is a syntax error in Python, Go, Ruby, shell, and JSON, at a line that looks perfect. JavaScript, TypeScript, and C treat U+00A0 as ordinary whitespace and compile it happily, so it stays in the source until something stricter reads the file.

**CSV imports corrupt.** A byte-order mark attaches to the first header, so \`id\` becomes \`\\uFEFFid\` and the first column silently fails to map.

**Length is wrong.** Zero-width joiners in emoji sequences mean a single visible emoji can be several code points, so character limits reject input that looks well within them.

**Filenames can deceive.** U+202E reverses displayed text, so \`report\\u202Egnp.exe\` can display as \`reportexe.png\`. This is a genuine security concern, not a curiosity.`,
    },
    {
      id: "finding-and-removing",
      heading: "Finding and removing them",
      body: `**Scan first.** Paste the text into the [Invisible Character Scanner](/remove-invisible-characters). It reports the total it found plus separate counts for zero-width characters and soft hyphens, then removes them on request. To see which character sits where, use [Show Invisible Characters](/show-invisible-characters), which labels each one in place. Seeing the counts first tells you whether you are dealing with one stray character or systematic contamination.

**In an editor.** VS Code highlights most invisible characters by default via its unicode-highlight setting. For regex-capable find-and-replace, this pattern catches the common set:

\`\`\`
[\\u200B-\\u200F\\u00AD\\uFEFF\\u2060\\u202A-\\u202E\\u2028\\u2029]
\`\`\`

**In code**, normalise at the boundary — when data arrives, not when it is used:

\`\`\`js
const clean = input
  .replace(/[\\u200B-\\u200F\\u2060\\uFEFF\\u00AD\\u202A-\\u202E]/g, "")
  .replace(/[\\u00A0\\u202F]/g, " ")
  .normalize("NFC")
  .trim();
\`\`\`

Note the two-step treatment: zero-width characters are *deleted*, but non-breaking spaces are *converted to ordinary spaces* — deleting them would join words together.

**Do not strip blindly.** Zero-width joiners are load-bearing in emoji sequences and in Arabic, Persian, and many Indic scripts, where removing them changes how words render. Strip aggressively in identifiers, keys, and code; strip conservatively in user-facing content.

For the specific question of whether AI tools insert these deliberately, see [does ChatGPT hide invisible characters](/guides/chatgpt-invisible-characters). The visible-but-equally-disruptive equivalent is covered in [why smart quotes break code](/guides/smart-quotes-break-code).`,
    },
  ],
  faqs: [
    {
      question: "What is a zero-width space?",
      answer:
        "U+200B, a character that takes up no visible width but is still part of the string. Websites use it to suggest where a long word may wrap. It breaks search and string comparison because the text looks identical while the underlying bytes differ.",
    },
    {
      question: "Why does my search fail on text that is clearly there?",
      answer:
        "There is almost certainly an invisible character inside the word — commonly a zero-width space or a soft hyphen picked up from a web page or PDF. The rendered text matches what you typed, but the underlying string does not.",
    },
    {
      question: "Does trim() remove non-breaking spaces?",
      answer:
        "It depends on the language. A non-breaking space (U+00A0) is whitespace by Unicode property, so JavaScript's trim() and Python's strip() do remove it, while ASCII-only trims such as Java's String.trim() and PHP's default trim() leave it. The characters that survive trimming everywhere are the zero-width ones (U+200B, U+200C, U+200D, U+00AD), because they are not whitespace at all. Trimming also only touches the ends of a string, so a character between two words survives regardless.",
    },
    {
      question: "How do I remove invisible characters from text?",
      answer:
        "Paste it into a scanner that lists and strips them, or use a regex covering U+200B–U+200F, U+00AD, U+FEFF, U+2060, and U+202A–U+202E. Delete zero-width characters, but convert non-breaking spaces to ordinary spaces rather than deleting them, or words will run together.",
    },
    {
      question: "Are invisible characters ever useful?",
      answer:
        "Yes. Soft hyphens control word breaks in justified text, non-breaking spaces keep values with their units, and zero-width joiners are essential to emoji sequences and to Arabic, Persian, and Indic scripts. Strip aggressively in code and identifiers, conservatively in prose.",
    },
  ],
  relatedTools: ["remove-invisible-characters", "show-invisible-characters", "clean-ai-text"],
  relatedGuides: ["zero-width-space", "chatgpt-invisible-characters", "smart-quotes-break-code"],
};
