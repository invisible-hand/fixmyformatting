import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedHome } from "@/components/localized-home";
import { ToolPage } from "@/components/tool-page";
import {
  isLocale,
  isLocalizedToolSlug,
  languageAlternates,
  localizedPath,
  toolSlugsForLocale,
  localizeTool,
  messages,
} from "@/lib/i18n";

const siteUrl = "https://fixmyformatting.com";

export const dynamicParams = false;

/** Next passes the parent segment's params through as plain (non-Promise) values. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  return [{ slug: [] }, ...toolSlugsForLocale(params.locale).map((slug) => ({ slug: [slug] }))];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug: segments = [] } = await params;
  if (!isLocale(localeParam) || segments.length > 1) return {};
  const locale = localeParam;
  const slug = segments[0];
  const canonical = `${siteUrl}${localizedPath(locale, slug)}`;
  if (!slug) {
    const t = messages[locale];
    return {
      title: { absolute: t.homeMetaTitle },
      description: t.homeDescription.slice(0, 155),
      alternates: { canonical, languages: languageAlternates() },
      openGraph: {
        title: t.homeMetaTitle,
        description: t.homeDescription,
        url: canonical,
        type: "website",
        images: [{ url: `${siteUrl}/api/site-og?locale=${locale}`, width: 1200, height: 630, alt: t.homeTitle }],
      },
      twitter: { card: "summary_large_image", images: [`${siteUrl}/api/site-og?locale=${locale}`] },
    };
  }
  if (!isLocalizedToolSlug(slug)) return {};
  const tool = localizeTool(slug, locale);
  return {
    title: { absolute: tool.title.slice(0, 60) },
    description: tool.description.slice(0, 155),
    alternates: { canonical, languages: languageAlternates(slug) },
    robots: { index: true, follow: true },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: canonical,
      type: "website",
      images: [{ url: `${siteUrl}/api/tool-og/${slug}?locale=${locale}`, width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      images: [`${siteUrl}/api/tool-og/${slug}?locale=${locale}`],
    },
  };
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale: localeParam, slug: segments = [] } = await params;
  if (!isLocale(localeParam) || segments.length > 1) notFound();
  if (segments.length === 0) return <LocalizedHome locale={localeParam} />;
  const slug = segments[0];
  if (!isLocalizedToolSlug(slug)) notFound();
  return <ToolPage tool={localizeTool(slug, localeParam)} locale={localeParam} />;
}
