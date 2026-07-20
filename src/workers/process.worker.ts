/// <reference lib="webworker" />

import { processText } from "@/lib/processors";

self.onmessage = (event: MessageEvent<{ slug: string; input: string }>) => {
  const { slug, input } = event.data;
  self.postMessage(processText(slug, input));
};
