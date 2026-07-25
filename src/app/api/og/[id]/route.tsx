import { ImageResponse } from "next/og";
import { fontsForLocale, ogLocale } from "@/lib/og-fonts";
import { getShare } from "@/lib/shares";
import { getTool } from "@/lib/tools";
import { bundles, isLocale, isLocalizedToolSlug, localizeTool, messages } from "@/lib/i18n";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const share = await getShare(id);
  const locale = ogLocale(share && typeof share.settings.locale === "string" && isLocale(share.settings.locale) ? share.settings.locale : null);
  const tool = share
    ? locale && isLocalizedToolSlug(share.tool) ? localizeTool(share.tool, locale) : getTool(share.tool)
    : null;
  if (!share || !tool) return new Response("Not found", { status: 404 });
  const statCopy = locale ? bundles[locale].stats : null;
  const label = (value: string) => statCopy?.labels[value] ?? value;
  const stats = share.stat.slice(0, 4);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, background: "#f6f7f5", color: "#17201a", fontFamily: "Site" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, fontWeight: 700 }}>
        <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, color: "white", background: "#176b45" }}>F</div>
        Fix My Formatting
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ color: "#176b45", fontSize: 24, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>{locale ? messages[locale].share : "Shared result"}</div>
        <div style={{ marginTop: 14, fontSize: 66, lineHeight: 1.05, fontWeight: 700, letterSpacing: -3 }}>{tool.name}</div>
        <div style={{ display: "flex", gap: 18, marginTop: 42 }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ minWidth: 200, display: "flex", flexDirection: "column", padding: "22px 26px", borderRadius: 14, background: "#e0f2e8" }}>
              <span style={{ color: "#0d4d30", fontSize: 40, fontWeight: 700 }}>{stat.value}</span>
              <span style={{ marginTop: 4, color: "#637067", fontSize: 18 }}>{label(stat.label)}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#637067", fontSize: 22 }}>
        <span>{locale ? `${messages[locale].free} · ${messages[locale].noSignup}` : "Free · No signup · Private by default"}</span>
        <span>fixmyformatting.com</span>
      </div>
    </div>,
    { width: 1200, height: 630, fonts: fontsForLocale(locale), headers: { "cache-control": "public, max-age=86400, s-maxage=604800" } },
  );
}
