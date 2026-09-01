import type { GuideDefinition } from "../../lib/guides";

export const zeroWidthSpace: GuideDefinition = {
  slug: "zero-width-space",
  title: "Zero-Width Space (U+200B): Find, Remove, and Copy It",
  description: "The zero-width space is U+200B: invisible, but still a character. Why it breaks search and comparison, how to strip it, and how to insert one on purpose.",
  h1: "Zero-width space (U+200B): what it is and what it breaks",
  dek: "A character with no width, a real position in the string, and a talent for causing bugs that look impossible.",
  cluster: "reference",
  published: "2026-09-01",
  updated: "2026-09-01",
  answer:
    "A zero-width space is U+200B, a real Unicode character that renders as nothing at all but still occupies a position in the string. It was designed to mark a permissible line-break point in text that has no spaces. Because it is invisible and yet counted, it silently breaks equality checks, search and Ctrl+F, form validation, deduplication, and parsing — while the text on screen looks exactly right. It is not whitespace in the programming sense: JavaScript's \\s does not match it, and trim() does not remove it.",
  sections: [
    {
      id: "what-is-a-zero-width-space",
      heading: "What is a zero-width space?",
      body: `The zero-width space is the Unicode character **U+200B ZERO WIDTH SPACE**. It has no glyph, no width, and no visible effect. It is nevertheless a character: it has a code point, it takes a position in a string, it counts towards length, and it survives copying, saving, and transmission like any letter.

Its job is to mark a place where a line *may* break, without putting a space there. That matters in two situations:

- **Scripts written without spaces between words**, such as Thai, Khmer, Lao, Japanese, and Chinese. Line-breaking software needs a hint about where a break is acceptable, and U+200B provides one without changing how the text reads.
- **Long unbroken strings** in Latin-script text — a URL, a hash, a file path, a long identifier in a narrow table column. Inserting zero-width spaces lets the string wrap at chosen points instead of overflowing its container. This is why web pages are full of them, and why they follow you home when you copy from one.

| Property | Value |
| --- | --- |
| Name | ZERO WIDTH SPACE |
| Code point | U+200B |
| Decimal | 8203 |
| UTF-8 bytes | \`E2 80 8B\` |
| Unicode category | \`Cf\` (format) |
| White_Space property | No |
| HTML entity | \`&#8203;\` or \`&#x200B;\` |
| JavaScript / Python escape | \`\\u200B\` |

The two rows that cause the most trouble are the last two in the middle: its category is **format**, not **space separator**, and the Unicode \`White_Space\` property is **false**. Everything in the next section follows from those two facts.`,
      figure: "hidden-characters",
    },
    {
      id: "is-a-zero-width-space-whitespace",
      heading: "Is a zero-width space whitespace?",
      body: `Visually, yes. To almost every programming language, **no** — and this is the single most useful thing to know about it, because it invalidates the first two things a developer tries.

**JavaScript.** The \`\\s\` character class does not match U+200B, with or without the \`u\` flag, and \`String.prototype.trim()\` does not remove it:

\`\`\`js
/\\s/.test("\\u200B");            // false
"\\u200B".trim().length;         // 1  — still there
"Ada" === "Ada\\u200B";          // false
"a\\u200Bb".split(/\\s/).length;  // 1  — no split happened
\`\`\`

**Python.** The same, in both directions:

\`\`\`python
"\\u200b".isspace()               # False
("  a" + "\\u200b").strip()       # 'a\\u200b'  — the ZWSP survives
re.search(r"\\s", "\\u200b")       # None
\`\`\`

Contrast that with the **non-breaking space, U+00A0**, which *is* whitespace by the Unicode definition and is handled by \`\\s\` and \`trim()\` in both languages. The two characters get lumped together in conversation as "invisible spaces", but they behave in opposite ways in code. A cleanup routine that assumes trimming handles both will keep failing on the zero-width one.

One more distinction worth having exactly right, because it trips people up in JavaScript specifically: **U+FEFF is treated as whitespace by JavaScript** — \`\\s\` matches it and \`trim()\` removes it — because ECMAScript includes it in its own \`WhiteSpace\` definition. Python does not agree; \`"\\ufeff".isspace()\` is \`False\` and \`strip()\` leaves it alone. So a byte-order mark can vanish quietly in one runtime and persist in the next one downstream, which is a fine way to produce a bug that only appears in half your stack.

The practical rule: **never rely on trimming or on \`\\s\` to deal with zero-width characters.** Match them by code point.`,
    },
    {
      id: "the-zero-width-family",
      heading: "The zero-width family, briefly",
      body: `U+200B has close relatives that also render as nothing, and telling them apart matters because they are not equally safe to delete.

| Character | Code point | What it is for | Safe to strip? |
| --- | --- | --- | --- |
| Zero-width space | U+200B | Marks a permissible line-break point | Usually yes |
| Zero-width non-joiner | U+200C | Stops two letters forming a ligature or joining | No — meaningful in Arabic, Persian, and Indic scripts |
| Zero-width joiner | U+200D | Forces a join; binds emoji into one sequence | No — removing it splits emoji apart |
| Zero-width no-break space | U+FEFF | Byte-order mark at the start of a file | At the start, yes; mid-string, treat as an artefact |
| Soft hyphen | U+00AD | Hyphen shown only if the word wraps there | Usually yes |

Two of these deserve a note.

**U+200D is load-bearing in emoji.** A single visible emoji such as 👩‍💻 is three code points: a woman, a zero-width joiner, and a laptop. Delete the joiner and one image becomes two, 👩💻. Any "strip invisible characters" pass applied to user-facing text with emoji in it will do exactly that unless U+200D is excluded.

**U+FEFF means different things by position.** At the very start of a file it is a byte-order mark, a signal about encoding rather than content, and stripping it is normally correct. Anywhere else it is a zero-width no-break space, a use Unicode now discourages in favour of U+2060 WORD JOINER, and it is nearly always an artefact of concatenating files or reading a BOM-prefixed file as text.

For the full inventory — direction marks, word joiners, line and paragraph separators, the ones that can be used to spoof filenames — see the [invisible Unicode character reference](/guides/invisible-unicode-characters).`,
    },
    {
      id: "where-they-come-from",
      heading: "Where do zero-width spaces come from?",
      body: `Nobody types one by accident. They arrive with text that came from somewhere else.

- **Copy-paste from web pages.** The most common source by a wide margin. Sites insert U+200B into long URLs, file paths, hashes, and identifiers so they wrap inside narrow columns. Select the string, copy it, and the break hints come with it.
- **PDF extraction.** Copying out of a PDF frequently yields zero-width spaces and soft hyphens where the typesetter controlled line breaking, mixed in with the text you wanted.
- **Rich-text editors and CMSs.** Editors that round-trip content through HTML sometimes leave zero-width characters behind as remnants of cursor positioning or of an empty inline element that had to hold a position.
- **AI chat output.** Copying a response out of a chat window copies rendered HTML, so whatever spacing characters the formatting used come along. This is a property of the copy, not a hidden signal in the generation — see [does ChatGPT hide invisible characters](/guides/chatgpt-invisible-characters) for what is actually in there.
- **Deliberate insertion.** Zero-width characters have been used to fingerprint documents so a leaked copy can be traced back to a recipient, and to break up words so that keyword filters and spam detection do not match them: \`fr\\u200Bee\` reads as "free" but does not match a filter looking for "free".
- **Obfuscation in phishing.** The same trick applied to brand names and URLs, so a message defeats a naive string match while still reading correctly to the person.

The common thread is the one that runs through every invisible-character problem: they enter when text crosses from a **presentation** context, where they do a real job, into a **data** context, where nothing expects them.`,
    },
    {
      id: "what-breaks",
      heading: "What does a zero-width space break?",
      body: `Every failure below has the same shape. The text looks correct, so every debugging instinct points at the wrong place.

**String equality and deduplication.** \`"Ada" === "Ada\\u200B"\` is \`false\`. A \`Set\` containing both has size 2. Two rows that look identical to a human are two distinct values to the machine, so deduplication misses them and grouping splits them.

**\`===\` comparisons and unit tests.** An assertion fails with an expected and an actual value that print identically. Diff output shows no difference. This is the classic hour-long debugging session, and the tell is a length mismatch: check \`.length\` before you check anything else.

**Search and Ctrl+F.** A zero-width space inside a word means searching for that word finds nothing, on the page where the word is plainly visible. Browser find, editor find, and database \`LIKE\` all fail the same silent way.

**Form validation and email fields.** An address with a trailing U+200B fails a format check. The user sees a correct address and an error that makes no sense, and — because \`trim()\` does not remove it — the usual defensive trim in the handler does not save you.

**Database uniqueness constraints.** \`user@example.com\` and \`user@example.com\\u200B\` are different strings, so a unique index happily accepts both. You end up with two accounts that display identically and cannot be told apart in the admin UI.

**Code.** An identifier or object key containing a zero-width space looks exactly like the one you meant. \`obj.total\` returns \`undefined\` because the key defined earlier was \`total\\u200B\`. Imports resolve to nothing, config keys are ignored, and the error never mentions the real cause.

**CSV and JSON parsing.** A zero-width space inside a header cell means the column name does not match your mapping. In JSON, a stray U+FEFF before the opening brace makes \`JSON.parse\` throw an "unexpected token" error pointing at position 0 of what looks like perfectly valid JSON.

**Résumé and ATS parsing.** Applicant tracking systems match on keywords. A job title or skill that has picked up a zero-width space during a copy out of a PDF or a web profile no longer matches the keyword the system is searching for, and the match count silently drops.`,
    },
    {
      id: "find-and-remove",
      heading: "How do I find and remove zero-width spaces?",
      body: `**Look for the symptom first.** The reliable signal is a length that does not match what you see. If a string with 3 visible characters reports a length of 4, or a value that "obviously" equals another one does not, you are almost certainly looking at an invisible character.

**Scan the text.** Paste it into the [Invisible Character Scanner](/remove-invisible-characters). It reports which invisible characters are present and how many of each, then strips them on request. Everything runs in your browser. Seeing the counts before you strip anything tells you whether you have one stray character or systematic contamination, which changes what you fix.

**In an editor.** VS Code highlights most invisible characters by default through its \`editor.unicodeHighlight\` settings. For find-and-replace with regex enabled, this class covers the common zero-width set:

\`\`\`
[\\u200B-\\u200D\\u2060\\uFEFF]
\`\`\`

That is zero-width space, non-joiner, joiner, word joiner, and the zero-width no-break space / BOM. Add \`\\u00AD\` if you also want soft hyphens.

**JavaScript.** To remove only the zero-width space:

\`\`\`js
const clean = input.replace(/\\u200B/g, "");
\`\`\`

To remove the family, while leaving the emoji joiner intact:

\`\`\`js
const clean = input.replace(/[\\u200B\\u200C\\u2060\\uFEFF\\u00AD]/g, "");
\`\`\`

**Python.** The same two, using \`str.replace\` and \`re\`:

\`\`\`python
clean = text.replace("\\u200b", "")

import re
clean = re.sub(r"[\\u200b\\u200c\\u2060\\ufeff\\u00ad]", "", text)
\`\`\`

Note what these deliberately leave out. **U+200D is excluded** so emoji sequences stay intact, and **U+00A0 is excluded** because a non-breaking space is a real space — deleting it would run two words together. If you are cleaning text that contains non-breaking spaces, replace them with an ordinary space rather than removing them.

**Where to do it.** Normalize at the boundary, when text arrives, not at the point of use. A single cleanup on input beats scattering defensive replacements through the codebase, and it means the value stored in the database is the clean one. Strip aggressively in identifiers, keys, emails, and code; strip conservatively in user-facing prose, where U+200C and U+200D can be carrying meaning.`,
    },
    {
      id: "insert-or-copy",
      heading: "How do I type or copy a zero-width space?",
      body: `Sometimes you want one — to let a long token wrap, or to test that your own cleanup code works. The reliable routes are all textual, because you cannot see the thing you are trying to select.

| Where | How to write it |
| --- | --- |
| HTML | \`&#8203;\` or \`&#x200B;\` |
| JavaScript / TypeScript / JSON | \`"\\u200B"\` |
| Python | \`"\\u200b"\` or \`"\\N{ZERO WIDTH SPACE}"\` |
| CSS \`content\` | \`"\\200B"\` (a trailing space ends the escape) |
| Microsoft Word | Type \`200B\`, then press <kbd>Alt</kbd> + <kbd>X</kbd> |
| Windows | <kbd>Win</kbd> + <kbd>.</kbd>, symbols tab — or paste from a code escape |
| Linux (IBus) | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd>, then \`200b\`, then <kbd>Enter</kbd> |
| macOS | No system shortcut; use the Character Viewer or an escape |

**Copying one from a web page is inherently unreliable**, including from this page. You cannot see the character, so you cannot see the boundaries of your selection: you may take the zero-width space plus a neighbouring space, or you may miss it entirely, and nothing on screen tells you which happened. A "click to copy a zero-width space" button has the same problem one step later — you get something in the clipboard and no way to confirm what.

So if the destination accepts code — HTML, a template, a source file, a config — **use the escape**. It is explicit, reviewable in a diff, and cannot be half-selected. If the destination is a word processor, use Word's <kbd>Alt</kbd> + <kbd>X</kbd> route, which is equally explicit.

**In HTML specifically**, consider whether you want U+200B at all. \`&#8203;\` is a content character that becomes part of the text and will be copied out by anyone who selects it. The CSS properties \`overflow-wrap: anywhere\` and \`word-break: break-word\` achieve the same wrapping without putting anything into the string, and \`&shy;\` (the soft hyphen, U+00AD) is the right choice when you want a visible hyphen at the break. Reach for a real character only when you need a break opportunity at a specific point that CSS cannot infer.

If what you actually want is the opposite — to get rid of characters like this along with em dashes, smart quotes, and non-breaking spaces in one pass — the [AI Text Cleaner](/clean-ai-text) handles the whole set, and reports what it changed rather than editing silently.`,
    },
  ],
  faqs: [
    {
      question: "What is a zero-width space?",
      answer:
        "U+200B, a Unicode character that renders as nothing but is still part of the string: it has a code point, occupies a position, and counts towards length. Its purpose is to mark a place where a line may break without inserting a visible space, which is useful in scripts without spaces and in long unbroken strings such as URLs.",
    },
    {
      question: "How do I remove zero-width spaces?",
      answer:
        "Match them by code point, not by whitespace. In JavaScript, input.replace(/\\u200B/g, \"\") removes them; the wider family is /[\\u200B\\u200C\\u2060\\uFEFF\\u00AD]/g. In Python, re.sub(r\"[\\u200b\\u200c\\u2060\\ufeff\\u00ad]\", \"\", text). Or paste the text into our Invisible Character Scanner, which counts them first and strips them in the browser.",
    },
    {
      question: "Does trim() remove a zero-width space?",
      answer:
        "No. In JavaScript, trim() removes characters with the Unicode White_Space property plus U+FEFF, and U+200B has neither. Python's str.strip() behaves the same way, because \"\\u200b\".isspace() is False. The zero-width space belongs to Unicode category Cf (format), not to the space separators, so every whitespace-based routine ignores it.",
    },
    {
      question: "Why is there an invisible character in my text?",
      answer:
        "Almost always because the text was copied from somewhere that had one. Web pages insert zero-width spaces to control where long strings wrap, PDFs carry line-break artefacts, and rich-text editors leave remnants behind. They can also be inserted deliberately, to fingerprint a document or to break up a word so that a keyword filter does not match it.",
    },
    {
      question: "How do I type a zero-width space?",
      answer:
        "Use a code escape rather than trying to copy one. In HTML write &#8203;, in JavaScript or Python write \\u200B, in CSS content write \\200B. In Microsoft Word, type 200B and press Alt + X. Copying an invisible character from a web page is unreliable because you cannot see what you selected.",
    },
    {
      question: "Are zero-width spaces dangerous?",
      answer:
        "Disruptive rather than dangerous in themselves. They break equality checks, search, validation, and deduplication while the text looks correct. They can be used adversarially, though: splitting a word with one defeats a naive keyword filter, and the same trick is used in phishing messages to slip brand names past string matching.",
    },
    {
      question: "Is a zero-width space the same as a non-breaking space?",
      answer:
        "No, and they behave in opposite ways. A non-breaking space (U+00A0) is a visible space that will not wrap, and it is real whitespace, so \\s matches it and trim() removes it. A zero-width space (U+200B) has no width, marks a place a line may break, and is not whitespace at all. Replace non-breaking spaces with an ordinary space; delete zero-width spaces.",
    },
  ],
  relatedTools: ["remove-invisible-characters", "show-invisible-characters", "clean-ai-text"],
  relatedGuides: ["invisible-unicode-characters", "chatgpt-invisible-characters", "signs-of-ai-written-text"],
};
