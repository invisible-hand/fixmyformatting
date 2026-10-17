import type { GuideDefinition } from "./guides";
import { allGuides } from "./guides";
import { allTools, coreTools, getTool } from "./tools";
import { whatAreLineBreaks } from "../content/tool-guides/remove-line-breaks/what-are-line-breaks";

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

export const TOOL_GUIDES: ToolGuide[] = [whatAreLineBreaks];

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
