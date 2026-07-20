import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPage } from "@/components/tool-page";
import { getShare } from "@/lib/shares";
import { getTool } from "@/lib/tools";
import { isLocale, isLocalizedToolSlug, localizeTool } from "@/lib/i18n";
import type { SiteLocale } from "@/lib/i18n";
import type { ProcessSettings } from "@/lib/processors";

export const dynamic = "force-dynamic";

function sharedTool(share: Awaited<ReturnType<typeof getShare>>): { tool: NonNullable<ReturnType<typeof getTool>>; locale: SiteLocale } | null {
  if (!share) return null;
  const locale = typeof share.settings.locale === "string" && isLocale(share.settings.locale) ? share.settings.locale : "en";
  const tool = locale !== "en" && isLocalizedToolSlug(share.tool) ? localizeTool(share.tool, locale) : getTool(share.tool);
  return tool ? { tool, locale } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const share = await getShare(id);
  const result = sharedTool(share);
  if (!share || !result) return { title: { absolute: "Shared result" }, robots: { index: false, follow: true } };
  const leadingStat = share.stat[0];
  const statText = leadingStat ? `${leadingStat.value} ${leadingStat.label.toLowerCase()}` : "Shared result";
  return {
    title: { absolute: `${result.tool.name}: ${statText}`.slice(0, 60) },
    description: `A shared ${result.tool.name} result made with Fix My Formatting.`,
    robots: { index: false, follow: true },
    openGraph: {
      title: `${result.tool.name}: ${statText}`,
      description: "View this result or create your own for free.",
      images: [{ url: `https://fixmyformatting.com/api/og/${id}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function SharedResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const share = await getShare(id);
  const result = sharedTool(share);
  if (!share || !result) notFound();
  return <ToolPage tool={result.tool} locale={result.locale} initialInput={share.input} initialSettings={share.settings as ProcessSettings} shared />;
}
