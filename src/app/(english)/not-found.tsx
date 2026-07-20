import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { coreTools } from "@/lib/tools";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="tool-page">
        <header className="tool-title">
          <h1>Page not found</h1>
          <p>Try one of these free formatting tools instead.</p>
        </header>
        <div className="related-grid">
          {coreTools.map((tool) => <a href={`/${tool.slug}`} key={tool.slug}><strong>{tool.name}</strong><span>{tool.description}</span></a>)}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
