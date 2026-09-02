import type { GuideDefinition } from "../../lib/guides";

export const tokenCount: GuideDefinition = {
  slug: "prompt-token-count-explained",
  title: "How Many Tokens Is My Prompt?",
  description: "Tokens are sub-word fragments, not words. Here is how tokenization works, why counts differ between models, and how to estimate cost.",
  h1: "How many tokens is my prompt?",
  dek: "Why 1,000 words is never 1,000 tokens, and what that means for context limits and cost.",
  cluster: "reference",
  published: "2026-07-25",
  updated: "2026-09-01",
  answer:
    "Tokens are sub-word fragments, so counts never match word counts. For ordinary English, one token averages about four to five characters, so 1,000 words is somewhere between 1,050 and 1,350 tokens depending on how technical the writing is. Code, non-English scripts, and unusual words all use more tokens per character, sometimes several times more.",
  sections: [
    {
      id: "what-a-token-is",
      heading: "What a token actually is",
      body: `Language models do not read characters or words. They read tokens: fragments produced by splitting text according to a fixed vocabulary learned from training data.

Common words are usually a single token. Rare words get broken into pieces. Whitespace is typically attached to the front of the following token, which is why the same word can count differently depending on whether it starts a sentence.

Measured with GPT-4o's tokenizer, the word *unbelievable* standing on its own is three tokens: \`un\` + \`bel\` + \`ievable\`. Written the way it actually appears in a sentence, with its leading space, it is a single token: \` unbelievable\`. That is the leading-space rule doing the work — the entry the model learned is the space-prefixed form, because that is how the word almost always occurs in running text. *the* and *international* behave the same way, one token each with the space attached.

This is why token counts feel unpredictable. The unit is not linguistic; it is statistical. Frequency in the training corpus determines whether something is one token or four.`,
      figure: "token-chunks",
    },
    {
      id: "rules-of-thumb",
      heading: "Rules of thumb that actually hold",
      body: `For English prose, measured with GPT-4o's tokenizer across registers from conversational writing to technical reference:

- **1 token ≈ 4.3–5.9 characters**
- **1 token ≈ 0.75–0.95 words**
- **1,000 words ≈ 1,050–1,350 tokens**
- **A standard page (~500 words) ≈ 530–680 tokens**

Register matters more than most rules of thumb admit. Casual, conversational writing sits near the bottom of that range, around 1,060 tokens per thousand words, because it reuses a small vocabulary of common words that each fit a single token. Dense technical prose — including this site's own guides — sits near the top, around 1,310, because specialist terms get split into pieces. The familiar single figure of 1,300 tokens per thousand words is the technical end of the range, not the middle, so it over-estimates ordinary writing by a fifth or so. That is the safe direction to be wrong in when you are budgeting a context window.

These break down quickly outside ordinary prose:

| Content type | Roughly |
| --- | --- |
| English prose | 0.75–0.95 words per token, depending on register |
| Code | About 1.2× the tokens of prose per character, and roughly 1.5× for the same idea expressed both ways |
| JSON with long keys | Very high — punctuation and quotes are separate tokens |
| Chinese, Japanese, Korean | About 0.6–0.7 tokens *per character* — under one token each, but several times what English spends on the same number of characters |
| Cyrillic, Devanagari, Arabic | About 1.4–1.6× English for the same text |
| URLs and hashes | Extremely high — random strings tokenize badly |
| Repeated whitespace | Cheap, not expensive — byte-pair encoding merges long runs, so forty consecutive spaces are one token |

The multilingual gap is real but much smaller than the folklore says. Measured on this site's own English pages against their professional translations, the Japanese version costs about 1.7× the English, Korean about 1.5×, Chinese about 1.2×, Hindi about 1.6× and Arabic about 1.4×. Under the older \`cl100k_base\` tokenizer the same pairs ran 2.3×, 2.3×, 1.7×, 4.7× and 2.9× — which is where the widely repeated "two to three times English" figure came from. It was true then; the newer vocabularies have largely closed it.`,
    },
    {
      id: "why-models-differ",
      heading: "Why the count differs between models",
      body: `Each model family uses its own tokenizer with its own vocabulary, so the same text yields different counts.

GPT models use variants of byte-pair encoding — \`cl100k_base\` for GPT-4 era models, \`o200k_base\` for newer ones. Claude uses a different tokenizer with a different vocabulary. Open models such as Llama and Mistral each have their own again.

Vocabularies diverge most on code and non-English text, so that is where the counts diverge most too.

Practically this means:

- A count from one tokenizer is an **estimate** for any other model.
- Only the provider's own tokenizer gives an exact number for their billing.
- Budget with headroom rather than fitting exactly to a limit.

Our [Token Counter](/token-counter) reports a GPT-4o count and a Claude estimate side by side. The GPT-4o number is a real tokenizer count. The Claude number deliberately is not: Anthropic publishes no tokenizer we can run in your browser, so it is a character-based estimate of one token per 3.5 characters. On English prose that estimate lands 22–50% above the GPT-4o count — around a third for typical writing — so read the gap as the width of an estimate, not as a measured difference between the two model families. The pair is still enough to tell whether a prompt is comfortably inside a limit or uncomfortably near it; when the number has to be exact, use the provider's own counter.`,
    },
    {
      id: "why-it-matters",
      heading: "Why the number matters",
      body: `**Cost.** API pricing is per token, input and output priced separately, with output typically several times more expensive. Doubling a system prompt doubles that cost on every single call — the kind of thing that is invisible in testing and expensive at volume.

**Context limits.** The window covers *everything*: system prompt, conversation history, retrieved documents, the current message, and the space reserved for the reply. Long chats fail not because any one message is long but because history accumulates.

**Truncation.** When input exceeds the limit, something gets dropped — often silently, and often the earliest content. A model that "forgot" your instructions frequently just had them truncated away.

**Chunking for retrieval.** Splitting documents for embedding works in tokens, not characters. Chunks sized by character count end up inconsistent, and chunks that split mid-sentence retrieve badly, so a retrieval pipeline needs a splitter that respects sentence and paragraph structure. Our [Text Splitter](/text-splitter) is not that tool: it cuts fixed-size chunks of up to 2,000 characters, breaking at the nearest whitespace so that no word is cut in half, which means a chunk can end mid-sentence. Use it for fitting a long document through a context window or a paste limit — not for producing embedding chunks for retrieval.`,
    },
    {
      id: "reducing-tokens",
      heading: "Reducing the count without losing meaning",
      body: `The highest-leverage reductions, roughly in order:

1. **Trim conversation history.** In a long chat this dwarfs everything else. Summarise old turns rather than resending them verbatim.
2. **Cut redundant instructions.** Repeating a rule three ways does not make it three times more likely to be followed. It reliably triples the cost of that rule.
3. **Strip formatting artefacts.** Invisible characters, repeated whitespace, and decorative separator lines all tokenize. Individually they are cheaper than people expect, because byte-pair encoding merges long runs: forty consecutive spaces are one token and a forty-hyphen separator line is two, against thirteen for the sentence above it. They are still pure overhead, and in a document with a rule between every section they add up. [Remove Invisible Characters](/remove-invisible-characters) clears the ones you cannot see.
4. **Shorten JSON keys** in structured prompts. \`{"n": ...}\` versus \`{"customer_full_name": ...}\` multiplied across a thousand records is a large difference.
5. **Send only relevant excerpts.** Retrieving three relevant paragraphs beats pasting a whole document, and usually produces better answers as well as cheaper ones.

What does *not* help: removing ordinary punctuation, deleting articles, or writing in a clipped telegraphic style. The savings are marginal and the damage to output quality is not.`,
    },
  ],
  faqs: [
    {
      question: "How many tokens is 1,000 words?",
      answer:
        "Between about 1,050 and 1,350 tokens, measured with GPT-4o's tokenizer. Conversational writing lands near 1,060 because it reuses common single-token words; dense technical prose lands near 1,310. Code and JSON run higher. Chinese, Japanese, and Korean use about 0.6 to 0.7 tokens per character: fewer tokens than characters, but several times what English spends on the same number of characters.",
    },
    {
      question: "Why is the token count different for GPT and Claude?",
      answer:
        "Each model family uses its own tokenizer with a different learned vocabulary, so the same text splits differently, and the difference is widest on code and non-English text. Note that our Token Counter's Claude figure is a character-based estimate of one token per 3.5 characters, not a real tokenizer count, which is why it sits roughly a third above the GPT-4o count on English prose.",
    },
    {
      question: "What is a token in an AI model?",
      answer:
        "A fragment of text from the model's fixed vocabulary. Common words are usually a single token while rare words split into several pieces, so 'unbelievable' might become three tokens while 'international' is just one.",
    },
    {
      question: "Do spaces and punctuation count as tokens?",
      answer:
        "Yes. Whitespace is normally attached to the front of the following token, and punctuation is frequently its own token. Long runs are the exception: byte-pair encoding merges them, so forty consecutive spaces are a single token and a forty-hyphen separator line is two.",
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
