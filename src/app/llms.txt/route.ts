import { brandTools, coreTools } from "@/lib/tools";
import { allGuides, clusterLabels, getGuide, clusterOrder, guidesInCluster } from "@/lib/guides";
import { siteUrl } from "@/lib/schema";
import { getToolGuide, toolGuidePath, toolGuidesFor } from "@/lib/tool-guides";
import {
  guideSlugsForLocale,
  localeCodes,
  localizeGuide,
  localizedPath,
  localizeTool,
  localizeToolGuide,
  toolGuideSlugsForLocale,
  toolSlugsForLocale,
} from "@/lib/i18n";

/**
 * llms.txt — a plain-text index of the site for language models, per the
 * llmstxt.org convention.
 *
 * Generated from the same data that drives the sitemap and the pages
 * themselves, rather than hand-written into public/, so it cannot drift out of
 * date when a tool or guide is added. Core tools come first with their sub-guides;
 * the brand pages (chatgpt-to-word, claude-to-pdf, …) follow in their own
 * section, since they are templated variants of five core converters. The
 * localized pages are listed per locale by title only: they translate the
 * English originals, so repeating descriptions would only add bulk.
 * llms-full.txt carries the full answer text of every guide and tool.
 */
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    "# Fix My Formatting",
    "",
    "> Free browser-based tools that clean up and convert text from AI chat assistants.",
    "> Paste output from ChatGPT, Claude, Gemini, Copilot, Perplexity, DeepSeek, Grok, Mistral",
    "> or NotebookLM and convert it to Word, PDF, Google Docs, Excel or clean plain text, or",
    "> edit the tells of AI writing out of it (De-slop). Every tool except De-slop runs in the browser:",
    "> nothing is uploaded, there is no account, and there are no usage limits. De-slop sends",
    "> the text to OpenAI's API for one edit, stores nothing, and is rate-limited.",
    "",
    "The site is published in English plus ten more languages (es, pt, de, fr, it, ja, ko,",
    `zh, hi, ar) under a locale prefix, for example ${siteUrl}/es/remove-em-dashes.`,
    "",
  ];

  for (const cluster of clusterOrder) {
    const guides = guidesInCluster(cluster);
    if (!guides.length) continue;
    lines.push(`## Guides — ${clusterLabels[cluster]}`, "");
    for (const guide of guides) {
      lines.push(`- [${guide.h1}](${siteUrl}/guides/${guide.slug}): ${guide.description}`);
    }
    lines.push("");
  }

  const categories = [...new Set(coreTools.map((tool) => tool.category))];
  for (const category of categories) {
    lines.push(`## Tools — ${category}`, "");
    for (const tool of coreTools.filter((tool) => tool.category === category)) {
      lines.push(`- [${tool.name}](${siteUrl}/${tool.slug}): ${tool.description}`);
      // Tool sub-guides nest under their parent tool.
      for (const guide of toolGuidesFor(tool.slug)) {
        lines.push(`  - [${guide.h1}](${siteUrl}${toolGuidePath(guide)}): ${guide.description}`);
      }
    }
    lines.push("");
  }

  lines.push(
    "## Tools — per-assistant variants",
    "",
    "Each is one of the core converters above with notes for a specific assistant's output.",
    "",
  );
  for (const tool of brandTools) {
    lines.push(`- [${tool.name}](${siteUrl}/${tool.slug}): ${tool.intro}`);
  }
  lines.push("", "## Translations", "");

  for (const locale of localeCodes) {
    const url = (path: string) => `${siteUrl}${localizedPath(locale, path)}`;
    const entries: string[] = [];
    for (const slug of toolSlugsForLocale(locale)) {
      entries.push(`- [${localizeTool(slug, locale).name}](${url(slug)})`);
    }
    for (const slug of guideSlugsForLocale(locale)) {
      const guide = getGuide(slug);
      if (guide) entries.push(`- [${localizeGuide(guide, locale).h1}](${url(`guides/${slug}`)})`);
    }
    for (const path of toolGuideSlugsForLocale(locale)) {
      const [tool, slug] = path.split("/");
      const guide = getToolGuide(tool, slug);
      if (guide) entries.push(`- [${localizeToolGuide(guide, locale).h1}](${url(path)})`);
    }
    if (!entries.length) continue;
    lines.push(`### ${locale}`, "", `- [Home](${url("")})`, ...entries, "");
  }

  lines.push(
    "## Notes",
    "",
    `- ${siteUrl}/api/share and ${siteUrl}/localized-content/ are excluded from crawling, and \`?embed=1\` views of any page are noindex; none of them are listed here.`,
    "- Locale pages are translations of the English originals listed above; each is linked to its original through hreflang.",
    "",
    "## Discovery",
    "",
    `- [Sitemap](${siteUrl}/sitemap.xml): every URL, with hreflang alternates.`,
    `- [llms-full.txt](${siteUrl}/llms-full.txt): the direct answer of every English guide and the introduction of every core tool, as plain text.`,
    "",
  );

  lines.push(
    "## Optional",
    "",
    `- [All tools](${siteUrl}/): the full index, including the ${
      coreTools.length
    } core tools and the per-assistant variants of the five converters.`,
    `- [Guides index](${siteUrl}/guides): all ${allGuides.length} guides.`,
    `- [About](${siteUrl}/about): what the site is and how the processing works.`,
    `- [Privacy](${siteUrl}/privacy): what is and is not stored.`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
