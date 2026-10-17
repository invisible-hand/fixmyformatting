import type { ToolGuide } from "../../../lib/tool-guides";

export const importMarkdownTableIntoExcel: ToolGuide = {
  parentTool: "markdown-table-to-csv",
  slug: "import-markdown-table-into-excel",
  title: "Import a Markdown Table Into Excel: CSV or Text to Columns",
  description: "Excel has no Markdown import. Convert the table to CSV and use Data > From Text/CSV, or split pasted rows on | with Text to Columns. Steps and pitfalls.",
  h1: "How do I import a Markdown table into Excel?",
  dek: "Excel reads CSV and splits text on a delimiter you choose. Markdown is neither, so you convert first or split by hand.",
  cluster: "how-to",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Excel cannot read Markdown, so convert the table to CSV and bring it in with Data > From Text/CSV, which previews the columns and lets you set their types. For a quick one-off, paste the table into column A, run Data > Text to Columns with | as the delimiter, then delete the dashes row and empty edge columns.",
  sections: [
    {
      id: "why-excel-needs-help",
      heading: "Why Excel needs help with a Markdown table",
      body: `A Markdown table is text with pipes between the values and a row of dashes under the header:

\`\`\`
| SKU | Product | Units | Price |
| --- | ------- | ----: | ----: |
| 007 | Stapler |    40 |  6.90 |
| 012 | Folder  |   250 |  0.85 |
\`\`\`

Excel has no Markdown importer. Its text imports understand delimited files (usually tabs or commas) and fixed-width files, and when you paste plain text it splits lines into cells on tabs. Pipes are neither, so the whole table pastes into column A, one row per line, with the bars still visible.

This applies to Markdown from anywhere: README files, wikis, issue trackers, notes apps, documentation and AI answers. For tables copied out of ChatGPT specifically, including the copy-the-rendered-table trick, see [the ChatGPT table guide](/guides/paste-chatgpt-table-into-excel).

There are three routes, from most to least reliable:

1. Convert to CSV and import with **From Text/CSV**.
2. Save the Markdown as a text file and import it with the legacy **Text Import Wizard**, using \`|\` as the delimiter.
3. Paste it and split with **Text to Columns**.

If what you want is an \`.xlsx\` file rather than an import, [Markdown Table to Excel](/markdown-table-to-excel) builds the workbook directly: one sheet per table, numbers stored as numbers, codes such as 007 kept as text.`,
    },
    {
      id: "csv-and-from-text-csv",
      heading: "Route 1: convert to CSV, then Data > From Text/CSV",
      body: `1. Paste the table into [Markdown Table to CSV](/markdown-table-to-csv) and download the \`.csv\` file. The converter drops the dashes row, trims the padding spaces, turns \`\\|\` into a literal pipe, and quotes any cell that contains a comma, a double quote or a line break.
2. In Excel, click the cell where the data should start.
3. On the **Data** tab, in the **Get & Transform Data** group, click **From Text/CSV**.
4. Pick the file and click **Import**. A preview opens.
5. Check the delimiter (Comma) and that accented letters look right. The downloaded file is UTF-8 without a byte-order mark; if you see garbled characters, change **File Origin** to UTF-8.
6. Click **Load** to put the data on a new sheet, **Load To** to choose a location, or **Transform Data** to open Power Query first.

Use **Transform Data** when the table has codes or IDs: set those columns to the Text type before loading, and leading zeros survive. Otherwise Excel picks a type for each column from the values it sees, and \`007\` becomes 7.

The result is an Excel table linked to the file. If you convert an updated Markdown table to the same file name later, **Refresh** pulls in the new rows.

**Double-clicking the CSV** (or **File > Open**, then *Text Files*) also works, and is quicker for a look. Microsoft notes that opening a CSV this way uses Excel's default data format settings for every column, with no preview, so leading zeros, long numbers and date-like values can change without warning.

Limits of the converter to know about: it converts only the **first** table it finds, it needs the \`---\` row under the header to recognise a table, and Markdown inside cells (\`**bold**\`, links, \`<br>\`) is kept as typed. [Remove Markdown Formatting](/remove-markdown-formatting) can strip that first.`,
    },
    {
      id: "text-import-wizard",
      heading: "Route 2: the Text Import Wizard with a pipe delimiter",
      body: `The legacy wizard can read the Markdown directly, without converting it, because it accepts any single-character delimiter.

1. Save the Markdown table as a plain text (\`.txt\`) file.
2. Turn the wizard on if you have not already: **File > Options > Data**, and under **Show legacy data import wizards** tick **From Text (Legacy)**.
3. Go to **Data > Get & Transform Data > Get Data > Legacy Wizards > From Text (Legacy)** and double-click the file.
4. **Step 1:** choose **Delimited**.
5. **Step 2:** untick Tab, tick **Other** and type \`|\`. Leave **Treat consecutive delimiters as one** unticked; ticking it collapses empty cells and shifts the rest of the row left.
6. **Step 3:** click each column in the preview and set its format. Choose **Text** for codes and IDs. Choose **Do not import column (skip)** for the empty columns created by the leading and trailing pipes.
7. Click **Finish**, then pick where to put the data.

You still delete the dashes row afterwards, and the values keep their padding spaces. Use \`=TRIM(B2)\` in a helper column, or clean them with Find and Replace, before using the data in lookups.`,
    },
    {
      id: "text-to-columns",
      heading: "Route 3: paste, then Data > Text to Columns",
      body: `For a small table you need once, splitting in place is fine.

1. Paste the Markdown table into cell A1. Every row lands in column A.
2. Select column A and click **Data > Text to Columns**.
3. Choose **Delimited** and click **Next**.
4. Untick the other delimiters, tick **Other** and type \`|\`. The preview shows the split. Click **Next**.
5. Set the **Destination** and any column formats, then **Finish**.

Then clean up, because Text to Columns splits exactly what is there:

- Delete the empty first column (the text before the first pipe) and the empty last one.
- Delete the row of dashes under the header.
- Trim the padding spaces with \`=TRIM()\` or Find and Replace.
- Check rows containing an escaped pipe (\`\\|\`): it is split like any other pipe, so the rest of the row moves one column to the right.`,
    },
    {
      id: "checks-before-use",
      heading: "Checks before you build on the data",
      body: `Whichever route you take, a quick look saves a wrong total later:

- **Numbers stored as text.** Left-aligned numbers, or a green triangle in the corner of the cell, mean Excel kept them as text. Thousands separators, currency symbols and percent signs in the Markdown are the usual cause.
- **Codes that lost their zeros.** Re-import with the column set to Text; formatting the column afterwards cannot bring the zeros back.
- **Dates you did not ask for.** Values such as \`3-4\` or \`1/2\` can become dates. Set the column to Text in the preview or wizard.
- **Merged cells and multi-line cells.** Markdown tables cannot merge cells, so there is nothing to recover. A \`<br>\` inside a cell is just text in Excel.

Sources for the steps above: Microsoft Support, [Import or export text (.txt or .csv) files](https://support.microsoft.com/en-us/office/import-or-export-text-txt-or-csv-files-5250ac4c-663c-47ce-937b-339e391393ba), [Text Import Wizard](https://support.microsoft.com/en-US/excel/text-import-wizard) and [Split text into different columns with the Convert Text to Columns Wizard](https://support.microsoft.com/en-us/office/split-text-into-different-columns-with-the-convert-text-to-columns-wizard-30b14928-5550-41f5-97ca-7a3e9c363ed7). Menu names are for Excel for Microsoft 365, 2024 and 2021, checked October 2026.`,
    },
  ],
  faqs: [
    {
      question: "Can Excel open a Markdown file directly?",
      answer: "Not as a table. Excel has no Markdown importer. Convert the table to CSV, or save it as .txt and use the Text Import Wizard with | as the delimiter.",
    },
    {
      question: "How do I keep leading zeros when importing into Excel?",
      answer: "Set the column to Text before the data loads: in From Text/CSV choose Transform Data and change the column type to Text, or pick Text in step 3 of the Text Import Wizard. Formatting after the import is too late.",
    },
    {
      question: "Why does Text to Columns shift some of my values?",
      answer: "Either Treat consecutive delimiters as one was ticked, which removes empty cells, or a cell contained an escaped pipe (\\|) that was split like a normal one. Untick the option and check those rows.",
    },
    {
      question: "Where is the Text Import Wizard in current Excel?",
      answer: "It is a legacy feature. Turn it on under File > Options > Data > Show legacy data import wizards > From Text (Legacy), then use Data > Get Data > Legacy Wizards > From Text (Legacy).",
    },
    {
      question: "Should I use CSV or .xlsx for a Markdown table?",
      answer: "CSV when you want to import into an existing workbook or another tool. An .xlsx file, built by Markdown Table to Excel, when you want a finished workbook with numbers already stored as numbers.",
    },
  ],
  relatedTools: ["markdown-table-to-csv", "markdown-table-to-excel", "extract-table-from-text"],
  relatedGuides: ["paste-chatgpt-table-into-excel"],
};
