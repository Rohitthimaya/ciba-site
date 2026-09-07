import { requireStaff } from "@/lib/auth";
import SettingsManager from "@/components/SettingsManager";

export default async function SettingsPage() {
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;
  const { data } = await supabase.from("site_settings").select("*");
  const map = Object.fromEntries((data || []).map((r) => [r.key, r.value]));
  return <SettingsManager initial={map} profile={profile} />;
}
