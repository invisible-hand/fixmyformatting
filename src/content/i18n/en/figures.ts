import type { FigureCopy } from "@/lib/i18n/types";

/**
 * Text shown in and around the guide diagrams.
 *
 * Deliberately excluded: every monospace specimen inside the figures — the
 * Markdown, JSON, code points and AI-tell exhibits. Those are the English
 * artefacts being demonstrated, so translating them would destroy the point of
 * the figure and break the monospace alignment they rely on.
 *
 * `notes` render as HTML paragraphs beneath the SVG rather than as <text>
 * inside it, so they wrap at any length. That is what makes a 30%-longer
 * German sentence safe, and it makes the prose selectable and screen-reader
 * addressable in every language, English included.
 */
export const figures: FigureCopy = {
  "dash-widths": {
    caption: "An em dash pattern typical of AI drafts, and the same sentence rewritten with commas.",
    notes: [],
    labels: { before: "AI DRAFT", after: "AFTER CLEANUP" },
  },
  "ai-tells-panel": {
    caption: "Four mechanical patterns that commonly survive a copy-paste from an AI chat.",
    notes: [],
    labels: { eyebrow: "COMMON TELLS" },
  },
  "hidden-characters": {
    caption: "A zero-width space is invisible on screen but still present in the underlying text.",
    notes: [],
    labels: { before: "WHAT YOU SEE", after: "WHAT IS ACTUALLY STORED" },
  },
  "markdown-in-word": {
    caption: "The same response pasted as raw Markdown, and converted so the structure survives.",
    notes: [
      "Word has no Markdown parser, so the symbols are treated as ordinary characters.",
      "Converting first turns them into real headings, bold runs, and list items.",
    ],
    labels: { before: "PASTED AS PLAIN TEXT", after: "CONVERTED" },
  },
  "table-to-grid": {
    caption: "A pipe table is plain text until it is parsed into real spreadsheet cells.",
    notes: [
      "Pasting the raw table drops every value into a single column.",
      "Converting to XLSX or CSV keeps the rows and columns intact.",
    ],
    labels: { before: "MARKDOWN", after: "SPREADSHEET", region: "Region" },
  },
  "transcript-to-doc": {
    caption: "A copied chat transcript restructured into a document with labelled speakers.",
    notes: ["Speaker turns become headings, so the export stays readable outside the chat window."],
    labels: {
      before: "COPIED TRANSCRIPT",
      after: "DOCUMENT",
      title: "Conversation export",
      you: "You",
      assistant: "Assistant",
      ask: "Summarize this report",
      reply: "Here is a concise summary…",
      followUp: "Add the numbers",
    },
  },
  "smart-quotes-code": {
    caption: "Curly quotation marks are different characters from the straight quotes parsers expect.",
    notes: [],
    labels: { before: "PASTED FROM CHAT", after: "AFTER NORMALIZING" },
  },
  "dash-ruler": {
    caption: "Hyphen, en dash, and em dash at the same type size, with their standard uses.",
    notes: [],
    labels: {
      hyphenName: "Hyphen",
      hyphenUse: "Compound words: well-known",
      enName: "En dash",
      enUse: "Ranges: 2020–2024",
      emName: "Em dash",
      emUse: "Breaks in a sentence",
    },
  },
  "token-chunks": {
    caption: "Tokens are sub-word fragments, so character count and token count rarely match.",
    notes: [
      "36 characters · 7 tokens · roughly 5.1 characters per token",
      "A rough English rule of thumb: 1 token ≈ 4 characters ≈ 0.75 words.",
      "Code, non-English scripts, and rare words all use more tokens per character.",
    ],
    labels: { eyebrow: "ONE SENTENCE, SEVEN TOKENS" },
  },
};
