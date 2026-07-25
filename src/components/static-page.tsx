import type { SiteLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import type { StaticPageCopy } from "@/lib/i18n/types";
import { breadcrumbSchema, serializeSchema } from "@/lib/schema";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

/** Shared shell for About and Privacy in any locale. */
export function StaticPage({
  copy,
  path,
  locale = "en",
}: {
  copy: StaticPageCopy;
  path: "about" | "privacy";
  locale?: SiteLocale;
}) {
  const schema = breadcrumbSchema([
    { name: "Home", path: localizedPath(locale) },
    { name: copy.h1, path: localizedPath(locale, path) },
  ]);
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="tool-page tool-content">
        <header className="tool-title">
          <h1>{copy.h1}</h1>
          <p>{copy.dek}</p>
        </header>
        {copy.sections.map((section, index) => (
          <section key={section.heading ?? index}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
