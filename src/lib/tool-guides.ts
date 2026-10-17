import type { GuideDefinition } from "./guides";
import { allGuides } from "./guides";
import { allTools, coreTools, getTool } from "./tools";
import { whatAreLineBreaks } from "../content/tool-guides/remove-line-breaks/what-are-line-breaks";
import { removeAsterisksFromChatgptText } from "../content/tool-guides/remove-markdown-formatting/remove-asterisks-from-chatgpt-text";
import { markdownEquationsToWord } from "../content/tool-guides/markdown-to-word/markdown-equations-to-word";
import { markdownTableToWordTable } from "../content/tool-guides/markdown-to-word/markdown-table-to-word-table";
import { importMarkdownTableIntoExcel } from "../content/tool-guides/markdown-table-to-csv/import-markdown-table-into-excel";
import { fixLineBreaksInWord } from "../content/tool-guides/remove-line-breaks/fix-line-breaks-in-word";
import { pdfCopyPasteLineBreaks } from "../content/tool-guides/remove-line-breaks/pdf-copy-paste-line-breaks";
import { markdownTableToGoogleSheets } from "../content/tool-guides/markdown-table-to-csv/markdown-table-to-google-sheets";
import { pasteChatgptIntoEmailLinkedin } from "../content/tool-guides/remove-markdown-formatting/paste-chatgpt-into-email-linkedin";
import { whatAreTokensInAi } from "../content/tool-guides/token-counter/what-are-tokens-in-ai";

import { claudeProTokenLimit } from "../content/tool-guides/token-counter/claude-pro-token-limit";
import { wordsPerPage } from "../content/tool-guides/word-counter/words-per-page";
import { howMuchDoClaudeTokensCost } from "../content/tool-guides/token-counter/how-much-do-claude-tokens-cost";
import { howLongIs1000Words } from "../content/tool-guides/word-counter/how-long-is-1000-words";
import { howToHumanizeAiText } from "../content/tool-guides/humanize-ai-text/how-to-humanize-ai-text";
import { deSlopVsHumanizer } from "../content/tool-guides/de-slop/de-slop-vs-humanizer";
import { canAiTextBeMadeUndetectable } from "../content/tool-guides/humanize-ai-text/can-ai-text-be-made-undetectable";
import { whatIsAiSlop } from "../content/tool-guides/de-slop/what-is-ai-slop";
import { makeChatgptSoundLessLikeAi } from "../content/tool-guides/de-slop/make-chatgpt-sound-less-like-ai";
/**
 * Tool sub-guides: question pages nested under a core tool, served at
 * /<parentTool>/<slug>. They reuse the GuideDefinition shape (and GuidePage)
 * so Article + FAQPage JSON-LD, the table of contents and future translations
 * work exactly as they do for /guides/<slug>.
 *
 * The writer contract lives in docs/tool-guides.md. validateToolGuides()
 * enforces it and runs at module load, so `next build` fails on a bad guide.
 */
export type ToolGuide = GuideDefinition & {
  /** Core tool slug (never a brand variant such as chatgpt-to-word). */
  parentTool: string;
  slug: string;
};

export const TOOL_GUIDES: ToolGuide[] = [
  whatAreLineBreaks,
  removeAsterisksFromChatgptText,
  markdownEquationsToWord,
  markdownTableToWordTable,
  fixLineBreaksInWord,
  pdfCopyPasteLineBreaks,
  markdownTableToGoogleSheets,
  importMarkdownTableIntoExcel,
  whatAreTokensInAi,
  pasteChatgptIntoEmailLinkedin,
  claudeProTokenLimit,
  wordsPerPage,
  howMuchDoClaudeTokensCost,
  howLongIs1000Words,
  howToHumanizeAiText,
  deSlopVsHumanizer,
  canAiTextBeMadeUndetectable,
  whatIsAiSlop,
  makeChatgptSoundLessLikeAi,
];

export function toolGuidesFor(tool: string): ToolGuide[] {
  return TOOL_GUIDES.filter((guide) => guide.parentTool === tool);
}

export function getToolGuide(tool: string, slug: string): ToolGuide | undefined {
  return TOOL_GUIDES.find((guide) => guide.parentTool === tool && guide.slug === slug);
}

export function toolGuidePath(guide: Pick<ToolGuide, "parentTool" | "slug">) {
  return `/${guide.parentTool}/${guide.slug}`;
}

export const toolGuideLimits = {
  title: 60,
  description: 155,
  answerWords: 60,
  sectionWords: 900,
  faqs: 4,
  internalLinks: 2,
} as const;

const SLUG = /^[a-z0-9-]+$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
/** Openers that circle the question instead of answering it. */
const EVASIVE_OPENER = /^(in this (guide|article|post)|this (guide|article|page|post)|let['’]s|great question|when it comes to|have you ever)/i;

export const countWords = (text: string) => (text.match(/\S+/g) ?? []).length;

const normalize = (text: string) =>
  text.toLowerCase().replace(/[“”"'’?.!:]/g, "").replace(/\s+/g, " ").trim();

const isRealDate = (value: string) =>
  ISO_DATE.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().startsWith(value);

/** Internal hrefs in Markdown bodies: [text](/path) or [text](/path#anchor). */
function internalLinks(markdown: string) {
  return [...markdown.matchAll(/\]\((\/[^)\s]*)\)/g)].map((match) => match[1].split(/[#?]/)[0]);
}

/**
 * Returns every contract violation as a readable string; empty means valid.
 * Arguments exist for tests; production calls it with no arguments.
 */
export function validateToolGuides(
  guides: ToolGuide[] = TOOL_GUIDES,
  today: string = new Date().toISOString().slice(0, 10),
): string[] {
  const problems: string[] = [];
  const coreSlugs = new Set(coreTools.map((tool) => tool.slug));
  const takenHeadlines = new Set([
    ...allGuides.flatMap((guide) => [guide.h1, guide.title]),
    ...allTools.flatMap((tool) => [tool.title, tool.name]),
  ].map(normalize));
  const seenPaths = new Set<string>();
  const seenTitles = new Set<string>();
  const seenH1s = new Set<string>();

  for (const guide of guides) {
    const id = `${guide.parentTool}/${guide.slug}`;
    const fail = (message: string) => problems.push(`${id}: ${message}`);

    if (!coreSlugs.has(guide.parentTool)) fail(`parentTool "${guide.parentTool}" is not a core tool slug`);
    if (!SLUG.test(guide.slug)) fail(`slug must match ${SLUG.source}`);
    if (coreSlugs.has(guide.slug) || getTool(guide.slug)) fail("slug collides with a tool slug");
    if (seenPaths.has(id)) fail("duplicate parentTool/slug");
    seenPaths.add(id);

    if (guide.title.length > toolGuideLimits.title) fail(`title is ${guide.title.length} chars (max ${toolGuideLimits.title})`);
    if (guide.description.length > toolGuideLimits.description) fail(`description is ${guide.description.length} chars (max ${toolGuideLimits.description})`);
    if (seenTitles.has(normalize(guide.title))) fail("title repeats another tool guide");
    seenTitles.add(normalize(guide.title));
    if (seenH1s.has(normalize(guide.h1))) fail("h1 repeats another tool guide");
    seenH1s.add(normalize(guide.h1));
    if (takenHeadlines.has(normalize(guide.h1))) fail("h1 equals an existing guide or tool title");
    if (takenHeadlines.has(normalize(guide.title))) fail("title equals an existing guide or tool title");

    const answerWords = countWords(guide.answer);
    if (answerWords === 0) fail("answer is empty");
    if (answerWords > toolGuideLimits.answerWords) fail(`answer is ${answerWords} words (max ${toolGuideLimits.answerWords})`);
    if (/\]\(|https?:\/\//.test(guide.answer)) fail("answer must not contain a link (answer first, link later)");
    if (EVASIVE_OPENER.test(guide.answer.trim())) fail("answer must open by answering the question, not by introducing the page");

    const sectionWords = guide.sections.reduce((total, section) => total + countWords(section.body), 0);
    if (sectionWords < toolGuideLimits.sectionWords) fail(`sections total ${sectionWords} words (min ${toolGuideLimits.sectionWords})`);
    const ids = guide.sections.map((section) => section.id);
    if (new Set(ids).size !== ids.length) fail("duplicate section ids");
    if (ids.some((sectionId) => !SLUG.test(sectionId))) fail("section ids must match ^[a-z0-9-]+$");

    const links = guide.sections.flatMap((section) => internalLinks(section.body));
    if (links.length < toolGuideLimits.internalLinks) fail(`needs at least ${toolGuideLimits.internalLinks} internal links in the sections`);
    if (!links.includes(`/${guide.parentTool}`)) fail(`sections must link to /${guide.parentTool}`);

    if (guide.faqs.length < toolGuideLimits.faqs) fail(`has ${guide.faqs.length} FAQs (min ${toolGuideLimits.faqs})`);
    for (const faq of guide.faqs) {
      if (normalize(faq.question) === normalize(guide.h1)) fail(`FAQ repeats the H1: "${faq.question}"`);
      if (!faq.answer.trim()) fail(`FAQ "${faq.question}" has no answer`);
    }
    const questions = guide.faqs.map((faq) => normalize(faq.question));
    if (new Set(questions).size !== questions.length) fail("duplicate FAQ questions");

    if (!guide.relatedTools.includes(guide.parentTool)) fail("relatedTools must include the parent tool");
    for (const slug of guide.relatedTools) if (!getTool(slug)) fail(`relatedTools: unknown tool "${slug}"`);
    for (const slug of guide.relatedGuides) {
      if (!allGuides.some((candidate) => candidate.slug === slug)) fail(`relatedGuides: unknown guide "${slug}"`);
    }

    for (const field of ["published", "updated"] as const) {
      const value = guide[field];
      if (!isRealDate(value)) fail(`${field} must be a real YYYY-MM-DD date`);
      else if (value > today) fail(`${field} ${value} is in the future`);
    }
    if (guide.updated < guide.published) fail("updated is earlier than published");
  }
  return problems;
}

const problems = validateToolGuides();
if (problems.length) {
  throw new Error(`Invalid tool guide(s):\n- ${problems.join("\n- ")}`);
}
