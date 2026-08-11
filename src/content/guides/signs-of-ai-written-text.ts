import type { GuideDefinition } from "../../lib/guides";

export const aiTells: GuideDefinition = {
  slug: "signs-of-ai-written-text",
  title: "7 Signs Text Was Written by AI",
  description: "The seven formatting and style patterns that show up in AI-generated text, how to check for each one, and why none of them is proof on its own.",
  h1: "Seven signs text was written by AI",
  dek: "Four you can measure, three you can only notice — and the honest limits of both.",
  cluster: "ai-tells",
  published: "2026-07-25",
  updated: "2026-07-25",
  answer:
    "The most reliable signs are mechanical: em dashes at a steady rate, curly smart quotes, invisible Unicode characters, and emoji-headed bullet lists. Style-level signs — hedging vocabulary, the 'not just X, but Y' construction, and unusually uniform paragraph lengths — are weaker. None of them proves anything on its own; they are patterns, not evidence.",
  sections: [
    {
      id: "mechanical-signs",
      heading: "The four mechanical signs you can actually measure",
      body: `These are countable. You can run them past a tool and get a number rather than an impression, which is what makes them more useful than vibes-based detection.

**1. Em dashes at a steady rate.** Chat models produce the em dash (—) far more consistently than people do, because typing one requires a keyboard shortcut most writers never learned. One or two in a long document is normal. Roughly one per paragraph, evenly spread, is not. The [em dash guide](/guides/why-chatgpt-uses-em-dashes) covers why the habit is so entrenched.

**2. Curly smart quotes and typographic punctuation.** AI output tends to arrive with directional quotation marks (" "), curly apostrophes ('), and a real ellipsis character (…) rather than three full stops. Word processors also produce these automatically, so they are only meaningful in contexts where autocorrect was never involved — a plain-text field, a code comment, a CSV file.

**3. Invisible Unicode characters.** Zero-width spaces, non-breaking spaces, and narrow no-break spaces frequently survive a copy-paste out of a chat window. They are undetectable by eye and are the single strongest mechanical marker, because almost nothing a human types by hand introduces them.

**4. Emoji-headed bullet lists.** Structured answers with a decorative emoji at the start of each bullet, section headers built from bold text rather than real headings, and lists nested three levels deep are a house style that chat interfaces encourage and most human writers do not use.`,
      figure: "ai-tells-panel",
    },
    {
      id: "stylistic-signs",
      heading: "The three stylistic signs — weaker, but worth knowing",
      body: `Style-level patterns are much easier to get wrong, because plenty of careful human writing shares them. Treat these as prompts to look closer, never as findings.

**5. Hedged, evenly balanced framing.** Sentences that present every question as having two reasonable sides, paragraphs that open by restating the question, and closing lines that summarise without adding anything. This comes from training that rewards being helpful and non-committal at once.

**6. The "not just X, but Y" construction.** Along with "it's worth noting that", "delve into", "navigate the complexities of", and "in today's fast-paced world". These phrases are not banned words — they are ordinary English. What stands out is how often they cluster together in a single short piece.

**7. Unusually uniform structure.** Paragraphs of near-identical length, sections with a suspiciously equal number of bullets, and a conclusion that mirrors the introduction. Human drafts are lumpier; a paragraph runs long because the writer had more to say about that particular thing.

The vocabulary signals in particular decay quickly. Every list of "AI words" that circulates gets absorbed into how people write and into how the next generation of models is tuned. Mechanical signs are more durable because they are byproducts of encoding, not of style.`,
    },
    {
      id: "how-to-check",
      heading: "How to check a document in one pass",
      body: `A practical order of operations, cheapest check first:

1. **Scan for invisible characters.** This is the highest-signal, lowest-effort check. Paste the text into the [Invisible Character Scanner](/remove-invisible-characters) — it lists every zero-width space, soft hyphen, byte-order mark, and direction mark it finds, with counts.
2. **Count the mechanical artefacts together.** The [AI Text Cleaner](/clean-ai-text) reports em dashes, smart quotes, invisible characters, and emoji in a single pass, so you can see whether several signals co-occur rather than chasing one at a time.
3. **Read for the stylistic patterns.** Only after you have the counts. Numbers first stops you from talking yourself into a conclusion.
4. **Weigh the context.** Text pasted from Word will carry smart quotes regardless of who wrote it. Text typed into a plain textarea will not.

Co-occurrence is what matters. A single em dash means nothing. Em dashes *and* smart quotes *and* two zero-width spaces *and* emoji bullets, in a document that was typed directly into a plain-text form, is a genuinely unusual combination.`,
    },
    {
      id: "why-not-proof",
      heading: "Why none of this is proof",
      body: `Every sign above has an innocent explanation.

Word and Google Docs convert double hyphens into em dashes and straight quotes into curly ones automatically. Copying from any modern website can carry invisible characters. Professional editors write in exactly the balanced, hedged register that reads as machine-generated. Non-native English speakers often write in a more formal, structurally regular style, which is precisely why commercial AI detectors flag their work at markedly higher rates.

There is also the obvious circularity: a person can paste AI output into a text editor, run a cleanup pass, and remove every mechanical sign in about ten seconds. The signals that are easiest to measure are also the easiest to erase.

So the honest position is this. Formatting analysis tells you **what characters are in a document**. It cannot tell you who put them there. Our tools deliberately report counts and never render a verdict, because a verdict would be a guess wearing a number as a disguise. If you need to know whether a person wrote something, the answer comes from talking to them about it — draft history, sources, and the ability to explain their own argument — not from counting dashes.`,
    },
  ],
  faqs: [
    {
      question: "What is the most reliable sign that text was written by AI?",
      answer:
        "Invisible Unicode characters such as zero-width spaces are the strongest mechanical marker, because ordinary typing almost never produces them while a copy-paste out of a chat window often does. Even so, they can also come from copying text off a website, so they indicate origin of the paste rather than authorship.",
    },
    {
      question: "Do AI detectors actually work?",
      answer:
        "Not reliably. They produce false positives on human writing — with non-native English speakers disproportionately affected — and can be defeated by light editing. Formatting analysis can count concrete artefacts, but no tool, ours included, can establish authorship from text alone.",
    },
    {
      question: "Does using em dashes or smart quotes mean I will be accused of using AI?",
      answer:
        "It should not, and it is a bad basis for an accusation. Word and Google Docs generate both automatically from ordinary typing. If you are worried about how a document reads, converting punctuation to plain ASCII removes the artefacts without changing a word of your writing.",
    },
    {
      question: "Can I remove these signs from AI-generated text?",
      answer:
        "Yes, and quickly — which is exactly why they are weak evidence. Replacing em dashes, normalising quotes, and stripping invisible characters takes seconds. That is a reason to be sceptical of detection claims, not a technique for passing off work as your own.",
    },
  ],
  relatedTools: ["clean-ai-text", "remove-invisible-characters", "remove-em-dashes"],
  relatedGuides: ["why-chatgpt-uses-em-dashes", "chatgpt-invisible-characters", "ai-text-watermarks"],
};
