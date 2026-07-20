import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPage } from "@/components/tool-page";
import { getShare } from "@/lib/shares";
import { getTool } from "@/lib/tools";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const share = await getShare(id);
  const tool = share ? getTool(share.tool) : null;
  if (!share || !tool) return { title: "Shared result", robots: { index: false, follow: true } };
  const leadingStat = share.stat[0];
  const statText = leadingStat ? `${leadingStat.value} ${leadingStat.label.toLowerCase()}` : "Shared result";
  return {
    title: `${tool.name}: ${statText}`,
    description: `A shared ${tool.name} result made with Fix My Formatting.`,
    robots: { index: false, follow: true },
    openGraph: {
      title: `${tool.name}: ${statText}`,
      description: "View this result or create your own for free.",
      images: [{ url: `https://fixmyformatting.com/api/og/${id}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function SharedResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const share = await getShare(id);
  const tool = share ? getTool(share.tool) : null;
  if (!share || !tool) notFound();
  return <ToolPage tool={tool} initialInput={share.input} shared />;
}
