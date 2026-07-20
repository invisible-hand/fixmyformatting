import { encode } from "gpt-tokenizer/model/gpt-4o";
import type { ProcessedResult } from "./processors";

export function countModelTokens(input: string): ProcessedResult {
  const gptTokens = encode(input).length;
  const claudeEstimate = Math.ceil(input.length / 3.5);
  return {
    output: `${gptTokens.toLocaleString()} GPT-4o tokens\n~${claudeEstimate.toLocaleString()} Claude tokens`,
    stats: [
      { label: "GPT-4o tokens", value: gptTokens },
      { label: "Claude estimate", value: claudeEstimate },
      { label: "Characters", value: input.length },
    ],
  };
}
