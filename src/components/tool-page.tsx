import type { ToolDefinition } from "@/lib/tools";
import { allTools, coreTools, getProcessorSlug } from "@/lib/tools";
import { localizedPath, localizedToolSlugs, localizeTool, messages } from "@/lib/i18n";
import type { LocaleCode, SiteLocale } from "@/lib/i18n";
import type { ProcessSettings } from "@/lib/processors";
import { guidePath, guidesForTool } from "@/lib/guides";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ToolWorkspace } from "./tool-workspace";
import { EmbedMode } from "./embed-mode";

const siteUrl = "https://fixmyformatting.com";

export function ToolPage({
  tool,
  initialInput,
  initialSettings,
  shared = false,
  embed = false,
  locale = "en",
}: {
  tool: ToolDefinition;
  initialInput?: string;
  initialSettings?: ProcessSettings;
  shared?: boolean;
  embed?: boolean;
  locale?: SiteLocale;
}) {
  const localized = locale === "en" ? null : messages[locale as LocaleCode];
  const localizedRelated = locale === "en"
    ? []
    : localizedToolSlugs.map((slug) => localizeTool(slug, locale as LocaleCode));
  const processorSlug = getProcessorSlug(tool.slug);
  const processorSiblings = allTools.filter((candidate) =>
    candidate.slug !== tool.slug && getProcessorSlug(candidate.slug) === processorSlug,
  );
  const categorySiblings = coreTools.filter((candidate) =>
    candidate.category === tool.category && candidate.slug !== tool.slug,
  );
  const related = locale === "en"
    ? [...processorSiblings, ...categorySiblings.filter((candidate) => !processorSiblings.some((sibling) => sibling.slug === candidate.slug))].slice(0, 6)
    : localizedRelated.filter((candidate) => candidate.category === tool.category && candidate.slug !== tool.slug).slice(0, 6);
  // Brand variants (chatgpt-to-word) inherit the guides of their core processor.
  const toolGuides = locale === "en" ? guidesForTool(processorSlug) : [];
  const publicPath = localizedPath(locale, tool.slug);
  const pageUrl = `${siteUrl}${publicPath}`;
  const workspaceLabels = localized ? {
    input: localized.input,
    output: localized.output,
    emptyResult: localized.emptyResult,
    characters: localized.characters,
    report: localized.report,
    live: localized.live,
    updating: localized.updating,
    copy: localized.copy,
    copied: localized.copied,
    download: localized.download,
    share: localized.share,
    shareCopied: localized.shareCopied,
    embed: localized.embed,
    embedCopied: localized.embedCopied,
    downloadImage: localized.downloadImage,
    free: localized.free,
    noSignup: localized.noSignup,
    private: localized.private,
  } : undefined;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      url: pageUrl,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
      description: tool.description,
      browserRequirements: "Requires JavaScript",
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: localized?.allTools ?? "Home", item: `${siteUrl}${localizedPath(locale)}` },
        { "@type": "ListItem", position: 2, name: tool.name, item: pageUrl },
      ],
    },
  ];

  if (embed) {
    return (
      <main className="embed-page">
        <SiteHeader compact locale={locale} />
        <ToolWorkspace tool={tool} initialInput={initialInput} initialSettings={initialSettings} locale={locale} labels={workspaceLabels} publicPath={publicPath} />
        <a className="embed-backlink" href={pageUrl} target="_blank">Fix My Formatting: {tool.name} →</a>
      </main>
    );
  }

  return (
    <>
      <EmbedMode />
      <SiteHeader locale={locale} currentPath={tool.slug} />
      <main className="tool-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><a href={localizedPath(locale)}>{localized?.allTools ?? "Home"}</a><span>/</span><span>{tool.name}</span></nav>
        {shared && <div className="made-with">Made with Fix My Formatting <a href={publicPath}>Create your own →</a></div>}
        <header className="tool-title">
          <h1>{tool.name}</h1>
          <p>{tool.description}</p>
        </header>
        <ToolWorkspace tool={tool} initialInput={initialInput} initialSettings={initialSettings} locale={locale} labels={workspaceLabels} publicPath={publicPath} />
        <a className="runtime-embed-backlink" href={pageUrl} target="_blank">Fix My Formatting: {tool.name} →</a>
        <article className="tool-content">
          <section>
            <h2>{localized ? `${localized.howTo} ${tool.name}` : `How to use ${tool.name}`}</h2>
            <p>{tool.intro}</p>
            <ol>
              <li>{localized?.stepCopy ?? "Copy the text or table you want to fix."}</li>
              <li>{localized?.stepPaste ?? "Paste it into the input above. The result updates instantly."}</li>
              <li>{localized?.stepFinish ?? "Copy, download, share, or embed the finished result."}</li>
            </ol>
          </section>
          <section>
            <h2>{localized?.faqTitle ?? "Frequently asked questions"}</h2>
            <div className="faq-list">
              {tool.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section>
            <h2>{localized?.relatedTools ?? "Related tools"}</h2>
            <div className="related-grid">
              {related.map((candidate) => (
                <a href={localizedPath(locale, candidate.slug)} key={candidate.slug}>
                  <strong>{candidate.name}</strong>
                  <span>{candidate.description}</span>
                </a>
              ))}
            </div>
          </section>
          {toolGuides.length > 0 && (
            <section>
              <h2>Guides</h2>
              <div className="related-grid">
                {toolGuides.map((guide) => (
                  <a href={guidePath(guide.slug)} key={guide.slug}>
                    <strong>{guide.h1}</strong>
                    <span>{guide.description}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        ))}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
