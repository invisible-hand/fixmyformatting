import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";
import { pages } from "@/content/i18n/en/chrome";
import { languageAlternates } from "@/lib/i18n";
import { siteUrl } from "@/lib/schema";

const copy = pages.about;
const canonical = `${siteUrl}/about`;

export const metadata: Metadata = {
  title: { absolute: copy.metaTitle },
  description: copy.description,
  alternates: { canonical, languages: languageAlternates("about") },
  robots: { index: true, follow: true },
  openGraph: {
    title: copy.metaTitle,
    description: copy.description,
    url: canonical,
    type: "website",
    images: [{ url: `${siteUrl}/api/site-og`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [`${siteUrl}/api/site-og`] },
};

export default function AboutPage() {
  return <StaticPage copy={copy} path="about" />;
}
