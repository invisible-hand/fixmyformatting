import { processText } from "@/lib/processors";
import type { ToolDefinition } from "@/lib/tools";
import { getProcessorSlug } from "@/lib/tools";
import { ExampleDocxButton } from "./example-docx-button";

/**
 * A static, crawlable "Before and after": the tool's own example as it is
 * pasted, next to what the tool makes of it, rendered at build time by the
 * same processor the workspace runs. Readers (and search engines) see the
 * result without pressing anything; the Word converters also get a one-click
 * .docx of the example.
 */
type Labels = { heading: string; before: string; after: string; docx: string; docxBusy: string };

// What the "after" column is, per processor, in one sentence (English pages only).
const AFTER_NOTES: Record<string, string> = {
  "markdown-to-word": "Word opens the download with real Heading 1 and Heading 2 styles, list paragraphs that indent and renumber, an editable table and Courier New for the code block.",
  "markdown-to-pdf": "The PDF prints the preview as shown: headings, nested bullets, the table and the code block keep their line breaks.",
  "markdown-to-google-docs": "Copy the result as rich text and paste it into Google Docs: the headings, lists, links and table arrive formatted instead of as ## and ** symbols.",
  "markdown-viewer": "The rendered view, with headings, lists, the table and the code block laid out as the author intended.",
  "markdown-to-html": "Clean HTML with heading, list, table, link and code elements, ready to paste into a page or an email editor.",
  "remove-markdown-formatting": "The same words with the asterisks, hashes, pipes and backticks gone, ready for an email, a form or a chat box.",
  "markdown-table-to-excel": "Each pipe table becomes its own sheet-ready grid; plain numeric cells are typed as numbers so they can be summed.",
  "markdown-table-to-csv": "Each pipe table becomes comma-separated rows that any spreadsheet opens.",
  "clean-ai-text": "The text with smart quotes, dashes, invisible characters and stray Markdown normalised, nothing else changed.",
  "remove-em-dashes": "The same sentences with every em dash replaced by the punctuation you chose.",
  "chatgpt-conversation-to-document": "The conversation as a document: each turn becomes a labelled section with its formatting kept.",
};

export function BeforeAfter({ tool, locale, labels }: { tool: ToolDefinition; locale: string; labels: Labels }) {
  const example = tool.example;
  if (!example) return null;
  const processor = getProcessorSlug(tool.slug);
  let result;
  try {
    result = processText(processor, example);
  } catch {
    return null;
  }
  if (!result.output && !result.html) return null;
  // Headings inside the preview are part of the example, not of this page's outline.
  const previewHtml = result.html
    ? result.html.replace(/<h([1-6])(\s[^>]*)?>/g, '<p class="ba-h ba-h$1"$2>').replace(/<\/h[1-6]>/g, "</p>")
    : "";
  const note = locale === "en" ? AFTER_NOTES[processor] : undefined;
  return (
    <section className="before-after" aria-labelledby="before-after-heading">
      <h2 id="before-after-heading">{labels.heading}</h2>
      <div className="ba-grid">
        <figure className="ba-figure">
          <figcaption>{labels.before}</figcaption>
          <pre className="ba-before"><code>{example.trim()}</code></pre>
        </figure>
        <figure className="ba-figure">
          <figcaption>{labels.after}</figcaption>
          {result.html
            ? <div className="ba-after ba-rendered" dangerouslySetInnerHTML={{ __html: previewHtml }} />
            : <pre className="ba-after"><code>{result.output.trim()}</code></pre>}
        </figure>
      </div>
      {note && <p className="ba-note">{note}</p>}
      {processor === "markdown-to-word" && (
        <p className="ba-actions"><ExampleDocxButton example={example} slug={tool.slug} label={labels.docx} busyLabel={labels.docxBusy} /></p>
      )}
    </section>
  );
}
