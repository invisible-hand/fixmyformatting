import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allGuides, clusterLabels, clusterOrder, guidePath, guidesInCluster } from "@/lib/guides";
import { breadcrumbSchema, serializeSchema, siteUrl } from "@/lib/schema";

const title = "Guides — Fixing AI Text Formatting";
const description = "Plain-English guides to em dashes, invisible characters, Markdown symbols, and the other formatting quirks of AI-generated text.";
const canonical = `${siteUrl}${guidePath()}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical, languages: { en: canonical, "x-default": canonical } },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
    images: [{ url: `${siteUrl}/api/site-og`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [`${siteUrl}/api/site-og`] },
};

export default function GuidesIndex() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: canonical,
      inLanguage: "en",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: allGuides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.h1,
          url: `${siteUrl}${guidePath(guide.slug)}`,
        })),
      },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Guides", path: guidePath() },
    ]),
  ];

  return (
    <>
      <SiteHeader />
      <main className="tool-page guide-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a><span>/</span><span>Guides</span>
        </nav>
        <header className="tool-title">
          <h1>Guides</h1>
          <p>Why AI text arrives broken, and how to fix it. Every guide ends with a tool that does the work in one click.</p>
        </header>
        <div className="tool-content">
          {clusterOrder.map((cluster) => (
            <section key={cluster}>
              <h2>{clusterLabels[cluster]}</h2>
              <div className="related-grid">
                {guidesInCluster(cluster).map((guide) => (
                  <a href={guidePath(guide.slug)} key={guide.slug}>
                    <strong>{guide.h1}</strong>
                    <span>{guide.description}</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
