import type { GuideDefinition } from "../../lib/guides";

export const emDashes: GuideDefinition = {
  slug: "why-chatgpt-uses-em-dashes",
  title: "Why Does ChatGPT Use So Many Em Dashes?",
  description: "ChatGPT leans on em dashes because it learned from edited prose. Here is why the habit is so consistent, and how to remove them cleanly.",
  h1: "Why does ChatGPT use so many em dashes?",
  dek: "The punctuation mark that turned into an AI signature, and what to do about it.",
  cluster: "ai-tells",
  published: "2026-07-25",
  updated: "2026-09-01",
  answer:
    "ChatGPT uses em dashes because it was trained on professionally edited prose — books, essays, and journalism — where the em dash is standard for setting off a phrase. The model reproduces that habit far more consistently than casual human writers, who rarely type the character at all. That gap in consistency, not the mark itself, is what makes it read as an AI signature.",
  sections: [
    {
      id: "where-it-comes-from",
      heading: "Where the habit comes from",
      body: `Large language models learn punctuation the same way they learn everything else: by absorbing patterns from their training data. That data is heavily weighted toward **published, professionally edited writing** — books, long-form journalism, essays, and documentation. In that world the em dash is completely ordinary. Copy editors use it constantly to set off an aside, to introduce a summary, or to create a beat before a final clause.

Casual internet writing looks nothing like that. In chat messages, forum posts, and emails, people use commas, parentheses, and full stops. Most never type an em dash at all, because on a standard keyboard there is no key for it.

There is a second pressure on top of the training data. Models are tuned to produce prose that readers rate as clear and well written, and the em dash is unusually good at that job. It is the most flexible mark in English punctuation — it can stand in for a comma, a colon, a semicolon, or a pair of parentheses. When a sentence could take several different marks, reaching for the em dash is always defensible. A system optimising for fluent, confident-sounding text will land on it again and again.`,
    },
    {
      id: "why-it-reads-as-ai",
      heading: "Why the em dash became an AI tell",
      body: `The em dash did not become suspicious because it is rare. It became suspicious because of **how consistently it appears**.

Typing one takes deliberate effort. On a Mac it is <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>-</kbd>; on Windows it is <kbd>Alt</kbd> + <kbd>0151</kbd> or an autocorrect rule. Most phone keyboards bury it behind a long-press. So when a human writes an em dash, it is usually a conscious stylistic choice, and it shows up sporadically — a few times in a long document, clustered where the writer wanted a dramatic pause.

A language model has no such friction. Every character costs the same. The result is a distinctive statistical fingerprint:

- Em dashes appear at a steady rate across every paragraph, rather than in bursts.
- They are frequently used in **pairs**, wrapping a parenthetical phrase, where most people would use commas.
- They show up in registers that would never normally carry them, such as a short reply, a bulleted list item, or a bug report.

None of those patterns is wrong. They are simply more regular than human writing tends to be, and regularity is exactly what readers notice.`,
    },
    {
      id: "how-to-remove",
      heading: "How to remove em dashes without breaking sentences",
      body: `The mistake is replacing every em dash with a hyphen. A hyphen is a different character with a different job, and the result reads as a typo rather than as clean prose. Match the replacement to the work the dash was doing.

**A pair of em dashes wrapping an aside** usually becomes a pair of commas. If the aside is a genuine digression, parentheses work better.

**A single em dash before a conclusion** is standing in for a colon. Swap it for one, or end the sentence and start a new one.

**A single em dash mid-sentence** often marks a sharper break than the sentence really needs. Splitting it into two sentences almost always reads better than any substitute mark.

| What the dash is doing | Better replacement |
| --- | --- |
| Wrapping a mild aside | Commas |
| Wrapping a digression | Parentheses |
| Introducing a summary | Colon |
| Marking a hard break | Full stop, split the sentence |
| Showing a range (2020—2024) | En dash, not an em dash |

If you are working through a long document, the [Remove Em Dashes](/remove-em-dashes) tool replaces every em dash with the substitute you choose and reports how many it changed, so you can check the count against your own reading rather than trusting a silent find-and-replace.`,
      figure: "dash-widths",
    },
    {
      id: "when-to-keep",
      heading: "When you should keep the em dash",
      body: `Stripping every em dash from your writing is an overcorrection. The mark exists because it does something the alternatives cannot: it creates a pause with more force than a comma and less finality than a full stop, without the bureaucratic feel of a semicolon.

Keep it when:

- The sentence genuinely needs a hard interruption, and a comma would be too soft.
- You are quoting a source that used one. Editing punctuation inside a quotation changes the quotation.
- House style calls for it. Most book publishers and many newsrooms use em dashes freely.
- You are writing fiction or personal essays, where rhythm matters more than looking machine-neutral.

The realistic goal is not zero em dashes. It is em dashes that appear because you chose them, at a rate that reflects your own voice. One or two in a long article reads as deliberate. One in every paragraph reads as a default.`,
    },
    {
      id: "other-habits",
      heading: "The em dash is one habit among several",
      body: `The dash gets the attention because it is a single character you can search for. It is not the only regularity, and the others come from the same two pressures: training data full of edited, structured writing, and tuning toward answers that readers rate as clear.

- **Bold on key phrases.** Not headings, but a phrase or two emphasised inside a paragraph, often the first few words of a list item. It makes an answer skimmable, which is what a chat interface is optimising for.
- **Bullets where prose would do.** A three-sentence idea arrives as three bullets. Lists score well as answers, so models default to them even when the points are not really parallel.
- **Headings on short answers.** A four-paragraph reply with two section headers over it. The structure is borrowed from documentation, where it earns its place, and applied to text far too short to need navigation.
- **Emoji as furniture.** Used as bullet markers or section icons rather than as expression — a checkmark at the front of every item, a rocket over the "next steps" block.
- **"It's not just X — it's Y."** The correction-then-elevation move, along with "it's worth noting that" and "the key is". Ordinary constructions; what stands out is how often they cluster in one short piece.
- **The rule of three.** Three examples, three bullets, three adjectives, because three sounds complete. Human drafts are lumpier — two reasons, or five, depending on how many there actually were.

None of these is a watermark. No vendor stamps a hidden signal into ordinary text, and none of these habits was designed as a tell. They are style defaults, and they can be removed or asked away like any other style default. If you want them out of a document you already have, [Humanize AI Text](/humanize-ai-text) strips the mechanical layer — the punctuation, the invisible characters, the decorative emoji — and [Bullet Points to Paragraph](/bullet-points-to-paragraph) turns over-listed text back into prose. Neither claims to defeat a detector, and you should be suspicious of anything that does.

The full set, including the ones you can count, is in the [signs of AI-written text](/guides/signs-of-ai-written-text) guide.`,
    },
    {
      id: "not-proof",
      heading: "Em dashes are not proof of AI writing",
      body: `This deserves stating plainly, because a lot of advice online gets it wrong: **the presence of em dashes proves nothing.**

Plenty of human writing is full of them. Microsoft Word and Google Docs both convert a double hyphen into an em dash automatically, so writers produce them without ever choosing the character. Anyone trained in editorial writing uses them by instinct. Entire publications mandate them.

There is no reliable way to detect AI-generated text from punctuation, and the commercial tools that claim otherwise have well-documented false-positive rates — with non-native English speakers disproportionately affected. Treating an em dash as evidence has real costs when the accusation lands on a student or a colleague.

What formatting analysis can honestly tell you is mechanical: how many em dashes are in this document, how many smart quotes, how many invisible characters. Those are counts, not verdicts. Our [AI Text Cleaner](/clean-ai-text) reports exactly those numbers and makes no claim about who or what wrote the text, which is the only defensible thing a formatting tool can do.

If you want the full picture of which formatting artefacts travel with AI output, the [signs of AI-written text](/guides/signs-of-ai-written-text) guide covers the rest.`,
    },
  ],
  faqs: [
    {
      question: "Does using em dashes mean my writing looks AI-generated?",
      answer:
        "Not on its own. Em dashes are standard in edited English and appear throughout human writing, partly because Word and Google Docs create them automatically from double hyphens. What reads as machine-like is a high, evenly spaced rate — roughly one per paragraph across an entire document — usually alongside other artefacts such as smart quotes and emoji-headed lists.",
    },
    {
      question: "What should I replace an em dash with?",
      answer:
        "Match the replacement to its function. A pair wrapping an aside becomes commas or parentheses; a single dash introducing a conclusion becomes a colon; a dash marking a hard break usually reads better as two separate sentences. Avoid replacing an em dash with a hyphen, which is a different character with a different purpose.",
    },
    {
      question: "Why does ChatGPT use em dashes instead of commas?",
      answer:
        "The em dash is the most flexible mark in English, able to substitute for a comma, colon, semicolon, or parentheses. When several marks would be grammatically acceptable, it is always a safe choice, so a model tuned to produce fluent prose selects it disproportionately often.",
    },
    {
      question: "Can I stop ChatGPT from using em dashes?",
      answer:
        "You can ask for it directly in your prompt, for example 'do not use em dashes; use commas or separate sentences'. Compliance is imperfect and tends to drift over a long response, so it is usually faster to write normally and strip the dashes afterwards.",
    },
    {
      question: "Is an em dash the same as a hyphen?",
      answer:
        "No. A hyphen (-, U+002D) joins compound words. An en dash (–, U+2013) marks ranges such as 2020–2024. An em dash (—, U+2014) sets off a phrase within a sentence. They are three separate characters of increasing width and are not interchangeable.",
    },
  ],
  relatedTools: ["remove-em-dashes", "clean-ai-text", "humanize-ai-text"],
  relatedGuides: ["signs-of-ai-written-text", "em-dash-vs-en-dash-vs-hyphen", "em-dash-copy-paste"],
};
