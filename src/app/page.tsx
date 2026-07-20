import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { coreTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Text Formatting Tools for AI Output",
  description: "Clean, convert, count, and format text from ChatGPT, Claude, Gemini, and more. Fast, free, and private.",
};

export default function HomePage() {
  const categories = [...new Set(coreTools.map((tool) => tool.category))];
  const schema = [
    { "@context": "https://schema.org", "@type": "Organization", name: "Fix My Formatting", url: "https://fixmyformatting.com" },
    { "@context": "https://schema.org", "@type": "WebSite", name: "Fix My Formatting", url: "https://fixmyformatting.com", description: "Free browser-based text tools for AI-era copy and formatting problems." },
  ];
  return (
    <>
      <SiteHeader />
      <main className="home-page">
        <header className="home-intro">
          <span className="eyebrow">26 free browser tools</span>
          <h1>Fix text copied from AI.</h1>
          <p>Convert Markdown, clean ChatGPT formatting, repair tables, and inspect hidden characters. Everything runs privately in your browser.</p>
          <div className="quick-links">
            <Link className="primary-action" href="/clean-ai-text">Clean AI text</Link>
            <Link href="/markdown-to-word">Markdown to Word</Link>
            <Link href="/remove-invisible-characters">Scan hidden characters</Link>
          </div>
        </header>
        <section id="tools" className="tool-directory">
          {categories.map((category) => (
            <section className="category-section" key={category}>
              <h2>{category}</h2>
              <div className="home-tool-grid">
                {coreTools.filter((tool) => tool.category === category).map((tool) => (
                  <Link href={`/${tool.slug}`} key={tool.slug}>
                    <span className="tool-arrow" aria-hidden="true">↗</span>
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </section>
        {schema.map((item, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
