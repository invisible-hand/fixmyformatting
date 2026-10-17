import type { ToolGuide } from "../../../lib/tool-guides";

export const howToHumanizeAiText: ToolGuide = {
  parentTool: "humanize-ai-text",
  slug: "how-to-humanize-ai-text",
  title: "How to Humanize AI Text: Formatting, Wording, Substance",
  description: "Humanizing AI text takes three passes: strip formatting artifacts, edit stock phrasing, add what only you know. What each step fixes and what it cannot.",
  h1: "How do I humanize AI text?",
  dek: "Three passes, from mechanical to personal, and an honest account of which ones a tool can do for you.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Work in three passes. First remove the formatting artifacts: em dashes, curly quotes, hidden characters, emoji, fancy fonts. Then edit the wording: cut stock phrases, padded lists of three, and summary closers. Finally add what only you know: specific examples, numbers, opinions and your own phrasing. Tools handle the first pass well; the last one is yours.",
  sections: [
    {
      id: "what-humanizing-means",
      heading: "What \"humanizing\" actually has to fix",
      body: `Text from a chatbot reads as machine-made for three different reasons, and they need different fixes.

1. **Formatting.** Characters people rarely type by hand: em dashes everywhere, typographic curly quotes in a plain-text field, emoji used as bullets, bold Unicode "fonts", and invisible characters picked up on the way through a chat interface. These are mechanical and can be fixed mechanically.
2. **Wording and structure.** The stock vocabulary ("delve", "seamless", "a testament to"), the "not just X but Y" construction, lists padded to three items, a closing sentence that restates the paragraph. These need an edit, by a person or by a model told exactly what to change.
3. **Substance.** Generic claims where a person would give a specific example; balanced, hedged statements where a person would take a position; nothing that could only have come from the writer's own experience. No tool can supply this, because the missing material is in your head, not in the text.

Most "humanizer" products only address one of the three, and often blur which one. Knowing which layer a tool touches tells you what to expect from it.`,
    },
    {
      id: "pass-one-formatting",
      heading: "Pass 1: clean the formatting",
      body: `Paste the text into the [AI Formatting Humanizer](/humanize-ai-text). It runs in your browser, does not upload anything, and makes one pass over the characters:

- Em dashes become commas, and the space before the dash is removed, so "fast — and cheap" becomes "fast, and cheap".
- Curly double and single quotes become straight ones.
- Zero-width spaces, soft hyphens, byte-order marks, word joiners and direction marks are deleted.
- No-break spaces become ordinary spaces.
- Emoji, along with their skin-tone and variation modifiers, are removed.
- Pseudo-font letters (𝗯𝗼𝗹𝗱, 𝘪𝘵𝘢𝘭𝘪𝘤, ꜱᴍᴀʟʟ ᴄᴀᴘꜱ, ｆｕｌｌｗｉｄｔｈ) are mapped back to plain letters.
- Runs of spaces and tabs collapse to one space, and trailing spaces are trimmed from each line.

The report beside the result counts what it changed: em dashes, smart quotes, hidden characters, emoji and converted characters. Every word stays where it was. Our guide to [why ChatGPT uses so many em dashes](/guides/why-chatgpt-uses-em-dashes) explains why the dash is the most noticed of these.`,
    },
    {
      id: "where-the-formatting-pass-goes-wrong",
      heading: "Where the formatting pass gets things wrong",
      body: `The rules are blunt by design, so check the output in these cases:

- **A comma is not always the right replacement for a dash.** A dash that set off an aside in the middle of a sentence can leave a comma splice or an unclosed clause. Read each changed sentence; sometimes a full stop or parentheses is better. If you want to choose the replacement yourself, [Remove Em Dashes](/remove-em-dashes) lets you pick comma, semicolon, hyphen or nothing.
- **Lines that start with a dash join the line above.** Because the space before a dash is removed, a line opening with an em dash (some dialogue styles and lists use one) is pulled up onto the previous line.
- **Compatibility characters are flattened.** The pseudo-font step uses Unicode normalization, which also turns an ellipsis character into three full stops, superscripts into ordinary digits (x² becomes x2, footnote markers lose their position), ½ into 1⁄2, "ﬁ" ligatures into "fi", and full-width punctuation in Chinese or Japanese text into its narrow ASCII form.
- **Some symbols are treated as emoji.** © and ® are deleted along with the emoji; ™ becomes "TM".
- **Joiners can matter.** The zero-width non-joiner is needed for correct spelling in Persian and some Indic scripts, and direction marks can matter in mixed Arabic or Hebrew and English text. The tool removes them anyway.
- **Indentation is lost.** Collapsing repeated spaces flattens code indentation and space-aligned tables. Leave code blocks out of the paste.

None of this changes your meaning, but proofread before you send.`,
    },
    {
      id: "pass-two-wording",
      heading: "Pass 2: edit the wording",
      body: `Formatting is the easy part and the least important. Readers mostly notice phrasing. Go through the text looking for:

- **Stock vocabulary**: delve, tapestry, landscape, navigate, leverage, robust, seamless, pivotal, foster, "in today's fast-paced world". Use the plain word or delete the phrase.
- **Negative parallelism**: "it's not just X, it's Y". Say Y.
- **Padded triads**: three adjectives or three nouns where one carries the meaning.
- **Empty significance**: "plays a crucial role", "highlighting the importance of". Replace with the fact, or cut.
- **Signposting and closers**: "let's break it down", "in conclusion", a last line that repeats the paragraph, "I hope this helps".

You can do this by hand, or paste the text into [De-slop](/de-slop), which sends it to a language model with an editing brief built from published catalogues of these patterns and returns the same text with them removed. Unlike the formatting pass, De-slop does upload the text (to OpenAI's API), takes up to 8,000 characters per run, and allows a few runs per hour. Tick "Show what changed" and review the diff; a model edit can misjudge a phrase you meant. The [signs of AI-written text](/guides/signs-of-ai-written-text) guide covers the patterns in more depth.`,
    },
    {
      id: "pass-three-substance",
      heading: "Pass 3: add what only you know",
      body: `After two passes the text is cleaner, but it can still read as generic, because it is. A model writes the most probable version of a sentence; people write the specific one. The fix is content, not style:

- Replace one general claim per paragraph with a concrete example: a number you measured, a customer you spoke to, a mistake you made.
- Take a position where the draft hedges. If you would recommend one option, say which and why.
- Cut the paragraph you would not have thought to write yourself. Drafts from a model often cover every angle evenly; a person usually skips the obvious ones.
- Read it aloud. Anything you would not say in a conversation, rewrite in the words you would use.

This pass is also the one that matters for honesty. If the text is going out under your name, it should say what you think. Running a formatting cleaner does not change who wrote it, and the tool page says plainly that detectors score word choice and structure, which the formatting pass does not touch. For that question, see [Can AI text be made undetectable?](/humanize-ai-text/can-ai-text-be-made-undetectable)`,
    },
  ],
  faqs: [
    {
      question: "Does the AI Formatting Humanizer rewrite my text?",
      answer:
        "No. It changes characters, not words: dashes, quotes, invisible characters, emoji, pseudo-fonts and spacing. Every word stays in the same place. For wording changes, use De-slop or edit by hand.",
    },
    {
      question: "Is my text uploaded when I use the humanizer?",
      answer:
        "No. The AI Formatting Humanizer runs entirely in your browser. De-slop is the exception on this site: it sends your text to OpenAI's API for the edit and does not store the input or output.",
    },
    {
      question: "Should I run De-slop or the humanizer first?",
      answer:
        "De-slop first, because it changes the wording, then the humanizer to catch any smart quotes, hidden characters or pseudo-fonts that remain. Then do your own read-through and add specifics.",
    },
    {
      question: "Will humanized text pass an AI detector?",
      answer:
        "There is no guarantee. Detectors score word choice and sentence structure, which formatting cleanup does not change, and they make mistakes in both directions. Editing the wording and adding your own substance changes the text more than any formatting pass.",
    },
    {
      question: "Why does the tool turn em dashes into commas?",
      answer:
        "A comma is the replacement that fits most often in AI-written sentences, where the dash usually marks a pause. It is not always right, so read the changed sentences. Remove Em Dashes lets you choose a semicolon, hyphen or nothing instead.",
    },
  ],
  relatedTools: ["humanize-ai-text", "de-slop", "remove-em-dashes", "clean-ai-text"],
  relatedGuides: ["signs-of-ai-written-text", "why-chatgpt-uses-em-dashes"],
};
