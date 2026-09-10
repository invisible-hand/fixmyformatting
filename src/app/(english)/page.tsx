import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { coreTools, getTool } from "@/lib/tools";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: "Free Text Formatting Tools for AI Output" },
  description: "Convert AI output to Word, PDF, Google Docs, or Excel, and strip em dashes, smart quotes, and invisible characters. Free, no signup, runs in your browser.",
  alternates: { canonical: "https://fixmyformatting.com", languages: languageAlternates() },
  openGraph: {
    title: "Free Text Formatting Tools for AI Output",
    description: "Clean and convert text from ChatGPT, Claude, Gemini, and more.",
    url: "https://fixmyformatting.com",
    type: "website",
    images: [{ url: "https://fixmyformatting.com/api/site-og", width: 1200, height: 630, alt: "Fix My Formatting tools" }],
  },
  twitter: { card: "summary_large_image", images: ["https://fixmyformatting.com/api/site-og"] },
};

export default function HomePage() {
  const categories = [...new Set(coreTools.map((tool) => tool.category))];
  const deslop = getTool("de-slop")!;
  const schema = [
    { "@context": "https://schema.org", "@type": "Organization", name: "Fix My Formatting", url: "https://fixmyformatting.com" },
    { "@context": "https://schema.org", "@type": "WebSite", name: "Fix My Formatting", url: "https://fixmyformatting.com", description: "Free browser-based text tools for AI-era copy and formatting problems.", inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://fixmyformatting.com" }] },
  ];
  return (
    <>
      <SiteHeader />
      <main className="home-page">
        <header className="home-intro">
          <span className="eyebrow">{coreTools.length} free browser tools</span>
          <h1>Fix text copied from AI.</h1>
          <p>Convert Markdown, clean ChatGPT formatting, repair tables, inspect hidden characters, and edit the AI out of your prose. Everything except De-slop runs privately in your browser.</p>
          <div className="quick-links">
            <a className="primary-action" href="/de-slop">De-slop AI text</a>
            <a href="/clean-ai-text">Clean AI text</a>
            <a href="/markdown-to-word">Markdown to Word</a>
          </div>
        </header>
        <section className="home-feature" aria-labelledby="feature-title">
          <div className="home-feature-copy">
            <span className="eyebrow">New · AI-powered</span>
            <h2 id="feature-title"><a href="/de-slop">De-slop: remove AI writing patterns</a></h2>
            <p>{deslop.description}</p>
            <p>Edited by a language model against Wikipedia&apos;s <em>Signs of AI writing</em> list. Facts, names, numbers and your voice stay; the em dashes, the padded triads and the sign-off go.</p>
            <a className="primary-action" href="/de-slop">De-slop text →</a>
          </div>
          <figure className="home-feature-sample" aria-label="Before and after example">
            <div>
              <figcaption>Before</figcaption>
              <p>In today’s fast-paced landscape, remote work isn’t just a trend — it’s a fundamental shift, fostering trust, autonomy, and innovation. ✨</p>
            </div>
            <div>
              <figcaption>After</figcaption>
              <p>Remote work is a change in how companies get work done, not a passing trend. It gives people more room to decide how they work.</p>
            </div>
          </figure>
        </section>
        <section id="tools" className="tool-directory">
          {categories.map((category) => (
            <section className="category-section" key={category}>
              <h2>{category}</h2>
              <div className="home-tool-grid">
                {coreTools.filter((tool) => tool.category === category).map((tool) => (
                  <a href={`/${tool.slug}`} key={tool.slug}>
                    <span className="tool-arrow" aria-hidden="true">↗</span>
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </section>
        {schema.map((item, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
