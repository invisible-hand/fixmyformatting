import type { ToolGuide } from "../../../lib/tool-guides";

export const fixLineBreaksInWord: ToolGuide = {
  parentTool: "remove-line-breaks",
  slug: "fix-line-breaks-in-word",
  title: "Fix Line Breaks in Word: Find and Replace ^p and ^l",
  description: "Show the hidden marks, then use Find and Replace with ^p and ^l to rejoin broken lines in Word without merging every paragraph into one block.",
  h1: "How do I fix line breaks in Word?",
  dek: "Find out which kind of break you are looking at, then remove only the ones that should not be there.",
  cluster: "how-to",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Turn on Show/Hide (Ctrl+Shift+8) to see what each break is. Then open Find and Replace (Ctrl+H): ^p finds paragraph marks and ^l finds manual line breaks. To rejoin wrapped lines without merging paragraphs, replace ^p^p with a placeholder, replace the remaining ^p with a space, then turn the placeholder back into ^p.",
  sections: [
    {
      id: "see-what-kind-of-break",
      heading: "First, see what kind of break you have",
      body: `Word can end a line in three different ways, and each one needs a different fix. Before changing anything, make the hidden marks visible.

Click the **Show/Hide ¶** button on the **Home** tab, or press **Ctrl+Shift+8** on Windows (use the 8 on the main keyboard, not the numeric keypad). To keep certain marks on permanently, go to **File > Options > Display** on Windows, or **Word > Preferences > View** on a Mac, and tick them under the formatting-marks heading.

Now look at the end of a line that breaks where it should not:

- **¶ (pilcrow).** A paragraph mark: someone, or something, pressed Enter. Text pasted from a PDF or a plain-text email usually arrives with one of these at the end of every visual line.
- **↵ (bent arrow).** A *manual line break*, the kind **Shift+Enter** inserts. The line ends but the paragraph continues. Text pasted from some web pages, emails and chat apps carries these.
- **No mark at all.** The line is wrapping at the margin, a column edge or a text box. That is layout, not a character, and Find and Replace cannot touch it.

A useful tell for the second case: in a justified paragraph, a line that ends in a manual line break is stretched across the full width with large gaps between the words. Microsoft's own troubleshooting note recommends replacing those breaks with paragraph marks.

If you only need to know which characters are in a piece of pasted text before it reaches Word, our [guide to line breaks](/remove-line-breaks/what-are-line-breaks) explains LF, CRLF and the Unicode separators.`,
    },
    {
      id: "find-and-replace-codes",
      heading: "The Find and Replace codes for line breaks",
      body: `Word's Find and Replace dialog can search for invisible characters through short codes that start with a caret (^):

| Code | Finds | Typical use |
| --- | --- | --- |
| \`^p\` | Paragraph mark (¶) | Rejoin lines pasted from a PDF or email |
| \`^l\` (lower-case L) | Manual line break (↵) | Turn Shift+Enter breaks into spaces or real paragraphs |

You do not have to remember them. On Windows, go to **Home > Editing > Replace** (or press **Ctrl+H**), click **More >>**, then use the **Special** button: choosing *Paragraph Mark* or *Manual Line Break* types the code into whichever box has the cursor. On a Mac, open **View > Navigation Pane**, click the magnifying glass, then **Settings** (the gear) > **Advanced Find & Replace**, and use the same Special menu.

Two simple fixes cover most documents:

1. **Manual line breaks everywhere.** Find \`^l\`, replace with a space if the lines belong to one paragraph, or with \`^p\` if each line should be its own paragraph. Replace All.
2. **Doubled spaces left behind.** Find two spaces, replace with one, and Replace All until Word reports zero replacements.

Leave **Use wildcards** unticked while you do this. The caret codes above belong to the normal search mode, and the wildcard mode treats characters such as \`*\` and \`?\` as patterns.

Word for the web offers only basic find and replace (match case and whole words). For special characters, open the document in the desktop app.`,
    },
    {
      id: "rejoin-lines-keep-paragraphs",
      heading: "Rejoin broken lines without merging every paragraph",
      body: `The common problem is text pasted from a PDF: every line ends in ¶, and paragraphs are separated by an empty line, which in Word is two ¶ marks in a row. Replacing every \`^p\` with a space would fuse the whole document into one paragraph. The fix is to protect the real paragraph breaks first with a placeholder, a string that does not appear anywhere in the document.

1. **Clean the line ends.** Find \`␣^p\` (a space followed by ^p) and replace with \`^p\`. Repeat until there are no matches. Without this step, a blank line that contains a stray space will not match the next step.
2. **Protect the paragraphs.** Find \`^p^p\`, replace with \`##PARA##\`. Replace All.
3. **Join the lines.** Find \`^p\`, replace with a single space. Replace All.
4. **Restore the paragraphs.** Find \`##PARA##\`, replace with \`^p\`. Replace All.
5. **Tidy up.** Replace two spaces with one until nothing is left to replace.

If the document has manual line breaks instead of paragraph marks, run the same steps with \`^l\` in place of \`^p\`.

Three things this does not handle on its own:

- **Hyphenated line ends.** A word split as \`format-\` / \`ting\` becomes \`format- ting\`. Searching for \`-␣\` and fixing each one with **Find Next** and **Replace** is safer than Replace All, because real compounds such as *well-known* can end a line too.
- **Paragraphs with no blank line between them.** If the source separated paragraphs with a single break, step 2 has nothing to protect and the paragraphs merge. Split them again by hand, or fix the text before it reaches Word.
- **Lists, addresses and tables.** Anything where each line should stand alone gets joined. Run the replacements on the prose only, and fix those parts separately or retype their breaks afterwards.

Use **Replace** rather than **Replace All** the first time on a document you care about, so you can see each change before Word makes it.`,
    },
    {
      id: "fix-it-before-pasting",
      heading: "Fix the text before it reaches Word",
      body: `Repairing breaks inside Word works, but it is often quicker to paste text that is already clean.

[Fix Copy-Paste Line Breaks](/remove-line-breaks) applies the same rule as the placeholder method: every single line break becomes a space, a blank line stays a paragraph break, and runs of three or more breaks shrink to one blank line. Paste the text, copy the result, and paste it into Word. It runs in your browser and nothing is uploaded.

What to expect when you paste the result:

- Each blank-line-separated block becomes a Word paragraph, and the blank line between them becomes an empty paragraph. If you prefer paragraph spacing instead of empty lines, finish with a Find \`^p^p\`, Replace with \`^p\` pass.
- It has the same blind spots as the Word method: hyphens at line ends are kept (\`format- ting\`), lists and addresses are joined, and paragraphs separated by a single break merge.
- A line that ended with a space before the break leaves a double space. Word's two-spaces-to-one replace fixes it.

**Paste options matter too.** After pressing Ctrl+V, click the **Paste Options** button (or press Ctrl) and pick **Keep Text Only (T)** to drop fonts and colours from the source. It does not remove line breaks: Keep Text Only discards formatting, and the paragraph marks stay. To make it the default for text from browsers and PDF viewers, go to **File > Options > Advanced** and change **Pasting from other programs** under *Cut, copy, and paste*.

**For a whole PDF,** try opening it in Word instead of copying from it (**File > Open**, then pick the PDF). Word converts a copy of the file and tries to rebuild paragraphs, headings and lists. Microsoft notes this works best on documents that are mostly text; footnotes, multi-column layouts and tables can still come out wrong. [Why copying from a PDF adds line breaks](/remove-line-breaks/pdf-copy-paste-line-breaks) explains where the stray breaks come from.`,
    },
    {
      id: "breaks-that-are-not-characters",
      heading: "When the break is not a character at all",
      body: `If Show/Hide reveals no ¶ or ↵ where the line ends, Find and Replace will not help, because there is nothing to find. The usual causes:

- **The text is in a narrow container.** A table cell, a text box or a column layout wraps text at its own edge. Widen the container or change the column settings.
- **A long unbreakable string.** A URL or a code identifier with no spaces wraps wherever it must. Word cannot break it more neatly without a space or hyphen.
- **Non-breaking spaces.** A no-break space (shown as a small degree-like circle with Show/Hide on) glues two words together, so the pair moves to the next line as a unit. Text from web pages and AI tools sometimes carries many of them; [Show invisible characters](/show-invisible-characters) marks them before you paste.
- **Pagination, not line breaks.** If a paragraph jumps to the next page leaving a gap, check **Home >** Paragraph dialog launcher **> Line and Page Breaks**: *Keep with next*, *Keep lines together* and *Page break before* all move text without inserting any character.

Sources for the steps above: Microsoft Support, [Find and replace text in Word](https://support.microsoft.com/en-us/office/find-and-replace-text-in-word-c6728c16-469e-43cd-afe4-7708c6c779b7), [Keyboard shortcuts in Word](https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-word-95ef89dd-7142-4b50-afb2-f762f663ceb2), [Show or hide tab marks in Word](https://support.microsoft.com/en-us/word/show-or-hide-tab-marks-in-word), [Control the formatting when you paste text](https://support.microsoft.com/en-us/word/control-the-formatting-when-you-paste-text), [Opening PDFs in Word](https://support.microsoft.com/en-us/word/opening-pdfs-in-word) and [Use Line and Page Breaks settings in Word](https://support.microsoft.com/en-us/word/line-and-page-breaks); Microsoft Learn, [Fixing layout vs manual line break](https://learn.microsoft.com/en-us/archive/technet-wiki/54245.word-troubleshooting-quick-fix-fixing-layout-vs-manual-line-break). Checked October 2026.`,
    },
  ],
  faqs: [
    {
      question: "What is the difference between ^p and ^l in Word?",
      answer: "^p is a paragraph mark, the break Enter inserts, shown as ¶. ^l (lower-case L) is a manual line break, the break Shift+Enter inserts, shown as a bent arrow. A manual line break ends the line but keeps the text in the same paragraph.",
    },
    {
      question: "How do I remove all line breaks in Word but keep paragraphs?",
      answer: "Replace ^p^p with a placeholder such as ##PARA##, replace the remaining ^p with a space, then replace the placeholder with ^p. Remove spaces before paragraph marks first, or blank lines that contain a space will not be protected.",
    },
    {
      question: "Why are there big gaps between words on some lines in Word?",
      answer: "In justified text, a line that ends in a manual line break is stretched to the full width, which spreads the words apart. Replace ^l with ^p, or with a space if the lines belong together, and the spacing returns to normal.",
    },
    {
      question: "Can I fix line breaks in Word for the web?",
      answer: "Only partly. Word for the web has basic find and replace without the Special menu, so the ^p and ^l methods need the desktop app. Fixing the text before pasting it, with a line-break remover, works in any version.",
    },
    {
      question: "Does Keep Text Only remove line breaks when pasting?",
      answer: "No. Keep Text Only drops fonts, colours, pictures and tables, but the line breaks in the source arrive as paragraph marks. You still need Find and Replace, or clean text, to join the lines.",
    },
  ],
  relatedTools: ["remove-line-breaks", "show-invisible-characters", "remove-invisible-characters"],
  relatedGuides: ["invisible-unicode-characters", "markdown-symbols-in-word"],
};
