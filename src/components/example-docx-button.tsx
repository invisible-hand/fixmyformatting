"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

// One click from the "Before and after" section to a real .docx of the example,
// without touching the workspace: the same converter the Download button uses.
export function ExampleDocxButton({ example, slug, label, busyLabel }: { example: string; slug: string; label: string; busyLabel: string }) {
  const [busy, setBusy] = useState(false);
  async function download() {
    if (busy) return;
    setBusy(true);
    try {
      const { createMarkdownDocx } = await import("@/lib/markdown-docx");
      const blob = await createMarkdownDocx(example);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${slug}-example.docx`;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      try { track("tool_action", { tool: slug, action: "example_docx" }); } catch {}
    } finally {
      setBusy(false);
    }
  }
  return <button type="button" className="ba-docx" onClick={download} disabled={busy}>{busy ? busyLabel : label}</button>;
}
