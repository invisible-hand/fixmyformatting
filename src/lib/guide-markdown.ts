import { marked } from "marked";

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

const renderer = new marked.Renderer();
const baseHeading = renderer.heading.bind(renderer);

renderer.heading = function heading(token) {
  const html = baseHeading(token);
  const id = slugify(token.text);
  return id ? html.replace(/^<h([1-6])>/, `<h$1 id="${id}">`) : html;
};

export function renderGuideMarkdown(body: string) {
  return marked.parse(body, { async: false, gfm: true, renderer }) as string;
}
