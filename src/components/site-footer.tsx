import { coreTools } from "@/lib/tools";
import { categoryLabel, localizedPath, localizeTool, messages, toolSlugsForLocale } from "@/lib/i18n";
import type { LocaleCode, SiteLocale } from "@/lib/i18n";

export function SiteFooter({ locale = "en" }: { locale?: SiteLocale }) {
  const localized = locale === "en" ? null : messages[locale as LocaleCode];
  // Core tools only. Brand variants would multiply the footer ~4.7x on every
  // localized page once coverage is complete; English lists coreTools too.
  const tools = locale === "en"
    ? coreTools
    : toolSlugsForLocale(locale as LocaleCode)
        .filter((slug) => coreTools.some((tool) => tool.slug === slug))
        .map((slug) => localizeTool(slug, locale as LocaleCode));
  const categories = [...new Set(tools.map((tool) => tool.category))];
  return (
    <footer className="site-footer">
      <div className="footer-tools">
        {categories.map((category) => (
          <section key={category}>
            <h2>{localized ? categoryLabel(category, localized) : category}</h2>
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
          {locale === "en"
            ? <><a href="/guides">Guides</a><a href="/about">About</a><a href="/privacy">Privacy</a></>
            : <><a href={localizedPath(locale)}>{localized?.allTools ?? "All tools"}</a><a href="/privacy" hrefLang="en">Privacy</a></>}
        </nav>
      </div>
    </footer>
  );
}
