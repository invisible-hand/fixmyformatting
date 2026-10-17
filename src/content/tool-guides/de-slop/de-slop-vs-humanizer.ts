import type { ToolGuide } from "../../../lib/tool-guides";

export const deSlopVsHumanizer: ToolGuide = {
  parentTool: "de-slop",
  slug: "de-slop-vs-humanizer",
  title: "De-slop vs Humanizer: Two Ways to Clean Up AI Text",
  description: "De-slopping edits the wording that reads as machine-written. The humanizer here only fixes characters: dashes, quotes, hidden Unicode, emoji, fake fonts.",
  h1: "What is the difference between de-slopping and humanizing AI text?",
  dek: "One edits sentences with a language model; the other swaps characters with fixed rules. What each tool on this site actually does, and what neither can promise.",
  cluster: "ai-tells",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "De-slopping edits the wording: it cuts the stock phrases and sentence patterns that make text read as machine-written, such as \"delve\" or \"not just X but Y\". Humanizing, as this site's AI Formatting Humanizer does it, never touches a word: it only normalizes characters such as em dashes, curly quotes, hidden Unicode, emoji and pseudo-fonts.",
  sections: [
    {
      id: "two-different-jobs",
      heading: "Two different jobs",
      body: `AI-written text gives itself away in two separate layers. The **characters** are one layer: em dashes everywhere, curly quotes, a zero-width space in the middle of a word, emoji bullets, 𝗯𝗼𝗹𝗱 letters that are really mathematical symbols. The **wording** is the other: "delve", "a testament to", "it's not just a tool, it's a mindset", every list padded to three items, a closing paragraph that restates the opening.

The two tools on this site each handle one layer:

| | [De-slop](/de-slop) | [AI Formatting Humanizer](/humanize-ai-text) |
| --- | --- | --- |
| What changes | Words, phrases and sentence shape | Punctuation, spacing and character encoding |
| How | A language model edits the text against a written brief | Fixed find-and-replace rules |
| Where it runs | On a server, via OpenAI's API | In your browser |
| Same input, same output? | Not guaranteed; a model can vary between runs | Yes, always |
| Limits | 8,000 characters per run, a few runs per hour | None |
| Words changed | Yes, that is the point | Never |

The word "humanizer" means different things on different sites. Elsewhere it is often used for rewriting tools sold on the promise of getting text past AI detectors. The tool called a humanizer here is not that: it is a formatting cleanup and makes no detector claims.`,
    },
    {
      id: "what-the-humanizer-does",
      heading: "What the AI Formatting Humanizer does",
      body: `The [AI Formatting Humanizer](/humanize-ai-text) runs one fixed pass over the text, in your browser, and reports how many of each thing it changed:

- **Pseudo-fonts back to letters.** Bold, italic, script, small-caps and fullwidth Unicode "fonts" become ordinary letters, and decorative strikethrough and underline marks are dropped. This uses Unicode's standard compatibility normalization (NFKC) plus a small-caps table.
- **Em dashes become commas,** and the space that stood before the dash is removed so you do not get " ,".
- **Curly quotes and apostrophes become straight ones.**
- **Invisible characters are deleted:** zero-width spaces and joiners, soft hyphens, byte-order marks, and direction marks and overrides.
- **No-break spaces become ordinary spaces.**
- **Emoji are removed,** with their skin-tone and variation modifiers.
- **Whitespace is tidied:** runs of spaces and tabs collapse to one, and trailing spaces at line ends go.

Nothing else changes. Every word stays where it was, which makes the result predictable and safe for anything where wording is fixed: a quote, a legal clause, a résumé line, a translation you have already approved.

The rules are blunt, so check the result where they can misfire:

- **A comma is not always the right replacement for a dash.** "The answer — if there is one — is no" becomes "The answer, if there is one, is no", which works; a dash that introduced a list or an aside may need a colon or a full stop instead.
- **Compatibility normalization goes beyond fancy fonts.** It also turns x² into x2, ½ into 1⁄2, ™ into TM and the ﬁ ligature into fi. For scientific text, run the narrower [Fancy Text to Plain Text](/remove-fancy-text) only where needed.
- **Some invisible characters are meaningful.** The zero-width non-joiner is part of correct spelling in Persian and some Indian scripts, and direction marks keep mixed Arabic or Hebrew and English text in order. The humanizer removes them all, so do not use it on those languages.
- **Every emoji goes,** including one that carried meaning.`,
    },
    {
      id: "what-de-slop-does",
      heading: "What De-slop does",
      body: `[De-slop](/de-slop) sends your text to a language model (an OpenAI model, through its API) together with an editing brief, and returns the edited text. The brief is built from three public catalogues of AI writing habits: Wikipedia's "Signs of AI writing" page, Simon Willison's LLM cliché highlighter, and the Claudisms banlist.

The brief tells the model what to **keep** before it says what to cut: every fact, number, name, date, URL and quotation exactly as written; the language of the input; the author's register and point of view; code and inline code character for character; paragraph order; Markdown that carries real structure such as a data table; and a length within about fifteen percent of the original.

It then asks the model to remove or rewrite patterns including:

- stock vocabulary such as delve, tapestry, testament, pivotal, robust, seamless and "in today's fast-paced world";
- empty significance: "plays a crucial role", "serves as a reminder";
- negative parallelism: "not just X but Y", "no fluff, no filler, no jargon";
- lists padded to three for rhythm;
- "serves as" and "boasts" where "is" and "has" would do;
- vague attribution such as "experts agree";
- staged reveals ("here's the thing", "turns out") and performative honesty ("let's be honest");
- canned outlooks ("despite these challenges, time will tell");
- decoration: emoji bullets, random bold, headings on a short note, em dashes as the default pause, curly quotes;
- chatbot residue: "Great question", "I hope this helps", tracking tags left in links.

If the text has none of these, it should come back unchanged. Tick **Show what changed** to see a word-level diff of the edit.`,
    },
    {
      id: "de-slop-limits",
      heading: "Where De-slop can go wrong",
      body: `De-slop is a language model following instructions, so it is less predictable than a find-and-replace rule:

- **It can miss things or over-edit.** A model may leave a tell in place, or cut a phrase you meant. Read the diff before you use the result.
- **It can, in principle, change a fact.** The brief forbids it and the examples show it, but no instruction makes a model infallible. Check numbers, names and quotations against the original, especially in anything you will publish or submit.
- **Your text leaves your browser.** It goes to OpenAI's API for the single edit. Fix My Formatting does not store the input or the output. Do not paste anything you are not allowed to share with a third-party service.
- **Runs are limited.** Each run costs money, so input is capped at 8,000 characters and each visitor gets a small number of runs per hour (as of 2026-10-17). Split longer documents into parts.
- **The "AI phrases removed" figure is a rough count.** It compares how often a list of English phrases appears before and after the edit. It is a before-and-after signal, not a detector score, and it undercounts other languages.

The humanizer has none of these limits, but it also cannot fix a single sentence of wording.`,
    },
    {
      id: "which-to-use",
      heading: "Which one to use, and in what order",
      body: `- **The words are fine, the characters are not:** text that you or an editor have already approved, quotes, code comments, or anything where a change of wording would matter. Use the [AI Formatting Humanizer](/humanize-ai-text) alone.
- **The text reads like a chatbot wrote it:** a draft post, an email or a report that sounds padded and generic. Use [De-slop](/de-slop).
- **Both:** run De-slop first, then the humanizer. De-slop already straightens quotes and thins out em dashes as part of its brief, and the humanizer then catches whatever is left, including hidden characters and pseudo-fonts a model might copy through untouched.
- **Only one specific artifact:** the single-purpose tools are more precise. [Remove Em Dashes](/remove-em-dashes) lets you choose the replacement, and [AI Text Cleaner](/clean-ai-text) counts artifacts before it cleans them.

To see exactly what either tool changed, paste the before and after into [Text Diff](/text-diff).`,
    },
    {
      id: "what-neither-does",
      heading: "What neither tool does",
      body: `Neither tool is designed to beat AI detectors, and neither makes a promise about them. The humanizer changes nothing that detectors measure in the wording. De-slop removes patterns that readers notice, and those overlap with what some detectors weigh, so scores may move; but detectors are unreliable in both directions. When OpenAI launched its own AI-text classifier in 2023, it reported that the classifier caught 26% of AI-written text while flagging human-written text as AI-written 9% of the time, and it withdrew the classifier on July 20, 2023, citing its low accuracy ([OpenAI](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/)).

Neither tool checks facts, adds sources or makes an argument better. They remove noise. Whether the text is right, and whether it says what you mean, is still your job. And if a school, publisher or employer asks you to disclose AI use, cleaning up the text does not change the answer. For the signs readers actually look for, see [seven signs text was written by AI](/guides/signs-of-ai-written-text).`,
    },
  ],
  faqs: [
    {
      question: "Does the AI Formatting Humanizer rewrite my text?",
      answer: "No. It changes characters only: em dashes, curly quotes, invisible Unicode, no-break spaces, emoji, pseudo-font letters and extra spaces. Every word stays in the same place.",
    },
    {
      question: "Will De-slop make my text pass an AI detector?",
      answer: "No promise is made. De-slop removes patterns human readers notice, which may move a detector score, but detectors are unreliable in both directions. It is an editing tool, not an evasion tool.",
    },
    {
      question: "Is my text uploaded when I use De-slop?",
      answer: "Yes. It is sent to OpenAI's API for the edit and the result comes back to your browser. Fix My Formatting does not store it. The humanizer and the other mechanical tools run entirely in your browser.",
    },
    {
      question: "Should I run De-slop or the humanizer first?",
      answer: "De-slop first, then the humanizer. De-slop edits wording and already handles most dashes and quotes; the humanizer then removes any hidden characters, pseudo-fonts or emoji that remain.",
    },
    {
      question: "Why does De-slop have a limit when the humanizer does not?",
      answer: "Every De-slop run is a paid call to a language model, so it is capped at 8,000 characters per run and a few runs per hour. The humanizer runs in your browser with fixed rules and costs nothing to run.",
    },
  ],
  relatedTools: ["de-slop", "humanize-ai-text", "clean-ai-text", "text-diff"],
  relatedGuides: ["signs-of-ai-written-text", "why-chatgpt-uses-em-dashes"],
};
