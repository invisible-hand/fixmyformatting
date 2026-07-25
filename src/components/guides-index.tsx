import { allGuides, clusterOrder, getGuide } from "@/lib/guides";
import type { GuideDefinition } from "@/lib/guides";
import { bundles, guideSlugsForLocale, localizedPath, localizeGuide } from "@/lib/i18n";
import type { LocaleCode, SiteLocale } from "@/lib/i18n";
import { pages as englishPages, guideChrome as englishChrome } from "@/content/i18n/en/chrome";
import { breadcrumbSchema, serializeSchema, siteUrl } from "@/lib/schema";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

/** Guides this locale actually serves, in the canonical English order. */
function guidesFor(locale: SiteLocale): GuideDefinition[] {
  if (locale === "en") return allGuides;
  const covered = new Set(guideSlugsForLocale(locale as LocaleCode));
  return allGuides
    .filter((guide) => covered.has(guide.slug))
    .map((guide) => localizeGuide(guide, locale as LocaleCode));
}

export function GuidesIndex({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = locale === "en" ? englishPages.guidesIndex : bundles[locale as LocaleCode].pages.guidesIndex;
  const chrome = locale === "en" ? englishChrome : bundles[locale as LocaleCode].guideChrome;
  const guides = guidesFor(locale);
  const path = (slug?: string) => localizedPath(locale, slug ? `guides/${slug}` : "guides");

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.metaTitle,
      description: copy.description,
      url: `${siteUrl}${path()}`,
      inLanguage: locale,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.h1,
          url: `${siteUrl}${path(guide.slug)}`,
        })),
      },
    },
    breadcrumbSchema([
      { name: chrome.home, path: localizedPath(locale) },
      { name: chrome.navLabel, path: path() },
    ]),
  ];

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="tool-page guide-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href={localizedPath(locale)}>{chrome.home}</a><span>/</span><span>{chrome.navLabel}</span>
        </nav>
        <header className="tool-title">
          <h1>{copy.h1}</h1>
          <p>{copy.dek}</p>
        </header>
        <div className="tool-content">
          {clusterOrder.map((cluster) => {
            const inCluster = guides.filter((guide) => getGuide(guide.slug)?.cluster === cluster);
            if (!inCluster.length) return null;
            return (
              <section key={cluster}>
                <h2>{copy.clusters[cluster] ?? cluster}</h2>
                <div className="related-grid">
                  {inCluster.map((guide) => (
                    <a href={path(guide.slug)} key={guide.slug}>
                      <strong>{guide.h1}</strong>
                      <span>{guide.description}</span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }} />
        ))}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
