import type { ToolGuide } from "../../../lib/tool-guides";

export const wordsPerPage: ToolGuide = {
  parentTool: "word-counter",
  slug: "words-per-page",
  title: "How Many Words Are on a Page? Single vs Double Spaced",
  description: "About 500 words single-spaced and 250 double-spaced, in 12-point Times New Roman with 1-inch margins. What changes the number, and how to estimate pages.",
  h1: "How many words are on a page?",
  dek: "The rule of thumb, the formatting it assumes, and the settings that move it by a hundred words or more.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "About 500 words on a single-spaced page and about 250 on a double-spaced page. Those figures assume 12-point Times New Roman, 1-inch margins and ordinary paragraphs with few headings or lists. A different font, size, spacing or margin can move the count by a hundred words or more, so treat it as an estimate.",
  sections: [
    {
      id: "the-rule-of-thumb",
      heading: "The rule of thumb and where it comes from",
      body: `The figure most teachers, editors and style guides work from is **250 words per double-spaced page** and **500 words per single-spaced page**. Howard Community College's library spells out the assumptions behind it: a page with 1-inch margins, 12-point Times New Roman and "minimal spacing elements" holds about 500 words single-spaced and 250 double-spaced ([Howard Community College library FAQ](https://howardcc.libanswers.com/faq/69833)). Oregon State University's Writing Intensive Curriculum program uses the same conversion, counting "one typed double-spaced page of 12 pt. text" as approximately 250 words ([Oregon State WIC word count table](https://wic.oregonstate.edu/word-count-table)).

Not everyone agrees on the exact number. The history department at the University of Colorado Denver tells its students that Times New Roman at 12 points produces "about 300 words per double-spaced page" ([CU Denver history writing guide, PDF](https://clas.ucdenver.edu/history/content/helpful-intro-writing-historical-papers)). Both figures are reasonable; they describe pages with different amounts of white space. Dense paragraphs of long sentences pack more words onto a page than dialogue, short paragraphs or frequent headings.

The practical rule: when an assignment or a publisher gives a page count, ask for a word count instead, or convert at 250 words per double-spaced page and expect the real figure to fall somewhere around it.`,
    },
    {
      id: "standard-assumptions",
      heading: "The formatting the number assumes",
      body: `Each part of the standard setup affects how many words fit, so it is worth knowing what "standard" means:

| Setting | Standard assumption | Why it matters |
| --- | --- | --- |
| Font | Times New Roman | A narrow serif face; wider fonts fit fewer words per line |
| Size | 12 point | Larger type means fewer words per line and fewer lines |
| Line spacing | Double (or single) | Double spacing halves the number of lines on the page |
| Margins | 1 inch on every side | Wider margins shrink the text area |
| Layout | Plain paragraphs | Headings, lists, block quotes and blank lines all take space |

These match the defaults of the major academic styles. APA Style asks for double spacing throughout, "including the abstract; text; block quotations" and the reference list, with no extra space before or after paragraphs ([APA Style: line spacing](https://apastyle.apa.org/style-grammar-guidelines/paper-format/line-spacing)). APA no longer insists on Times New Roman, though: it accepts 12-point Times New Roman, 11-point Georgia, 11-point Calibri, 11-point Arial, 12-point Aptos and several others ([APA Style: font](https://apastyle.apa.org/style-grammar-guidelines/paper-format/font)). Those fonts do not all fit the same number of words on a page, which is one reason a "4-page paper" can mean different lengths in different classes.`,
    },
    {
      id: "what-changes-the-count",
      heading: "What changes the count",
      body: `**Font.** Typefaces differ in width even at the same point size. Sans-serif fonts such as Arial are wider per character than Times New Roman, so the same text runs longer. Microsoft made Aptos the default font in Word and the other Microsoft 365 apps, replacing Calibri, in a change announced in July 2023 ([The Verge](https://www.theverge.com/2023/7/13/23793428/microsoft-aptos-new-default-font-office-365)). If you type into a new Word document without changing anything, you are not writing in the font the 250-word rule assumes.

**Line spacing.** Going from single to double spacing halves the lines on a page, which is why the two standard figures differ by a factor of two. At 1.5 spacing, the same arithmetic gives roughly 330 words per page. Many word processors also add space after every paragraph by default, which removes a few more lines; APA, for one, asks you to turn that off.

**Margins and paper size.** Every extra quarter-inch of margin narrows each line and shortens the page. US Letter and A4 are close enough in area that the difference is small next to the effect of font and spacing, but it is not zero.

**Layout.** Headings, bullet lists, block quotes, tables, figures, short dialogue lines and a title block on page one all hold fewer words than solid paragraphs. A page of bullet points can hold half the words of a page of prose.

**Language and content.** Long technical words, numbers and citations change the average word length and so the number of words per line.`,
    },
    {
      id: "how-to-estimate-pages",
      heading: "How to estimate pages from a word count",
      body: `Divide by 250 for double-spaced pages or by 500 for single-spaced pages, then round up.

| Words | Single-spaced pages | Double-spaced pages |
| --- | --- | --- |
| 250 | ½ | 1 |
| 500 | 1 | 2 |
| 750 | 1½ | 3 |
| 1,000 | 2 | 4 |
| 1,500 | 3 | 6 |
| 2,000 | 4 | 8 |
| 2,500 | 5 | 10 |
| 5,000 | 10 | 20 |

All of these rest on the 250 and 500 figures above, so they share the same caveats. For a single question such as [how long 1,000 words is](/word-counter/how-long-is-1000-words) in pages and minutes, see the companion page.

If the exact page count matters, for example a strict page limit, the only reliable check is to set the required font, size, spacing and margins in your word processor and look at the page count it shows. A word count tells you how much you wrote; the page count depends on how it is laid out.`,
    },
    {
      id: "counting-words-accurately",
      heading: "Getting an accurate word count first",
      body: `The page estimate is only as good as the word count you start from. Paste your text into the [Word & Character Counter](/word-counter) to get words, characters, sentences and a reading time. It runs in your browser and the text is not uploaded.

Know how it counts, because counters disagree at the edges:

- **A word is anything between spaces.** "E-mail" and "don't" are one word each; a web address is one word; a number is a word.
- **Stray symbols count.** A dash standing alone between spaces, or the hyphen at the start of a Markdown bullet, counts as a word. Text pasted from ChatGPT with ## headings and - bullets will read slightly high; run it through [Remove Markdown Formatting](/remove-markdown-formatting) first for a cleaner number.
- **Languages without spaces.** Chinese, Japanese and Thai are not written with spaces between words, so a run of them counts as one word. Use the character count for those.
- **Characters.** The character count includes spaces and line breaks, and an emoji or other symbol outside the basic Unicode range counts as two characters or more.
- **No page count.** The counter does not estimate pages, because it cannot know your font or spacing. Use the division above.

Word, Google Docs and other counters can differ from this one by a few words on the same text because they treat dashes, symbols and attached punctuation differently. For a hard limit, use the counter the assignment or submission system uses.`,
    },
  ],
  faqs: [
    {
      question: "How many words is a double-spaced page?",
      answer: "About 250 words in 12-point Times New Roman with 1-inch margins. Some departments use 300; dense prose fits more, and headings, lists and short paragraphs fit fewer.",
    },
    {
      question: "How many words is a single-spaced page?",
      answer: "About 500 words with the same font, size and margins. It is twice the double-spaced figure because single spacing fits twice as many lines on the page.",
    },
    {
      question: "How many pages is 2,000 words?",
      answer: "About 4 pages single-spaced or 8 pages double-spaced at the standard settings. Check the real count in your word processor if a page limit is strict.",
    },
    {
      question: "Does Arial take up more space than Times New Roman?",
      answer: "Yes. At the same point size Arial's letters are wider, so each line holds fewer words and the same text runs to more pages. APA Style lists Arial at 11 points rather than 12.",
    },
    {
      question: "Can the Word Counter tell me how many pages I have written?",
      answer: "No. It counts words, characters and sentences and estimates reading time, but page count depends on font, spacing and margins it cannot see. Divide the word count by 250 for double-spaced pages or 500 for single-spaced.",
    },
  ],
  relatedTools: ["word-counter", "remove-markdown-formatting", "token-counter"],
  relatedGuides: ["prompt-token-count-explained"],
};
