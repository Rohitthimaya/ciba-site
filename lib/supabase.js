import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "@/lib/supabaseEnv";

export { isSupabaseConfigured };

export function createPublicClient() {
  if (!isSupabaseConfigured()) return null;
  return createClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function mediaPublicUrl(path) {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  // Static files under public/images are site assets, not Storage objects.
  if (path.startsWith("images/")) return null;
  const base = getSupabaseUrl();
  if (!base) return `/${path}`;
  return `${base}/storage/v1/object/public/media/${path}`;
}
