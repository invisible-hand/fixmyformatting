import { ImageResponse } from "next/og";
import { getTool } from "@/lib/tools";

export const runtime = "edge";

export function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const tool = getTool(slug);
    if (!tool) return new Response("Not found", { status: 404 });
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f6f7f5", color: "#17201a", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, fontWeight: 700 }}>
          <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, color: "white", background: "#176b45" }}>F</div>
          Fix My Formatting
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ color: "#176b45", fontSize: 24, fontWeight: 700 }}>FREE ONLINE TOOL</div>
          <div style={{ marginTop: 15, fontSize: 72, lineHeight: 1.02, fontWeight: 800, letterSpacing: -4 }}>{tool.name}</div>
          <div style={{ marginTop: 24, color: "#637067", fontSize: 28 }}>{tool.description}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#637067", fontSize: 22 }}>
          <span>Instant · Private · No signup</span><span>fixmyformatting.com</span>
        </div>
      </div>,
      { width: 1200, height: 630 },
    );
  });
}
