import { createClient } from "@/lib/supabase/server";
import { canAccessAdmin } from "@/lib/roles";

export async function requireSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null, supabase };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return { user, profile, supabase };
}

export async function requireStaff() {
  const ctx = await requireSession();
  if (!ctx.user || !canAccessAdmin(ctx.profile?.role, ctx.profile?.active)) {
    return { ...ctx, allowed: false };
  }
  return { ...ctx, allowed: true };
}
