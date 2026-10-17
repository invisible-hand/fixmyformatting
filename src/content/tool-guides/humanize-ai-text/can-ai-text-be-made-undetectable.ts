import type { ToolGuide } from "../../../lib/tool-guides";

export const canAiTextBeMadeUndetectable: ToolGuide = {
  parentTool: "humanize-ai-text",
  slug: "can-ai-text-be-made-undetectable",
  title: "Can AI Text Be Made Undetectable? An Honest Answer",
  description: "No tool can promise undetectable AI text, and no detector can prove authorship. Why detectors err both ways and what formatting cleanup really changes.",
  h1: "Can AI text be made undetectable?",
  dek: "Why neither side of this arms race can make the promise it is selling.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Not reliably, and not by any tool that can promise it. AI detectors guess from style and make mistakes in both directions: they flag some human writing and miss some machine writing. Heavy rewriting can change a score, but nothing guarantees a result. Formatting cleanup removes visible tells like em dashes and hidden characters; it does not evade detection.",
  sections: [
    {
      id: "how-detection-works",
      heading: "What a detector is actually measuring",
      body: `There are two different things people mean by "detecting" AI text, and they work in completely different ways.

**Style-based detectors** are the commercial tools schools, publishers and recruiters paste text into. They do not know who wrote anything. They are classifiers trained to estimate whether a passage resembles the statistical patterns of machine-written text: how predictable each next word is, how evenly sentence lengths are spread, which phrases recur. The output is a probability, often shown as a percentage, and it is an estimate about style.

**Watermarks** are different. A provider can nudge its model's word choices during generation in a pattern only its own detector can read. Whether a given model does this, and whether anyone outside the provider can check it, varies by company and changes over time; our guide to [AI text watermarks](/guides/ai-text-watermarks) tracks which providers have announced what. A watermark is a statistical signal spread across many word choices, so it needs a reasonable length of text to read and weakens as more of the words are changed.

Neither method reads the visible formatting of a text in any decisive way, which matters for what a formatting tool can and cannot do.`,
    },
    {
      id: "detectors-are-unreliable",
      heading: "Detectors are unreliable in both directions",
      body: `The strongest evidence against treating a detector score as proof comes from people with every reason to want detection to work. Wikipedia's editors, who spend a lot of effort cleaning up undisclosed AI-written articles, tell contributors in their guidance on [signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) not to rely solely on detection tools: the tools "perform better than random chance" but "have non-trivial error rates", and can be thrown off by "text modifications (e.g. paraphrasing, markup, and spacing changes)" and by models the detector was not trained on. The same page says a high detector percentage is not, on its own, valid grounds for deleting an article.

Errors run both ways:

- **False positives.** Careful, formal, evenly structured writing looks statistically similar to model output. That puts people at risk who write in a drilled, regular style, including many non-native English speakers and anyone who learned to write from templates. Our guide to [signs of AI-written text](/guides/signs-of-ai-written-text) covers why the same tells appear in human writing.
- **False negatives.** Text that has been edited, mixed with human writing, or produced by a model the detector has not seen can score as human.

People are not much better. The same Wikipedia page cites a 2025 study finding human ability to tell LLM text from human text no better than chance, and a preprint in which a group of experienced annotators did well while infrequent AI users did only slightly better than chance.`,
    },
    {
      id: "what-formatting-cleanup-changes",
      heading: "What formatting cleanup changes, and what it does not",
      body: `The [AI Formatting Humanizer](/humanize-ai-text) is a formatting tool. It replaces em dashes with commas, straightens curly quotes, removes invisible characters and emoji, converts pseudo-font letters back to plain ones, and tidies spacing. It never changes a word.

That removes the tells a human reader notices at a glance, and the hidden characters that can cause trouble in forms, code and search. It does not change the things style-based detectors weigh most: the words chosen, their order, and the shape of the sentences. Because Wikipedia's guidance mentions markup and spacing changes as something that can affect detectors, a score may move after any edit, including this one. That is a sign of how fragile the scores are, not a way to beat them, and the tool makes no claim either way.

[De-slop](/de-slop) goes further: it rewrites the stock phrasing and structural habits of model output. That changes the text more, and scores usually move more as a result. It is still an editor, not an evasion tool, and its own FAQ says no promise is made about detectors.

The kinds of change that most alter how a text reads, to a person or a classifier, are the ones no tool can make for you: adding your own examples and numbers, taking a position, cutting what you would not have written, and rewriting in your own words. At that point the text is substantially yours.`,
    },
    {
      id: "why-guarantees-are-false",
      heading: "Why any \"100% undetectable\" promise is false",
      body: `Services that promise undetectable output are making a claim nobody can check in advance:

- There are many detectors, each with its own model and threshold, and they are retrained. Passing one today says little about another, or about the same one next month.
- Detectors return probabilities. A text can score low on one run and higher after a small change to a single paragraph.
- Watermarks, where they exist, are read by the provider's own tool, which the person promising "undetectable" usually cannot run.
- Paraphrasing tools that push hard against detectors tend to damage the writing: odd synonyms, broken idioms, lost meaning. The text becomes harder to flag and worse to read.

The honest position is the symmetrical one. A detector cannot prove that you used AI, and a rewriting tool cannot prove that you did not.`,
    },
    {
      id: "what-to-do-instead",
      heading: "What to do instead",
      body: `**If you are allowed to use AI**, follow the disclosure rules of wherever the text is going: a school's academic integrity policy, a publisher's guidelines, an employer's rules. Use the tools to clean and edit, then make the substance your own. Disclosure ends the question in a way no score can.

**If you are not allowed to use AI**, no cleanup changes that. Formatting tools do not make text yours.

**If you are accused on the strength of a detector score**, the useful evidence is process, not another score. Version history in Google Docs or Word, earlier drafts, notes, research tabs and the ability to discuss the work all show how it was written. Point to published guidance, such as the Wikipedia page above, that detector results carry real error rates and should not be used alone.

**If you review other people's writing**, treat a detector score as a reason to look more closely, not a verdict. Look for specifics only the author could know, and ask about the work directly.`,
    },
  ],
  faqs: [
    {
      question: "Do AI detectors work?",
      answer:
        "Partly. They do better than random chance but have real error rates in both directions, flagging some human writing as AI and missing some AI writing. Wikipedia's editorial guidance tells editors not to rely on them alone.",
    },
    {
      question: "Does removing em dashes make AI text undetectable?",
      answer:
        "No. Em dashes are a tell human readers notice, but style-based detectors weigh word choice and sentence structure far more. Removing dashes makes text look less obviously machine-formatted; it does not change what the text says or how it was produced.",
    },
    {
      question: "Can teachers prove a student used ChatGPT?",
      answer:
        "Not from a detector score alone. A score is a probability about style, not proof of authorship. Evidence about the writing process, such as drafts and version history, and a conversation about the work are far more reliable.",
    },
    {
      question: "Is it allowed to use a humanizer tool?",
      answer:
        "That depends on the rules where the text is going, not on the tool. Cleaning formatting in your own AI-assisted writing is fine where AI use is permitted. Where AI use is banned or must be disclosed, cleaning the text does not change those obligations.",
    },
    {
      question: "Can watermarked AI text be cleaned?",
      answer:
        "Formatting cleanup does not remove a generation-time watermark, because the mark lives in the word choices rather than in any added character. Substantial rewriting weakens it. The AI text watermarks guide covers which providers use one.",
    },
  ],
  relatedTools: ["humanize-ai-text", "de-slop", "clean-ai-text", "remove-invisible-characters"],
  relatedGuides: ["ai-text-watermarks", "signs-of-ai-written-text"],
};
