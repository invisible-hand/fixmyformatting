import type { ToolGuide } from "../../../lib/tool-guides";

export const whatAreTokensInAi: ToolGuide = {
  parentTool: "token-counter",
  slug: "what-are-tokens-in-ai",
  title: "What Are Tokens in AI? Input, Output and Context",
  description: "Tokens are the units a language model reads, writes, remembers and bills by. How they are made, what becomes one, and why counts differ between models.",
  h1: "What are tokens in AI?",
  dek: "The unit a language model reads, writes, remembers and charges for, and the places it shows up that are easy to miss.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Tokens are the units a language model works in: chunks of text, often a word or part of one, each mapped to a number. The model reads your prompt as tokens, writes its reply one token at a time, measures its memory (the context window) in tokens, and APIs bill by them, so tokens set both cost and length limits.",
  sections: [
    {
      id: "tokens-are-numbers",
      heading: "Tokens are how text becomes numbers",
      body: `A language model cannot do arithmetic on letters. Before your prompt reaches the model, a separate program called a **tokenizer** cuts the text into pieces and replaces each piece with an integer ID from a fixed list, the model's **vocabulary**. The model only ever sees that list of IDs. When it answers, it produces IDs, and the tokenizer turns them back into text.

The pieces are not words and not characters. They sit in between. Our guide [How many tokens is my prompt?](/guides/prompt-token-count-explained) shows how ordinary words split and gives measured words-per-token ratios for English and other languages; this page covers what happens around that split: where the vocabulary comes from, what else turns into tokens, and why the unit matters for limits and money.

Working in sub-word pieces is a compromise. A vocabulary of whole words would need millions of entries and would still fail on new names, typos and code. A vocabulary of single characters would be tiny but would make every sentence several times longer, and the model's cost grows with length. Sub-word pieces keep the vocabulary to a manageable size (tens or hundreds of thousands of entries) while still being able to spell anything.`,
    },
    {
      id: "how-a-vocabulary-is-built",
      heading: "How a vocabulary is built",
      body: `Most current tokenizers use a method called **byte-pair encoding** (BPE) or a close relative. The idea is simple:

1. Start with the smallest units: individual bytes, so that any text in any script can be represented.
2. Scan a very large sample of training text and find the pair of adjacent units that occurs most often.
3. Merge that pair into a new unit and add it to the vocabulary.
4. Repeat until the vocabulary reaches the target size.

After enough merges, frequent words such as "the" or " because" become single entries, common prefixes and suffixes become entries of their own, and rare strings stay split into small pieces. Nothing in the process knows grammar. A token boundary falls wherever the statistics of the training sample put it, which is why "tokenization" might split differently from "token" plus "ization".

Two consequences follow. First, the training sample decides what is cheap. Languages, programming languages and spelling conventions that were common in the sample get long, efficient tokens; everything else is spelled out in short pieces and costs more. Second, every model family builds its own vocabulary, and a provider can change it between model versions. The same paragraph therefore has no single "true" token count. It has one count per tokenizer.`,
    },
    {
      id: "input-output-and-generation",
      heading: "Input tokens, output tokens and one-at-a-time generation",
      body: `Tokens appear on both sides of every exchange.

**Input tokens** are everything the model reads on a turn: the system prompt or custom instructions, the whole conversation so far, any files or retrieved documents, tool definitions, and your new message. In a chat app much of this is invisible to you, but it is still sent and still counted.

**Output tokens** are what the model writes. A model generates text one token at a time: it looks at everything so far, predicts a probability for every entry in its vocabulary, picks one, appends it, and repeats. That loop is why replies stream onto the screen in small chunks, and why output is slower and more expensive than input. Reading a long prompt can be done largely in parallel; writing a reply cannot.

Some models also produce **reasoning or thinking tokens** before the visible answer. Anthropic's documentation, for example, states that thinking tokens are billed as output tokens and count toward the context window, even when the app shows you only a summary or nothing at all. If a short answer used far more output than its length suggests, hidden reasoning is the usual reason.

It is not only text. Images, PDF pages and audio are converted into tokens as well, by a different encoder, and they count toward the same limits. A screenshot can cost as much as several paragraphs.`,
    },
    {
      id: "context-windows",
      heading: "The context window is a token budget",
      body: `A model's **context window** is the maximum number of tokens it can consider at once, input and output together. Everything competes for the same space: instructions, history, attachments, and room for the reply.

Two things make the window feel smaller than its headline number:

- **History accumulates.** Each new message in a chat re-sends the earlier turns. A conversation can reach the limit even when no single message is long.
- **The reply needs room.** If the input fills the window, there is no space left to answer. Some APIs, Anthropic's included, require you to set a maximum output length with every request.

When a conversation outgrows the window, something has to give. Some apps cut the oldest messages; some summarise them; some refuse the request. Either way, a model that "forgot" an instruction from early in a long chat has often simply lost it to the limit. Starting a fresh conversation with a short summary is usually cheaper and more reliable than pushing a long one further.

Window sizes differ a lot between models and between a provider's chat app and its API. Our page on [the Claude Pro token limit](/token-counter/claude-pro-token-limit) lists the figures Anthropic publishes for its paid chat plans.`,
    },
    {
      id: "tokens-and-money",
      heading: "Why tokens are the unit you pay in",
      body: `API providers price models per million tokens, with input and output priced separately and output usually several times dearer. A few habits follow directly from that:

- Long system prompts are paid for on every call. Trimming one by 500 tokens saves 500 tokens per request, forever.
- Re-sending a whole document for each question is the expensive pattern. Providers offer prompt caching, which charges less for input that repeats exactly.
- Because tokenizers change, the same text can cost a different amount on a newer model even at the same price per token. Anthropic's pricing page notes that its models from Claude Opus 4.7 onward use a newer tokenizer that produces roughly 30% more tokens for the same text.

For current per-token prices for Claude models, with a worked example, see [How much do Claude tokens cost?](/token-counter/how-much-do-claude-tokens-cost). Subscriptions such as ChatGPT Plus or Claude Pro do not bill per token; they set usage limits instead, and those limits still depend on how many tokens your messages use.`,
    },
    {
      id: "counting-tokens",
      heading: "Counting tokens before you send",
      body: `The [Token Counter](/token-counter) gives you two numbers for any text you paste, computed in your browser:

- **GPT-4o tokens**: an exact count from the GPT-4o tokenizer (o200k_base). For other OpenAI models it is a close guide, not a guarantee.
- **Claude estimate**: the character count divided by 3.5, rounded up. Anthropic does not publish a tokenizer that can run in a browser, so this is an approximation. On English prose it usually lands above the GPT-4o count, and it does not adjust for which Claude model or tokenizer generation you use.

Use the counter to answer practical questions: will this document fit, roughly what will a thousand calls cost, which of two prompt versions is leaner. When you need the exact figure for billing, use the provider's own count. Anthropic offers a free token counting endpoint in its API, and every API response reports the input and output tokens it actually used.`,
    },
  ],
  faqs: [
    {
      question: "Is a token the same as a word?",
      answer:
        "No. A token is a piece of text from the model's vocabulary. Common English words are often one token, longer or rarer words are split into several, and punctuation is frequently its own token. On average an English word is a little more than one token.",
    },
    {
      question: "Do images and files use tokens?",
      answer:
        "Yes. Images, PDF pages and other attachments are converted into tokens by the model's encoder and count toward the context window and, on the API, toward the bill. A single image can use as many tokens as several paragraphs of text.",
    },
    {
      question: "Why do different AI models count the same text differently?",
      answer:
        "Each model family trains its own tokenizer with its own vocabulary, and providers sometimes change tokenizers between versions. The same text can split into a different number of pieces, so a count from one tokenizer is only an estimate for another.",
    },
    {
      question: "What are output tokens?",
      answer:
        "Output tokens are the tokens the model generates in its reply, including any hidden reasoning or thinking tokens on models that use them. They are usually priced several times higher than input tokens because the model has to produce them one at a time.",
    },
    {
      question: "Does a chat subscription charge per token?",
      answer:
        "No. Consumer plans such as ChatGPT Plus or Claude Pro charge a flat monthly price and apply usage limits instead. Longer messages, attachments and long conversations use more tokens, so they use up those limits faster.",
    },
  ],
  relatedTools: ["token-counter", "text-splitter", "word-counter"],
  relatedGuides: ["prompt-token-count-explained"],
};
