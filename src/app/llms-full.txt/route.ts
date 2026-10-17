import { coreTools } from "@/lib/tools";
import { allGuides } from "@/lib/guides";
import { siteUrl } from "@/lib/schema";
import { TOOL_GUIDES, toolGuidePath } from "@/lib/tool-guides";

/**
 * llms-full.txt — the substance behind llms.txt in one plain-text file: the
 * direct answer of every English guide and the introduction of every core
 * tool. Locale pages and brand variants are left out; they translate or
 * repackage the text below. Generated from the page data, like llms.txt.
 */
export const dynamic = "force-static";

function block(title: string, url: string, body: string) {
  return [`# ${title}`, "", `URL: ${url}`, "", body.trim(), ""];
}

export function GET() {
  const lines: string[] = [
    "# Fix My Formatting — full text",
    "",
    "> Free browser-based tools that clean up and convert text from AI chat assistants.",
    `> Index: ${siteUrl}/llms.txt`,
    "",
    "## Guides",
    "",
  ];

  for (const guide of allGuides) {
    lines.push(...block(guide.h1, `${siteUrl}/guides/${guide.slug}`, guide.answer));
  }
  for (const guide of TOOL_GUIDES) {
    lines.push(...block(guide.h1, `${siteUrl}${toolGuidePath(guide)}`, guide.answer));
  }

  lines.push("## Tools", "");
  for (const tool of coreTools) {
    lines.push(...block(tool.name, `${siteUrl}/${tool.slug}`, tool.intro));
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
