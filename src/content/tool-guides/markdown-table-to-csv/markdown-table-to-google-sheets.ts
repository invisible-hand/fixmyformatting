import type { ToolGuide } from "../../../lib/tool-guides";

export const markdownTableToGoogleSheets: ToolGuide = {
  parentTool: "markdown-table-to-csv",
  slug: "markdown-table-to-google-sheets",
  title: "Paste a Markdown Table Into Google Sheets: 3 Ways",
  description: "Pasted Markdown tables land in one column in Google Sheets. Convert to CSV and import, split on the pipe character, or use SPLIT, and what each misses.",
  h1: "How do I paste a Markdown table into Google Sheets?",
  dek: "Why the pipes end up in column A, three ways to get real cells, and the clean-up each one leaves behind.",
  cluster: "how-to",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Google Sheets does not read Markdown, so a pipe table pastes into one column. Convert the table to CSV and use File > Import, or paste it and run Data > Split text to columns with a custom | separator. Splitting leaves an alignment row, empty edge columns and padded cells to clean up; a CSV import does not.",
  sections: [
    {
      id: "why-one-column",
      heading: "Why the table lands in one column",
      body: `A Markdown table is plain text that only looks like a grid:

\`\`\`
| Item   | Qty | Price |
| ------ | --: | ----: |
| Pens   |  12 |  4.50 |
| Paper  |   3 | 11.00 |
\`\`\`

The vertical bars and the row of dashes are instructions for a Markdown renderer. Google Sheets has no Markdown renderer. When you paste plain text, it puts each line in its own row and splits a line into cells only on tab characters. A pipe is just another character, so every line lands in a single cell of column A, bars and all.

You meet these tables in README files, GitHub issues, Obsidian and other Markdown notes, documentation sites, exported Notion pages and AI answers. If the table came from ChatGPT or another chat assistant, [the ChatGPT table guide](/guides/paste-chatgpt-table-into-excel) covers the chat-specific copy tricks; this page deals with Markdown source from anywhere.

One shortcut first: if the table is *rendered* somewhere (a GitHub page, a docs site), select the rendered table in the browser and copy that instead of the source. The clipboard then holds an HTML table, which Sheets usually pastes as a grid. The methods below are for when you only have the Markdown text.`,
    },
    {
      id: "convert-to-csv-and-import",
      heading: "Method 1: convert to CSV, then import",
      body: `This is the most reliable route, because an import parses a file with a known separator instead of guessing at a paste.

1. Paste the Markdown table into [Markdown Table to CSV](/markdown-table-to-csv). The CSV appears straight away; the counters show how many rows and columns were found.
2. Download the \`.csv\` file.
3. In Google Sheets, open a spreadsheet and click **File > Import**, then upload the file.
4. Pick an import location: *Create new spreadsheet*, *Insert new sheets*, *Replace current sheet*, *Append rows to current sheet* or *Replace data starting at selected cell*.
5. Under **Separator character**, leave *Detect automatically* or choose *Comma*, then click **Import**.

What the converter does to the table:

- The alignment row (\`| --- | --: |\`) is dropped, because it is formatting, not data.
- The padding spaces around each value are trimmed, so \`Pens\` is \`Pens\`, not \` Pens \`.
- A pipe written as \`\\|\` inside a cell becomes a literal \`|\`.
- Cells containing a comma, a double quote or a line break are wrapped in quotes and escaped, so they stay in one cell.

Its limits, honestly:

- **One table at a time.** If you paste a document with several tables, only the first becomes CSV. [Markdown Table to Excel](/markdown-table-to-excel) finds every table and its Copy button puts tab-separated cells on the clipboard, which paste straight into Sheets as a grid.
- **The alignment row is required.** A block of piped lines with no \`---\` row under the header is not recognised as a table.
- **Markdown inside cells stays.** \`**bold**\`, backticks, links and \`<br>\` tags are kept as typed. Strip them first with [Remove Markdown Formatting](/remove-markdown-formatting) if they should not be in the data.
- **Types are decided by Sheets.** CSV has no types, so Sheets reads \`012\` as the number 12 and may read values like \`3/4\` as dates. See the checks at the end.`,
    },
    {
      id: "split-text-to-columns",
      heading: "Method 2: paste, then Split text to columns",
      body: `If you would rather stay inside Sheets, the built-in splitter works on a pasted table.

1. Click cell A1 of an empty sheet and paste the Markdown table. Every row lands in column A.
2. Keep the pasted cells selected and click **Data > Split text to columns**. (Straight after a paste you can also click the small paste icon and choose **Split text to columns**.)
3. In the **Separator** dropdown, choose **Custom** and type \`|\`.

The rows now spread across columns, with some clean-up left:

- **Empty first and last columns.** Each row starts and ends with a pipe, so there is nothing before the first one and nothing after the last. Delete those columns.
- **The alignment row.** The \`---\` row is now a row of dashes. Delete it.
- **Padding spaces.** Every value still has the spaces Markdown used to line the columns up, so a lookup for \`Pens\` will not match \` Pens \`. Select the data and click **Data > Data cleanup > Trim whitespace**. Google notes that non-breaking spaces are not trimmed.
- **Escaped pipes.** A \`\\|\` inside a cell is split like any other pipe, which shifts the rest of that row one column to the right.

Check any row that had empty cells: make sure its values still sit under the right headers before you build anything on top of the data.`,
    },
    {
      id: "split-formula",
      heading: "Method 3: the SPLIT formula",
      body: `A formula is handy when the Markdown will change and you want the grid to follow. With the raw table in column A, put this in B1 and fill it down:

\`\`\`
=ARRAYFORMULA(TRIM(SPLIT(A1, "|", TRUE, FALSE)))
\`\`\`

The last argument matters. By default, SPLIT removes empty text, which treats two pipes in a row as one. That deletes empty cells, and every value after an empty cell shifts left into the wrong column. Setting the fourth argument (\`remove_empty_text\`) to FALSE keeps empty cells in place. The price is that the empty first and last columns come back, so you ignore or delete them. TRIM removes the padding spaces.

You still need to delete the alignment row, and the escaped-pipe problem from method 2 applies here too. When the data is final, copy the results and paste them back as values only, so the sheet no longer depends on the raw column.`,
    },
    {
      id: "docs-route-and-checks",
      heading: "A Google Docs detour, and checks before you trust the data",
      body: `Google Docs can read Markdown even though Sheets cannot. In Docs, turn it on under **Tools > Preferences > Enable Markdown**, then right-click and choose **Paste from Markdown**. The table arrives as a real Docs table with the bold, links and code rendered. Copying that table and pasting it into Sheets usually brings the grid across, and it is a reasonable route when the table also needs to live in a document. Check the result: rich-text pastes can carry formatting you do not want in a spreadsheet.

Whichever method you use, check these before relying on the numbers:

- **Leading zeros.** IDs and codes such as \`007\` become the number 7. Format the destination column as plain text before importing or pasting.
- **Dates you did not ask for.** Values like \`3/4\` or \`1-2\` can be read as dates. Undo, format the column as plain text, and import again.
- **Numbers stored as text.** Values with currency symbols, thousands separators or a trailing \`%\` may arrive left-aligned as text. Remove the symbols or reformat the column.
- **Decimal commas.** In locales that write 4,50 for four and a half, check which separator the source used before importing a comma-separated file.

Sources for the steps above: Google Docs Editors Help, [Import data sets & spreadsheets](https://support.google.com/docs/answer/40608), [Split text, remove duplicates, or trim whitespace](https://support.google.com/docs/answer/6325535), [SPLIT function](https://support.google.com/docs/answer/3094136) and [Use Markdown in Google Docs, Slides, & Drawings](https://support.google.com/docs/answer/12014036). Checked October 2026.`,
    },
  ],
  faqs: [
    {
      question: "Why does a Markdown table paste into one column in Google Sheets?",
      answer: "Sheets splits pasted plain text into cells on tab characters only. A Markdown table separates values with | characters, so each line stays in one cell in column A.",
    },
    {
      question: "How do I split a column on the pipe character in Google Sheets?",
      answer: "Select the column, click Data > Split text to columns, open the Separator dropdown, choose Custom and type |. Then delete the empty first and last columns and the row of dashes, and trim the spaces.",
    },
    {
      question: "Why do my columns shift when I use SPLIT on a Markdown table?",
      answer: "SPLIT removes empty text by default, so an empty cell disappears and the values after it move left. Use SPLIT(A1, \"|\", TRUE, FALSE) to keep empty cells in place.",
    },
    {
      question: "Can I import several Markdown tables at once?",
      answer: "Markdown Table to CSV converts the first table it finds. To handle several, use Markdown Table to Excel, which turns every table into its own sheet and can copy all of them as tab-separated cells.",
    },
    {
      question: "Will Google Sheets keep leading zeros from my table?",
      answer: "Not by default. Sheets reads 007 as the number 7 on import or paste. Format the destination column as plain text first, then paste or import the data.",
    },
  ],
  relatedTools: ["markdown-table-to-csv", "markdown-table-to-excel", "extract-table-from-text"],
  relatedGuides: ["paste-chatgpt-table-into-excel"],
};
