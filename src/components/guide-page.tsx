import type { GuideDefinition } from "@/lib/guides";
import type { ToolGuide } from "@/lib/tool-guides";
import { relatedGuidesFor } from "@/lib/guides";
import { renderGuideMarkdown } from "@/lib/guide-markdown";
import type { ToolDefinition } from "@/lib/tools";
import { bundles, isGuideLocalized, isToolLocalized, localizedPath, localizeGuide, localizeTool, uiFor } from "@/lib/i18n";
import type { LocaleCode, SiteLocale } from "@/lib/i18n";
import { guideChrome as englishGuideChrome } from "@/content/i18n/en/chrome";
import { figures as englishFigures } from "@/content/i18n/en/figures";
import { getTool } from "@/lib/tools";
import { breadcrumbSchema, faqSchema, organizationName, serializeSchema, siteUrl } from "@/lib/schema";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { GuideFigure } from "./guide-figures";
import { CharCopy } from "./char-copy";

/**
 * Renders both /guides/<slug> and tool sub-guides at /<parentTool>/<slug>. A
 * tool guide swaps the breadcrumb to Home › Tool › Question and adds a "Do it
 * now" card to the parent tool after the answer and after the FAQs.
 */
export function GuidePage({ guide, locale = "en" }: { guide: GuideDefinition | ToolGuide; locale?: SiteLocale }) {
  const chrome = locale === "en" ? englishGuideChrome : bundles[locale as LocaleCode].guideChrome;
  const figureCopy = locale === "en" ? englishFigures : bundles[locale as LocaleCode].figures;
  const path = (slug?: string) => localizedPath(locale, slug ? `guides/${slug}` : "guides");
  const parentSlug = "parentTool" in guide ? guide.parentTool : undefined;
  const parentTool = parentSlug
    ? (locale === "en" ? getTool(parentSlug) : localizeTool(parentSlug, locale as LocaleCode))
    : undefined;
  const parentPath = parentSlug ? localizedPath(locale, parentSlug) : "";
  const pagePath = parentSlug ? localizedPath(locale, `${parentSlug}/${guide.slug}`) : path(guide.slug);
  const pageUrl = `${siteUrl}${pagePath}`;
  const image = parentSlug
    ? `${siteUrl}/api/guide-og/${guide.slug}?tool=${parentSlug}`
    : `${siteUrl}/api/guide-og/${guide.slug}`;
  const trail = parentTool
    ? [
        { name: chrome.home, path: localizedPath(locale) },
        { name: parentTool.name, path: parentPath },
        { name: guide.h1, path: pagePath },
      ]
    : [
        { name: chrome.home, path: localizedPath(locale) },
        { name: chrome.navLabel, path: path() },
        { name: guide.h1, path: pagePath },
      ];
  const cta = parentTool ? (
    <a className="tool-guide-cta" href={parentPath}>
      <span className="tool-guide-cta-label">{chrome.doItNow ?? englishGuideChrome.doItNow} →</span>
      <strong>{parentTool.name}</strong>
      <span>{parentTool.description}</span>
    </a>
  ) : null;
  const tools = guide.relatedTools
    .filter((slug) => slug !== parentSlug)
    .filter((slug) => locale === "en" || isToolLocalized(slug, locale as LocaleCode))
    .map((slug) => (locale === "en" ? getTool(slug) : localizeTool(slug, locale as LocaleCode)))
    .filter((tool): tool is ToolDefinition => Boolean(tool));
  const siblings = relatedGuidesFor(guide)
    .filter((sibling) => locale === "en" || isGuideLocalized(sibling.slug, locale as LocaleCode))
    .map((sibling) => (locale === "en" ? sibling : localizeGuide(sibling, locale as LocaleCode)));
  const publisher = { "@type": "Organization", name: organizationName, url: siteUrl };

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.h1,
      description: guide.description,
      datePublished: guide.published,
      dateModified: guide.updated,
      author: publisher,
      publisher,
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      image,
      inLanguage: locale,
    },
    faqSchema(guide.faqs),
    breadcrumbSchema(trail),
  ];

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="tool-page guide-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href={trail[0].path}>{trail[0].name}</a><span>/</span><a href={trail[1].path}>{trail[1].name}</a><span>/</span><span>{guide.h1}</span>
        </nav>
        <header className="tool-title">
          <h1>{guide.h1}</h1>
          <p>{guide.dek}</p>
        </header>
        <article className="tool-content guide-content">
          {guide.copyChars && guide.copyChars.length > 0 && (
            <CharCopy
              chars={guide.copyChars}
              messages={{
                group: chrome.copyGroup ?? englishGuideChrome.copyGroup!,
                copied: chrome.copied ?? englishGuideChrome.copied!,
                status: chrome.copiedStatus ?? englishGuideChrome.copiedStatus!,
              }}
            />
          )}
          <p className="guide-answer">{guide.answer}</p>
          {cta}
          <nav className="guide-toc" aria-label="On this page">
            <h2>{chrome.onThisPage}</h2>
            <ol>
              {guide.sections.map((section) => (
                <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>
              ))}
            </ol>
          </nav>
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: renderGuideMarkdown(section.body, locale) }} />
              {section.figure && <GuideFigure figure={section.figure} copy={figureCopy} />}
            </section>
          ))}
          <section>
            <h2>{locale === "en" ? "Frequently asked questions" : uiFor(locale as LocaleCode).faqTitle}</h2>
            <div className="faq-list">
              {guide.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
          {cta}
          {tools.length > 0 && (
            <section>
              <h2>{chrome.toolsMentioned}</h2>
              <div className="related-grid">
                {tools.map((tool) => (
                  <a href={localizedPath(locale, tool.slug)} key={tool.slug}>
                    <strong>{tool.name}</strong>
                    <span>{tool.description}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
          {siblings.length > 0 && (
            <section>
              <h2>{chrome.relatedGuides}</h2>
              <div className="related-grid">
                {siblings.map((sibling) => (
                  <a href={path(sibling.slug)} key={sibling.slug}>
                    <strong>{sibling.h1}</strong>
                    <span>{sibling.description}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }} />
        ))}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
