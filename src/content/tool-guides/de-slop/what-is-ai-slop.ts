import type { ToolGuide } from "../../../lib/tool-guides";

export const whatIsAiSlop: ToolGuide = {
  parentTool: "de-slop",
  slug: "what-is-ai-slop",
  title: "What Is AI Slop? Meaning, Examples and Fixes",
  description: "AI slop is low-effort, unrequested AI content. Where the word came from, what slop looks like in writing, why models produce it, and how to edit it out.",
  h1: "What is AI slop?",
  dek: "The word for AI output nobody asked for, and the habits that make machine-written prose recognisable.",
  cluster: "reference",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "AI slop is low-quality AI-generated content produced in volume with little care: filler articles, spammy images, padded posts and generic replies. In writing, slop is recognisable by habits such as stock words (\"delve\", \"tapestry\"), \"not just X but Y\" constructions, lists padded to three, inflated claims of significance, and closing lines that restate what was just said.",
  sections: [
    {
      id: "where-the-word-came-from",
      heading: "Where the word came from",
      body: `"Slop" was already an old word for food scraps fed to pigs. Its new meaning grew out of online slang around 2022, when image generators and then chatbots made it cheap to produce content in bulk.

The programmer Simon Willison is widely credited with pushing it into mainstream use. In a [post dated 8 May 2024](https://simonwillison.net/2024/May/8/slop/) he wrote that "slop" was becoming the term for unwanted AI-generated content the way "spam" became the term for unwanted email, and drew the line carefully: "Not all promotional content is spam, and not all AI-generated content is slop. But if it's mindlessly generated and thrust upon someone who didn't ask for it, slop is the perfect term for it."

The word spread quickly from there. On 9 January 2026 the [American Dialect Society](https://americandialect.org/2025-word-of-the-year-is-slop/) announced that its members had voted "slop" the Word of the Year for 2025, recognising its "widespread use for low-quality, high-quantity content, most typically produced by generative AI". The society noted that "AI slop" had been a nominee the year before, and that by 2025 plain "slop" was enough, with the AI context understood.

Willison's definition is the useful one to keep: slop is not "anything a model wrote". It is output that nobody reviewed, that nobody asked for, and that wastes the reader's time.`,
    },
    {
      id: "two-kinds-of-slop",
      heading: "Two kinds of slop",
      body: `The word covers two overlapping things.

**Slop as content.** Whole pieces made to fill a feed or a search result: AI-written articles on content-farm sites, auto-generated product listings, fake reviews, surreal images posted for engagement, narrated videos assembled from stock clips. Here the problem is the existence of the thing. Editing does not help, because there was nothing worth saying in the first place.

**Slop as style.** The recognisable texture of unedited model prose, which shows up even when the content is useful: a correct answer padded with "it's important to note", a decent email that opens with "I hope this message finds you well" and closes with a summary of itself. This kind can be fixed, because there is real content under the habits.

Most people searching for help are dealing with the second kind. They used a chatbot to draft something real, and it came back sounding like every other chatbot draft. That is the kind [De-slop](/de-slop) is built for.`,
    },
    {
      id: "what-slop-looks-like",
      heading: "What slop looks like in writing",
      body: `Editors who deal with a lot of AI text have catalogued its habits. Wikipedia's page on [signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) is the most thorough public list; Simon Willison maintains a cliché highlighter for the structural ones. The common patterns:

- **Stock vocabulary.** delve, tapestry, testament, landscape, realm, navigate, pivotal, robust, seamless, foster, leverage, "in today's fast-paced world".
- **Empty significance.** "marks a pivotal moment", "plays a crucial role", "highlighting the importance of": claims that something matters without saying what happened.
- **Negative parallelism.** "It's not just a tool, it's a mindset." "No fluff, no filler, no jargon."
- **The rule of three.** Lists and adjective strings padded to three items for rhythm: "fast, reliable, and secure".
- **Copula avoidance.** "serves as", "stands as", "boasts" where "is" or "has" would do.
- **Vague attribution.** "Experts agree", "studies show", with no expert or study named.
- **Staged reveals and signposting.** "Here's the thing", "let's break it down", "turns out".
- **Canned balance.** "Despite these challenges, the future looks bright." "Only time will tell."
- **Decoration.** Em dashes as the default pause, emoji bullets, bold scattered on random phrases, headings on a five-line note.
- **Chatbot residue.** "Great question!", "I hope this helps", "Let me know if you'd like me to expand on any section."

Any one of these is ordinary English. Slop is the density: several per paragraph, every paragraph. Our guide to [signs of AI-written text](/guides/signs-of-ai-written-text) explains why the mechanical ones, such as dashes and curly quotes, are weaker evidence than they look.`,
    },
    {
      id: "why-models-write-slop",
      heading: "Why models write like this",
      body: `A language model predicts likely next words. Asked to describe something, it tends toward the most common way that kind of thing is described across its training data, which means the generic version. Wikipedia's guide puts it as a regression to the mean: the specific, unusual detail is statistically rare, so it gets replaced by broadly applicable, positive-sounding language. "The inventor of the first train-coupling device" becomes "a revolutionary titan of industry".

Training after that first stage pushes in the same direction. Chat models are tuned on human ratings, and raters reward answers that seem thorough, balanced, polite and well organised. The result is prose that hedges, covers every angle evenly, signposts its structure and closes with a summary, because those features scored well, not because the reader needs them.

That is also why slop is hard to remove by asking nicely. The habits are the model's default, not a mistake it makes occasionally.`,
    },
    {
      id: "removing-slop",
      heading: "How to edit slop out",
      body: `For your own drafts, the fix is an edit, not a rewrite:

1. **Cut the frame.** Delete the opener that restates the question and the closer that restates the answer.
2. **Replace inflated words with plain ones.** "Utilize" to "use", "serves as" to "is", "navigate the landscape" to whatever actually happens.
3. **Turn significance claims into facts**, or delete them.
4. **Trim padded lists** to the items that carry information.
5. **Add one specific per paragraph** that only you could have supplied.

[De-slop](/de-slop) automates steps 1 to 4. It sends your text to a language model (OpenAI's API) with an editing brief built from the catalogues above and returns the same text with the patterns removed, keeping every fact, number, name, quotation and URL, the language of the input, and the length within about fifteen percent. Tick "Show what changed" to see the edit as a word-level diff.

Its limits are worth knowing. It takes up to 8,000 characters per run and a few runs per hour, because each run costs money. It cannot add the specifics in step 5, and it cannot fix facts that were wrong to begin with. Being a model itself, it can occasionally cut a phrase you meant or miss one you did not; the diff is there so you can check. For leftover formatting such as curly quotes and hidden characters, run the result through the [AI Formatting Humanizer](/humanize-ai-text), which works in your browser and never changes a word.`,
    },
  ],
  faqs: [
    {
      question: "Is all AI-generated content slop?",
      answer:
        "No. Simon Willison, who helped popularise the term, draws the line at content that is mindlessly generated and pushed on people who did not ask for it. AI-assisted writing that someone reviewed, edited and stands behind is not slop.",
    },
    {
      question: "Who coined the term AI slop?",
      answer:
        "Nobody can be credited with coining it; it emerged in online slang around 2022. Simon Willison helped bring it into wide use with a post on 8 May 2024, and the American Dialect Society named slop its Word of the Year for 2025.",
    },
    {
      question: "What are the most common AI slop words?",
      answer:
        "Delve, tapestry, testament, landscape, realm, navigate, pivotal, crucial, robust, seamless, foster, leverage and showcase, plus phrases such as \"it's important to note\" and \"in today's fast-paced world\". One use is ordinary English; several per paragraph is the tell.",
    },
    {
      question: "Does De-slop change the facts in my text?",
      answer:
        "It is instructed not to. The editing brief tells the model to keep every fact, number, name, date, URL and quotation exactly as written, and the diff view lets you check. If the text has no tells, it comes back unchanged.",
    },
    {
      question: "Can I stop ChatGPT from writing slop in the first place?",
      answer:
        "You can reduce it with clear instructions, examples of your own writing and a list of phrases to avoid, but defaults tend to creep back. Prompting plus a final edit works better than either alone.",
    },
  ],
  relatedTools: ["de-slop", "humanize-ai-text", "text-diff"],
  relatedGuides: ["signs-of-ai-written-text", "why-chatgpt-uses-em-dashes"],
};
