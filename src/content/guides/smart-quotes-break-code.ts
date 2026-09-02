import type { GuideDefinition } from "../../lib/guides";

export const smartQuotes: GuideDefinition = {
  slug: "smart-quotes-break-code",
  title: "Why Smart Quotes Break Code, JSON and CSV",
  description: "Curly quotes are different Unicode characters from straight quotes. Here is why parsers reject them, and how to normalize text safely.",
  h1: "Why smart quotes break your code, JSON, and CSV",
  dek: "The error points at a line that looks perfectly fine, because the difference is invisible at a glance.",
  cluster: "how-to",
  published: "2026-07-25",
  updated: "2026-09-01",
  answer:
    "Smart quotes (“ ” ‘ ’) are different Unicode characters from the straight quotes (\" ') that programming languages and data formats require. Parsers match exact code points, so a curly quote is just an ordinary letter to them and the string never opens. Replacing them with straight quotes fixes it immediately.",
  sections: [
    {
      id: "different-characters",
      heading: "They are genuinely different characters",
      body: `This is the whole problem in one table:

| Character | Name | Code point |
| --- | --- | --- |
| \`"\` | Straight double quote | U+0022 |
| “ | Left double quotation mark | U+201C |
| ” | Right double quotation mark | U+201D |
| \`'\` | Straight apostrophe | U+0027 |
| ‘ | Left single quotation mark | U+2018 |
| ’ | Right single quotation mark | U+2019 |

Programming languages, JSON, CSV, and shell interpreters recognise exactly two of these as string delimiters: U+0022 and U+0027. The other four are not delimiters to any of them. Unicode does classify them as punctuation — initial and final quotation marks, categories Pi and Pf — but a parser only asks whether a character is the exact delimiter it was told to look for, and none of these is. So they are handled as ordinary content, the same way a letter or a comma would be.

So when a parser meets “name”, it does not see a quoted string with slightly decorative quotes. It sees an unquoted sequence of characters beginning with a symbol it did not expect. The error message says something like *unexpected token* and points at a line that looks completely correct, because at normal font sizes the difference between \`"\` and “ is a few pixels of curvature.`,
      figure: "smart-quotes-code",
    },
    {
      id: "where-they-come-from",
      heading: "Where they come from",
      body: `Almost always from software being helpful.

- **Word and Google Docs** convert straight quotes to curly ones as you type. This is on by default and most people never notice, because in prose it is exactly what you want.
- **Chat models** produce them because they learned from published prose, which is typeset with proper quotation marks.
- **macOS** applies smart substitution system-wide in many text fields.
- **CMS editors and comment boxes** frequently run typographic filters on submitted text.
- **PDF copy-paste** carries whatever the typesetter used, which for any professionally produced document is curly.

The common thread is that the text passed through something designed for *reading* on its way to something designed for *parsing*. Prose wants typographic quotes; code wants exact bytes. Trouble happens at the boundary.

The same applies to a few companions worth knowing about: the ellipsis character (…) instead of three periods, en and em dashes instead of hyphens, and non-breaking spaces instead of ordinary ones. Each is a different code point from the ASCII character it resembles, and each breaks a parser in the same silent way.`,
    },
    {
      id: "what-breaks",
      heading: "What breaks, specifically",
      body: `**JSON.** Every string in JSON must use U+0022. A single curly quote makes the document invalid, and because parsers report the first failure, a file with dozens of them takes several rounds to fix by hand. Pasting into a [JSON formatter and validator](/json-formatter) shows the exact position of the first offender.

**CSV.** Quoting rules exist to protect fields containing commas. A curly quote is not a quote character, so a field like “Smith, John” splits at the comma and every subsequent column shifts by one. This one is nastier than a syntax error because it fails *silently* — you get a file that imports without complaint and is wrong.

**Source code.** In most languages this is a compile or parse error, which is at least loud. In shell scripts it can be worse: \`rm –rf\` with an en dash instead of a hyphen is not the flag you meant, and quoted arguments with curly quotes are passed through as literal text.

**Configuration files.** YAML and \`.env\` files silently accept curly quotes as part of the value. Your API key ends up with a decorative character attached, authentication fails, and nothing in the log tells you why. TOML is the exception worth knowing: it accepts only U+0022 and U+0027 as string delimiters, so \`key = “a”\` raises a parse error rather than passing the quotes through.

**Regular expressions and search.** A pattern containing a straight quote will not match text containing a curly one, so find-and-replace quietly returns zero results.`,
    },
    {
      id: "how-to-fix",
      heading: "How to fix it properly",
      body: `**Normalise the text.** Paste it into [Smart Quotes to Straight Quotes](/remove-smart-quotes), which replaces all four curly variants with their ASCII equivalents and reports how many it changed. For AI output specifically, the [AI Text Cleaner](/clean-ai-text) handles quotes alongside em dashes, invisible characters, and emoji in one pass.

**Turn off the source.** If this keeps happening, disable the substitution:

- *Word*: File → Options → Proofing → AutoCorrect Options → AutoFormat As You Type → uncheck "Straight quotes with smart quotes".
- *Google Docs*: Tools → Preferences → uncheck "Use smart quotes".
- *macOS*: System Settings → Keyboard → Text Input → Edit → turn off smart quotes and dashes.

**Do not compose code in a word processor.** The real fix is structural. Anything destined for a parser should be written in a plain-text editor, which will never rewrite your characters.

**Watch out for over-correction.** Do not blanket-replace curly quotes in *prose*. In an article or an email, typographic quotes are correct and straight ones look worse. Normalise on the boundary — when text moves from a document into code or data — not everywhere by default.

If a file still fails after normalising quotes, the next suspect is an invisible character; see the [invisible Unicode reference](/guides/invisible-unicode-characters).`,
    },
  ],
  faqs: [
    {
      question: "Why does my JSON say unexpected token when it looks correct?",
      answer:
        "Almost always a curly quotation mark where a straight one belongs. JSON requires U+0022 exactly, and the curly variants U+201C and U+201D are ordinary characters to a parser. The difference is only a few pixels on screen, which is why the line looks fine.",
    },
    {
      question: "What is the difference between smart quotes and straight quotes?",
      answer:
        "They are different Unicode characters. Straight quotes are U+0022 and U+0027, the ASCII characters every parser expects. Smart quotes are U+2018, U+2019, U+201C, and U+201D — typographic marks that curve toward the text, correct in prose and invalid as string delimiters.",
    },
    {
      question: "How do I convert smart quotes to straight quotes?",
      answer:
        "Paste the text into a normaliser such as Smart Quotes to Straight Quotes, which replaces all four curly variants and reports the count. Doing it with find-and-replace requires four separate passes, one per character, which is why it is often done incompletely.",
    },
    {
      question: "Why does my CSV import shift columns?",
      answer:
        "A field containing a comma is only protected if it is wrapped in straight quotes. Curly quotes are not quote characters, so the field splits at the comma and every column after it shifts. This fails silently, producing a file that imports cleanly and is wrong.",
    },
    {
      question: "Should I always remove smart quotes?",
      answer:
        "No. In prose they are correct typography and look better than straight quotes. Normalise only when text crosses into code, JSON, CSV, configuration files, or anything else that will be parsed rather than read.",
    },
  ],
  relatedTools: ["remove-smart-quotes", "clean-ai-text", "json-formatter"],
  relatedGuides: ["invisible-unicode-characters", "signs-of-ai-written-text"],
};
