import { coreTools } from "@/lib/tools";
import { allGuides, clusterLabels, clusterOrder, guidesInCluster } from "@/lib/guides";
import { siteUrl } from "@/lib/schema";

/**
 * llms.txt — a plain-text index of the site for language models, per the
 * llmstxt.org convention.
 *
 * Generated from the same data that drives the sitemap and the pages
 * themselves, rather than hand-written into public/, so it cannot drift out of
 * date when a tool or guide is added. Only the 31 core tools are listed: the 35
 * brand pages (chatgpt-to-word, claude-to-pdf, …) are templated variants of five
 * core converters, and listing all of them would bury the substance in
 * near-duplicates — exactly the noise this file exists to spare a model.
 */
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    "# Fix My Formatting",
    "",
    "> Free browser-based tools that clean up and convert text from AI chat assistants.",
    "> Paste output from ChatGPT, Claude, Gemini, Copilot, Perplexity, DeepSeek or Grok and",
    "> convert it to Word, PDF, Google Docs, Excel or clean plain text. Every tool runs",
    "> entirely in the browser: nothing is uploaded, there is no account, and there are no",
    "> usage limits. Text leaves the device only if the user deliberately creates a share link.",
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
    }
    lines.push("");
  }

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
