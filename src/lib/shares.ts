import { getSupabase } from "./supabase";

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
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("get_share", { share_id: id });
  if (error || !Array.isArray(data) || data.length === 0) return null;
  return data[0] as ShareRecord;
}
