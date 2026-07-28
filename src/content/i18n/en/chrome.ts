import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

/** English source of truth. Every other locale's chrome.ts is translated from this. */

export const pages: PageCopy = {
  about: {
    metaTitle: "About Fix My Formatting",
    description: "Why Fix My Formatting builds free, private browser-based text tools.",
    h1: "About Fix My Formatting",
    dek: "Free, private tools for the gap between AI chat and the rest of your work.",
    sections: [
      {
        body: [
          "Fix My Formatting makes the small, annoying problems between AI chat and the rest of your work disappear. Every tool is free, opens instantly, and processes text in your browser.",
          "There are no accounts, paywalls, or uploads during normal conversion. If you choose to create a share link, that action explicitly stores the text so the link can work.",
        ],
      },
    ],
  },
  privacy: {
    metaTitle: "Privacy | Fix My Formatting",
    description: "Privacy details for Fix My Formatting browser tools and optional share links.",
    h1: "Privacy",
    dek: "Short version: tool input stays in your browser unless you create a share link.",
    sections: [
      {
        heading: "Browser processing",
        body: ["Conversions and analysis run locally on your device. Ordinary tool input is not sent to our servers."],
      },
      {
        heading: "Share links",
        body: [
          "When you select “Copy link to result,” the input, selected tool, and settings are stored so the link can be opened. Do not share sensitive or personal information. Shared results expire after 180 days by default.",
        ],
      },
      {
        heading: "Analytics",
        body: ["We collect aggregate page and interaction counts to understand which tools are useful. We use Vercel Analytics and Google Analytics in a cookieless mode that sets no cookies and stores no identifier for you. We do not sell personal information."],
      },
    ],
  },
  notFound: {
    h1: "Page not found",
    dek: "Try one of these free formatting tools instead.",
  },
  guidesIndex: {
    metaTitle: "Guides — Fixing AI Text Formatting",
    description: "Plain-English guides to em dashes, invisible characters, Markdown symbols, and the other formatting quirks of AI-generated text.",
    h1: "Guides",
    dek: "Why AI text arrives broken, and how to fix it. Every guide ends with a tool that does the work in one click.",
    clusters: {
      "ai-tells": "Spotting AI text",
      "how-to": "Fixing AI output",
      reference: "Reference",
    },
  },
};

export const workspace: WorkspaceMessages = {
  printPdf: "Print / Save PDF",
  downloaded: "Downloaded",
  excelDownloaded: "Excel file downloaded",
  reportImageDownloaded: "Report image downloaded",
  pasteFirst: "Paste some text first",
  creatingLink: "Creating link…",
  couldNotCreateLink: "Could not create link",
  shareUnavailable: "Share unavailable",
  reportNote: "Counts mechanical artifacts only. This is not AI detection.",
  conversionOptions: "Conversion options",
  editorView: "Editor view",
  caseLabel: "Case",
  caseTitle: "Title Case",
  caseSentence: "Sentence case",
  caseUpper: "UPPERCASE",
  caseLower: "lowercase",
  dashLabel: "Replace em dashes with",
  dashComma: "Comma",
  dashSemicolon: "Semicolon",
  dashHyphen: "Hyphen",
  dashRemove: "Nothing",
};

export const guideChrome: GuideChrome = {
  navLabel: "Guides",
  onThisPage: "On this page",
  toolsMentioned: "Tools mentioned in this guide",
  relatedGuides: "Related guides",
  home: "Home",
};
