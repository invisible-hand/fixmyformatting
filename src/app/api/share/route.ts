import { NextResponse } from "next/server";
import { getTool } from "@/lib/tools";
import { processText } from "@/lib/processors";
import { getRedis } from "@/lib/redis";
import type { ShareRecord } from "@/lib/shares";

export const runtime = "edge";

const maxBytes = 500 * 1024;
const shareTtlSeconds = 180 * 24 * 60 * 60;

export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "Sharing is not configured yet" }, { status: 503 });

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
  const hour = Math.floor(Date.now() / 3_600_000);
  const rateKey = `share-rate:${ipHash}:${hour}`;
  const requestCount = await redis.incr(rateKey);
  if (requestCount === 1) await redis.expire(rateKey, 3_600);
  if (requestCount > 30) {
    return NextResponse.json({ error: "Share limit reached. Try again in an hour." }, { status: 429 });
  }

  const stat = processText(data.tool, data.input).stats;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const id = randomId();
    const share: ShareRecord = {
      id,
      tool: data.tool,
      input: data.input,
      settings: settings as Record<string, unknown>,
      stat,
      created_at: new Date().toISOString(),
    };
    const stored = await redis.set(`share:${id}`, share, { ex: shareTtlSeconds, nx: true });
    if (stored) {
      await redis.hincrby("tool:share-counts", data.tool, 1);
      return NextResponse.json({ id }, { status: 201, headers: { "cache-control": "no-store" } });
    }
  }
  return NextResponse.json({ error: "Could not create share" }, { status: 500 });
}

function randomId() {
  const alphabet = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return [...bytes].map((byte) => alphabet[byte % alphabet.length]).join("");
}
