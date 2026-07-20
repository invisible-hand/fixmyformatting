/// <reference lib="webworker" />

import { processText } from "@/lib/processors";
import type { ProcessSettings } from "@/lib/processors";
import { getProcessorSlug } from "@/lib/tools";

self.onmessage = async (event: MessageEvent<{ slug: string; input: string; settings?: ProcessSettings }>) => {
  const { slug, input, settings } = event.data;
  if (getProcessorSlug(slug) === "token-counter") {
    const { countModelTokens } = await import("@/lib/token-count");
    self.postMessage(countModelTokens(input));
    return;
  }
  self.postMessage(processText(slug, input, settings));
};
