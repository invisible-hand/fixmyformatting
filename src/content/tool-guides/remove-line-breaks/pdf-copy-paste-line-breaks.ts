import type { ToolGuide } from "../../../lib/tool-guides";

export const pdfCopyPasteLineBreaks: ToolGuide = {
  parentTool: "remove-line-breaks",
  slug: "pdf-copy-paste-line-breaks",
  title: "Why Copying From a PDF Adds Line Breaks (and the Fix)",
  description: "A PDF stores where each line sits on the page, not where paragraphs begin and end. Why copied text breaks mid-sentence, and how to rejoin it.",
  h1: "Why does copying from a PDF add line breaks?",
  dek: "What a PDF actually stores, why the viewer hands you one line at a time, and what else comes along with the breaks.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "A PDF records where each run of text sits on the page, not which lines form a paragraph. When you copy, the viewer rebuilds the text line by line and ends every visual line with a real line break. Rejoin the lines by turning single breaks into spaces while keeping blank lines as paragraph breaks.",
  sections: [
    {
      id: "what-a-pdf-stores",
      heading: "A PDF stores positions, not paragraphs",
      body: `A word processor file knows that a paragraph is a paragraph. You can make the window narrower and the text reflows, because the line endings are decided when the page is drawn, not stored in the file.

A PDF works the other way round. It is a fixed-layout format: the file says, in effect, "draw these characters in this font at this position on page 3". Microsoft's own description of PDF conversion puts it plainly: a PDF stores the location of text, pictures and vector graphics on a page, but not necessarily the relationships among them, and most PDFs carry no information about paragraphs, tables or columns.

So when you select text and press Copy, the viewer has to guess. It collects the characters in the selection, groups those that sit on the same baseline into a line, orders the lines from top to bottom, and writes them out one after another. Each line it found gets a line break at the end, because the viewer has no reliable way to tell a line that wraps from a line that ends a paragraph.

The result is text where every printed line is its own line:

\`\`\`
Copying from a PDF gives you one line of text for
every line on the page, so sentences break in the
middle wherever the original layout wrapped them.
\`\`\`

Some viewers try to rejoin lines on copy, and some PDFs include tags that describe reading order and structure. Results vary between viewers and between files, which is why the same document can paste cleanly from one app and badly from another.`,
    },
    {
      id: "what-else-comes-along",
      heading: "What else comes along with the line breaks",
      body: `The same guessing that adds breaks causes a handful of other problems. You will usually see several of them at once.

- **Columns interleaved.** In a two-column layout, a viewer that reads strictly by height can take one line from the left column, then the line beside it from the right column. Selecting one column at a time avoids most of it.
- **Headers, footers and page numbers mid-text.** Copy across a page boundary and the running header, the page number and any footnotes land in the middle of a sentence.
- **Hyphens at line ends.** If the document was hyphenated, \`format-\` and \`ting\` arrive on separate lines. Sometimes the hyphen is a visible character, sometimes a soft hyphen (U+00AD) that you cannot see but that still breaks search.
- **Ligatures.** Typeset PDFs often draw "fi", "fl" or "ff" as a single glyph. Copied text can contain the single ligature character (ﬁ), which looks right but does not match "fi" in a search, or lose the letters entirely.
- **Odd spacing.** Justified text and letter-spaced headings can come out with extra spaces between words, or with s p a c e d letters. Text placed as separate fragments can come out with no space between words at all.
- **Nothing at all.** A scanned PDF is a picture of a page. There is no text to copy until something runs character recognition (OCR) over it, and OCR output has one line per printed line, just like a normal PDF.

None of this means the PDF is broken. It is doing what the format was designed for, which is to look identical everywhere, at the cost of not knowing what its own text means.`,
    },
    {
      id: "how-to-fix-copied-text",
      heading: "How to fix text copied from a PDF",
      body: `For prose, the fix is to turn single line breaks into spaces and keep the blank lines between paragraphs. [Fix Copy-Paste Line Breaks](/remove-line-breaks) does exactly that, in your browser, with nothing uploaded:

1. Paste the copied text.
2. Every single line break becomes a space, so the wrapped lines rejoin into sentences.
3. A blank line stays a paragraph break, and three or more breaks in a row shrink to one blank line.
4. Copy the result. The counter above it shows how many breaks were fixed.

Where it gets things wrong, so you know what to check:

- **Hyphenated words** stay split: \`format- ting\`. The tool does not guess whether the hyphen belonged to the word. Search the result for a hyphen followed by a space and fix each one.
- **Paragraphs separated by a single break**, with no blank line between them, merge into one. Many PDFs separate paragraphs with indentation or spacing rather than an empty line, so check the result and split where needed.
- **Lists, addresses, verse and tables** are joined into one line. Paste those parts separately, or leave them out.
- **A space before the break** becomes a double space in the result.
- **Unicode separators** (U+2028 and U+2029), which some PDF tools emit, are not treated as breaks and are left in place.

Two companion fixes cover the other leftovers. [Remove invisible characters](/remove-invisible-characters) strips soft hyphens and other zero-width characters. [Fancy Text to Plain Text](/remove-fancy-text) turns ligature characters such as ﬁ back into separate letters; note that it also flattens superscripts and other compatibility characters, so run it only where you want plain letters.

If the text is going into Word, [fixing line breaks in Word](/remove-line-breaks/fix-line-breaks-in-word) shows the same repair with Find and Replace.`,
    },
    {
      id: "copy-cleaner-in-the-first-place",
      heading: "Getting cleaner text out of the PDF in the first place",
      body: `A few habits reduce the clean-up before it starts:

- **Copy one column, one page at a time.** Smaller selections mean fewer interleaved columns and no page furniture in the middle of the text.
- **Try another viewer.** Browsers, system PDF viewers and dedicated PDF apps each rebuild text differently. If one gives you scrambled columns, another may not.
- **Open the PDF in Word.** In Word, **File > Open** and pick the PDF. Word converts a copy (the original file is untouched) and uses its own rules to rebuild paragraphs, headings, lists and tables. Microsoft says this works best on files that are mostly text, such as business, legal or scientific documents, and lists elements that convert poorly, including tables with cell spacing, footnotes that span pages, endnotes and frames. When it works, you get paragraphs instead of lines.
- **Use the source document if you can.** If the PDF was exported from a Word file, a web page or a slide deck, the original has real paragraphs. Asking for it is often faster than repairing a copy.

For tables in a PDF, expect the worst. The cells usually arrive as text separated by spaces, not tabs, so no paste will split them into columns reliably. Opening the PDF in Word, or a spreadsheet's own PDF import if it has one, is a better route than copy and paste.`,
    },
    {
      id: "when-to-keep-the-breaks",
      heading: "When the line breaks should stay",
      body: `Not every break in copied PDF text is a mistake. Before removing them, think about what the text is:

- **Code and command lines.** Line breaks are part of the meaning. Joining them breaks the code.
- **Poetry and lyrics.** The line is the unit. Keep the breaks and remove only the page furniture.
- **Addresses, signatures and contact blocks.** Each line is a separate field.
- **Data.** Each line may be a record. Joining the lines destroys the rows.

For mixed documents, fix the prose and the structured parts separately: paste the paragraphs through the line-break tool, and copy lists or code on their own. The [guide to line breaks](/remove-line-breaks/what-are-line-breaks) explains the characters involved (LF, CRLF and the Unicode separators) if a paste behaves in a way you do not expect.

Source for how PDF stores text and how Word converts it: Microsoft Support, [Opening PDFs in Word](https://support.microsoft.com/en-us/word/opening-pdfs-in-word), checked October 2026.`,
    },
  ],
  faqs: [
    {
      question: "Why does PDF text paste with a line break after every line?",
      answer: "The viewer rebuilds the text from character positions and ends each visual line with a break, because the PDF does not record where paragraphs end. Turning single breaks into spaces and keeping blank lines repairs most prose.",
    },
    {
      question: "Why do PDF columns get mixed up when I copy?",
      answer: "The viewer orders text by position. In a two-column layout it can read across the page, taking a line from each column in turn. Select and copy one column at a time, or try a different PDF viewer.",
    },
    {
      question: "Why does a word copied from a PDF not match in search?",
      answer: "It may contain a ligature character such as ﬁ instead of the letters f and i, or a hidden soft hyphen. Convert ligatures to plain letters and strip invisible characters, and the search will match.",
    },
    {
      question: "Can I copy text from a scanned PDF?",
      answer: "Not until it has been through optical character recognition (OCR). A scanned page is an image. OCR output keeps one line per printed line, so it needs the same line-break repair as any other PDF text.",
    },
    {
      question: "Does opening a PDF in Word fix the line breaks?",
      answer: "Often, for text-heavy documents. Word converts a copy of the PDF and tries to rebuild paragraphs. Complex layouts, footnotes and tables can still come out wrong, so check the result.",
    },
  ],
  relatedTools: ["remove-line-breaks", "remove-invisible-characters", "remove-fancy-text"],
  relatedGuides: ["invisible-unicode-characters", "no-text-could-be-extracted"],
};
