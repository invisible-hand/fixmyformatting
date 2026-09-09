/**
 * De-slop: the one tool whose result comes from a language model rather than
 * from the in-browser processors. Server-only; imported by /api/de-slop.
 *
 * The editing brief is built from Wikipedia's "Signs of AI writing" page
 * (WP:AISIGNS): the vocabulary, the negative parallelisms, the rule of three,
 * copula avoidance, vague attribution, the -ing tails, empty significance,
 * decorative formatting, and chatbot residue. The prompt says what to
 * preserve before it says what to cut, defines the anti-pattern in prose
 * instead of listing bans, and asks for the text and nothing else.
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
1. AI vocabulary. Words a model reaches for that a person writing the same sentence would not: delve, tapestry, testament, pivotal, crucial, intricate, landscape and realm used figuratively, navigate and journey used figuratively, leverage and harness as verbs, robust, seamless, vibrant, foster, showcase, underscore, highlight as a verb, enhance, elevate, empower, unlock, streamline, game-changer, cutting-edge, comprehensive, multifaceted, ever-evolving, "in today's fast-paced world", "at the end of the day", "it's worth noting", "it's important to note", and sentence openers such as notably, moreover, furthermore, additionally, ultimately, "in conclusion", "in summary", overall. Use the plain word, or drop the phrase when it carries nothing.
2. Empty significance. Sentences that assert importance without saying what happened: "marks a pivotal moment", "plays a crucial role", "represents a significant shift", "serves as a reminder", "highlighting the importance of", "reflecting a broader trend", "leaving an indelible mark". Cut them, or replace them with the specific fact they gesture at if that fact is in the text.
3. Negative parallelism. "Not just X but Y", "not only X but also Y", "it's not about X, it's about Y", "X rather than Y" used for rhythm. State the positive claim directly.
4. The rule of three. Triads assembled for cadence: "fast, reliable, and secure"; "innovation, collaboration, and growth". Keep the items that carry information and drop the padding. A list of three real things stays a list of three real things.
5. Copula avoidance. "Serves as", "acts as", "functions as", "stands as", "represents" for "is". "Features", "boasts", "offers" for "has". "Marks the" for "is the". Use the simple verb.
6. Vague attribution. "Experts agree", "many believe", "it is widely recognized", "observers note", "studies consistently show", "industry reports suggest". Remove the attribution and keep only what the text itself supports.
7. Participial tails. A clause hung on the end of a sentence to add commentary: "..., highlighting its significance", "..., ensuring a seamless experience", "..., fostering collaboration", "..., underscoring the need for". Cut the tail.
8. Punctuation and decoration. Em dashes become a comma, a period or parentheses as the sentence needs; keep at most one dash-like break per paragraph and prefer none. Curly quotes and apostrophes become straight ones. Emoji used as bullets or decoration are removed. Bold on random phrases becomes plain text. Headings on a short note become plain paragraphs. "Key points:"-style inline headers become prose or a plain list. Horizontal rules are removed. Title Case On Ordinary Phrases becomes sentence case; proper nouns keep their capitals.
9. Chatbot residue. Openers such as "Certainly!", "Great question", "Sure", "Here's a", "Absolutely". Closers such as "I hope this helps", "Let me know if", "Feel free to", "Happy to help". "As an AI", "as of my last update", knowledge-cutoff disclaimers. Model-left tags such as "[citation needed]" and tracking parameters such as "?utm_source=chatgpt.com" in URLs. The author's own placeholders, such as "[Your Name]", stay.
10. Mannered prose. Metaphor and flourish standing in for a direct statement: "a dial worth turning" for "a parameter worth varying", "earns its keep" for "still matters". The phrases exist to display the writer, not to convey the idea. Say what is meant; when a literal phrase is available, use it.
11. Shape. Consecutive sentences of identical construction, paragraphs that each end on a summarizing flourish, and a closing paragraph that restates what was already said. Vary sentence length where it comes naturally and delete restatement.

Judgment
- One em dash, one "however", or one three-item list in a long text is fine. Remove patterns, not every instance of a word a person could plausibly use.
- Do not introduce tells of your own: no new em dashes, no new triads, no summarizing closer, no new bold.
- Plain text in, plain text out. Markdown in, Markdown out, minus the decoration listed above.

<example>
<user>In today's fast-paced digital landscape, remote work isn't just a trend — it's a fundamental shift in how we approach productivity. Companies that embrace flexible arrangements are not only attracting top talent but also fostering a culture of trust, autonomy, and innovation. ✨ I hope this helps!</user>
<response>Remote work is a change in how companies get work done, not a passing trend. Companies that allow flexible arrangements attract strong candidates and give their people more room to decide how they work.</response>
<rationale>CORRECT: the opener "In today's fast-paced digital landscape" is gone, the em dash and the "isn't just X, it's Y" construction are replaced by a direct statement, the triad "trust, autonomy, and innovation" is reduced to what it actually claims, the emoji and the chatbot closer are removed, and no fact was added or lost. Length is close to the original.</rationale>
</example>`;

/**
 * Cheap, language-agnostic-ish counters for the report card. English-centric
 * by design: the phrases are the ones WP:AISIGNS lists, and the count is a
 * before/after signal rather than a detector.
 */
const tellPhrases = [
  /\bdelv(?:e|es|ed|ing)\b/gi,
  /\btapestr(?:y|ies)\b/gi,
  /\btestament\b/gi,
  /\bpivotal\b/gi,
  /\bcrucial\b/gi,
  /\bintricate\b/gi,
  /\brobust\b/gi,
  /\bseamless(?:ly)?\b/gi,
  /\bvibrant\b/gi,
  /\bfoster(?:s|ed|ing)?\b/gi,
  /\bshowcas(?:e|es|ed|ing)\b/gi,
  /\bunderscor(?:e|es|ed|ing)\b/gi,
  /\bleverag(?:e|es|ed|ing)\b/gi,
  /\bharness(?:es|ed|ing)?\b/gi,
  /\bunlock(?:s|ed|ing)?\b/gi,
  /\bempower(?:s|ed|ing)?\b/gi,
  /\belevat(?:e|es|ed|ing)\b/gi,
  /\bstreamlin(?:e|es|ed|ing)\b/gi,
  /\bgame-?changer\b/gi,
  /\bcutting-edge\b/gi,
  /\bmultifaceted\b/gi,
  /\bever-evolving\b/gi,
  /\bfast-paced\b/gi,
  /\bat the end of the day\b/gi,
  /\bit'?s worth noting\b/gi,
  /\bit'?s important to note\b/gi,
  /\bin conclusion\b/gi,
  /\bin summary\b/gi,
  /\bnot (?:just|only|merely|simply) \b[^.!?\n]{1,80}?\b(?:but|it'?s)\b/gi,
  /\bserves? as\b/gi,
  /\bstands? as\b/gi,
  /\bplays? a (?:crucial|pivotal|key|vital) role\b/gi,
  /\bexperts agree\b/gi,
  /\bwidely recogni[sz]ed\b/gi,
  /\bI hope this helps\b/gi,
  /\blet me know if\b/gi,
  /\bfeel free to\b/gi,
  /\bas an ai\b/gi,
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
