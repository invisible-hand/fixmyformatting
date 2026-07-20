import Link from "next/link";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={compact ? "site-header compact-header" : "site-header"}>
      <Link className="brand" href="/" aria-label="Fix My Formatting home">
        <span className="brand-mark" aria-hidden="true">F</span>
        <span>Fix My Formatting</span>
      </Link>
      {!compact && (
        <nav aria-label="Primary navigation">
          <Link href="/#tools">All tools</Link>
          <Link href="/about">About</Link>
        </nav>
      )}
    </header>
  );
}
