import { guidesNav, isLocalizedToolSlug, localeCodes, localizedPath, messages } from "@/lib/i18n";
import type { SiteLocale } from "@/lib/i18n";

export function SiteHeader({ compact = false, locale = "en", currentPath = "" }: { compact?: boolean; locale?: SiteLocale; currentPath?: string }) {
  const localized = locale === "en" ? null : messages[locale];
  const alternatePath = isLocalizedToolSlug(currentPath) ? currentPath : "";
  const guides = guidesNav(locale);
  return (
    <header className={compact ? "site-header compact-header" : "site-header"}>
      <a className="brand" href={localizedPath(locale)} aria-label="Fix My Formatting home">
        <span className="brand-mark" aria-hidden="true">F</span>
        <span>Fix My Formatting</span>
      </a>
      {!compact && (
        <nav aria-label="Primary navigation">
          <a href={`${localizedPath(locale)}#tools`}>{localized?.allTools ?? "All tools"}</a>
          {guides && <a href={guides.href}>{guides.label}</a>}
          <a className="nav-secondary" href={localizedPath(locale, "about")}>{localized?.about ?? "About"}</a>
          <details className="language-menu">
            <summary>{locale === "en" ? "English" : messages[locale].languageName}</summary>
            <div>
              <a href={localizedPath("en", alternatePath)} hrefLang="en">English</a>
              {localeCodes.map((code) => <a href={localizedPath(code, alternatePath)} hrefLang={code} lang={code} key={code}>{messages[code].languageName}</a>)}
            </div>
          </details>
        </nav>
      )}
    </header>
  );
}
