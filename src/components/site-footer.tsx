import { coreTools } from "@/lib/tools";
import { localizedPath, localizedToolSlugs, localizeTool, messages } from "@/lib/i18n";
import type { LocaleCode, SiteLocale } from "@/lib/i18n";

export function SiteFooter({ locale = "en" }: { locale?: SiteLocale }) {
  const localized = locale === "en" ? null : messages[locale as LocaleCode];
  const tools = locale === "en"
    ? coreTools
    : localizedToolSlugs.map((slug) => localizeTool(slug, locale as LocaleCode));
  const categories = [...new Set(tools.map((tool) => tool.category))];
  return (
    <footer className="site-footer">
      <div className="footer-tools">
        {categories.map((category) => (
          <section key={category}>
            <h2>{localized ? (category === "Markdown & documents" ? localized.categories.markdown : localized.categories.cleanup) : category}</h2>
            <ul>
              {tools.filter((tool) => tool.category === category).map((tool) => (
                <li key={tool.slug}><a href={localizedPath(locale, tool.slug)}>{tool.name}</a></li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} fixmyformatting.com</span>
        <nav aria-label="Legal">
          {locale === "en" ? <><a href="/about">About</a><a href="/privacy">Privacy</a></> : <a href="/">{localized?.allTools ?? "All tools"}</a>}
        </nav>
      </div>
    </footer>
  );
}
