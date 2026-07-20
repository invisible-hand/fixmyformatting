import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description: "Why Fix My Formatting builds free, private browser-based text tools.",
  alternates: { canonical: "https://fixmyformatting.com/about" },
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
      </main>
      <SiteFooter />
    </>
  );
}
