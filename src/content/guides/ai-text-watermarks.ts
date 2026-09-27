import type { GuideDefinition } from "../../lib/guides";

export const textWatermarks: GuideDefinition = {
  slug: "ai-text-watermarks",
  title: "Do ChatGPT, Claude, and Gemini Watermark Their Text?",
  description:
    "How AI text watermarks actually work, which chatbots use them in 2026, what survives copying and editing, and why invisible characters are not the mark.",
  h1: "Do AI chatbots watermark their text?",
  dek: "What the marks are, who ships them in 2026, and why the folklore about hidden characters gets it backwards.",
  cluster: "ai-tells",
  published: "2026-08-10",
  updated: "2026-09-26",
  answer:
    "Some do, as of August 2026. Gemini embeds Google's SynthID watermark in generated text, and Claude models launched on or after August 2, 2026 carry an embedded text watermark under the EU AI Act's transparency code. ChatGPT does not yet watermark text, only images and voice. These marks live in the model's word choices, not in hidden characters — you cannot see them, and no cleanup tool can detect or remove them.",
  sections: [
    {
      id: "what-a-text-watermark-is",
      heading: "What a text watermark actually is",
      body: `The persistent folk theory is that AI watermarks are hidden characters — zero-width spaces or special Unicode tucked between the words. That is not how any deployed text watermark works.

A real text watermark is statistical. As the model writes, it faces many small choices where several words would do equally well. A watermarking scheme nudges those choices toward words on a secret list that changes with the surrounding context. Any single choice is unremarkable; across a few hundred words, the pattern of choices becomes measurable to someone who holds the key, while remaining invisible to everyone else. The text contains only ordinary characters, reads normally, and looks identical whether or not the mark is present.

This is why the watermark cannot be seen, and also why it cannot be stripped the way formatting can. It is not *in between* the words. It **is** the words.

Invisible Unicode characters are a real phenomenon — they routinely survive a copy-paste out of a chat window, and the [invisible characters guide](/guides/chatgpt-invisible-characters) covers where they come from. But they are a side effect of web rendering, not a deliberate mark. You can list and remove every one of them with the [Invisible Character Scanner](/remove-invisible-characters), and the statistical watermark, if one is present, will not have been touched.`,
    },
    {
      id: "does-gemini-watermark-text",
      heading: "Does Gemini watermark text?",
      body: `**Yes.** Gemini watermarks the text it writes with SynthID, Google DeepMind's watermark for AI-generated content. SynthID Text is a statistical watermark applied *during generation* by adjusting how the model samples its next word. It is not an invisible character, not metadata, and nothing in the copied text looks any different.

**How SynthID Text works.** A language model writes one token — a word or a piece of a word — at a time, and every candidate token has a probability score. In Google DeepMind's words, "SynthID adjusts these probability scores to generate a watermark." Technically it is a *logits processor*: a step in the sampling pipeline that nudges those scores with a pseudorandom function driven by secret keys. The words that come out carry a pattern that Google's detector can score and a reader cannot see. Because the mark is made while the words are chosen, there is nothing added to the text afterwards to find or delete.

**Where Google applies it, by Google's own statements:**

- **Gemini app and web — since May 2024.** Google DeepMind announced on May 14, 2024 that it was "expanding SynthID's capabilities to watermarking AI-generated text in the Gemini app and web experience". The team's Nature paper (October 23, 2024) says SynthID-Text "has been productionized in the user-facing Gemini and Gemini Advanced chatbots", after a live test on about 20 million Gemini responses found user ratings essentially unchanged: thumbs-up rates differed by 0.01 %.
- **Gemini API, Google AI Studio and Antigravity — per a Google staff reply, August 2026.** Google's SynthID page names only the Gemini app and web experience. On Google's developer forum, a Google staff member first answered (August 5, 2026) that API text was *not* watermarked, then corrected himself on August 19, 2026: text generated via the Gemini API "IS actually SynthID-watermarked", and the same applies to Google AI Studio and Antigravity. That is Google's latest word, but it lives in a forum thread rather than product documentation.
- **Open source — since October 23, 2024.** Google released SynthID Text through Hugging Face Transformers (v4.46.0) and its Responsible Generative AI Toolkit, so any developer can watermark their own model's output with their own keys.

**Can you check whether a text is from Gemini?** Not yourself, as of September 2026. Gemini's built-in SynthID check verifies images, video and audio — Google's help page does not list text. The SynthID Detector portal, announced May 20, 2025, said text detection would roll out "in the coming weeks"; today Google DeepMind's SynthID page describes the portal as accepting "an image, video or audio file", with access limited to journalists and media professionals on an early-tester waitlist.

**The limits Google itself states.** SynthID Text "works best when a language model generates longer responses". It is "less effective on responses to factual prompts", such as "What is the capital of France?", where there is little room to vary the wording. Its "confidence scores can be greatly reduced when an AI-generated text is thoroughly rewritten or translated to another language", and the Nature paper adds that generative watermarks are "weakened by edits to the text, such as through LLM paraphrasing". Google's developer documentation also says SynthID Text "is not designed to directly stop motivated adversaries from causing harm".

**What this means for hidden characters.** SynthID Text contains no zero-width spaces or other invisible Unicode. If Gemini output you pasted contains hidden characters, they came from copying and web rendering, not from the watermark. The [Invisible Character Scanner](/remove-invisible-characters) and [AI Text Cleaner](/clean-ai-text) find and remove those characters. They do not remove SynthID, and cannot: the watermark is in which words were chosen, and those tools change characters, not words.`,
    },
    {
      id: "who-watermarks-in-2026",
      heading: "Who actually watermarks text in 2026",
      body: `The EU AI Act's transparency rules (Article 50) began applying on August 2, 2026. Providers of generative AI systems must mark AI-generated content in a machine-readable way where technically feasible, and the major labs signed a Code of Practice describing how. The vendor picture as of August 2026:

**Google Gemini — yes, live.** Google's SynthID has watermarked Gemini's text output since well before the deadline, alongside its image, audio, and video marks. Google signed the transparency code in July 2026 and is pushing SynthID as a cross-industry standard, with partners including Apple, NVIDIA, ElevenLabs, and OpenAI.

**Anthropic Claude — yes, for new models.** Anthropic signed the same code. Claude models launched on or after August 2, 2026 embed a text watermark from day one, applied at the model level rather than per-product. Older Claude models are in a transition period. Anthropic says detection tooling for third parties is coming but has not shipped publicly yet.

**OpenAI ChatGPT — no, not for text.** As of August 2026, ChatGPT does not watermark its text. OpenAI has deployed marks in other modalities — SynthID in generated images since May 2026, and marks in voice output, plus C2PA provenance metadata — and has researched text watermarking for years without shipping it.

Two things follow from that picture. First, "this text has no watermark" does not mean "no AI wrote this" — the most-used chatbot in the world does not mark its text at all, and older models never will retroactively. Second, the situation is moving quickly; this section is dated because it will age.

Alongside text watermarks, generated *files* — images, PDFs, SVGs — increasingly carry C2PA provenance metadata: a signed label saying which tool produced the file. Unlike statistical watermarks, that metadata is fragile by design and disappears on any re-save, screenshot, or format conversion.`,
    },
    {
      id: "what-survives",
      heading: "What survives copying, editing, and translation",
      body: `Because the watermark is woven into word choice, it behaves differently from anything formatting-based:

**Copy-paste: survives.** The mark travels with the text into any editor, form, or document. Pasting as plain text, "removing formatting", or laundering the text through Notepad does nothing to it — those operations strip styling and hidden characters, and the watermark is neither.

**Light editing: mostly survives.** Fixing typos, swapping a handful of words, or deleting a paragraph leaves most of the marked choices intact. The signal degrades gradually with each change rather than disappearing at some threshold.

**Heavy rewriting, paraphrase, translation: degrades badly.** Providers say this themselves — the published limitations note that heavily edited, paraphrased, or translated text may no longer carry a detectable mark. By the time a human has genuinely rewritten a passage, most of the original word choices — and therefore most of the mark — are gone.

**Short text: too little signal.** A sentence or two does not contain enough choices to measure. Watermark detection is a statistical claim and needs length to reach confidence.

**Detection: gated by the provider.** Reading the mark requires the provider's detector. Google offers SynthID detection; Anthropic's is announced but not yet public. The commercial "AI detectors" schools and editors use do not read these watermarks at all — they guess from style, which is a far weaker signal with a well-documented false-positive problem, discussed in the [AI tells guide](/guides/signs-of-ai-written-text).

One more limitation the providers state plainly: a detected mark means the text *passed through* a model, not that the model authored the ideas. Ask Claude to proofread your own essay and the output can carry the mark. Provenance is not authorship, in either direction.`,
    },
    {
      id: "what-this-means-for-you",
      heading: "What this means in practice",
      body: `**If you paste AI output into documents:** nothing about your workflow changes. The watermark does not affect how text renders, breaks no software, and adds no characters. The things that *do* break documents — smart quotes in code, stray em dashes, zero-width characters, Markdown symbols in Word — are ordinary formatting artefacts, and cleaning them up with the [AI Text Cleaner](/clean-ai-text) is unrelated to watermarking.

**If you are wondering whether a text you received is marked:** you cannot currently check, unless it came from Gemini and you use Google's detector. There is no public tool that reads Claude's mark yet, and ChatGPT text has no mark to read. Anyone selling a universal "AI watermark detector" for text in 2026 is selling something else.

**If you are tempted by "watermark remover" tools:** be skeptical twice over. Against statistical watermarks, a character-level cleanup provably does nothing, and the vendors who claim otherwise cannot test their own claim — the detectors are not public. The only operation that reliably degrades the mark is a deep rewrite, which is just a paraphrasing model wearing a different label, with the quality loss that implies — and output rewritten by a marking model simply carries that model's mark instead. Our tools remove formatting artefacts and report what they find; they do not and cannot remove watermarks, and we would rather say that plainly than sell you a myth.

**If your concern is being flagged:** the watermark is the *least* of it, because reading it requires the provider's cooperation. What actually gets text flagged today is the visible layer — the mechanical and stylistic tells that style-based detectors and human readers key on. That layer is real, checkable, and covered honestly in the [seven signs guide](/guides/signs-of-ai-written-text).`,
    },
  ],
  faqs: [
    {
      question: "Does ChatGPT put a watermark in its text?",
      answer:
        "No. As of August 2026, ChatGPT's text output carries no watermark. OpenAI marks generated images (SynthID, since May 2026) and voice output, and attaches C2PA metadata to files, but it has not shipped text watermarking, despite researching it for years.",
    },
    {
      question: "Are invisible Unicode characters the AI watermark?",
      answer:
        "No. Zero-width spaces and similar characters that show up in pasted chat output are rendering side effects, not marks — they can be listed and removed in seconds. Deployed text watermarks are statistical patterns in the model's word choices and contain no special characters at all.",
    },
    {
      question: "Can a text cleaner remove an AI watermark?",
      answer:
        "No, and you should distrust any tool claiming it can. Cleanup tools operate on characters — quotes, dashes, hidden Unicode, Markdown syntax — while the watermark lives in which words were chosen. Only heavy rewriting degrades it, which means replacing the text, not cleaning it.",
    },
    {
      question: "Can my teacher or editor detect these watermarks?",
      answer:
        "Almost certainly not today. Reading a text watermark requires the provider's own detector: Google offers one for SynthID, Anthropic's is not yet public, and ChatGPT text has no mark. Commercial AI detectors guess from writing style instead, which is much less reliable and produces false positives on human writing.",
    },
    {
      question: "Does the watermark change how the text reads?",
      answer:
        "Providers say no, and there is no visible difference to find. The mark only biases choices among words that were already near-equally likely, so the text reads normally and contains only ordinary characters. It does not affect formatting, rendering, or anything a reader or word processor would notice.",
    },
  ],
  relatedTools: ["remove-invisible-characters", "clean-ai-text", "de-slop"],
  relatedGuides: ["signs-of-ai-written-text", "chatgpt-invisible-characters", "invisible-unicode-characters"],
};
