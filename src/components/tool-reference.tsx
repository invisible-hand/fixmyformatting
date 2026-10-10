import type { LocaleCode, SiteLocale } from "@/lib/i18n";
import { bundles, interpolate, isGuideLocalized, localizedPath, localizeGuide } from "@/lib/i18n";
import { getGuide } from "@/lib/guides";
import type { ReferenceCopy, ReferenceSlug } from "@/lib/i18n/types";
import { reference as englishReference } from "@/content/i18n/en/reference";
import { workspace as englishWorkspace } from "@/content/i18n/en/chrome";
import {
  dashReplacements,
  dashRows,
  hex,
  invisibleRows,
  isReferenceSlug,
  markedCount,
  quoteRows,
  referenceGuide,
  removedCount,
} from "@/lib/tool-reference";

function copyFor(locale: SiteLocale): ReferenceCopy | null {
  return locale === "en" ? englishReference : (bundles[locale as LocaleCode].reference ?? null);
}

/** One or two plain sentences that answer the page's main question; null for other tools. */
export function referenceAnswer(slug: string, locale: SiteLocale): string | null {
  if (!isReferenceSlug(slug)) return null;
  const copy = copyFor(locale);
  if (!copy) return null;
  const count = slug === "show-invisible-characters" ? markedCount : removedCount;
  return interpolate(copy.pages[slug].answer, { count: String(count) });
}

function GuideLink({ slug, locale, lead }: { slug: ReferenceSlug; locale: SiteLocale; lead: string }) {
  const guideSlug = referenceGuide[slug];
  const guide = getGuide(guideSlug);
  if (!guide) return null;
  if (locale !== "en" && !isGuideLocalized(guideSlug, locale as LocaleCode)) return null;
  const h1 = locale === "en" ? guide.h1 : localizeGuide(guide, locale as LocaleCode).h1;
  return (
    <p className="reference-guide">
      {lead}: <a href={localizedPath(locale, `guides/${guideSlug}`)}>{h1}</a>
    </p>
  );
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code dir="ltr">{children}</code>
);

function InvisibleTable({ copy }: { copy: ReferenceCopy }) {
  const h = copy.headers;
  return (
    <table className="reference-table">
      <thead>
        <tr>
          <th scope="col">{h.codePoint}</th>
          <th scope="col">{h.name}</th>
          <th scope="col">{h.type}</th>
          <th scope="col">{h.scanner}</th>
          <th scope="col">{h.viewer}</th>
        </tr>
      </thead>
      <tbody>
        {invisibleRows.map((row) => (
          <tr key={row.id} id={row.id}>
            <td><Code>{`U+${hex(row.codePoint)}`}</Code></td>
            <td dir="ltr">{row.name}</td>
            <td>{copy.invisibleTypes[row.type]}</td>
            <td>{row.removed ? copy.removed : copy.kept}</td>
            <td>{row.marker ? <Code>{`[${row.marker}]`}</Code> : copy.notLabelled}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function QuoteTable({ copy }: { copy: ReferenceCopy }) {
  const h = copy.headers;
  return (
    <table className="reference-table">
      <thead>
        <tr>
          <th scope="col">{h.character}</th>
          <th scope="col">{h.codePoint}</th>
          <th scope="col">{h.name}</th>
          <th scope="col">{h.becomes}</th>
        </tr>
      </thead>
      <tbody>
        {quoteRows.map((row) => (
          <tr key={row.id} id={row.id}>
            <td><Code>{row.char}</Code></td>
            <td><Code>{`U+${hex(row.codePoint)}`}</Code></td>
            <td dir="ltr">{row.name}</td>
            <td><Code>{row.becomes}</Code> (<Code>{`U+${hex(row.becomesCodePoint)}`}</Code>)</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DashTable({ copy, locale }: { copy: ReferenceCopy; locale: SiteLocale }) {
  const h = copy.headers;
  const labels = locale === "en" ? englishWorkspace : bundles[locale as LocaleCode].workspace;
  const labelFor = {
    comma: labels.dashComma,
    semicolon: labels.dashSemicolon,
    hyphen: labels.dashHyphen,
    remove: labels.dashRemove,
  };
  return (
    <table className="reference-table">
      <thead>
        <tr>
          <th scope="col">{h.character}</th>
          <th scope="col">{h.codePoint}</th>
          <th scope="col">{h.name}</th>
          <th scope="col">{h.output}</th>
        </tr>
      </thead>
      <tbody>
        {dashRows.map((row) => (
          <tr key={row.id} id={row.id}>
            <td><Code>{row.char}</Code></td>
            <td><Code>{`U+${hex(row.codePoint)}`}</Code></td>
            <td dir="ltr">{row.name}</td>
            <td>
              {row.replaced ? (
                <ul className="reference-list">
                  {dashReplacements.map((option) => (
                    <li key={option.key}>
                      {labelFor[option.key]}
                      {option.isDefault ? ` (${copy.defaultLabel})` : ""}
                      {option.output ? <>: <Code>{option.output}</Code></> : null}
                    </li>
                  ))}
                </ul>
              ) : copy.unchanged}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Static table of what the tool does with each character, rendered into the HTML. */
export function ToolReference({ slug, locale }: { slug: string; locale: SiteLocale }) {
  if (!isReferenceSlug(slug)) return null;
  const copy = copyFor(locale);
  if (!copy) return null;
  const page = copy.pages[slug];
  return (
    <section className="reference-section" id="reference-table">
      <h2>{page.heading}</h2>
      <p>{page.note}</p>
      <div className="reference-scroll" role="region" aria-label={page.heading} tabIndex={0}>
        {slug === "remove-smart-quotes" ? <QuoteTable copy={copy} />
          : slug === "remove-em-dashes" ? <DashTable copy={copy} locale={locale} />
          : <InvisibleTable copy={copy} />}
      </div>
      <GuideLink slug={slug} locale={locale} lead={copy.guideLead} />
    </section>
  );
}
