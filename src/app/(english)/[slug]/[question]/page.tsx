import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/guide-page";
import { getToolGuide, TOOL_GUIDES, toolGuidePath } from "@/lib/tool-guides";
import { languageAlternates } from "@/lib/i18n";
import { siteUrl } from "@/lib/schema";

/** Tool sub-guides: /<parentTool>/<question>. Only registered guides are built. */
export const dynamicParams = false;

export function generateStaticParams() {
  return TOOL_GUIDES.map((guide) => ({ slug: guide.parentTool, question: guide.slug }));
}

type Params = Promise<{ slug: string; question: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, question } = await params;
  const guide = getToolGuide(slug, question);
  if (!guide) return {};
  const path = toolGuidePath(guide);
  const canonical = `${siteUrl}${path}`;
  const image = `${siteUrl}/api/guide-og/${guide.slug}?tool=${guide.parentTool}`;
  return {
    title: { absolute: guide.title },
    description: guide.description,
    alternates: { canonical, languages: languageAlternates(path.slice(1)) },
    robots: { index: true, follow: true },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonical,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      images: [{ url: image, width: 1200, height: 630, alt: guide.h1 }],
    },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: [image] },
  };
}

export default async function ToolGuideRoute({ params }: { params: Params }) {
  const { slug, question } = await params;
  const guide = getToolGuide(slug, question);
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}
