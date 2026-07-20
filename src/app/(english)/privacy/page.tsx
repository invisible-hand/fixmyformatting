import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: { absolute: "Privacy | Fix My Formatting" },
  description: "Privacy details for Fix My Formatting browser tools and optional share links.",
  alternates: { canonical: "https://fixmyformatting.com/privacy" },
  openGraph: {
    title: "Privacy | Fix My Formatting",
    description: "Privacy details for browser processing and optional share links.",
    url: "https://fixmyformatting.com/privacy",
    type: "website",
    images: [{ url: "https://fixmyformatting.com/api/site-og", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["https://fixmyformatting.com/api/site-og"] },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="tool-page tool-content">
        <header className="tool-title"><h1>Privacy</h1><p>Short version: tool input stays in your browser unless you create a share link.</p></header>
        <section>
          <h2>Browser processing</h2>
          <p>Conversions and analysis run locally on your device. Ordinary tool input is not sent to our servers.</p>
          <h2>Share links</h2>
          <p>When you select “Copy link to result,” the input, selected tool, and settings are stored so the link can be opened. Do not share sensitive or personal information. Shared results expire after 180 days by default.</p>
          <h2>Analytics</h2>
          <p>We collect aggregate page and interaction counts to understand which tools are useful. We do not sell personal information.</p>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://fixmyformatting.com" },
            { "@type": "ListItem", position: 2, name: "Privacy", item: "https://fixmyformatting.com/privacy" },
          ],
        }) }} />
      </main>
      <SiteFooter />
    </>
  );
}
