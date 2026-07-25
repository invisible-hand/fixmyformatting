import { emDashes } from "../content/guides/why-chatgpt-uses-em-dashes";
import { aiTells } from "../content/guides/signs-of-ai-written-text";
import { invisibleCharacters } from "../content/guides/chatgpt-invisible-characters";
import { markdownInWord } from "../content/guides/markdown-symbols-in-word";
import { tableToExcel } from "../content/guides/paste-chatgpt-table-into-excel";
import { exportConversation } from "../content/guides/export-chatgpt-conversation";
import { smartQuotes } from "../content/guides/smart-quotes-break-code";
import { dashReference } from "../content/guides/em-dash-vs-en-dash-vs-hyphen";
import { tokenCount } from "../content/guides/prompt-token-count-explained";
import { unicodeReference } from "../content/guides/invisible-unicode-characters";

export type GuideCluster = "ai-tells" | "how-to" | "reference";

export type GuideFigureKey =
  | "dash-widths"
  | "ai-tells-panel"
  | "hidden-characters"
  | "markdown-in-word"
  | "table-to-grid"
  | "transcript-to-doc"
  | "smart-quotes-code"
  | "dash-ruler"
  | "token-chunks";

export type GuideSection = {
  /** Anchor id; also drives the table of contents. */
  id: string;
  heading: string;
  /** Markdown, rendered at build time. */
  body: string;
  figure?: GuideFigureKey;
};

export type GuideDefinition = {
  slug: string;
  /** <title>, kept to 60 characters by tests/seo-i18n.test.ts. */
  title: string;
  /** Meta description, kept to 155 characters. */
  description: string;
  /** On-page headline; may be longer and friendlier than the title tag. */
  h1: string;
  dek: string;
  cluster: GuideCluster;
  /** Structured data only — never rendered. */
  published: string;
  updated: string;
  /** Direct answer, rendered before the body so it can win a featured snippet. */
  answer: string;
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  /** Tool slugs this guide should funnel into. */
  relatedTools: string[];
  relatedGuides: string[];
};

export const clusterLabels: Record<GuideCluster, string> = {
  "ai-tells": "Spotting AI text",
  "how-to": "Fixing AI output",
  reference: "Reference",
};

export const clusterOrder: GuideCluster[] = ["ai-tells", "how-to", "reference"];

export const allGuides: GuideDefinition[] = [
  aiTells,
  emDashes,
  invisibleCharacters,
  markdownInWord,
  tableToExcel,
  exportConversation,
  smartQuotes,
  dashReference,
  tokenCount,
  unicodeReference,
];

export function getGuide(slug: string) {
  return allGuides.find((guide) => guide.slug === slug);
}

export function guidesInCluster(cluster: GuideCluster) {
  return allGuides.filter((guide) => guide.cluster === cluster);
}

/** Guides that a given tool page should link out to. */
export function guidesForTool(toolSlug: string) {
  return allGuides.filter((guide) => guide.relatedTools.includes(toolSlug));
}

export function relatedGuidesFor(guide: GuideDefinition) {
  return guide.relatedGuides
    .map((slug) => getGuide(slug))
    .filter((related): related is GuideDefinition => Boolean(related));
}

export function guidePath(slug?: string) {
  return slug ? `/guides/${slug}` : "/guides";
}
