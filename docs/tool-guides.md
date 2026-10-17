# Tool sub-guides

Question pages nested under a tool, served at `/<tool>/<question-slug>`
(for example `/remove-line-breaks/what-are-line-breaks`). They answer one
question a visitor of that tool is likely to have, then send them back to the
tool.

## Where things live

| Piece | File |
| --- | --- |
| Content (one guide per file) | `src/content/tool-guides/<tool>/<slug>.ts`, exporting one `ToolGuide` |
| Registry + validator | `src/lib/tool-guides.ts` (`TOOL_GUIDES`, `toolGuidesFor`, `getToolGuide`, `validateToolGuides`) |
| Route | `src/app/(english)/[slug]/[question]/page.tsx` (`dynamicParams = false`) |
| Rendering | `src/components/guide-page.tsx` (same component as `/guides/<slug>`) |
| Sitemap / llms.txt | `src/app/sitemap.ts`, `src/app/llms.txt/route.ts` (nested under the parent tool) |
| Tool page list | "Questions about <tool>" in `src/components/tool-page.tsx` (only when guides exist) |
| Tests | `tests/tool-guides.test.tsx` |

## Adding a guide

1. Create `src/content/tool-guides/<tool>/<slug>.ts` exporting a `ToolGuide`
   (`GuideDefinition & { parentTool; slug }`).
2. Import it in `src/lib/tool-guides.ts` and add it to `TOOL_GUIDES`.
3. Run `npm test` and `npm run build`. The validator runs at module load, so
   an invalid guide fails the build with a list of every problem.

## Writer contract (enforced by `validateToolGuides()`)

- `parentTool` is a core tool slug, never a brand variant (`chatgpt-to-word`
  and friends inherit the list from their core tool).
- `slug` matches `^[a-z0-9-]+$`, is unique under its tool, and is not a tool slug.
- `title` ≤ 60 characters; `description` ≤ 155 characters.
- `h1` is not equal to any existing guide H1/title or any tool title/name, and
  not repeated by another tool guide. Before writing, search the existing guide
  H1s and H2s (`src/content/guides/`) so the new page does not compete with one.
- `answer` is the first thing on the page: ≤ 60 words, answers the H1
  directly, contains no link, and does not open with "In this guide…",
  "This article…", "Let's…" or similar.
- Sections total ≥ 900 words (aim for about 1,100). Section ids are unique and
  match `^[a-z0-9-]+$`.
- Sections contain ≥ 2 internal links, one of them to `/<parentTool>`.
- `faqs` ≥ 4, no question repeats the H1, no duplicates.
- `relatedTools` includes the parent tool; every related tool and guide exists.
- `published` and `updated` are real `YYYY-MM-DD` dates, not in the future;
  `updated` ≥ `published`. `updated` is published as `dateModified`.
- Tone: honest and specific. Describe what the tool does and where it gets
  things wrong. No hype, no claims the code does not back up. Dated facts
  (prices, limits) say "as of <date>".

## What the page emits

- Canonical `https://fixmyformatting.com/<tool>/<slug>`, Open Graph and
  Twitter cards (image: `/api/guide-og/<slug>?tool=<tool>`).
- Breadcrumb Home › Tool › Question, with `BreadcrumbList` JSON-LD.
- `Article` (with `dateModified`) and `FAQPage` JSON-LD.
- A "Do it now →" card to `/<parentTool>` after the answer and after the FAQs.

## Translations (not shipped yet)

The locale bundle accepts `toolGuides?: Record<"<tool>/<slug>", GuideTranslation>`.
A localized page renders only when the translation exists, the English guide
exists, and the parent tool is served in that locale
(`isToolGuideLocalized`); `toolGuideSlugsForLocale` drives static params, the
sitemap and hreflang, so untranslated guides never appear in any of them. Add
`guideChrome.doItNow` and `guideChrome.questionsAbout` (with `{tool}`) for the
locale at the same time; the tool-page question list stays hidden in a locale
until `questionsAbout` is translated.
