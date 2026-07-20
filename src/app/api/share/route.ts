import { NextResponse } from "next/server";
import { getTool } from "@/lib/tools";
import { processText } from "@/lib/processors";
import { getSupabase } from "@/lib/supabase";

export const runtime = "edge";

const maxBytes = 500 * 1024;

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Sharing is not configured yet" }, { status: 503 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const data = body as Record<string, unknown>;
  if (typeof data.tool !== "string" || !getTool(data.tool)) return NextResponse.json({ error: "Unknown tool" }, { status: 400 });
  if (typeof data.input !== "string" || !data.input) return NextResponse.json({ error: "Input is required" }, { status: 400 });
  if (new TextEncoder().encode(data.input).byteLength > maxBytes) return NextResponse.json({ error: "Result exceeds the 500 KB share limit" }, { status: 413 });
  const settings = data.settings && typeof data.settings === "object" && !Array.isArray(data.settings) ? data.settings : {};
  if (JSON.stringify(settings).length > 10_000) return NextResponse.json({ error: "Settings are too large" }, { status: 400 });

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const salt = process.env.SHARE_HASH_SALT ?? "fixmyformatting";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${forwarded}`));
  const ipHash = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const id = randomId();
  const stat = processText(data.tool, data.input).stats;
  const { error } = await supabase.rpc("create_share", {
    share_id: id,
    share_tool: data.tool,
    share_input: data.input,
    share_settings: settings,
    share_stat: stat,
    request_ip_hash: ipHash,
  });

  if (error) {
    const rateLimited = error.message.includes("rate_limit_exceeded");
    return NextResponse.json({ error: rateLimited ? "Share limit reached. Try again in an hour." : "Could not create share" }, { status: rateLimited ? 429 : 500 });
  }
  return NextResponse.json({ id }, { status: 201, headers: { "cache-control": "no-store" } });
}

function randomId() {
  const alphabet = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return [...bytes].map((byte) => alphabet[byte % alphabet.length]).join("");
}
