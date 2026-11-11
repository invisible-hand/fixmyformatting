"use client";

import dynamic from "next/dynamic";

/**
 * The styles workspace and its Unicode tables are used by one tool, so they
 * load as their own chunk instead of adding to the JavaScript every tool page
 * downloads (see the 200 KB budget in scripts/check-budgets.mjs). The dynamic
 * import has to live in a Client Component to be split, and it keeps server
 * rendering on, so the rows are still printed into the HTML.
 */
export const FontWorkspaceLoader = dynamic(() => import("./font-workspace").then((module) => module.FontWorkspace));
