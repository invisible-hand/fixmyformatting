import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedHome } from "@/components/localized-home";
import { StaticPage } from "@/components/static-page";
import { ToolPage } from "@/components/tool-page";
import {
  bundles,
  isLocale,
  isToolLocalized,
  languageAlternates,
  localizedPath,
  localizeTool,
  toolSlugsForLocale,
  uiFor,
} from "@/lib/i18n";
import type { LocaleCode } from "@/lib/i18n";
import { siteUrl } from "@/lib/schema";

export const dynamicParams = false;

/** Path segments that are pages in their own right, never tool slugs. */
const STATIC_PAGES = ["about", "privacy"] as const;
type StaticPageKey = (typeof STATIC_PAGES)[number];

const isStaticPage = (value: string): value is StaticPageKey =>
  (STATIC_PAGES as readonly string[]).includes(value);

/** Next passes the parent segment's params through as plain (non-Promise) values. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  return [
    { slug: [] },
    ...toolSlugsForLocale(params.locale).map((slug) => ({ slug: [slug] })),
    ...STATIC_PAGES.map((page) => ({ slug: [page] })),
  ];
}

/** Resolves a public path to the thing that should render, or null for a 404. */
function route(locale: LocaleCode, segments: string[]) {
  if (segments.length === 0) return { kind: "home" as const };
  if (segments.length === 1) {
    const [first] = segments;
    if (isStaticPage(first)) return { kind: "static" as const, page: first };
    if (isToolLocalized(first, locale)) return { kind: "tool" as const, slug: first };
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug: segments = [] } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam;
  const target = route(locale, segments);
  if (!target) return {};

  const path = segments.join("/");
  const canonical = `${siteUrl}${localizedPath(locale, path)}`;
  const alternates = { canonical, languages: languageAlternates(path) };

  if (target.kind === "home") {
    const t = uiFor(locale);
    return {
      title: { absolute: t.homeMetaTitle },
      description: t.homeDescription.slice(0, 155),
      alternates,
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

  if (target.kind === "static") {
    const copy = bundles[locale].pages[target.page];
    return {
      title: { absolute: copy.metaTitle },
      description: copy.description,
      alternates,
      robots: { index: true, follow: true },
      openGraph: {
        title: copy.metaTitle,
        description: copy.description,
        url: canonical,
        type: "website",
        images: [{ url: `${siteUrl}/api/site-og?locale=${locale}`, width: 1200, height: 630 }],
      },
      twitter: { card: "summary_large_image", images: [`${siteUrl}/api/site-og?locale=${locale}`] },
    };
  }

  const tool = localizeTool(target.slug, locale);
  return {
    title: { absolute: tool.title },
    description: tool.description,
    alternates,
    robots: { index: true, follow: true },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: canonical,
      type: "website",
      images: [{ url: `${siteUrl}/api/tool-og/${target.slug}?locale=${locale}`, width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      images: [`${siteUrl}/api/tool-og/${target.slug}?locale=${locale}`],
    },
  };
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale: localeParam, slug: segments = [] } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam;
  const target = route(locale, segments);
  if (!target) notFound();

  if (target.kind === "home") return <LocalizedHome locale={locale} />;
  if (target.kind === "static") {
    return <StaticPage copy={bundles[locale].pages[target.page]} path={target.page} locale={locale} />;
  }
  return <ToolPage tool={localizeTool(target.slug, locale)} locale={locale} />;
}
