import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "Redis is not configured" }, { status: 503 });

  await redis.ping();
  return NextResponse.json({ ok: true }, { headers: { "cache-control": "no-store" } });
}
