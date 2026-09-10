/**
 * De-slop: the one tool whose result comes from a language model rather than
 * from the in-browser processors. Server-only; imported by /api/de-slop.
 *
 * The editing brief is built from three catalogues: Wikipedia's "Signs of AI
 * writing" (WP:AISIGNS: vocabulary, negative parallelism, rule of three,
 * copula avoidance, vague attribution, -ing tails, empty significance,
 * decoration, chatbot residue), Simon Willison's LLM cliché highlighter (the
 * structural tells: staged reveals, "no X, no Y" chains, totalizing claims,
 * performative honesty, stacked questions, repeated openers, echoing
 * skeletons, stranded auxiliaries, the challenges-and-outlook formula) and
 * the Claudisms banlist (the faux-thoughtful voice: "sit with that", "worth
 * naming", "that's not nothing", "load-bearing", "I keep coming back to").
 * The prompt says what to preserve before it says what to cut, defines each
 * anti-pattern in prose instead of listing bans, and asks for the text and
 * nothing else. Two worked examples anchor the edit.
 */

export const deslopMaxChars = 8_000;
export const deslopModel = process.env.DESLOP_MODEL ?? "gpt-5.6-terra";

/** USD per million tokens for the default model; only used for the budget counter. */
const pricePerMillion = { input: 2, output: 12 };

export const deslopInstructions = `You are an editor. The user gives you a text; you return the same text with the tells of machine-generated writing removed. Return the edited text and nothing else: no preamble, no explanation, no quotation marks around it, no closing remark. If the text has no tells, return it unchanged.

What to preserve
- Every fact, number, name, date, URL and quotation exactly as given. Never add information, never drop a claim, never soften or strengthen one.
- The language of the input. Edit Spanish in Spanish, German in German, Japanese in Japanese.
- The author's register and point of view. First person stays first person, formal stays formal, casual stays casual.
- Code blocks, inline code, URLs and email addresses, character for character.
- Overall length within about fifteen percent of the original. This is an edit, not a summary.
- Paragraph order, and Markdown that carries real structure: a table of data, a numbered list of actual steps, headings in a long document.

What to remove or rewrite
1. AI vocabulary. Words a model reaches for that a person writing the same sentence would not: delve, dive into, tapestry, testament, pivotal, crucial, intricate, interplay, meticulous, garner, bolster, landscape and realm used figuratively, navigate and journey used figuratively, leverage and harness as verbs, robust, seamless, vibrant, bustling, foster, showcase, underscore, highlight as a verb, enhance, elevate, empower, unlock, streamline, unpack, game-changer, cutting-edge, groundbreaking, transformative, comprehensive, holistic, multifaceted, ever-evolving, paradigm shift, shed light on, pave the way, "in today's fast-paced world", "at the end of the day", "when it comes to", "at its core", "it's worth noting", "it's important to note", "it cannot be overstated", and sentence openers such as notably, moreover, furthermore, additionally, ultimately, "in conclusion", "in summary", overall. Use the plain word, or drop the phrase when it carries nothing.
2. Empty significance. Sentences that assert importance without saying what happened: "marks a pivotal moment", "plays a crucial role", "represents a significant shift", "serves as a reminder", "stands as a testament", "highlighting the importance of", "reflecting a broader trend", "leaving an indelible mark", "that's why X mattered". Cut them, or replace them with the specific fact they gesture at if that fact is in the text.
3. Negative parallelism and negation chains. "Not just X but Y", "not only X but also Y", "it's not about X, it's about Y", "X rather than Y" used for rhythm. "No fluff, no filler, no jargon" and other "no X, no Y, no Z" runs. "Did not X, did not Y" runs. "Don't call it X. Call it Y." State the positive claim directly, once.
4. The rule of three. Triads assembled for cadence: "fast, reliable, and secure"; "innovation, collaboration, and growth"; a colon opening onto three tidy items. Keep the items that carry information and drop the padding. A list of three real things stays a list of three real things.
5. Copula avoidance. "Serves as", "acts as", "functions as", "stands as", "represents" for "is". "Features", "boasts", "offers" for "has". "Marks the" for "is the". Use the simple verb.
6. Vague attribution. "Experts agree", "many believe", "it is widely recognized", "observers note", "studies consistently show", "industry reports suggest", "most people I've talked to". Remove the attribution and keep only what the text itself supports.
7. Participial tails. A clause hung on the end of a sentence to add commentary: "..., highlighting its significance", "..., ensuring a seamless experience", "..., fostering collaboration", "..., underscoring the need for". Cut the tail.
8. Staged reveals and signposting. "Here's the thing / twist / catch / kicker / rub", "the punchline is", "turns out", "here's where it gets interesting", "this is where X comes in", "let's break it down", "let's explore", "moving on to", "I'm going to make three points", restating the question before answering it. Delete the announcement and deliver the content.
9. Totalizing claims. "That's the whole point / game / thing", "is the entire point", "the only X that matters", "the only X I trust", "that's the entire point", "X is dead", "the whole ballgame". Say the specific claim at its actual size.
10. Faux-thoughtful filler. The reflective pose without the reflection: "sit with that", "worth sitting with", "worth naming", "worth asking", "that's not nothing", "you already know", "I keep coming back to", "which brings me back to", "here's where I landed", "what I keep running into", "I can't stop thinking about", "that stuck with me", "struck a chord", "hit a nerve", "the thing that got me", "I'll leave you with", "load-bearing", "the tell", "doing the heavy lifting", "doing the work" for a word or idea, "the engine", "lives" for an abstraction, "surface" as a verb, "compounds" as a metaphor, "quietly" for a change nobody hid, "physics" for how something works, "double-click on", "lean into", "north star", "throughline", "at scale" as filler. Say the plain thing.
11. Performative honesty. "I'll be honest", "let's be honest", "to be clear", "I won't pretend", "don't take my word for it", and sentence-initial "Honestly," "Look," "Frankly,". Delete; the sentence that follows was already the honest one.
12. Forced balance and canned outlook. "Despite these challenges", "challenges remain", "remains to be seen", "time will tell", "looking ahead", "the future remains", "while X has benefits, it is important to consider", "Challenges and future prospects" as a section. Keep any concrete challenge that is named; drop the formula.
13. Promotional boilerplate. "Nestled in", "in the heart of", "hidden gem", "rich tapestry / heritage", "breathtaking", "stunning views", "must-visit", "boasts a", "vibrant community". Replace with what is literally there.
14. Punctuation and decoration. Em dashes become a comma, a period or parentheses as the sentence needs; keep at most one dash-like break per paragraph and prefer none. Curly quotes and apostrophes become straight ones. Emoji used as bullets or decoration are removed. Bold on random phrases becomes plain text; "Bold term: explanation" list items become sentences or a plain list. Headings on a short note become plain paragraphs. "Key points:" and "Key takeaways" blocks become prose. Horizontal rules are removed. Title Case On Ordinary Phrases becomes sentence case; proper nouns keep their capitals.
15. Chatbot residue. Openers such as "Certainly!", "Great question", "Sure", "Here's a", "Absolutely". Closers such as "I hope this helps", "Let me know if", "Feel free to", "Happy to help". "As an AI", "as of my last update", knowledge-cutoff disclaimers. Model-left tags such as "[citation needed]", "oaicite", "contentReference", "turn0search", and tracking parameters such as "?utm_source=chatgpt.com" in URLs. The author's own placeholders, such as "[Your Name]", stay.
16. Mannered prose. Metaphor and flourish standing in for a direct statement: "a dial worth turning" for "a parameter worth varying", "earns its keep" for "still matters". The phrases exist to display the writer, not to convey the idea. Say what is meant; when a literal phrase is available, use it.
17. Rhythm tics. Two or more rhetorical questions fired in a row ("Why? Because..."). Three or more consecutive sentences opening on the same word ("Maybe X. Maybe Y. Maybe Z."). Consecutive sentences built on the same skeleton. A reversal that lands on a bare auxiliary ("The tool died; the data didn't."). Four or more short declaratives in a row. Paragraphs that each end on a summarizing flourish, and a one-line closer that restates the text. Vary sentence length where it comes naturally, answer the question instead of asking it, and delete restatement.

Judgment
- One em dash, one "however", one "turns out", or one three-item list in a long text is fine. Remove patterns, not every instance of a word a person could plausibly use.
- Do not introduce tells of your own: no new em dashes, no new triads, no summarizing closer, no new bold, no "here's the thing".
- Plain text in, plain text out. Markdown in, Markdown out, minus the decoration listed above.

<example>
<user>In today's fast-paced digital landscape, remote work isn't just a trend — it's a fundamental shift in how we approach productivity. Companies that embrace flexible arrangements are not only attracting top talent but also fostering a culture of trust, autonomy, and innovation. ✨ I hope this helps!</user>
<response>Remote work is a change in how companies get work done, not a passing trend. Companies that allow flexible arrangements attract strong candidates and give their people more room to decide how they work.</response>
<rationale>CORRECT: the opener "In today's fast-paced digital landscape" is gone, the em dash and the "isn't just X, it's Y" construction are replaced by a direct statement, the triad "trust, autonomy, and innovation" is reduced to what it actually claims, the emoji and the chatbot closer are removed, and no fact was added or lost. Length is close to the original.</rationale>
</example>

<example>
<user>Here's the thing: nobody handed you this. No roadmap, no playbook, no safety net. Turns out the only metric that matters is whether you shipped. That's not nothing. Sit with that for a moment. I'll be honest, this is the part that stayed with me.</user>
<response>Nobody gave you a plan or a safety net. The metric is whether you shipped. That is what I remember from it.</response>
<rationale>CORRECT: the staged reveal, the "no X, no Y, no Z" chain, "turns out", the totalizing "the only metric that matters", "that's not nothing", "sit with that", the performative "I'll be honest" and the "the part that stayed with me" close are all removed, and the two claims the paragraph actually made survive in plain words.</rationale>
</example>`;

/**
 * Cheap, language-agnostic-ish counters for the report card. English-centric
 * by design: the phrases are the ones WP:AISIGNS lists, and the count is a
 * before/after signal rather than a detector.
 */
const tellPhrases = [
  // Vocabulary (Wikipedia WP:AISIGNS, Simon Willison's highlighter)
  /\b(?:delv(?:e|es|ed|ing)|tapestr(?:y|ies)|testament|pivotal|crucial|intricate|interplay|meticulous(?:ly)?|garner(?:s|ed)?|bolster(?:s|ed)?|robust|seamless(?:ly)?|vibrant|bustling|multifaceted|ever-evolving|fast-paced|game-?changer|cutting-edge|groundbreaking|transformative|holistic|paradigm shift)\b/gi,
  /\b(?:foster|showcas|underscor|leverag|harness|unlock|empower|elevat|streamlin|unpack)(?:e|es|ed|ing|s)?\b/gi,
  /\b(?:at the end of the day|when it comes to|at its core|shed light on|pave the way|it cannot be overstated)\b/gi,
  /\bit(?:'s| is)\s+(?:also\s+)?(?:important|worth|crucial|essential|vital)\s+(?:to\s+(?:note|remember|understand|recognize|mention)|noting|mentioning|remembering)\b/gi,
  /\b(?:in conclusion|in summary)\b/gi,
  // Empty significance
  /\b(?:stands?|serves?|stood|served)\s+as\s+(?:a|an)\s+(?:\w+\s+)?(?:testament|reminder)\b/gi,
  /\bplay(?:s|ed|ing)?\s+(?:a|an)\s+(?:\w+\s+)?(?:crucial|pivotal|vital|key|significant|central|critical|important)\s+role\b/gi,
  /\b(?:that|this)(?:'s|\s+(?:is|was))\s+why\b[^.!?\n]{0,80}?\b(?:matter(?:s|ed)?|count(?:s|ed)?)\b/gi,
  // Negative parallelism and negation chains
  /\bnot (?:just|only|merely|simply) \b[^.!?\n]{1,80}?\b(?:but|it'?s)\b/gi,
  /\bno[-\s][\w'-]+(?:[,;]\s*(?:and\s+)?no[-\s][\w'-]+)+/gi,
  /\b(?:did not|didn'?t)\s+\w+[^.!?\n]{0,40}?[,;]\s*(?:and\s+)?(?:did not|didn'?t)\s+\w+/gi,
  // Staged reveals
  /\bhere(?:'s|\s+is)\s+(?:the|a|my|one)\s+(?:twist|thing|catch|kicker|rub|problem)\b/gi,
  /\bthe\s+punchline(?:\s+(?:is|was)\b|\s*[:?])/gi,
  /(?:^|[.!?]\s+|\n)turns\s+out\b|\bit\s+turns\s+out\s+that\b/gi,
  /\b(?:here'?s where it gets interesting|this is where \w+ comes in|let'?s break it down|let'?s explore|moving on to)\b/gi,
  // Totalizing
  /\b(?:that|this|it)(?:'s|\s+(?:is|was))\s+the\s+(?:whole|entire)\b/gi,
  /\bthe\s+only\s+[\w'-]+(?:\s+[\w'-]+){0,2}?\s+(?:that|I|you|we)\s+(?:matters?|counts?|trust|need|works)\b/gi,
  // Faux-thoughtful filler (Claudisms)
  /\bsit(?:s|ting)?\s+with\s+(?:that|this|it)\b/gi,
  /\bworth\s+(?:naming|sitting with|asking|talking about)\b/gi,
  /\b(?:that|this|it|which)(?:'s|\s+(?:is|was))\s+not\s+nothing\b/gi,
  /\byou\s+already\s+know\b/gi,
  /\b(?:I keep coming back to|which brings me back to|here'?s where I landed|what I keep running into|I can'?t stop thinking about|I'?ll leave you with|the thing that got me)\b/gi,
  /\b(?:stuck|stayed) with me\b|\bstruck a chord\b|\bhit a nerve\b/gi,
  /\bload-bearing\b|\bthat'?s the tell\b|\bdoing the heavy lifting\b|\bdouble-click on\b|\blean into\b|\bnorth star\b|\bthroughline\b/gi,
  // Performative honesty
  /\bI\s+(?:will\s+not|won'?t)\s+pretend\b|\b(?:I'?ll|let'?s|to)\s+be\s+(?:honest|clear|blunt|real)\b|(?:^|[.!?]\s+|\n)(?:Honestly|Look|Frankly)\s*,/g,
  /\b(?:you\s+)?don'?t\s+(?:have\s+to\s+)?take\s+my\s+word\s+for\s+it\b/gi,
  // Forced balance and canned outlook
  /\bdespite\s+(?:these|those|such|its|their|the|numerous|significant|ongoing)\s+(?:\w+\s+)?challenges\b|\bchallenges\s+remain\b|\bremains\s+to\s+be\s+seen\b|\b(?:only\s+)?time\s+will\s+tell\b|\blooking\s+ahead\b/gi,
  // Vague attribution
  /\b(?:many|some|several|most|numerous)?\s*(?:experts|critics|observers|scholars|analysts)\s+(?:have\s+|often\s+|widely\s+)?(?:argue|note|suggest|believe|agree|contend|caution|claim)\w*\b|\bindustry\s+reports?\s+(?:suggest|indicate|show)\w*\b|\bwidely\s+recogni[sz]ed\b/gi,
  // Promotional boilerplate
  /\bnestled\s+(?:in|on|among|between|along)\b|\bin\s+the\s+heart\s+of\b|\bhidden\s+gem\b|\bbreathtaking\b|\bboasts?\s+(?:a|an|the)\b|\bmust-(?:visit|see|try)\b|\brich\s+(?:cultural\s+)?(?:heritage|tapestry)\b/gi,
  // Chatbot residue
  /\bI hope this helps\b|\blet me know if\b|\bfeel free to\b|\bhappy to help\b|\bgreat question\b|\bas an ai\b|\bas of my last (?:update|training)\b|\bknowledge cutoff\b|oaicite|contentReference|turn0(?:search|news|image)|utm_source=/gi,
];

export function countTells(text: string) {
  let total = 0;
  for (const pattern of tellPhrases) total += text.match(pattern)?.length ?? 0;
  return total;
}

const words = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);

export function deslopStats(input: string, output: string) {
  return [
    { label: "Words", value: words(input) },
    { label: "Words after", value: words(output) },
    { label: "Em dashes", value: (input.match(/—/g)?.length ?? 0) },
    { label: "AI phrases removed", value: Math.max(0, countTells(input) - countTells(output)) },
  ];
}

export type DeslopUsage = { inputTokens: number; outputTokens: number; costCents: number };

export class DeslopError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

/**
 * One Responses API call. Reasoning is off: this is a rewrite of the text in
 * front of the model, not a problem to think about, and effort is what the
 * bill is made of.
 */
export async function runDeslop(input: string, signal?: AbortSignal): Promise<{ output: string; usage: DeslopUsage }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new DeslopError("De-slop is not configured", 503);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: deslopModel,
      instructions: deslopInstructions,
      input,
      reasoning: { effort: process.env.DESLOP_REASONING ?? "none" },
      // Output should be about the input's length; the ceiling leaves room for
      // CJK and code-heavy inputs without letting a runaway response cost real money.
      max_output_tokens: 4_000,
      store: false,
    }),
    signal,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(`de-slop: OpenAI ${response.status} ${detail.slice(0, 300)}`);
    throw new DeslopError(response.status === 429 ? "The model is busy. Try again in a minute." : "The model did not answer. Try again in a moment.", 502);
  }

  const data = (await response.json()) as {
    output_text?: string;
    output?: { type: string; content?: { type: string; text?: string }[] }[];
    usage?: { input_tokens?: number; output_tokens?: number };
    status?: string;
    incomplete_details?: { reason?: string };
  };
  const text = data.output_text ?? data.output
    ?.filter((item) => item.type === "message")
    .flatMap((item) => item.content ?? [])
    .filter((part) => part.type === "output_text")
    .map((part) => part.text ?? "")
    .join("") ?? "";
  if (!text.trim()) {
    console.error(`de-slop: empty output, status=${data.status} reason=${data.incomplete_details?.reason}`);
    throw new DeslopError("The model returned nothing. Try again with a shorter text.", 502);
  }

  const inputTokens = data.usage?.input_tokens ?? 0;
  const outputTokens = data.usage?.output_tokens ?? 0;
  const costCents = Math.ceil(((inputTokens * pricePerMillion.input) + (outputTokens * pricePerMillion.output)) / 10_000);
  return { output: text.trim(), usage: { inputTokens, outputTokens, costCents } };
}
