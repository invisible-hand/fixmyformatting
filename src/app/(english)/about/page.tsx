import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: { absolute: "About Fix My Formatting" },
  description: "Why Fix My Formatting builds free, private browser-based text tools.",
  alternates: { canonical: "https://fixmyformatting.com/about" },
  openGraph: {
    title: "About Fix My Formatting",
    description: "Why we build free, private browser-based text tools.",
    url: "https://fixmyformatting.com/about",
    type: "website",
    images: [{ url: "https://fixmyformatting.com/api/site-og", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["https://fixmyformatting.com/api/site-og"] },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="tool-page tool-content">
        <header className="tool-title"><h1>About Fix My Formatting</h1></header>
        <section>
          <p>Fix My Formatting makes the small, annoying problems between AI chat and the rest of your work disappear. Every tool is free, opens instantly, and processes text in your browser.</p>
          <p>There are no accounts, paywalls, or uploads during normal conversion. If you choose to create a share link, that action explicitly stores the text so the link can work.</p>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://fixmyformatting.com" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://fixmyformatting.com/about" },
          ],
        }) }} />
      </main>
      <SiteFooter />
    </>
  );
}
