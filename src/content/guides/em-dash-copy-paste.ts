import type { GuideDefinition } from "../../lib/guides";

export const emDashCopyPaste: GuideDefinition = {
  slug: "em-dash-copy-paste",
  title: "Em Dash (—): Copy, Paste and Type It Anywhere",
  description: "Copy an em dash here, or type one: Option+Shift+Hyphen on a Mac, Alt+0151 on Windows. Plus shortcuts for Word, Google Docs, iOS, Android and Linux.",
  h1: "Em dash (—): copy, paste, and type it on any keyboard",
  dek: "The character, the keystroke for every platform, and what to do when there is no shortcut.",
  cluster: "reference",
  published: "2026-09-01",
  updated: "2026-09-01",
  answer:
    "The em dash is — (U+2014), the long dash used to set off a phrase inside a sentence. You can select and copy it straight from this page. To type it instead: on a Mac press Option + Shift + Hyphen; on Windows hold Alt and type 0151 on the numeric keypad with Num Lock on. In HTML it is &mdash; or &#8212;. It is longer than both the en dash (–) and the hyphen (-), which are different characters with different jobs.",
  sections: [
    {
      id: "copy-the-character",
      heading: "Copy an em dash",
      body: `The em dash on its own, ready to select and copy:

\`\`\`
—
\`\`\`

The two characters it is most often confused with, for contrast:

| Name | Character | Code point |
| --- | --- | --- |
| Em dash | \`—\` | U+2014 |
| En dash | \`–\` | U+2013 |
| Hyphen | \`-\` | U+002D |

Copying works from any of those cells. If you want the spaced form used in a lot of AI output, it is a space, an em dash, and a space: \`before — after\`. US publishing convention closes the dash up against the words instead — \`before—after\` — and both are correct as long as a document picks one.

Copy and paste is fine for one dash. If you are going to type them regularly, learn the keystroke below: pasting from a web page can also carry along invisible characters that the page used for line-break control.`,
      figure: "dash-ruler",
    },
    {
      id: "how-to-type-an-em-dash",
      heading: "How do you type an em dash on a keyboard?",
      body: `There is no em dash key on any standard keyboard layout, which is the whole reason this page exists. Every platform hides it behind a modifier, an autocorrect rule, or a character picker.

| Where you are | Em dash (—) | Notes |
| --- | --- | --- |
| macOS (any app) | <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>-</kbd> | System-wide. <kbd>Option</kbd> + <kbd>-</kbd> alone gives an en dash |
| macOS Character Viewer | <kbd>Control</kbd> + <kbd>Command</kbd> + <kbd>Space</kbd> | Search "em dash", double-click to insert |
| Windows (any app) | <kbd>Alt</kbd> + <kbd>0151</kbd> | Numeric keypad only, Num Lock on |
| Windows emoji panel | <kbd>Win</kbd> + <kbd>.</kbd> | Symbols tab, general punctuation. No keypad needed |
| Windows Character Map | \`charmap.exe\` | Advanced view, search "em dash", Copy |
| Microsoft Word | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>-</kbd> (keypad minus) | Also needs a numeric keypad |
| Microsoft Word (Unicode) | Type \`2014\` then <kbd>Alt</kbd> + <kbd>X</kbd> | Works with no keypad at all |
| Microsoft Word (autocorrect) | Type \`word--word\` then a space | Converts on the following word |
| Google Docs | Insert &rarr; Special characters | No built-in keyboard shortcut |
| iOS / iPadOS | Long-press the <kbd>-</kbd> key | On the \`123\` symbol layer |
| Android (Gboard) | Long-press the <kbd>-</kbd> key | On the \`?123\` symbol layer |
| Linux (IBus) | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd>, then \`2014\` | Then <kbd>Enter</kbd> or <kbd>Space</kbd> |
| Linux (Compose key) | <kbd>Compose</kbd> then \`---\` | Three hyphens |
| ChromeOS | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd>, then \`2014\` | Then <kbd>Enter</kbd> |
| HTML | \`&mdash;\` or \`&#8212;\` | \`&#x2014;\` also valid |
| CSS \`content\` | \`"\\2014"\` | Trailing space ends the escape |
| JavaScript / Python | \`"\\u2014"\` | Python also accepts \`"\\N{EM DASH}"\` |
| LaTeX | \`---\` | \`--\` gives an en dash |

Two of those deserve a warning. The Windows <kbd>Alt</kbd> + <kbd>0151</kbd> code and Word's <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>-</kbd> both require a **real numeric keypad**, not the number row along the top. The <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd> sequence on Linux is provided by the input method, normally IBus, so it works in GTK applications and may do nothing under a different input method or in a bare terminal.`,
    },
    {
      id: "em-dash-on-mac",
      heading: "How do I type an em dash on a Mac?",
      body: `Press <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>-</kbd>. The hyphen key is the one to the right of the zero. That single shortcut works everywhere in macOS — Mail, Safari, Slack, Xcode, Pages — because it is part of the keyboard layout rather than an application feature.

The related shortcuts on the same key:

- <kbd>Option</kbd> + <kbd>-</kbd> produces an en dash (–), the one you want for ranges and dates.
- <kbd>Shift</kbd> + <kbd>-</kbd> produces an underscore.
- <kbd>-</kbd> on its own is the ordinary hyphen.

macOS also has a **smart dashes** substitution that turns two hyphens into an em dash as you type. It lives in System Settings &rarr; Keyboard &rarr; Text Input &rarr; Edit, and it applies only in apps that opt into the system text engine, such as TextEdit, Notes, Pages, and Mail. It does nothing in most code editors and browsers, which is usually what you want.

If you would rather not memorise anything, the Character Viewer (<kbd>Control</kbd> + <kbd>Command</kbd> + <kbd>Space</kbd>) has a search box: type "em dash" and double-click the result.`,
    },
    {
      id: "em-dash-on-windows",
      heading: "How do I type an em dash on Windows?",
      body: `Hold <kbd>Alt</kbd>, type \`0151\` on the numeric keypad, and release <kbd>Alt</kbd>. That is the Alt code for the em dash. Three conditions have to hold or nothing appears:

1. The digits must come from the **numeric keypad**, not the number row.
2. **Num Lock must be on.**
3. The leading zero matters. \`Alt\` + \`0151\` is the em dash; \`Alt\` + \`151\` is a different character entirely (ù), because codes without a leading zero use the old OEM code page.

The matching en dash code is <kbd>Alt</kbd> + <kbd>0150</kbd>.

**No numeric keypad?** Most laptops do not have one, and this is where the Alt code advice usually stops being useful. Three options that need no keypad:

- **The emoji panel.** Press <kbd>Win</kbd> + <kbd>.</kbd> (or <kbd>Win</kbd> + <kbd>;</kbd>), switch to the symbols tab, and open general punctuation. The em dash is in there and inserts on click.
- **Character Map.** Press <kbd>Win</kbd>, type \`charmap\`, open it, tick Advanced view, search for "em dash", then Select and Copy.
- **Word's Unicode trick.** In Word, type \`2014\` and press <kbd>Alt</kbd> + <kbd>X</kbd>. The digits turn into the character in place. This is the most reliable keyboard-only route on a laptop, and it also works in Outlook's Word-based editor.

Some laptops expose a hidden numeric keypad on the letter keys behind an <kbd>Fn</kbd> layer, in which case the Alt code works if you hold <kbd>Fn</kbd> as well. It varies by manufacturer, so test it before relying on it.`,
    },
    {
      id: "em-dash-in-word",
      heading: "How do I get an em dash in Microsoft Word?",
      body: `Word has more routes to an em dash than anything else on this list, and one of them fires whether you asked for it or not.

**Autocorrect, the one most people use by accident.** With AutoFormat As You Type enabled — it is on by default — Word rewrites hyphens once you finish the next word:

| What you type | What Word produces |
| --- | --- |
| \`word--word\` then a space | \`word—word\` with an em dash |
| \`word - word\` then a space | \`word – word\` with an en dash |

Note that the spaced single hyphen gives you an **en** dash, not an em dash. This is the single most common reason a document ends up with a mix of both marks. The rule lives under File &rarr; Options &rarr; Proofing &rarr; AutoCorrect Options &rarr; AutoFormat As You Type, as "Hyphens (--) with dash (—)", and you can switch it off there.

**The keyboard shortcut** is <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>-</kbd>, using the minus key on the numeric keypad. <kbd>Ctrl</kbd> + <kbd>-</kbd> on the keypad gives an en dash. Both need the keypad.

**The Unicode route** works on any keyboard: type \`2014\` and press <kbd>Alt</kbd> + <kbd>X</kbd>. Pressing <kbd>Alt</kbd> + <kbd>X</kbd> again with the cursor after an existing em dash reverses the conversion and shows you the code point, which is a quick way to check which dash a document actually contains.

**Insert &rarr; Symbol &rarr; More Symbols &rarr; Special Characters** lists Em Dash and En Dash by name, and lets you assign your own shortcut key from the same dialog.`,
    },
    {
      id: "em-dash-google-docs",
      heading: "How do I get an em dash in Google Docs?",
      body: `Google Docs has **no built-in keyboard shortcut for the em dash**, and unlike Word it does not convert a double hyphen for you by default. There are three practical ways in.

**Insert &rarr; Special characters.** Type "em dash" into the search box, or draw a long horizontal line in the sketch box, and click the character. Fine once, tedious repeatedly.

**Set up your own substitution.** Tools &rarr; Preferences &rarr; Substitutions, then add a rule with \`--\` in the Replace column and an em dash pasted into the With column. Make sure Automatic substitution is ticked. From then on Docs behaves like Word. This is the setting worth spending sixty seconds on if you write in Docs daily.

**Paste it.** The character at the top of this page, or the OS-level shortcut, both work in Docs — <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>-</kbd> on a Mac produces an em dash in Docs because macOS handles it before Docs ever sees the keystroke.

On the Windows side there is no equivalent OS-level shortcut, so Docs users on a laptop generally end up using the substitution rule or the emoji panel.`,
    },
    {
      id: "em-dash-on-phone",
      heading: "How do you type an em dash on a phone?",
      body: `**iPhone and iPad.** Tap \`123\` to reach the number and symbol layer, then press and hold the hyphen key. A small popup appears with the hyphen, en dash, em dash, and bullet. Slide onto the longest dash and release.

**Android with Gboard.** Tap \`?123\`, then press and hold the hyphen. The same popup logic applies, though the exact set of alternatives depends on the keyboard app and the language layout. Samsung Keyboard and SwiftKey both offer it in the same place.

If long-pressing is too slow, both platforms support a text replacement rule: on iOS it is Settings &rarr; General &rarr; Keyboard &rarr; Text Replacement, where you can map a shortcut such as \`--\` to an em dash. Android has the same feature under the keyboard's personal dictionary.

Note that iOS also applies smart dash substitution in some apps, which converts a double hyphen automatically. It is inconsistent across apps, so do not depend on it.`,
    },
    {
      id: "unicode-and-code",
      heading: "What is the Unicode code point for an em dash?",
      body: `The em dash is **U+2014 EM DASH**. Everything a program needs to know about it:

| Representation | Value |
| --- | --- |
| Unicode code point | U+2014 |
| Decimal | 8212 |
| UTF-8 bytes | \`E2 80 94\` |
| UTF-16 | \`2014\` (single unit) |
| HTML named entity | \`&mdash;\` |
| HTML numeric entity | \`&#8212;\` or \`&#x2014;\` |
| CSS escape | \`\\2014\` |
| JavaScript / JSON | \`\\u2014\` |
| Python | \`\\u2014\` or \`\\N{EM DASH}\` |
| Windows-1252 byte | \`0x97\` |

That last row explains a common corruption. The em dash exists at byte \`0x97\` in Windows-1252 but not in ISO-8859-1, so text mislabelled between the two turns em dashes into a control character or the familiar \`â€"\` mojibake. If your dashes have arrived as three garbled characters, the file is UTF-8 being read as a single-byte encoding, and the fix is the declared encoding rather than the punctuation.

In a terminal or a script, matching it in a regular expression is \`\\u2014\` in most flavours; the three-dash family together is \`[-\\u2013\\u2014]\`.`,
    },
    {
      id: "em-vs-en-vs-hyphen",
      heading: "Em dash, en dash, or hyphen: which one do you want?",
      body: `At a glance, then the detail lives elsewhere:

| Mark | Character | Code point | Use it for | Example |
| --- | --- | --- | --- | --- |
| Hyphen | \`-\` | U+002D | Joining words | well-known |
| En dash | \`–\` | U+2013 | Ranges and dates | 2020–2024 |
| Em dash | \`—\` | U+2014 | Breaks in a sentence | It worked — eventually |

The one that catches people out: **dates and ranges take an en dash, not an em dash.** *June–September*, *pages 20–24*, *9am–5pm*. Reach for the em dash only when you are interrupting a sentence.

The "long dash" and "em dash" are the same thing — em is a typesetting measure, the width of a capital M, and en is the width of a capital N. Neither is a hyphen with extra length; all three are separate characters that sort, search, and parse differently.

For the full treatment of when each mark is correct, spacing conventions, and the cases where a hyphen genuinely will not do, see [em dash vs en dash vs hyphen](/guides/em-dash-vs-en-dash-vs-hyphen).`,
    },
    {
      id: "when-it-breaks-things",
      heading: "When the em dash causes problems",
      body: `The em dash is a typographic character living in a world of plain-text systems, and it does not always survive the trip.

- **Code and shell commands.** A \`--flag\` that autocorrect turned into \`—flag\` is not a flag. The error message will complain about an unrecognised option and say nothing about dashes.
- **CSV and data imports.** The character itself imports fine as UTF-8, but a file saved as Windows-1252 and read as UTF-8 (or the reverse) turns every em dash into mojibake across every row.
- **Search and find-and-replace.** Exact-match search treats \`—\`, \`–\` and \`-\` as three different characters, so a query written with one will not find text written with another.
- **Applicant tracking systems and résumé parsers.** Older parsers handle non-ASCII punctuation unevenly, and a mangled character in a job title or a date range is a bad place to find out. Plain hyphens are the safer choice in a CV.
- **Plain-text email, SMS, and legacy forms.** Anything that downgrades to ASCII may drop the character or replace it with a question mark.
- **Filenames and URLs.** Only the ASCII hyphen is safe.

There is also the stylistic reason people strip them: models produce em dashes far more consistently than human writers do, which is why the mark reads as an AI tell. That pattern is covered in [why ChatGPT uses so many em dashes](/guides/why-chatgpt-uses-em-dashes).

When you need them gone, [Remove Em Dashes](/remove-em-dashes) replaces every em dash with the substitute you choose — a comma, a colon, a plain hyphen, or nothing — and reports how many it changed, so you can check the count against what you expected rather than trusting a silent find-and-replace. For a document carrying smart quotes and non-breaking spaces as well, [AI Text Cleaner](/clean-ai-text) handles the whole set in one pass.`,
    },
  ],
  faqs: [
    {
      question: "How do I type an em dash on a Mac?",
      answer:
        "Press Option + Shift + Hyphen. It works system-wide in every macOS application because it is part of the keyboard layout. Option + Hyphen without Shift gives an en dash (–) instead, which is the one you want for ranges and dates.",
    },
    {
      question: "What is the Alt code for an em dash?",
      answer:
        "Alt + 0151. Hold Alt, type 0151 on the numeric keypad with Num Lock on, then release Alt. The leading zero is required — Alt + 151 without it produces a different character. The en dash is Alt + 0150.",
    },
    {
      question: "How do I type an em dash without a numeric keypad?",
      answer:
        "On Windows, press Win + . to open the emoji panel and pick the em dash from the symbols tab, or open Character Map and copy it. In Microsoft Word, type 2014 and press Alt + X, which converts the digits into the character in place and needs no keypad at all.",
    },
    {
      question: "What is the Unicode for an em dash?",
      answer:
        "U+2014 EM DASH, decimal 8212, encoded in UTF-8 as the three bytes E2 80 94. In HTML write &mdash; or &#8212;; in JavaScript, JSON, or Python write \\u2014.",
    },
    {
      question: "How do I get an em dash in Google Docs?",
      answer:
        "Google Docs has no built-in shortcut. Use Insert > Special characters and search for 'em dash', or create your own rule under Tools > Preferences > Substitutions mapping -- to an em dash. On a Mac, the system shortcut Option + Shift + Hyphen also works inside Docs.",
    },
    {
      question: "Is an em dash the same as a long hyphen?",
      answer:
        "No. They look similar but are separate Unicode characters. A hyphen is U+002D and joins words; an em dash is U+2014 and breaks a sentence. Search, sorting, and parsing treat them as unrelated, so a hyphen will never match text written with an em dash.",
    },
    {
      question: "Should I use an em dash between dates?",
      answer:
        "No — date and number ranges take an en dash (–, U+2013): June–September, 2020–2024, pages 20–24. The em dash is for interrupting a sentence. If you write out the word 'from', use 'to' rather than a dash: from 2020 to 2024.",
    },
  ],
  relatedTools: ["remove-em-dashes", "clean-ai-text"],
  relatedGuides: ["what-is-an-em-dash", "em-dash-vs-en-dash-vs-hyphen", "why-chatgpt-uses-em-dashes"],
};
