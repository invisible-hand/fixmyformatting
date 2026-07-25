"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import type { ToolDefinition } from "@/lib/tools";
import { getProcessorSlug } from "@/lib/tools";
import type { ProcessedResult, ProcessSettings } from "@/lib/processors";

export type ToolWorkspaceLabels = {
  input: string;
  output: string;
  emptyResult: string;
  characters: string;
  report: string;
  live: string;
  updating: string;
  copy: string;
  copied: string;
  download: string;
  share: string;
  shareCopied: string;
  embed: string;
  embedCopied: string;
  downloadImage: string;
  free: string;
  noSignup: string;
  private: string;
  printPdf: string;
  downloaded: string;
  excelDownloaded: string;
  reportImageDownloaded: string;
  pasteFirst: string;
  creatingLink: string;
  couldNotCreateLink: string;
  shareUnavailable: string;
  reportNote: string;
  conversionOptions: string;
  editorView: string;
  caseLabel: string;
  caseTitle: string;
  caseSentence: string;
  caseUpper: string;
  caseLower: string;
  dashLabel: string;
  dashComma: string;
  dashSemicolon: string;
  dashHyphen: string;
  dashRemove: string;
};

type Props = {
  tool: ToolDefinition;
  initialInput?: string;
  initialSettings?: ProcessSettings;
  locale?: string;
  labels?: Partial<ToolWorkspaceLabels> & {
    statLabels?: Record<string, string>;
    statValues?: Record<string, string>;
    minutes?: string;
  };
  publicPath?: string;
};

const workerThreshold = 25_000;

export function ToolWorkspace({ tool, initialInput = "", initialSettings = {}, locale = "en", labels, publicPath }: Props) {
  const [input, setInput] = useState(initialInput);
  const [notice, setNotice] = useState("");
  const [mobileTab, setMobileTab] = useState<"input" | "output">("input");
  const [caseMode, setCaseMode] = useState<NonNullable<ProcessSettings["caseMode"]>>(initialSettings.caseMode ?? "title");
  const [dashReplacement, setDashReplacement] = useState<NonNullable<ProcessSettings["dashReplacement"]>>(initialSettings.dashReplacement ?? "comma");
  const [smallResult, setSmallResult] = useState<{ input: string; settings: ProcessSettings; result: ProcessedResult } | null>(null);
  const [largeResult, setLargeResult] = useState<{ input: string; result: ProcessedResult } | null>(null);
  const deferredInput = useDeferredValue(input);
  const outputRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const conversionTracked = useRef(false);
  const processSettings = useMemo(() => ({ caseMode, dashReplacement }), [caseMode, dashReplacement]);
  const settingsMatch = smallResult?.settings.caseMode === processSettings.caseMode
    && smallResult?.settings.dashReplacement === processSettings.dashReplacement;
  const result = deferredInput.length > workerThreshold
    ? (largeResult?.input === deferredInput ? largeResult.result : { output: "", stats: [] })
    : (smallResult?.input === deferredInput && settingsMatch ? smallResult.result : { output: "", stats: [] });
  const processor = getProcessorSlug(tool.slug);
  const ui = {
    input: labels?.input ?? "Input",
    output: labels?.output ?? (tool.outputLabel ?? "Preview"),
    emptyResult: labels?.emptyResult ?? "Your result appears here as you type.",
    characters: labels?.characters ?? "chars",
    report: labels?.report ?? "report",
    live: labels?.live ?? "Live",
    updating: labels?.updating ?? "Updating…",
    copy: labels?.copy ?? "Copy",
    copied: labels?.copied ?? "Copied",
    download: labels?.download ?? "Download",
    share: labels?.share ?? "Copy link to result",
    shareCopied: labels?.shareCopied ?? "Share link copied",
    embed: labels?.embed ?? "Embed",
    embedCopied: labels?.embedCopied ?? "Embed code copied",
    downloadImage: labels?.downloadImage ?? "Download as image",
    free: labels?.free ?? "Free",
    noSignup: labels?.noSignup ?? "No signup",
    private: labels?.private ?? "Processing happens in your browser — text never uploaded.",
    printPdf: labels?.printPdf ?? "Print / Save PDF",
    downloaded: labels?.downloaded ?? "Downloaded",
    excelDownloaded: labels?.excelDownloaded ?? "Excel file downloaded",
    reportImageDownloaded: labels?.reportImageDownloaded ?? "Report image downloaded",
    pasteFirst: labels?.pasteFirst ?? "Paste some text first",
    creatingLink: labels?.creatingLink ?? "Creating link…",
    couldNotCreateLink: labels?.couldNotCreateLink ?? "Could not create link",
    shareUnavailable: labels?.shareUnavailable ?? "Share unavailable",
    reportNote: labels?.reportNote ?? "Counts mechanical artifacts only. This is not AI detection.",
    conversionOptions: labels?.conversionOptions ?? "Conversion options",
    editorView: labels?.editorView ?? "Editor view",
    caseLabel: labels?.caseLabel ?? "Case",
    caseTitle: labels?.caseTitle ?? "Title Case",
    caseSentence: labels?.caseSentence ?? "Sentence case",
    caseUpper: labels?.caseUpper ?? "UPPERCASE",
    caseLower: labels?.caseLower ?? "lowercase",
    dashLabel: labels?.dashLabel ?? "Replace em dashes with",
    dashComma: labels?.dashComma ?? "Comma",
    dashSemicolon: labels?.dashSemicolon ?? "Semicolon",
    dashHyphen: labels?.dashHyphen ?? "Hyphen",
    dashRemove: labels?.dashRemove ?? "Nothing",
  };

  /** Stat values are usually numbers; a few are words or carry a time unit. */
  const localizeStatValue = (value: string | number) => {
    if (typeof value !== "string") return value;
    if (labels?.statValues?.[value]) return labels.statValues[value];
    const minutes = value.match(/^(\d+)\s*min$/);
    if (minutes && labels?.minutes) return `${minutes[1]} ${labels.minutes}`;
    return value;
  };

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
    if (deferredInput.length > workerThreshold) return;
    let active = true;
    void import("@/lib/processors").then(({ processText }) => {
      const baseResult = processText(tool.slug, deferredInput, processSettings);
      if (processor !== "token-counter") return baseResult;
      return import("@/lib/token-count").then(({ countModelTokens }) => countModelTokens(deferredInput));
    }).then((processed) => {
      if (active) setSmallResult({ input: deferredInput, settings: processSettings, result: processed });
    });
    return () => { active = false; };
  }, [deferredInput, processSettings, processor, tool.slug]);

  useEffect(() => {
    if (deferredInput.length <= workerThreshold) return;
    const worker = new Worker(new URL("../workers/process.worker.ts", import.meta.url));
    worker.onmessage = (event: MessageEvent<ProcessedResult>) => setLargeResult({ input: deferredInput, result: event.data });
    worker.postMessage({ slug: tool.slug, input: deferredInput, settings: processSettings });
    return () => worker.terminate();
  }, [deferredInput, processSettings, tool.slug]);

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
    flash(ui.copied);
  }

  async function download() {
    if (!result.output && !result.html) return;
    if (tool.download === "docx") {
      const { createMarkdownDocx } = await import("@/lib/markdown-docx");
      const blob = await createMarkdownDocx(input);
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
      flash(ui.excelDownloaded);
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
    flash(ui.downloaded);
  }

  async function createShare() {
    if (!input) return flash(ui.pasteFirst);
    flash(ui.creatingLink);
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tool: tool.slug, input, settings: { locale, ...processSettings } }),
      });
      const data = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !data.id) throw new Error(data.error ?? ui.couldNotCreateLink);
      await navigator.clipboard.writeText(`${window.location.origin}/s/${data.id}`);
      track("tool_action", { tool: tool.slug, action: "share" });
      flash(ui.shareCopied);
    } catch (error) {
      flash(error instanceof Error ? error.message : ui.shareUnavailable);
    }
  }

  async function copyEmbed() {
    const code = `<iframe src="${window.location.origin}${publicPath ?? `/${tool.slug}`}?embed=1" title="${tool.name}" width="100%" height="540" loading="lazy"></iframe>`;
    await navigator.clipboard.writeText(code);
    track("tool_action", { tool: tool.slug, action: "embed" });
    flash(ui.embedCopied);
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
    flash(ui.reportImageDownloaded);
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
      {(processor === "case-converter" || processor === "remove-em-dashes") && (
        <div className="tool-options" aria-label={ui.conversionOptions}>
          {processor === "case-converter" && (
            <label>{ui.caseLabel}
              <select value={caseMode} onChange={(event) => setCaseMode(event.target.value as NonNullable<ProcessSettings["caseMode"]>)}>
                <option value="title">{ui.caseTitle}</option>
                <option value="sentence">{ui.caseSentence}</option>
                <option value="upper">{ui.caseUpper}</option>
                <option value="lower">{ui.caseLower}</option>
              </select>
            </label>
          )}
          {processor === "remove-em-dashes" && (
            <label>{ui.dashLabel}
              <select value={dashReplacement} onChange={(event) => setDashReplacement(event.target.value as NonNullable<ProcessSettings["dashReplacement"]>)}>
                <option value="comma">{ui.dashComma}</option>
                <option value="semicolon">{ui.dashSemicolon}</option>
                <option value="hyphen">{ui.dashHyphen}</option>
                <option value="remove">{ui.dashRemove}</option>
              </select>
            </label>
          )}
        </div>
      )}
      <div className="mobile-tabs" role="tablist" aria-label={ui.editorView}>
        <button className={mobileTab === "input" ? "active" : ""} onClick={() => setMobileTab("input")} role="tab">{ui.input}</button>
        <button className={mobileTab === "output" ? "active" : ""} onClick={() => setMobileTab("output")} role="tab">{labels?.output ?? "Output"}</button>
      </div>
      <div className="editor-grid">
        <div className={`editor-panel input-panel ${mobileTab === "input" ? "mobile-active" : ""}`}>
          <div className="panel-label"><span>{ui.input}</span><span>{input.length.toLocaleString(locale)} {ui.characters}</span></div>
          <textarea dir="auto"
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
          <div className="panel-label"><span>{ui.output}</span><span aria-live="polite">{deferredInput !== input ? ui.updating : ui.live}</span></div>
          {result.html && processor !== "markdown-to-html" ? (
            <div className="rendered-output" dir="auto" dangerouslySetInnerHTML={{ __html: result.html }} />
          ) : (
            <pre dir="auto" className={`text-output ${result.valid === false ? "error-output" : ""}`}>{result.output || ui.emptyResult}</pre>
          )}
        </div>
      </div>
      {tool.report && result.stats.length > 0 && (
        <div className="report-card" ref={reportRef}>
          <div className="report-heading"><span>{tool.name} {ui.report}</span><span>fixmyformatting.com</span></div>
          <div className="stat-grid">
            {result.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong>{localizeStatValue(stat.value)}</strong>
                <span>{labels?.statLabels?.[stat.label] ?? stat.label}</span>
              </div>
            ))}
          </div>
          {processor === "clean-ai-text" && <p className="report-note">{ui.reportNote}</p>}
        </div>
      )}
      <div className="action-row">
        <button className="primary-action" onClick={copyOutput} disabled={!result.output}>{ui.copy}</button>
        <button onClick={download} disabled={!result.output && !result.html}>{processor === "markdown-to-pdf" ? ui.printPdf : ui.download}</button>
        <button onClick={createShare} disabled={!input}>{ui.share}</button>
        <button onClick={copyEmbed}>{ui.embed}</button>
        {tool.report && <button onClick={downloadImage} disabled={!result.stats.length}>{ui.downloadImage}</button>}
        <span className="notice" role="status">{notice}</span>
      </div>
      <div className="trust-strip">{ui.free} <span>·</span> {ui.noSignup} <span>·</span> {ui.private}</div>
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
