import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPage } from "@/components/tool-page";
import { allTools, getTool } from "@/lib/tools";
import { isLocalizedToolSlug, languageAlternates } from "@/lib/i18n";

const siteUrl = "https://fixmyformatting.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return allTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const canonical = `${siteUrl}/${slug}`;
  return {
    title: { absolute: tool.title.slice(0, 60) },
    description: tool.description.slice(0, 155),
    alternates: {
      canonical,
      languages: isLocalizedToolSlug(slug)
        ? languageAlternates(slug)
        : { en: canonical, "x-default": canonical },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: canonical,
      type: "website",
      images: [{ url: `${siteUrl}/api/tool-og/${slug}`, width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      images: [`${siteUrl}/api/tool-og/${slug}`],
    },
  };
}

export default async function DynamicToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return <ToolPage tool={tool} />;
}
