import Link from "next/link";
import { coreTools } from "@/lib/tools";

export function SiteFooter() {
  const categories = [...new Set(coreTools.map((tool) => tool.category))];
  return (
    <footer className="site-footer">
      <div className="footer-tools">
        {categories.map((category) => (
          <section key={category}>
            <h2>{category}</h2>
            <ul>
              {coreTools.filter((tool) => tool.category === category).map((tool) => (
                <li key={tool.slug}><Link href={`/${tool.slug}`}>{tool.name}</Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} fixmyformatting.com</span>
        <nav aria-label="Legal"><Link href="/about">About</Link><Link href="/privacy">Privacy</Link></nav>
      </div>
    </footer>
  );
}
