import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools";
import { coreTools } from "@/lib/tools";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ToolWorkspace } from "./tool-workspace";
import { EmbedMode } from "./embed-mode";

const siteUrl = "https://fixmyformatting.com";

export function ToolPage({
  tool,
  initialInput,
  shared = false,
  embed = false,
}: {
  tool: ToolDefinition;
  initialInput?: string;
  shared?: boolean;
  embed?: boolean;
}) {
  const related = coreTools
    .filter((candidate) => candidate.category === tool.category && candidate.slug !== tool.slug)
    .slice(0, 6);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      url: `${siteUrl}/${tool.slug}`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
      description: tool.description,
      browserRequirements: "Requires JavaScript",
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
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: tool.name, item: `${siteUrl}/${tool.slug}` },
      ],
    },
  ];

  if (embed) {
    return (
      <main className="embed-page">
        <SiteHeader compact />
        <ToolWorkspace tool={tool} initialInput={initialInput} />
        <a className="embed-backlink" href={`${siteUrl}/${tool.slug}`} target="_blank">Open full {tool.name} at Fix My Formatting →</a>
      </main>
    );
  }

  return (
    <>
      <EmbedMode />
      <SiteHeader />
      <main className="tool-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{tool.name}</span></nav>
        {shared && <div className="made-with">Made with Fix My Formatting <Link href={`/${tool.slug}`}>Create your own →</Link></div>}
        <header className="tool-title">
          <h1>{tool.name}</h1>
          <p>{tool.description}</p>
        </header>
        <ToolWorkspace tool={tool} initialInput={initialInput} />
        <a className="runtime-embed-backlink" href={`${siteUrl}/${tool.slug}`} target="_blank">Open full {tool.name} at Fix My Formatting →</a>
        <article className="tool-content">
          <section>
            <h2>How to use {tool.name}</h2>
            <p>{tool.intro}</p>
            <ol>
              <li>Copy the text or table you want to fix.</li>
              <li>Paste it into the input above. The result updates instantly.</li>
              <li>Copy, download, share, or embed the finished result.</li>
            </ol>
          </section>
          <section>
            <h2>Frequently asked questions</h2>
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
            <h2>Related tools</h2>
            <div className="related-grid">
              {related.map((candidate) => (
                <Link href={`/${candidate.slug}`} key={candidate.slug}>
                  <strong>{candidate.name}</strong>
                  <span>{candidate.description}</span>
                </Link>
              ))}
            </div>
          </section>
        </article>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
