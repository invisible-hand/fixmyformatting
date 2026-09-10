import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { DeslopError, deslopMaxChars, deslopModel, deslopStats, runDeslop } from "@/lib/deslop";

/**
 * POST /api/de-slop  { input: string }  →  { output, stats, model }
 *
 * Every call costs money, so the limits are layered and every one of them
 * lives in Redis: a per-visitor hourly and daily allowance, a site-wide daily
 * request cap, and a site-wide monthly spend cap fed by the token counts the
 * API reports. If Redis is unreachable the tool refuses rather than running
 * unmetered. All numbers are overridable from the environment without a deploy.
 */

export const maxDuration = 60;

const limits = {
  perHour: Number(process.env.DESLOP_PER_HOUR ?? 10),
  perDay: Number(process.env.DESLOP_PER_DAY ?? 20),
  siteDaily: Number(process.env.DESLOP_SITE_DAILY ?? 150),
  monthlyBudgetCents: Math.round(Number(process.env.DESLOP_MONTHLY_BUDGET_USD ?? 15) * 100),
};

const limitMessage = "Limit reached. This tool costs money per run, so it allows a few runs per hour. Try again later.";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const input = body && typeof body === "object" && typeof (body as { input?: unknown }).input === "string"
    ? (body as { input: string }).input
    : "";
  if (!input.trim()) return NextResponse.json({ error: "Paste some text first" }, { status: 400 });
  if (input.length > deslopMaxChars) {
    return NextResponse.json({ error: `Text is over the ${deslopMaxChars.toLocaleString("en-US")} character limit` }, { status: 413 });
  }

  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "De-slop is temporarily unavailable" }, { status: 503 });

  const now = new Date();
  const hour = Math.floor(now.getTime() / 3_600_000);
  const day = now.toISOString().slice(0, 10);
  const month = day.slice(0, 7);
  const visitor = await visitorHash(request);
  const keys = {
    hour: `deslop:v:${visitor}:h:${hour}`,
    day: `deslop:v:${visitor}:d:${day}`,
    siteDay: `deslop:site:d:${day}`,
    spend: `deslop:spend:m:${month}`,
  };

  // Spend is checked before the counters are touched so an exhausted budget
  // does not burn a visitor's allowance for the day. A Redis failure refuses
  // the run: unmetered calls are the one outcome the limits exist to prevent.
  try {
    const spent = Number((await redis.get<number>(keys.spend)) ?? 0);
    if (spent >= limits.monthlyBudgetCents) {
      return NextResponse.json({ error: "This month's budget for the tool is used up. It resets on the 1st." }, { status: 429, headers: { "retry-after": "86400" } });
    }

    const [hourCount, dayCount, siteCount] = await Promise.all([
      redis.incr(keys.hour),
      redis.incr(keys.day),
      redis.incr(keys.siteDay),
    ]);
    await Promise.all([
      hourCount === 1 ? redis.expire(keys.hour, 3_600) : null,
      dayCount === 1 ? redis.expire(keys.day, 86_400) : null,
      siteCount === 1 ? redis.expire(keys.siteDay, 86_400) : null,
    ]);
    if (hourCount > limits.perHour || dayCount > limits.perDay) {
      return NextResponse.json({ error: limitMessage }, { status: 429, headers: { "retry-after": hourCount > limits.perHour ? "3600" : "86400" } });
    }
    if (siteCount > limits.siteDaily) {
      return NextResponse.json({ error: "Today's site-wide allowance for this tool is used up. It resets at midnight UTC." }, { status: 429, headers: { "retry-after": "3600" } });
    }
  } catch (error) {
    console.error("de-slop: rate-limit store unavailable", error);
    return NextResponse.json({ error: "De-slop is temporarily unavailable" }, { status: 503 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 50_000);
  try {
    const { output, usage } = await runDeslop(input, controller.signal);
    // Record spend after the fact from the real token counts; a 40-day TTL
    // keeps the key alive past the end of the month it names.
    await redis.incrby(keys.spend, usage.costCents).then(() => redis.expire(keys.spend, 40 * 86_400)).catch((error) => console.error("de-slop: spend not recorded", error));
    return NextResponse.json(
      { output, stats: deslopStats(input, output), model: deslopModel, unchanged: output === input.trim() },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof DeslopError) return NextResponse.json({ error: error.message }, { status: error.status });
    const aborted = error instanceof Error && error.name === "AbortError";
    if (!aborted) console.error("de-slop:", error);
    return NextResponse.json({ error: aborted ? "The model took too long. Try a shorter text." : "Could not de-slop the text. Try again in a moment." }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}

async function visitorHash(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const salt = process.env.SHARE_HASH_SALT ?? "fixmyformatting";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${forwarded}`));
  return [...new Uint8Array(digest)].slice(0, 16).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
