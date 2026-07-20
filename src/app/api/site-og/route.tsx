import { ImageResponse } from "next/og";
import { isLocale, messages } from "@/lib/i18n";

export const runtime = "edge";

export function GET(request: Request) {
  const localeParam = new URL(request.url).searchParams.get("locale");
  const locale = localeParam && isLocale(localeParam) ? localeParam : null;
  const title = locale ? messages[locale].homeTitle : "Fix text copied from AI.";
  const description = locale
    ? messages[locale].homeDescription
    : "Free, fast, private tools for Markdown, AI text cleanup, tables, JSON, prompts, and documents.";
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f6f7f5", color: "#17201a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, fontWeight: 700 }}>
        <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, color: "white", background: "#176b45" }}>F</div>
        Fix My Formatting
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1040 }}>
        <div style={{ color: "#176b45", fontSize: 24, fontWeight: 700 }}>{locale ? messages[locale].homeEyebrow : "26 FREE BROWSER TOOLS"}</div>
        <div style={{ marginTop: 15, fontSize: 72, lineHeight: 1.02, fontWeight: 800, letterSpacing: -4 }}>{title}</div>
        <div style={{ marginTop: 24, color: "#637067", fontSize: 27 }}>{description}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#637067", fontSize: 22 }}>
        <span>{locale ? `${messages[locale].free} · ${messages[locale].noSignup}` : "Instant · Private · No signup"}</span>
        <span>fixmyformatting.com</span>
      </div>
    </div>,
    { width: 1200, height: 630, headers: { "cache-control": "public, max-age=86400, s-maxage=604800" } },
  );
}
