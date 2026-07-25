import { marked } from "marked";
import { isLocale, localesForPath, localizedPath } from "./i18n";
import type { SiteLocale } from "./i18n";

/**
 * Server-only. Kept in its own module so `marked` can never be pulled into a
 * client chunk — guide routes have roughly 8 KB of headroom against the 200 KB
 * initial-JS budget in scripts/check-budgets.mjs.
 */

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Guide prose links to English absolute paths like /remove-em-dashes and
 * /guides/smart-quotes-break-code. In a localized guide those must point at the
 * same page in that locale — and when the target is not translated yet, the
 * link degrades to plain text rather than dumping the reader onto an English
 * page or a 404. That is what makes partial rollout safe.
 */
function rewriteInternalLink(href: string, locale: SiteLocale) {
  if (locale === "en" || !href.startsWith("/") || href.startsWith("//")) return href;
  const path = href.replace(/^\/+/, "").split(/[#?]/)[0];
  if (!path) return localizedPath(locale);
  const covered = isLocale(locale) && localesForPath(path).includes(locale);
  return covered ? localizedPath(locale, path) : null;
}

export function renderGuideMarkdown(body: string, locale: SiteLocale = "en") {
  const renderer = new marked.Renderer();
  const baseHeading = renderer.heading.bind(renderer);
  const baseLink = renderer.link.bind(renderer);

  renderer.heading = function heading(token) {
    const html = baseHeading(token);
    const id = slugify(token.text);
    return id ? html.replace(/^<h([1-6])>/, `<h$1 id="${id}">`) : html;
  };

  renderer.link = function link(token) {
    const rewritten = rewriteInternalLink(token.href, locale);
    if (rewritten === null) return this.parser.parseInline(token.tokens ?? []);
    return baseLink({ ...token, href: rewritten });
  };

  return marked.parse(body, { async: false, gfm: true, renderer }) as string;
}
