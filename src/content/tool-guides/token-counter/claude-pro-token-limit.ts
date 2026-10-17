import type { ToolGuide } from "../../../lib/tool-guides";

export const claudeProTokenLimit: ToolGuide = {
  parentTool: "token-counter",
  slug: "claude-pro-token-limit",
  title: "Claude Pro Token Limit: Usage Caps and Context Window",
  description: "Anthropic publishes no token allowance for Claude Pro. What it publishes as of October 2026: five-hour and weekly limits, and context windows per model.",
  h1: "What is the Claude Pro token limit?",
  dek: "Two different limits hide behind the question. One has published numbers; the other does not.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Anthropic does not publish a token allowance for Claude Pro. As of October 17, 2026, Pro has a usage limit that resets every five hours plus a weekly limit, both varying with message length, files, model and features. Each chat also has a context window: 1M tokens on models such as Opus 5.5, 500K or 200K on others.",
  sections: [
    {
      id: "two-different-limits",
      heading: "Two limits that are easy to confuse",
      body: `"Token limit" can mean two separate things on a Claude subscription, and they behave differently:

1. **The usage limit.** How much you can do with Claude over time before you are asked to wait. This is a budget across all your conversations.
2. **The context window.** How much text a single conversation can hold at once. This is a size limit per chat, measured in tokens.

You can hit either one without touching the other. A single huge document can fill the context window on your first message of the week. A day of short chats can use up your usage limit while every conversation stays tiny.

Everything on this page was checked against Anthropic's own help-center articles on **October 17, 2026**. Plans change often; when a figure matters, check the linked page rather than relying on any copy of it, including this one.`,
    },
    {
      id: "usage-limit",
      heading: "The Pro usage limit: what Anthropic publishes",
      body: `Anthropic's article [What is the Pro plan?](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan) describes the usage limit in terms of time windows, not tokens:

- Pro gives "more usage per session than the Free plan".
- The **session limit resets every five hours**.
- There is also a **weekly usage limit across all models**, which resets at a fixed day and time assigned to your account. You can see the next reset under Settings > Usage.
- Anthropic says it may limit usage in other ways as well, "such as weekly and monthly caps or model and feature usage", at its discretion.

What the article does **not** give is a number of tokens or messages. It says the number of messages you can send "will vary based on message length, including the length of files you attach, the length of your current conversation, and the model or feature you use." Anthropic's [usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices) article adds tool use (Research, web search), effort level, artifacts, and multi-step tasks such as running code or browsing to the list of things that draw on the limit.

So any article quoting a fixed "Claude Pro token limit" for usage is quoting a number Anthropic does not publish. The honest answer is that the allowance is variable and only visible as a percentage in your own Settings > Usage page, which shows progress bars for the current five-hour session and for the weekly limit.

If you regularly run out, Anthropic's options are the Max plans, which the same article describes as offering more usage than Pro, and **usage credits**, which Pro subscribers can enable to keep working beyond the included limit.`,
    },
    {
      id: "context-window",
      heading: "The context window on Pro, by model",
      body: `The context window does have published numbers. According to Anthropic's article [How large is the context window on paid Claude plans?](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans), which covers Pro, Max, Team and Enterprise, the window when chatting with Claude is, as of October 17, 2026:

| Model | Context window in chat |
| --- | --- |
| Claude Fable 5.1 | 1M tokens |
| Claude Fable 5 | 500K tokens |
| Claude Opus 5.5 | 1M tokens |
| Claude Opus 5 | 1M tokens |
| Claude Opus 4.8, 4.7, 4.6 | 500K tokens |
| Claude Sonnet 5.5 | 1M tokens |
| Claude Sonnet 5 | 1M tokens |
| Claude Sonnet 4.6 | 500K tokens |
| Claude Haiku 5.5 | 1M tokens |

For models not in the list, the article gives 200K tokens, which it describes as "about 500 pages of text or more".

The same article lists separate figures for Claude Code and Claude Cowork, which are not always the same as chat. For example, Claude Opus 4.6 is listed at 500K in chat, 1M in Claude Code (on Pro, only with usage credits enabled) and 200K in Cowork. If you work in more than one of these, check the table for the product you are using.

Whether a model is available to you on Pro at all is a separate question; the context-window article does not say which plans include which models.`,
    },
    {
      id: "what-fills-the-window",
      heading: "What fills the window and what happens when it is full",
      body: `The window holds the whole conversation, not just your latest message: every earlier turn, every attached file, project knowledge that is loaded in, tool and connector definitions, and Claude's replies. Anthropic's article warns that tools and connectors are "token-intensive", so having many enabled leaves less room for your own content.

When a conversation approaches the limit, paid plans with code execution enabled get **automatic context management**: Claude summarises earlier messages to make room, and the full history stays available for reference. Anthropic notes two costs of this. The summary is lossy, and longer conversations that trigger it "use more of your usage limit". In rare cases, such as a very large first message, you can still hit the limit outright.

This is where the two limits meet. A long conversation is expensive twice: each new message re-reads the history, which draws down your usage limit faster, and the history eventually crowds the window. Starting a fresh chat with a short summary of where you are is usually the cheaper move.`,
    },
    {
      id: "estimate-before-you-paste",
      heading: "Estimating whether a document will fit",
      body: `Before pasting a long document into a chat, it helps to know roughly how many tokens it is. The [Token Counter](/token-counter) shows a Claude estimate in your browser, calculated as characters divided by 3.5. It is an approximation, not Anthropic's tokenizer. Anthropic's pricing page notes that Claude Opus 4.7 and later models use a newer tokenizer that produces about 30% more tokens for the same text, so treat the estimate as a rough guide with headroom, not an exact count.

A practical rule: if your estimate is above roughly half the window for the model you plan to use, expect the conversation to fill up after a few rounds of questions and answers. Split the document with the [Text Splitter](/text-splitter), ask about one part at a time, or put it in a Project, which Anthropic says uses retrieval to load only the relevant parts.

For what tokens are and why they are counted this way, see [What are tokens in AI?](/token-counter/what-are-tokens-in-ai).`,
    },
    {
      id: "pro-versus-api",
      heading: "Pro is not API access",
      body: `A Pro subscription and the Claude API are billed separately. Anthropic's Pro article states that the plan "does not include API usage through the Claude Console". On the API you pay per token with no five-hour window, and limits are set by rate limits and your spending tier instead.

As of October 17, 2026, Pro costs $20 per month in the US, or $17 per month on an annual plan billed as $200 up front, according to [claude.com/pricing](https://claude.com/pricing). Local prices and taxes vary by region. If you are comparing the subscription with paying per token, our guide to [what Claude tokens cost](/token-counter/how-much-do-claude-tokens-cost) has the current API prices.`,
    },
  ],
  faqs: [
    {
      question: "How many messages can I send on Claude Pro?",
      answer:
        "Anthropic does not give a fixed number. It says the count varies with message length, attached files, conversation length, and the model or feature you use. The session limit resets every five hours and there is a weekly limit on top.",
    },
    {
      question: "When does the Claude Pro limit reset?",
      answer:
        "The session limit resets every five hours. The weekly limit resets at a fixed day and time assigned to your account, which you can see under Settings > Usage. Both facts are from Anthropic's Pro plan article as of October 17, 2026.",
    },
    {
      question: "Is the Claude Pro context window 200K or 1M tokens?",
      answer:
        "It depends on the model. As of October 17, 2026, Anthropic lists 1M tokens in chat for models including Opus 5.5, Sonnet 5.5 and Haiku 5.5, 500K for models such as Opus 4.8 and Sonnet 4.6, and 200K for models not on its list.",
    },
    {
      question: "Does Claude Pro include API access?",
      answer:
        "No. Anthropic states that the Pro plan does not include API usage through the Claude Console. API usage is set up and paid for separately, per token.",
    },
    {
      question: "Why did I hit my limit after only a few messages?",
      answer:
        "Long conversations, large attachments, research and web search, higher effort levels and multi-step tasks all draw more from the limit. Each new message in a long chat also re-reads the history. Starting a fresh chat and using Projects for reused documents both help.",
    },
  ],
  relatedTools: ["token-counter", "text-splitter", "word-counter"],
  relatedGuides: ["prompt-token-count-explained"],
};
