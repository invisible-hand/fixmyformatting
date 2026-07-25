import type { GuideDefinition } from "../../lib/guides";

export const dashReference: GuideDefinition = {
  slug: "em-dash-vs-en-dash-vs-hyphen",
  title: "Em Dash vs En Dash vs Hyphen: The Difference",
  description: "Three characters, three jobs. When to use each dash, how to type them on any keyboard, and why swapping one for another breaks things.",
  h1: "Em dash vs en dash vs hyphen",
  dek: "Three different Unicode characters that look similar and are not interchangeable.",
  cluster: "reference",
  published: "2026-07-25",
  updated: "2026-07-25",
  answer:
    "A hyphen (-) joins compound words: well-known. An en dash (–) marks ranges and connections: pages 20–24. An em dash (—) sets off a phrase within a sentence, like a stronger comma. They are three separate Unicode characters of increasing width, and parsers, search, and typesetting all treat them differently.",
  sections: [
    {
      id: "the-three-characters",
      heading: "The three characters at a glance",
      body: `The names come from historical type: an en dash was the width of a capital N, an em dash the width of a capital M.

| Mark | Name | Code point | Width | Main use |
| --- | --- | --- | --- | --- |
| - | Hyphen-minus | U+002D | Shortest | Compound words |
| – | En dash | U+2013 | Medium | Ranges and connections |
| — | Em dash | U+2014 | Longest | Breaks within a sentence |

The first is on your keyboard. The other two are not, which is the practical root of most confusion — people type a hyphen where an en or em dash belongs, because it is the only one available without a shortcut.`,
      figure: "dash-ruler",
    },
    {
      id: "the-hyphen",
      heading: "The hyphen",
      body: `The hyphen joins things into a single unit.

- **Compound modifiers before a noun**: a *well-known* author, a *twelve-year-old* dog, a *state-of-the-art* facility. Note that the hyphen disappears when the phrase moves after the noun: the author is *well known*.
- **Some prefixes**, especially to avoid a collision or an ambiguity: *re-elect*, *co-owner*, *re-cover* a chair (as opposed to *recover* from illness).
- **Word breaks at the end of a line**, in justified typesetting.
- **Compound numbers**: *twenty-three*.

Technically the keyboard character is *hyphen-minus* — a single code point doing duty as hyphen, minus sign, and command-line flag, inherited from typewriters and early ASCII. Unicode has a dedicated hyphen (U+2010) and minus sign (U+2212), but almost nothing uses them, and you should not start: \`-\` is what parsers, shells, and URLs expect.`,
    },
    {
      id: "the-en-dash",
      heading: "The en dash",
      body: `The en dash means *to*, *through*, or *between*. It connects rather than joins.

- **Numeric ranges**: pages *20–24*, *2020–2024*, *9am–5pm*. Style guides advise against mixing it with words: write *from 2020 to 2024*, not *from 2020–2024*.
- **Connections and conflicts between separate entities**: the *Paris–Dakar* rally, a *doctor–patient* relationship, the *east–west* axis. The distinction from a hyphen matters here — *Franco-German* with a hyphen suggests one blended thing, while *France–Germany* with an en dash means two parties in relation.
- **Compound modifiers where one part is already multi-word**: a *post–World War II* settlement. A hyphen there would attach only to "World".
- **Scores and votes**: a *3–1* win.

En dashes are the least-used of the three and the most often replaced by a hyphen. In running prose that substitution is a minor typographic imprecision that few readers notice. In data it is not minor: a date range written with an en dash will not match a regular expression looking for a hyphen.`,
    },
    {
      id: "the-em-dash",
      heading: "The em dash",
      body: `The em dash sets off a phrase, creating a stronger break than a comma and a softer one than a full stop.

- **In pairs, around an aside**: *The results — which nobody expected — were clear.*
- **Singly, before a conclusion or reversal**: *She checked everything twice — and still missed it.*
- **To mark interrupted speech** in dialogue.

**Spacing** is the one real style disagreement. US publishing convention (Chicago Manual of Style) sets em dashes closed up: *word—word*. UK convention (Oxford, and most British newspapers) uses a spaced en dash instead: *word – word*. Both are correct; consistency within a document is what matters. AI output typically uses the spaced em dash — *word — word* — which is a hybrid of the two and is why it can look subtly off to editors trained in either tradition.

The em dash is also the mark that has become an unofficial signature of AI-generated text, because models use it far more consistently than people do. That is covered in [why ChatGPT uses so many em dashes](/guides/why-chatgpt-uses-em-dashes).`,
    },
    {
      id: "typing-them",
      heading: "How to type each one",
      body: `| Platform | En dash (–) | Em dash (—) |
| --- | --- | --- |
| macOS | <kbd>Option</kbd> + <kbd>-</kbd> | <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>-</kbd> |
| Windows | <kbd>Alt</kbd> + <kbd>0150</kbd> | <kbd>Alt</kbd> + <kbd>0151</kbd> |
| Linux | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>u</kbd>, 2013 | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>u</kbd>, 2014 |
| Word / Docs | Two hyphens between words autocorrects | Two hyphens autocorrects |
| HTML | \`&ndash;\` | \`&mdash;\` |
| iOS / Android | Long-press the hyphen key | Long-press the hyphen key |

The Windows Alt codes require a numeric keypad, which is why so many laptop users simply never type these characters.`,
    },
    {
      id: "when-it-breaks-things",
      heading: "When the difference actually breaks things",
      body: `In prose, using a hyphen where an en dash belongs is a typographic nicety. Outside prose, these are three distinct code points and the difference is functional:

- **Search and find-and-replace** match exact characters. Searching for \`2020-2024\` will not find \`2020–2024\`.
- **Shell commands** need U+002D. \`--force\` pasted from a document where autocorrect turned it into an em dash is not a flag, and the error message will not mention dashes.
- **CSV and JSON** treat en and em dashes as ordinary text, which is usually fine — until a value that should match a key does not.
- **URLs and slugs** accept only the ASCII hyphen.
- **Sorting and deduplication** treat the three as different characters, so entries that look identical do not group.

If you need to normalise dashes across a document, [Remove Em Dashes](/remove-em-dashes) replaces them with the substitute you choose and reports the count, so you can confirm the number matches what you expected rather than trusting a silent replace. The related trap with quotation marks is covered in [why smart quotes break code](/guides/smart-quotes-break-code).`,
    },
  ],
  faqs: [
    {
      question: "What is the difference between an em dash and an en dash?",
      answer:
        "An en dash (–, U+2013) means to or through and marks ranges such as 2020–2024. An em dash (—, U+2014) sets off a phrase within a sentence, like a stronger comma. The em dash is roughly twice as wide, and they are separate Unicode characters.",
    },
    {
      question: "When should I use a hyphen instead of a dash?",
      answer:
        "Use a hyphen to join words into a single unit: well-known, twenty-three, re-elect. If you mean a range, a connection between two parties, or a break in a sentence, you want an en or em dash instead.",
    },
    {
      question: "Should em dashes have spaces around them?",
      answer:
        "It depends on the style guide. US convention closes them up (word—word), while UK convention typically uses a spaced en dash (word – word). Both are correct; consistency within a single document is what matters.",
    },
    {
      question: "How do I type an em dash?",
      answer:
        "On macOS press Option + Shift + hyphen. On Windows hold Alt and type 0151 on the numeric keypad. In Word and Google Docs, typing two hyphens between words converts automatically. On phones, long-press the hyphen key.",
    },
    {
      question: "Does it matter if I use a hyphen instead of an en dash?",
      answer:
        "In prose it is a minor imprecision most readers will not notice. In data, code, URLs, or anything searched or parsed it matters a great deal, because the three are distinct characters and an exact match will fail.",
    },
  ],
  relatedTools: ["remove-em-dashes", "clean-ai-text"],
  relatedGuides: ["why-chatgpt-uses-em-dashes", "smart-quotes-break-code"],
};
