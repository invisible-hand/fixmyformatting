import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { localizedPath, localizedToolSlugs, localizeTool, messages } from "@/lib/i18n";
import type { LocaleCode } from "@/lib/i18n";

export function LocalizedHome({ locale }: { locale: LocaleCode }) {
  const t = messages[locale];
  const tools = localizedToolSlugs.map((slug) => localizeTool(slug, locale));
  const categories = [...new Set(tools.map((tool) => tool.category))];
  const url = `https://fixmyformatting.com${localizedPath(locale)}`;
  const schemas = [
    { "@context": "https://schema.org", "@type": "Organization", name: "Fix My Formatting", url: "https://fixmyformatting.com" },
    { "@context": "https://schema.org", "@type": "WebSite", name: "Fix My Formatting", url, description: t.homeDescription, inLanguage: locale },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t.allTools, item: url }] },
  ];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="home-page">
        <header className="home-intro">
          <span className="eyebrow">{t.homeEyebrow}</span>
          <h1>{t.homeTitle}</h1>
          <p>{t.homeDescription}</p>
          <div className="quick-links">
            <a className="primary-action" href={localizedPath(locale, "clean-ai-text")}>{t.tools["clean-ai-text"].name}</a>
            <a href={localizedPath(locale, "markdown-to-word")}>{t.tools["markdown-to-word"].name}</a>
            <a href={localizedPath(locale, "remove-invisible-characters")}>{t.tools["remove-invisible-characters"].name}</a>
          </div>
        </header>
        <section id="tools" className="tool-directory">
          {categories.map((category) => (
            <section className="category-section" key={category}>
              <h2>{category === "Markdown & documents" ? t.categories.markdown : t.categories.cleanup}</h2>
              <div className="home-tool-grid">
                {tools.filter((tool) => tool.category === category).map((tool) => (
                  <a href={localizedPath(locale, tool.slug)} key={tool.slug}>
                    <span className="tool-arrow" aria-hidden="true">↗</span>
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </section>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        ))}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
