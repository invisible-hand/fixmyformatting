import { track } from "@vercel/analytics";
import type { ToolDefinition } from "./tools";
import type { ProcessedResult, ProcessSettings } from "./processors";

/**
 * Click-time work for the tool workspace, loaded on demand so the tool-page
 * JavaScript that every visitor downloads stays under its 200 KB budget.
 */

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadResult({ tool, processor, input, result, labels }: {
  tool: ToolDefinition;
  processor: string;
  input: string;
  result: ProcessedResult;
  labels: { downloaded: string; excelDownloaded: string; printPdf: string };
}) {
  if (tool.download === "docx") {
    const { createMarkdownDocx } = await import("./markdown-docx");
    saveBlob(await createMarkdownDocx(input), `${tool.slug}.docx`);
    track("tool_action", { tool: tool.slug, action: "download" });
    return "DOCX downloaded";
  }
  if (tool.download === "xlsx") {
    // Same parser as the preview, so the file holds exactly the cells shown.
    const [{ parseMarkdownTables }, { createWorkbook }] = await Promise.all([import("./processors"), import("./xlsx")]);
    const buffer = createWorkbook(parseMarkdownTables(input));
    saveBlob(new Blob([buffer.buffer as ArrayBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `${tool.slug}.xlsx`);
    track("tool_action", { tool: tool.slug, action: "download" });
    return labels.excelDownloaded;
  }
  if (processor === "markdown-to-pdf") {
    window.print();
    return "";
  }
  const content = tool.download === "html" ? (result.html ?? result.output) : result.output;
  const extension = tool.download ?? "txt";
  saveBlob(new Blob([content], { type: extension === "html" ? "text/html" : "text/plain" }), `${tool.slug}.${extension}`);
  track("tool_action", { tool: tool.slug, action: "download" });
  return labels.downloaded;
}

export async function shareResult({ tool, input, settings, labels }: {
  tool: ToolDefinition;
  input: string;
  settings: ProcessSettings & { locale: string };
  labels: { shareCopied: string; couldNotCreateLink: string; shareUnavailable: string };
}) {
  try {
    const response = await fetch("/api/share", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tool: tool.slug, input, settings }),
    });
    const data = (await response.json()) as { id?: string; error?: string };
    if (!response.ok || !data.id) throw new Error(data.error ?? labels.couldNotCreateLink);
    await navigator.clipboard.writeText(`${window.location.origin}/s/${data.id}`);
    track("tool_action", { tool: tool.slug, action: "share" });
    return labels.shareCopied;
  } catch (error) {
    return error instanceof Error ? error.message : labels.shareUnavailable;
  }
}

export async function copyEmbedCode(tool: ToolDefinition, publicPath?: string) {
  const code = `<iframe src="${window.location.origin}${publicPath ?? `/${tool.slug}`}?embed=1" title="${tool.name}" width="100%" height="540" loading="lazy"></iframe>`;
  await navigator.clipboard.writeText(code);
  track("tool_action", { tool: tool.slug, action: "embed" });
}
