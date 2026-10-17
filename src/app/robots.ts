import type { MetadataRoute } from "next";

/**
 * AI crawlers and assistant fetchers get an explicit group. A crawler obeys
 * only the most specific group that names it, so the disallows must be
 * repeated here rather than inherited from "*".
 */
const aiAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "bingbot",
  "Amazonbot",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
];

const disallow = ["/api/share", "/localized-content/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: aiAgents, allow: ["/"], disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: "https://fixmyformatting.com/sitemap.xml",
  };
}
