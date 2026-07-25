import type { GuideDefinition } from "../../lib/guides";

export const tokenCount: GuideDefinition = {
  slug: "prompt-token-count-explained",
  title: "How Many Tokens Is My Prompt?",
  description: "Tokens are sub-word fragments, not words. Here is how tokenization works, why counts differ between models, and how to estimate cost.",
  h1: "How many tokens is my prompt?",
  dek: "Why 1,000 words is never 1,000 tokens, and what that means for context limits and cost.",
  cluster: "reference",
  published: "2026-07-25",
  updated: "2026-07-25",
  answer:
    "Tokens are sub-word fragments, so counts never match word counts. For ordinary English, one token averages about four characters or three-quarters of a word — so 1,000 words is roughly 1,300 tokens. Code, non-English scripts, and unusual words all use more tokens per character, sometimes several times more.",
  sections: [
    {
      id: "what-a-token-is",
      heading: "What a token actually is",
      body: `Language models do not read characters or words. They read tokens: fragments produced by splitting text according to a fixed vocabulary learned from training data.

Common words are usually a single token. Rare words get broken into pieces. Whitespace is typically attached to the front of the following token, which is why the same word can count differently depending on whether it starts a sentence.

The word *unbelievable* is not one token — it is likely split into something like \`Un\` + \`believ\` + \`able\`. Meanwhile *the* is a single token, and so is *international*, because it appeared often enough in training to earn its own entry.

This is why token counts feel unpredictable. The unit is not linguistic; it is statistical. Frequency in the training corpus determines whether something is one token or four.`,
      figure: "token-chunks",
    },
    {
      id: "rules-of-thumb",
      heading: "Rules of thumb that actually hold",
      body: `For English prose:

- **1 token ≈ 4 characters**
- **1 token ≈ 0.75 words**
- **1,000 words ≈ 1,300 tokens**
- **A standard page (~500 words) ≈ 650 tokens**

These break down quickly outside ordinary prose:

| Content type | Roughly |
| --- | --- |
| English prose | 0.75 words per token |
| Code | 2–3× more tokens than equivalent prose |
| JSON with long keys | Very high — punctuation and quotes are separate tokens |
| Chinese, Japanese, Korean | Often 1–2 tokens *per character* |
| Cyrillic, Devanagari, Arabic | Typically 2–3× English for the same meaning |
| URLs and hashes | Extremely high — random strings tokenize badly |
| Repeated whitespace | Each run may be its own token |

The multilingual gap is significant and underappreciated: the same sentence in Japanese can cost several times what it costs in English, which affects both cost and how much fits in the context window.`,
    },
    {
      id: "why-models-differ",
      heading: "Why the count differs between models",
      body: `Each model family uses its own tokenizer with its own vocabulary, so the same text yields different counts.

GPT models use variants of byte-pair encoding — \`cl100k_base\` for GPT-4 era models, \`o200k_base\` for newer ones. Claude uses a different tokenizer with a different vocabulary. Open models such as Llama and Mistral each have their own again.

Differences of 10–20% between families on the same English text are normal, and the gap widens on code and non-English text where vocabularies diverge most.

Practically this means:

- A count from one tokenizer is an **estimate** for any other model.
- Only the provider's own tokenizer gives an exact number for their billing.
- Budget with headroom rather than fitting exactly to a limit.

Our [Token Counter](/token-counter) reports a GPT-4o count and a Claude estimate side by side, which is usually enough to tell whether a prompt is comfortably inside a limit or uncomfortably near it.`,
    },
    {
      id: "why-it-matters",
      heading: "Why the number matters",
      body: `**Cost.** API pricing is per token, input and output priced separately, with output typically several times more expensive. Doubling a system prompt doubles that cost on every single call — the kind of thing that is invisible in testing and expensive at volume.

**Context limits.** The window covers *everything*: system prompt, conversation history, retrieved documents, the current message, and the space reserved for the reply. Long chats fail not because any one message is long but because history accumulates.

**Truncation.** When input exceeds the limit, something gets dropped — often silently, and often the earliest content. A model that "forgot" your instructions frequently just had them truncated away.

**Chunking for retrieval.** Splitting documents for embedding works in tokens, not characters. Chunks sized by character count end up inconsistent, and chunks that split mid-sentence retrieve badly. For breaking long text into workable pieces, [Text Splitter](/text-splitter) cuts near paragraph boundaries rather than mid-word.`,
    },
    {
      id: "reducing-tokens",
      heading: "Reducing the count without losing meaning",
      body: `The highest-leverage reductions, roughly in order:

1. **Trim conversation history.** In a long chat this dwarfs everything else. Summarise old turns rather than resending them verbatim.
2. **Cut redundant instructions.** Repeating a rule three ways does not make it three times more likely to be followed. It reliably triples the cost of that rule.
3. **Strip formatting artefacts.** Invisible characters, repeated whitespace, and decorative separator lines all tokenize, and a row of forty hyphens can cost more than the sentence above it. [Remove Invisible Characters](/remove-invisible-characters) clears the ones you cannot see.
4. **Shorten JSON keys** in structured prompts. \`{"n": ...}\` versus \`{"customer_full_name": ...}\` multiplied across a thousand records is a large difference.
5. **Send only relevant excerpts.** Retrieving three relevant paragraphs beats pasting a whole document, and usually produces better answers as well as cheaper ones.

What does *not* help: removing ordinary punctuation, deleting articles, or writing in a clipped telegraphic style. The savings are marginal and the damage to output quality is not.`,
    },
  ],
  faqs: [
    {
      question: "How many tokens is 1,000 words?",
      answer:
        "About 1,300 tokens for ordinary English prose, based on roughly 0.75 words per token. Code, JSON, and non-English text run considerably higher — Chinese, Japanese, and Korean often use one to two tokens per character.",
    },
    {
      question: "Why is the token count different for GPT and Claude?",
      answer:
        "Each model family uses its own tokenizer with a different learned vocabulary, so the same text splits differently. Differences of 10–20% on English prose are normal, and the gap is wider for code and non-English text.",
    },
    {
      question: "What is a token in an AI model?",
      answer:
        "A fragment of text from the model's fixed vocabulary. Common words are usually a single token while rare words split into several pieces, so 'unbelievable' might become three tokens while 'international' is just one.",
    },
    {
      question: "Do spaces and punctuation count as tokens?",
      answer:
        "Yes. Whitespace is normally attached to the front of the following token, and punctuation is frequently its own token. Long runs of repeated whitespace or decorative separator lines can consume a surprising number.",
    },
    {
      question: "How can I reduce my token usage?",
      answer:
        "Trim accumulated conversation history first — in long chats it dominates everything else. Then remove duplicated instructions, strip invisible characters and repeated whitespace, shorten JSON keys, and send only the relevant excerpt of a document rather than the whole thing.",
    },
  ],
  relatedTools: ["token-counter", "text-splitter", "remove-invisible-characters"],
  relatedGuides: ["invisible-unicode-characters", "em-dash-vs-en-dash-vs-hyphen"],
};
