import { getRedis } from "./redis";

export type ShareRecord = {
  id: string;
  tool: string;
  input: string;
  settings: Record<string, unknown>;
  stat: { label: string; value: string | number }[];
  created_at: string;
};

export async function getShare(id: string): Promise<ShareRecord | null> {
  if (!/^[a-zA-Z0-9_-]{8}$/.test(id)) return null;
  const redis = getRedis();
  if (!redis) return null;
  return redis.get<ShareRecord>(`share:${id}`);
}
