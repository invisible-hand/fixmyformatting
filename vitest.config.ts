import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/** Mirrors the "@/*" path alias in tsconfig.json so tests resolve app modules. */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    /**
     * Every test here is pure computation over the content corpus — the slowest
     * legitimately takes ~200 ms. The 5 s default still produced a false failure
     * when the suite ran alongside several concurrent builds on the same machine:
     * a run that normally takes 1.2 s took 15 s of wall clock and tripped the
     * timeout with no assertion error. Raising this removes that false signal
     * without weakening any assertion; a real hang still fails, 30 s later.
     */
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
