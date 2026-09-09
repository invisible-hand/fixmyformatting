import { describe, expect, it } from "vitest";
import { countTells, deslopInstructions, deslopMaxChars, deslopStats } from "../src/lib/deslop";
import { getTool } from "../src/lib/tools";
import { statLabelKeys } from "../src/lib/stat-labels";

describe("de-slop", () => {
  it("counts the phrases the brief tells the model to remove", () => {
    const slop = "Let's delve into this — it's not just a tool but a testament to robust design. I hope this helps!";
    expect(countTells(slop)).toBe(5);
    expect(countTells("The cache is a map from key to value.")).toBe(0);
  });

  it("reports before/after stats with labels every locale can translate", () => {
    const stats = deslopStats("We delve — deeply.", "We look closely.");
    expect(stats).toEqual([
      { label: "Words", value: 4 },
      { label: "Words after", value: 3 },
      { label: "Em dashes", value: 1 },
      { label: "AI phrases removed", value: 1 },
    ]);
    for (const stat of stats) expect(statLabelKeys as readonly string[]).toContain(stat.label);
  });

  it("keeps the brief consistent with the page copy", () => {
    const tool = getTool("de-slop")!;
    expect(tool.remote).toBe(true);
    expect(tool.example!.length).toBeLessThan(deslopMaxChars);
    expect(tool.intro).toContain("8,000");
    // The preservation rules come before the removal rules, and the model is
    // asked for the text alone: both are load-bearing for a clean edit.
    expect(deslopInstructions.indexOf("What to preserve")).toBeLessThan(deslopInstructions.indexOf("What to remove"));
    expect(deslopInstructions).toContain("Return the edited text and nothing else");
    // The example input is slop by the brief's own measure.
    expect(countTells(tool.example!)).toBeGreaterThan(5);
  });
});
