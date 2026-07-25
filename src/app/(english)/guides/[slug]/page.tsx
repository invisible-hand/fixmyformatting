import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/guide-page";
import { allGuides, getGuide, guidePath } from "@/lib/guides";
import { siteUrl } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return allGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const canonical = `${siteUrl}${guidePath(slug)}`;
  const image = `${siteUrl}/api/guide-og/${slug}`;
  return {
    title: { absolute: guide.title.slice(0, 60) },
    description: guide.description.slice(0, 155),
    alternates: { canonical, languages: { en: canonical, "x-default": canonical } },
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

export default async function Guide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}
