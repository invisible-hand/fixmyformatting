"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import type { ToolDefinition } from "@/lib/tools";
import { getProcessorSlug } from "@/lib/tools";
import { processText } from "@/lib/processors";
import type { ProcessedResult } from "@/lib/processors";

type Props = {
  tool: ToolDefinition;
  initialInput?: string;
};

export function ToolWorkspace({ tool, initialInput = "" }: Props) {
  const [input, setInput] = useState(initialInput);
  const [notice, setNotice] = useState("");
  const [mobileTab, setMobileTab] = useState<"input" | "output">("input");
  const [largeResult, setLargeResult] = useState<{ input: string; result: ProcessedResult } | null>(null);
  const deferredInput = useDeferredValue(input);
  const outputRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const conversionTracked = useRef(false);
  const localResult = useMemo(
    () => deferredInput.length > 100_000 ? { output: "", stats: [] } : processText(tool.slug, deferredInput),
    [deferredInput, tool.slug],
  );
  const result = deferredInput.length > 100_000 && largeResult?.input === deferredInput ? largeResult.result : localResult;
  const processor = getProcessorSlug(tool.slug);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!deferredInput || conversionTracked.current) return;
    conversionTracked.current = true;
    track("tool_conversion", { tool: tool.slug });
  }, [deferredInput, tool.slug]);

  useEffect(() => {
    if (deferredInput.length <= 100_000) return;
    const worker = new Worker(new URL("../workers/process.worker.ts", import.meta.url));
    worker.onmessage = (event: MessageEvent<ProcessedResult>) => setLargeResult({ input: deferredInput, result: event.data });
    worker.postMessage({ slug: tool.slug, input: deferredInput });
    return () => worker.terminate();
  }, [deferredInput, tool.slug]);

  function flash(message: string) {
    setNotice(message);
  }

  async function copyOutput() {
    if (!result.output) return;
    if (result.html && ["markdown-to-google-docs", "markdown-viewer", "markdown-to-word"].includes(processor) && navigator.clipboard.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": new Blob([result.output], { type: "text/plain" }),
          "text/html": new Blob([result.html], { type: "text/html" }),
        }),
      ]);
    } else {
      await navigator.clipboard.writeText(result.output);
    }
    track("tool_action", { tool: tool.slug, action: "copy" });
    flash("Copied");
  }

  async function download() {
    if (!result.output && !result.html) return;
    if (tool.download === "docx") {
      const { Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, TextRun } = await import("docx");
      const lines = input.replace(/\r\n/g, "\n").split("\n");
      const children: (InstanceType<typeof Paragraph> | InstanceType<typeof Table>)[] = [];
      for (let index = 0; index < lines.length; index += 1) {
        const heading = lines[index].match(/^(#{1,3})\s+(.+)$/);
        if (heading) {
          const levels = [HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3];
          children.push(new Paragraph({ text: heading[2], heading: levels[heading[1].length - 1] }));
          continue;
        }
        if (/^\|.+\|$/.test(lines[index].trim()) && /^\|?[\s:|-]+\|?$/.test(lines[index + 1]?.trim() ?? "")) {
          const tableLines = [lines[index], ...lines.slice(index + 2).filter((line) => /^\|.+\|$/.test(line.trim()))];
          children.push(new Table({
            rows: tableLines.map((line) => new TableRow({
              children: line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => new TableCell({
                children: [new Paragraph(cell.trim())],
              })),
            })),
          }));
          index += tableLines.length;
          continue;
        }
        const list = lines[index].match(/^\s*[-*+]\s+(.+)$/);
        children.push(new Paragraph({
          ...(list ? { text: list[1], bullet: { level: 0 } } : {
            children: [new TextRun({
              text: lines[index].replace(/\*\*|__/g, ""),
              font: lines[index - 1]?.startsWith("```") ? "Courier New" : undefined,
            })],
          }),
        }));
      }
      const blob = await Packer.toBlob(new Document({ sections: [{ children }] }));
      saveBlob(blob, `${tool.slug}.docx`);
      track("tool_action", { tool: tool.slug, action: "download" });
      flash("DOCX downloaded");
      return;
    }
    if (tool.download === "xlsx") {
      const lines = input.split(/\r?\n/);
      const start = lines.findIndex((line, index) => line.includes("|") && /^\|?[\s:|-]+\|?$/.test(lines[index + 1]?.trim() ?? ""));
      const tableLines = start < 0 ? [] : [lines[start], ...lines.slice(start + 2).filter((line) => line.includes("|"))];
      const rows = tableLines.map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
      const { createXlsx } = await import("@/lib/xlsx");
      const buffer = createXlsx(rows);
      saveBlob(new Blob([buffer.buffer as ArrayBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `${tool.slug}.xlsx`);
      track("tool_action", { tool: tool.slug, action: "download" });
      flash("Excel file downloaded");
      return;
    }
    if (processor === "markdown-to-pdf") {
      window.print();
      return;
    }
    const content = tool.download === "html" ? (result.html ?? result.output) : result.output;
    const extension = tool.download ?? "txt";
    saveBlob(new Blob([content], { type: extension === "html" ? "text/html" : "text/plain" }), `${tool.slug}.${extension}`);
    track("tool_action", { tool: tool.slug, action: "download" });
    flash("Downloaded");
  }

  async function createShare() {
    if (!input) return flash("Paste some text first");
    flash("Creating link…");
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tool: tool.slug, input, settings: {} }),
      });
      const data = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !data.id) throw new Error(data.error ?? "Could not create link");
      await navigator.clipboard.writeText(`${window.location.origin}/s/${data.id}`);
      track("tool_action", { tool: tool.slug, action: "share" });
      flash("Share link copied");
    } catch (error) {
      flash(error instanceof Error ? error.message : "Share unavailable");
    }
  }

  async function copyEmbed() {
    const code = `<iframe src="${window.location.origin}/${tool.slug}?embed=1" title="${tool.name}" width="100%" height="540" loading="lazy"></iframe>`;
    await navigator.clipboard.writeText(code);
    track("tool_action", { tool: tool.slug, action: "embed" });
    flash("Embed code copied");
  }

  async function downloadImage() {
    if (!reportRef.current) return;
    const { toPng } = await import("html-to-image");
    const url = await toPng(reportRef.current, { pixelRatio: 2, backgroundColor: "#ffffff" });
    const anchor = document.createElement("a");
    anchor.download = `${tool.slug}-report.png`;
    anchor.href = url;
    anchor.click();
    track("tool_action", { tool: tool.slug, action: "report_image" });
    flash("Report image downloaded");
  }

  async function onPaste(event: React.ClipboardEvent<HTMLTextAreaElement>) {
    if (processor !== "word-to-markdown") {
      window.setTimeout(() => {
        setMobileTab("output");
        outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 60);
      return;
    }
    const html = event.clipboardData.getData("text/html");
    if (!html) return;
    event.preventDefault();
    const TurndownService = (await import("turndown")).default;
    setInput(new TurndownService({ headingStyle: "atx" }).turndown(html));
    setMobileTab("output");
  }

  return (
    <section className="workspace" aria-label={`${tool.name} tool`}>
      <div className="mobile-tabs" role="tablist" aria-label="Editor view">
        <button className={mobileTab === "input" ? "active" : ""} onClick={() => setMobileTab("input")} role="tab">Input</button>
        <button className={mobileTab === "output" ? "active" : ""} onClick={() => setMobileTab("output")} role="tab">Output</button>
      </div>
      <div className="editor-grid">
        <div className={`editor-panel input-panel ${mobileTab === "input" ? "mobile-active" : ""}`}>
          <div className="panel-label"><span>Input</span><span>{input.length.toLocaleString()} chars</span></div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onPaste={onPaste}
            placeholder={tool.placeholder}
            aria-label={`${tool.name} input`}
            autoFocus
            spellCheck
          />
        </div>
        <div ref={outputRef} className={`editor-panel output-panel ${mobileTab === "output" ? "mobile-active" : ""}`}>
          <div className="panel-label"><span>{tool.outputLabel ?? "Preview"}</span><span aria-live="polite">{deferredInput !== input ? "Updating…" : "Live"}</span></div>
          {result.html && processor !== "markdown-to-html" ? (
            <div className="rendered-output" dangerouslySetInnerHTML={{ __html: result.html }} />
          ) : (
            <pre className={`text-output ${result.valid === false ? "error-output" : ""}`}>{result.output || "Your result appears here as you type."}</pre>
          )}
        </div>
      </div>
      {tool.report && result.stats.length > 0 && (
        <div className="report-card" ref={reportRef}>
          <div className="report-heading"><span>{tool.name} report</span><span>fixmyformatting.com</span></div>
          <div className="stat-grid">
            {result.stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
          {processor === "clean-ai-text" && <p className="report-note">Counts mechanical artifacts only. This is not AI detection.</p>}
        </div>
      )}
      <div className="action-row">
        <button className="primary-action" onClick={copyOutput} disabled={!result.output}>Copy</button>
        <button onClick={download} disabled={!result.output && !result.html}>{processor === "markdown-to-pdf" ? "Print / Save PDF" : "Download"}</button>
        <button onClick={createShare} disabled={!input}>Copy link to result</button>
        <button onClick={copyEmbed}>Embed</button>
        {tool.report && <button onClick={downloadImage} disabled={!result.stats.length}>Download as image</button>}
        <span className="notice" role="status">{notice}</span>
      </div>
      <div className="trust-strip">Free <span>·</span> No signup <span>·</span> Processing happens in your browser — text never uploaded.</div>
    </section>
  );
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
