import type { ToolGuide } from "../../../lib/tool-guides";

export const makeChatgptSoundLessLikeAi: ToolGuide = {
  parentTool: "de-slop",
  slug: "make-chatgpt-sound-less-like-ai",
  title: "How to Make ChatGPT Sound Less Like AI",
  description: "Give ChatGPT your facts, a writing sample and a few habits to avoid, then edit the draft. Prompts that help, prompts that backfire, and the final pass.",
  h1: "How do I make ChatGPT sound less like AI?",
  dek: "Better input gets you most of the way. An edit gets you the rest. Neither works well alone.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Give it better input and edit the output. Supply the facts, the audience and a sample of your own writing; ask for plain sentences without stock phrases, lists of three or a summary at the end. Then edit the draft: cut the opener and closer, replace inflated words, and add specifics only you know. Prompting alone rarely removes every habit.",
  sections: [
    {
      id: "why-it-sounds-like-ai",
      heading: "Why ChatGPT sounds like ChatGPT",
      body: `A chat model writes the most likely version of whatever you ask for. Given a vague request ("write a LinkedIn post about our product launch"), the most likely version is the average of every launch post it has seen: an upbeat opener, three benefits, an inspirational line, a call to action. It also carries habits from its training to be helpful and thorough, which is where the "Great question!", the balanced "on the other hand" paragraph and the closing summary come from.

So the voice you are trying to get rid of has two sources:

- **Missing information.** When the model does not know your facts, audience or opinion, it fills the gap with generic phrasing. This is the bigger cause, and it is fixed with better input.
- **Default habits.** Even with good input, chat models lean on the same vocabulary and structures. These are fixed with instructions, and then with an edit.

The [What is AI slop?](/de-slop/what-is-ai-slop) guide lists the habits in detail.`,
    },
    {
      id: "give-it-material",
      heading: "Give it the material, not just the task",
      body: `The fastest improvement is to stop asking ChatGPT to invent content. Paste in what you know:

- **Facts and specifics.** Numbers, names, dates, what happened, what went wrong. A model with real details writes sentences about them; a model without them writes about "innovation" and "growth".
- **Your opinion.** If you think option B is better, say so and say why. Otherwise you get an even-handed survey of A, B and C.
- **The reader.** "For engineers who already use the API" produces different sentences from "for a general audience".
- **The format and length.** "Three short paragraphs, no headings, no bullet points" stops the default document structure.
- **A sample of your writing.** Paste two or three paragraphs you wrote yourself and ask it to match the sentence length, vocabulary and tone. This works better than describing your style in adjectives, because "conversational but professional" means nothing specific to a model.

A good request often looks more like a set of notes than an instruction: here is what happened, here is what I think, here is who will read it, write it in the style of this sample.`,
    },
    {
      id: "instructions-that-help",
      heading: "Style instructions that help, and ones that backfire",
      body: `Short, concrete instructions work better than long lists of bans. A version you can adapt:

> Write in plain, direct sentences, as a knowledgeable person would in an email to a colleague. Vary sentence length. Do not open by restating the request or close with a summary or an offer to help. Do not use em dashes. Avoid "not just X but Y" constructions, lists of three for rhythm, and words such as delve, landscape, navigate, robust, seamless and pivotal. If a sentence only says something is important, replace it with the specific fact or cut it.

To avoid pasting this every time, save it as a standing instruction, for example in ChatGPT's personalization settings or in a project's instructions, so every chat starts with it.

Some instructions backfire:

- **Huge ban lists.** Forbid fifty words and the model reaches for the fifty-first synonym, which is often stranger. Ban the few that bother you most and describe the pattern behind the rest.
- **"Sound human" or "write like a human".** Too vague to act on, and it often produces forced casualness: slang, rhetorical questions, "Honestly?" as a sentence.
- **"Make it undetectable."** That asks for a different goal than good writing, and the result tends to be worse to read. Our guide on [whether AI text can be made undetectable](/humanize-ai-text/can-ai-text-be-made-undetectable) explains why no prompt can guarantee it anyway.
- **Asking it to rate its own text as human.** A model's opinion of whether something sounds like AI is not reliable evidence either way.

Expect drift. Over a long conversation, defaults creep back. Re-state the key instruction, or start a fresh chat with the instruction and your notes.`,
    },
    {
      id: "edit-the-draft",
      heading: "Edit the draft: the part prompting cannot replace",
      body: `Even a well-prompted draft benefits from one editing pass. In rough order of payoff:

1. **Delete the first and last sentences** of each section and see if anything is lost. Openers that restate the question and closers that restate the answer are the most common filler.
2. **Search for the habits**: "not just", "it's important to", "serves as", "in today's", "ultimately", "whether you're". Rewrite or cut each one.
3. **Break the rhythm.** If every paragraph has three sentences of similar length, combine two or split one.
4. **Replace one generic claim per paragraph** with something specific from your own experience.
5. **Read it aloud.** Anything you would not say to a person, reword.

[De-slop](/de-slop) can do steps 1 to 3 for you. Paste the draft and it returns the same text with the stock vocabulary, negative parallelisms, padded triads, staged reveals, vague attributions and chatbot openers and sign-offs removed, keeping every fact, number, name, quotation and URL. It is an edit, not a rewrite: length stays within about fifteen percent and the language of the input is kept. Tick "Show what changed" to review each edit.

It has limits. The text is sent to OpenAI's API for the edit, each run takes up to 8,000 characters, and there are a few runs per hour. It cannot add the specifics in step 4, and as a model it can occasionally cut a phrase you wanted, which is what the diff is for.`,
    },
    {
      id: "formatting-tells",
      heading: "Do not forget the formatting tells",
      body: `Some of what makes pasted ChatGPT text look machine-made is not the words at all. Curly quotes in a plain-text field, em dashes, emoji bullets, bold Unicode "fonts" from social posts, and invisible characters picked up from the chat window all show up when you paste into email, a CMS or a form.

The [AI Formatting Humanizer](/humanize-ai-text) handles those in your browser, without uploading anything, and without changing a word: dashes become commas, quotes are straightened, hidden characters and emoji are removed, and pseudo-fonts return to plain letters. Run it after De-slop and your own edit, as the last step before you paste. If the text also carries Markdown symbols such as ** or ##, the [guide to Markdown symbols in Word](/guides/markdown-symbols-in-word) explains where they come from.`,
    },
  ],
  faqs: [
    {
      question: "What is the best prompt to make ChatGPT sound human?",
      answer:
        "There is no single prompt. What helps most is giving it your facts, your opinion, the audience and a sample of your own writing, plus a short instruction to write plainly and skip stock phrases, padded lists and summary closers. Then edit the result.",
    },
    {
      question: "Why does ChatGPT keep using the same words?",
      answer:
        "It predicts the most likely wording, and certain words and structures were common in its training data and rewarded during tuning. Without specific material and instructions, it falls back on those defaults.",
    },
    {
      question: "Should I tell ChatGPT to avoid em dashes?",
      answer:
        "You can, and it usually reduces them, though some may still appear in long outputs. Removing the rest afterwards takes seconds with the AI Formatting Humanizer or Remove Em Dashes.",
    },
    {
      question: "Can De-slop fix text from Claude or Gemini too?",
      answer:
        "Yes. The patterns it removes are common across chat models, not specific to ChatGPT. It works on any text up to 8,000 characters and keeps the language of the input.",
    },
    {
      question: "Will this make my text pass AI detectors?",
      answer:
        "No promise can be made. Detectors are unreliable in both directions. Better input and a careful edit make the writing clearer and more yours, which is the goal worth aiming for.",
    },
  ],
  relatedTools: ["de-slop", "humanize-ai-text", "remove-em-dashes", "text-diff"],
  relatedGuides: ["signs-of-ai-written-text", "why-chatgpt-uses-em-dashes", "markdown-symbols-in-word"],
};
