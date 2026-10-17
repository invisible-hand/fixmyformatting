import type { ToolGuide } from "../../../lib/tool-guides";

export const howMuchDoClaudeTokensCost: ToolGuide = {
  parentTool: "token-counter",
  slug: "how-much-do-claude-tokens-cost",
  title: "How Much Do Claude Tokens Cost? API Prices Explained",
  description: "Claude API prices per million tokens as of October 17, 2026, from Anthropic's pricing page, with worked examples and the discounts for caching and batches.",
  h1: "How much do Claude tokens cost?",
  dek: "Current per-token prices for the Claude API, what a typical request actually costs, and the multipliers that move the bill.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "As of October 17, 2026, Claude API prices per million tokens range from $0.10 input and $0.50 output (Haiku 5.5, prompts up to 100,000 tokens) to $10 input and $50 output (Fable 5.1). Sonnet 5.5 costs $2 and $10, Opus 5.5 $4 and $20. Output costs five times input. Batch requests are half price.",
  sections: [
    {
      id: "price-table",
      heading: "Claude API prices per million tokens",
      body: `All figures below are from Anthropic's [pricing page](https://platform.claude.com/docs/en/about-claude/pricing), checked on **October 17, 2026**, in US dollars per million tokens (MTok). Prices change; treat the linked page as the source of truth.

| Model | Input | Output | Batch input | Batch output |
| --- | --- | --- | --- | --- |
| Claude Fable 5.1 | $10 | $50 | $5 | $25 |
| Claude Opus 5.5 | $4 | $20 | $2 | $10 |
| Claude Opus 5 | $5 | $25 | $2.50 | $12.50 |
| Claude Sonnet 5.5 | $2 | $10 | $1 | $5 |
| Claude Sonnet 5 | $2 | $10 | $1 | $5 |
| Claude Sonnet 4.6 | $3 | $15 | $1.50 | $7.50 |
| Claude Haiku 5.5, prompt up to 100,000 tokens | $0.10 | $0.50 | $0.05 | $0.25 |
| Claude Haiku 5.5, prompt over 100,000 tokens | $0.50 | $2.50 | $0.25 | $1.25 |
| Claude Haiku 4.5 | $1 | $5 | $0.50 | $2.50 |

The batch columns follow from the rule Anthropic states for its Batch API: a 50% discount on both input and output tokens. The pricing page lists older and limited-availability models too; the table above keeps to the current general-purpose ones.

Two notes from the same page are easy to miss. Claude Sonnet 5 launched with $2 and $10 as introductory pricing; Anthropic now lists it as the standard price and says the increase it had scheduled will not happen. And Claude Haiku 5.5 is the one model priced by prompt length: a request whose prompt is over 100,000 tokens pays the higher row for the whole request, cache reads included. Every other model in the table charges the same per-token rate across its full context window.`,
    },
    {
      id: "what-a-request-costs",
      heading: "What one request actually costs",
      body: `Per-million prices are hard to picture, so here is a typical request: a 2,000-token prompt (a page or two of instructions and context) and a 500-token reply (a few paragraphs). Cost is input tokens times the input price plus output tokens times the output price.

| Model | One request | 1,000 requests |
| --- | --- | --- |
| Claude Haiku 5.5 | $0.00045 | $0.45 |
| Claude Sonnet 5.5 | $0.009 | $9 |
| Claude Opus 5.5 | $0.018 | $18 |
| Claude Fable 5.1 | $0.045 | $45 |

The arithmetic for Sonnet 5.5: 2,000 × $2 ÷ 1,000,000 = $0.004 for input, plus 500 × $10 ÷ 1,000,000 = $0.005 for output, for $0.009 in total.

Three things push a real bill above this simple sum:

- **Conversation history.** In a multi-turn chat, every request re-sends the earlier turns as input. Turn 20 of a conversation can cost many times what turn 1 did.
- **Thinking tokens.** Anthropic's documentation says thinking tokens are billed as output tokens. A short visible answer can carry a much longer hidden reasoning step.
- **Tools.** Server-side tools add their own charges. Web search, for example, is listed at $10 per 1,000 searches on top of the tokens its results add to the input.

To estimate your own prompt, paste it into the [Token Counter](/token-counter) and multiply its Claude estimate by the input price. Remember that the counter's Claude figure is characters divided by 3.5, an approximation rather than Anthropic's tokenizer.`,
    },
    {
      id: "tokenizer-matters",
      heading: "Why the same text can cost more on a newer model",
      body: `Price per token is only half the calculation; the other half is how many tokens your text becomes. Anthropic's pricing page notes that Claude 4.7 and later models use a newer tokenizer that "produces approximately 30% more tokens for the same text", with the exact increase depending on the content. Claude Sonnet 4.6 and earlier use the previous tokenizer.

So comparing Sonnet 4.6 at $3 input with Sonnet 5.5 at $2 is not a straight one-third saving. If your text produces 30% more tokens on the newer tokenizer, the effective input cost is closer to $2.60 per million of the old tokens, still cheaper, but by less than the sticker price suggests. Anthropic's token counting documentation makes the same point for migrations: count your prompts with the model you plan to use rather than reusing counts from an older one.

The exact count for any model is available from Anthropic's token counting endpoint, which the documentation lists as free to use (subject to its own rate limits). The [What are tokens in AI?](/token-counter/what-are-tokens-in-ai) guide explains why tokenizers differ in the first place.`,
    },
    {
      id: "discounts-and-surcharges",
      heading: "Discounts and surcharges that change the rate",
      body: `**Prompt caching.** If many requests start with the same long prefix, such as a system prompt or a reference document, you can cache it. A cache write costs more than normal input (1.25 times the input price for a five-minute cache, twice the input price for a one-hour cache). A cache read costs far less: 0.1 times input on most models, 0.05 times on Opus 5.5 and Sonnet 5.5, and 0.025 times on Fable 5.1. Reading a cached prefix on Sonnet 5.5 therefore costs $0.10 per million tokens instead of $2.

**Batch processing.** Requests sent through the Batch API are processed asynchronously at half price for both input and output. It suits anything that does not need an answer within seconds: classification, bulk summaries, evaluations. Anthropic says batch and caching discounts can be combined.

**US-only inference.** For Claude 4.6 and later models, pinning inference to the United States with the inference_geo setting applies a 1.1 times multiplier to all token prices.

**Fast mode.** Some Opus models offer a faster output mode at premium pricing. Check the pricing page for the current multiplier before turning it on; it does not combine with the Batch API.

**Cloud platforms.** Claude is also sold through Amazon Bedrock and Google Cloud, where the cloud provider sets and invoices the price. Anthropic's page notes that their regional endpoints carry a 10% premium over global ones.`,
    },
    {
      id: "api-or-subscription",
      heading: "API tokens or a subscription?",
      body: `The per-token prices above apply to the API, which is what developers and apps use. A Claude Pro or Max subscription is a separate product with a flat monthly price and usage limits instead of a meter, and Anthropic says Pro does not include API usage. As of October 17, 2026, [claude.com/pricing](https://claude.com/pricing) lists Pro at $20 per month billed monthly in the US, or $17 per month billed annually.

A rough way to compare: at Sonnet 5.5 prices, $20 buys about 2,200 of the 2,000-in, 500-out requests in the example above. Heavy chat users often get more than that from a subscription; occasional or automated use is usually cheaper on the API. The usage limits on Pro are not published in tokens, which our page on [the Claude Pro token limit](/token-counter/claude-pro-token-limit) explains.

For more on keeping prompts lean before you pay for them, see [How many tokens is my prompt?](/guides/prompt-token-count-explained).`,
    },
  ],
  faqs: [
    {
      question: "What is the cheapest Claude model on the API?",
      answer:
        "As of October 17, 2026, Claude Haiku 5.5 is the cheapest general-purpose model on Anthropic's pricing page: $0.10 per million input tokens and $0.50 per million output tokens for prompts up to 100,000 tokens, and half that through the Batch API.",
    },
    {
      question: "Why are output tokens more expensive than input tokens?",
      answer:
        "The model reads input largely in parallel but has to generate output one token at a time, which takes more computing per token. On every current Claude model listed on Anthropic's pricing page, output costs five times the input price.",
    },
    {
      question: "Is the Claude token counting API free?",
      answer:
        "Yes. Anthropic's token counting documentation says the endpoint is free to use, subject to requests-per-minute rate limits based on your usage tier. It returns an estimate that may differ slightly from the count on the actual request.",
    },
    {
      question: "How much does 1 million Claude tokens cost?",
      answer:
        "It depends on the model and on whether the tokens are input or output. As of October 17, 2026, one million input tokens cost $0.10 on Haiku 5.5, $2 on Sonnet 5.5, $4 on Opus 5.5 and $10 on Fable 5.1; output costs five times as much.",
    },
    {
      question: "Does a Claude Pro subscription include API tokens?",
      answer:
        "No. Anthropic states that the Pro plan does not include API usage through the Claude Console. API usage is set up separately and billed per token at the prices on the pricing page.",
    },
  ],
  relatedTools: ["token-counter", "text-splitter", "word-counter"],
  relatedGuides: ["prompt-token-count-explained"],
};
