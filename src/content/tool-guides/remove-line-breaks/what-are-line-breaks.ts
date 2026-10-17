import type { ToolGuide } from "../../../lib/tool-guides";

export const whatAreLineBreaks: ToolGuide = {
  parentTool: "remove-line-breaks",
  slug: "what-are-line-breaks",
  title: "What Are Line Breaks? LF, CRLF and Hard Wraps Explained",
  description: "A line break is the invisible character that ends a line. What LF, CR and CRLF are, why pasted text breaks mid-sentence, and how to remove stray breaks.",
  h1: "What are line breaks?",
  dek: "The invisible character at the end of every line, the three ways computers spell it, and why it turns up in the middle of sentences.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "A line break is an invisible character that ends one line of text and starts the next. Computers store it as a line feed (LF), a carriage return (CR), or both together (CRLF, the Windows convention). Two breaks in a row make a paragraph break; a single break in mid-sentence is usually a leftover from a PDF or email.",
  sections: [
    {
      id: "what-a-line-break-is",
      heading: "A line break is a character, not a gap",
      body: `On screen a line break looks like empty space at the end of a line. In the file it is a character like any other: it has a code, it takes up a position in the text, it is counted by anything that counts characters, and it travels with the text when you copy, save or send it.

That is the key difference between a **hard line break** and a **soft wrap**:

- A **soft wrap** is what your editor does when a line reaches the edge of the window. Nothing is stored. Make the window wider and the text reflows onto fewer lines.
- A **hard line break** is stored in the text. Make the window wider and the line still ends exactly where it did, leaving a ragged right edge and half-empty lines.

Most stray breaks you meet are soft wraps from one program that were turned into hard breaks by another. A PDF, an email client or a terminal laid the text out in lines, and when you copied it, each visual line ended with a real character.

A **paragraph break** is not a separate character in plain text. By convention it is two line breaks in a row, which shows up as a blank line. Word processors are different: in Word, pressing Enter ends a *paragraph* (the ¶ mark), and Shift+Enter inserts a *manual line break* inside the same paragraph. Both look like a new line, but they behave differently for spacing, styles and lists.`,
    },
    {
      id: "lf-cr-and-crlf",
      heading: "LF, CR and CRLF: the three spellings",
      body: `The names come from typewriters and teleprinters. A *carriage return* moved the print head back to the left margin; a *line feed* rolled the paper up one line. Starting a new line took both. Computer systems inherited the two control characters and then disagreed about which to store.

| Name | Characters | Code | Where you see it |
| --- | --- | --- | --- |
| LF (line feed) | \`\\n\` | U+000A | Linux, macOS, the web, most programming tools |
| CRLF | \`\\r\\n\` | U+000D U+000A | Windows text files, many internet protocols (HTTP headers, email) |
| CR (carriage return) | \`\\r\` | U+000D | Classic Mac OS before OS X; rare today |

Unicode adds a few more that you will occasionally meet in copied text:

- **U+2028 LINE SEPARATOR** and **U+2029 PARAGRAPH SEPARATOR**, unambiguous breaks that some word processors and PDF tools emit. Many programs do not treat them as line breaks at all, so the text looks joined in one place and broken in another.
- **U+0085 NEXT LINE (NEL)**, inherited from older mainframe encodings.

In HTML, none of these characters makes a visible break on their own: the browser collapses them into a single space unless the element preserves whitespace (\`<pre>\`, or CSS \`white-space: pre-wrap\`). A visible break in a web page is a \`<br>\` element or a new block such as \`<p>\`.

If a pasted break behaves strangely, [Show invisible characters](/show-invisible-characters) labels the Unicode separators in place (as LS and PS) so you can see which one you are dealing with. The [guide to invisible Unicode characters](/guides/invisible-unicode-characters) covers the wider family.`,
    },
    {
      id: "why-text-breaks-mid-sentence",
      heading: "Why pasted text breaks in the middle of sentences",
      body: `A line break in the middle of a sentence almost always means the text was laid out for a fixed width somewhere before it reached you.

**PDFs.** A PDF stores where each run of characters sits on the page, not which sentences belong together. When you select and copy, the viewer reconstructs the text line by line and puts a break at the end of every visual line. Two-column layouts, footnotes and running headers make it worse: lines from different columns or the page footer can be interleaved with the body text. Some PDFs also carry soft hyphens or real hyphens at line ends, so a word like "formatting" arrives as \`format-\` on one line and \`ting\` on the next.

**Plain-text email.** Email standards ask senders to keep lines under 78 characters, so many clients wrap plain-text messages at about 72 to 76 characters with hard breaks. A quoted reply wrapped twice ends up with alternating long and short lines.

**Terminals, code blocks and AI chats.** Text copied from a terminal, a fixed-width code block or a chat window that wraps long lines can carry breaks at the width of that window. Answers from AI assistants are usually fine in the rendered view but can arrive hard-wrapped when copied from a code block or a raw Markdown view.

**OCR.** Scanned documents run through text recognition produce one line of output per printed line, exactly like a PDF.

In each case the breaks are real characters, which is why "fixing" them by widening the window or changing the font does nothing.`,
    },
    {
      id: "removing-stray-line-breaks",
      heading: "How to remove stray line breaks without losing paragraphs",
      body: `The goal is usually to join the lines inside each paragraph while keeping the blank lines between paragraphs. Deleting every line break would merge the whole document into one block, which is rarely what you want.

[Fix Copy-Paste Line Breaks](/remove-line-breaks) does exactly that in your browser:

1. Every **single** line break becomes a space, so wrapped lines rejoin into sentences.
2. A **blank line** (two breaks in a row) is kept, so paragraphs stay separate.
3. Runs of three or more breaks are reduced to one blank line.

The rule is simple, so it is worth knowing where it gets things wrong:

- **Hyphenated line ends.** \`format-\` followed by \`ting\` becomes \`format- ting\`. The tool does not guess whether a hyphen was part of the word. Search for "- " afterwards, or remove soft hyphens first with [Remove invisible characters](/remove-invisible-characters).
- **Lists, addresses, poems and tables.** Anything where each line is meant to stand alone will be joined into one line. Fix those parts separately, or paste only the prose.
- **Paragraphs with no blank line between them.** Some PDFs separate paragraphs with a single break. Those paragraphs will merge, and you will need to split them again by hand.
- **Unicode separators.** The tool treats line feeds as breaks; a U+2028 or U+2029 separator is left untouched. Windows CRLF endings are normalised to LF by the browser when you paste, so they are handled.

In Word you can do the same with Find and Replace: \`^p\` finds paragraph marks and \`^l\` finds manual line breaks. The usual trick is to replace \`^p^p\` with a placeholder such as \`##\`, replace the remaining \`^p\` with a space, then replace the placeholder with \`^p\`. In code editors with regular-expression search, \`(?<!\\n)\\n(?!\\n)\` matches a single line feed that is not part of a blank line.`,
    },
    {
      id: "line-breaks-in-files-and-code",
      heading: "Line breaks in files, code and spreadsheets",
      body: `Outside of prose, the choice between LF and CRLF matters more than stray breaks do.

- **Git and code editors.** A file that mixes LF and CRLF shows every line as changed in a diff. Git's \`core.autocrlf\` setting and a \`.gitattributes\` file control which ending is stored and which is checked out; most editors show the current ending in the status bar.
- **Shell scripts.** A script saved with CRLF on Windows fails on Linux with errors such as \`bad interpreter\`, because the carriage return becomes part of the command. In some terminals the stray \`\\r\` appears as \`^M\`.
- **CSV files.** A line break inside a quoted cell is legal CSV, but plenty of importers split the row there anyway. If a spreadsheet import shows rows cut in half, look for breaks inside cells.
- **JSON.** A raw line break is not allowed inside a JSON string; it must be written as \`\\n\`. Text pasted into a JSON value from a document usually needs that escaping.

None of these is fixed by the copy-paste tool, which is meant for prose. For files, set the line-ending option in your editor or version control instead of editing breaks by hand.`,
    },
  ],
  faqs: [
    {
      question: "What is the difference between a line break and a paragraph break?",
      answer: "In plain text a line break is one newline character and a paragraph break is two in a row, which shows as a blank line. In Word, Enter starts a new paragraph and Shift+Enter inserts a manual line break inside the current paragraph.",
    },
    {
      question: "Why does text copied from a PDF have line breaks in the middle of sentences?",
      answer: "A PDF records where each line sits on the page, not where sentences begin and end. When you copy, the viewer adds a break at the end of every visual line, so each printed line becomes its own line of text.",
    },
    {
      question: "What does CRLF mean?",
      answer: "CRLF is a carriage return followed by a line feed (\\r\\n), the line ending used by Windows text files and by protocols such as HTTP and email. Linux and macOS use a line feed alone (LF).",
    },
    {
      question: "How do I remove line breaks in Word?",
      answer: "Open Find and Replace. Use ^p for paragraph marks and ^l for manual line breaks. To keep paragraphs, first replace ^p^p with a placeholder, then replace ^p with a space, then turn the placeholder back into ^p.",
    },
    {
      question: "Will removing line breaks delete my paragraphs?",
      answer: "Not with Fix Copy-Paste Line Breaks: it joins single breaks and keeps blank lines. Paragraphs separated by a single break, with no blank line, will merge, so check those after converting.",
    },
  ],
  relatedTools: ["remove-line-breaks", "show-invisible-characters", "remove-invisible-characters"],
  relatedGuides: ["invisible-unicode-characters", "zero-width-space"],
};
