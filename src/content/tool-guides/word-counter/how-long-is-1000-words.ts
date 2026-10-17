import type { ToolGuide } from "../../../lib/tool-guides";

export const howLongIs1000Words: ToolGuide = {
  parentTool: "word-counter",
  slug: "how-long-is-1000-words",
  title: "How Long Is 1,000 Words? Pages, Reading and Speaking Time",
  description: "1,000 words is about 2 single-spaced or 4 double-spaced pages, about 4 minutes of silent reading and 5½ to 7 minutes spoken aloud. Sources included.",
  h1: "How long is 1,000 words?",
  dek: "In pages, in reading minutes and in speaking minutes, with the assumptions behind each number and where the numbers come from.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "1,000 words fills about 2 single-spaced or 4 double-spaced pages in 12-point Times New Roman with 1-inch margins. An average adult reads it silently in about 4 minutes. Read aloud or presented, it takes roughly 5½ to 7 minutes, depending on pace.",
  sections: [
    {
      id: "pages",
      heading: "1,000 words in pages",
      body: `The usual conversion is 500 words per single-spaced page and 250 per double-spaced page, for 12-point Times New Roman with 1-inch margins and ordinary paragraphs ([Howard Community College library FAQ](https://howardcc.libanswers.com/faq/69833)). That makes 1,000 words:

| Formatting | Pages for 1,000 words |
| --- | --- |
| Single-spaced, 12 pt Times New Roman, 1-inch margins | about 2 |
| 1.5-spaced, same font and margins | about 3 |
| Double-spaced, same font and margins | about 4 |

The 1.5-spaced row is arithmetic from the other two, not a separately measured figure.

Change the setup and the page count changes with it. Some departments count 300 words per double-spaced page rather than 250 ([CU Denver history writing guide, PDF](https://clas.ucdenver.edu/history/content/helpful-intro-writing-historical-papers)), which would make 1,000 words closer to 3⅓ pages. Wider fonts such as Arial, extra space after paragraphs, headings, bullet lists and a title block all push it the other way. The full list of what moves the number is in [how many words are on a page](/word-counter/words-per-page).

If a page limit is strict, set the required format in your word processor and look at its page count. A word count cannot see your layout.`,
    },
    {
      id: "reading-time",
      heading: "How long it takes to read 1,000 words",
      body: `The best single source on reading speed is a 2019 meta-analysis by the psychologist Marc Brysbaert, which pooled 190 studies with 18,573 participants. It estimates that adults reading English silently average **238 words per minute for non-fiction** and **260 words per minute for fiction** ([Brysbaert, 2019, Journal of Memory and Language](https://biblio.ugent.be/publication/8647789)).

At those rates, 1,000 words takes:

| Kind of text | Average rate | Time for 1,000 words |
| --- | --- | --- |
| Non-fiction (articles, reports, essays) | 238 wpm | about 4 min 12 s |
| Fiction | 260 wpm | about 3 min 50 s |

These are averages for fluent adult readers of their first language. Individuals vary a lot around them. Dense technical material, a second language, careful study or proofreading are all slower: the same paper cites a study in which participants *studied* text at 54 words per minute against 189 when simply reading matched texts. Skimming is faster but is not really reading.

So "about four minutes" is a fair answer for an ordinary reader and an ordinary article. For a reader who has to understand every sentence of a contract, plan on several times that.`,
    },
    {
      id: "speaking-time",
      heading: "How long it takes to say 1,000 words",
      body: `Speech is slower than silent reading. The same meta-analysis puts the average rate for **reading aloud** at 183 words per minute, based on 77 studies, and notes that audiobooks are narrated at **140 to 180 words per minute** ([Brysbaert, 2019](https://biblio.ugent.be/publication/8647789)).

| Way of delivering it | Rate | Time for 1,000 words |
| --- | --- | --- |
| Reading aloud at a natural pace | 183 wpm | about 5½ min |
| Audiobook narration, faster end | 180 wpm | about 5½ min |
| Audiobook narration, slower end | 140 wpm | about 7 min |

A speech or presentation usually lands somewhere in that 5½ to 7 minute band, and often longer. Speakers pause for slides, for emphasis, for laughs and for questions, and nervous speakers tend to rush. If you have a hard time slot, read the script aloud with a timer once; it beats any formula.

Working backwards is useful too. A 5-minute talk at 140 to 183 words per minute is roughly 700 to 900 words of script. A 10-minute talk is roughly 1,400 to 1,800.`,
    },
    {
      id: "what-the-counter-shows",
      heading: "What the Word Counter's reading time means",
      body: `The [Word & Character Counter](/word-counter) shows a reading time next to the word count. It divides the word count by **220 words per minute** and rounds up to the next whole minute, with a minimum of one minute. For 1,000 words that gives 5 minutes.

That is deliberately a little conservative. At Brysbaert's 238 words per minute for non-fiction, 1,000 words takes about 4.2 minutes; the counter's slower rate and the rounding up both add time. Treat its figure as "allow this long" rather than an exact prediction, and use the tables above when you need a tighter estimate or a speaking time, which the counter does not show.

How the counter decides what a word is also affects every number on this page:

- A word is any run of characters between spaces, so "e-mail", "don't", a URL and a number each count once.
- Markdown symbols count. A "##" heading marker or a "-" bullet marker standing on its own is one word each, so text pasted straight from ChatGPT reads a little high. [Remove Markdown Formatting](/remove-markdown-formatting) strips those first.
- Languages written without spaces, such as Chinese and Japanese, count a whole run as one word; use the character count for those.

Everything runs in your browser, so you can paste drafts, client work or exam answers without uploading them.`,
    },
    {
      id: "what-1000-words-looks-like",
      heading: "What 1,000 words looks like in practice",
      body: `Some reference points, so the number feels less abstract:

- **This page.** The five sections of this page, without the summary and the questions at the end, come to just under 1,000 words. Most readers get through them in four or five minutes.
- **A typical school essay.** Assignments of 1,000 words usually mean an introduction, three or four body paragraphs and a conclusion. At 150 to 200 words per paragraph, that is five to seven paragraphs.
- **A blog post or newsletter.** Long enough to explain one idea properly with an example or two; short enough to read in one sitting.
- **A cover letter.** Far too long. Most cover letters should be well under half of it.
- **A prompt for an AI model.** About 1,000 words is a modest prompt. The [token counter](/token-counter) estimates how many tokens it uses; tokens and words are not the same unit, as [how many tokens is my prompt](/guides/prompt-token-count-explained) explains.

If you are writing to a word limit, check the count on the final version, after edits and after any formatting cleanup, since both change it.`,
    },
  ],
  faqs: [
    {
      question: "How many pages is 1,000 words double-spaced?",
      answer: "About 4 pages in 12-point Times New Roman with 1-inch margins, using the standard 250 words per double-spaced page. If your department counts 300 words per page, it is closer to 3⅓.",
    },
    {
      question: "How long does it take to read 1,000 words?",
      answer: "About 4 minutes for an average adult reading non-fiction silently at 238 words per minute, and slightly less for fiction. Careful study or technical material takes several times longer.",
    },
    {
      question: "How long is a 1,000-word speech?",
      answer: "Roughly 5½ to 7 minutes at 140 to 183 words per minute, the range for reading aloud and audiobook narration. Pauses, slides and questions add more, so time a rehearsal.",
    },
    {
      question: "Why does the Word Counter say 5 minutes for 1,000 words?",
      answer: "It divides by 220 words per minute and rounds up to a whole minute, which gives 5. Measured average silent reading for non-fiction is a little faster, about 4.2 minutes, so the counter's figure is a slightly generous allowance.",
    },
    {
      question: "How many paragraphs is 1,000 words?",
      answer: "Usually five to seven paragraphs of 150 to 200 words each. Short web paragraphs and dialogue make it many more.",
    },
  ],
  relatedTools: ["word-counter", "token-counter", "remove-markdown-formatting"],
  relatedGuides: ["prompt-token-count-explained"],
};
