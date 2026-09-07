import { requireStaff } from "@/lib/auth";
import PartnersManager from "@/components/PartnersManager";

export default async function PartnersPage() {
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;
  const { data } = await supabase.from("partners").select("*").order("sort_order");
  return <PartnersManager initial={data || []} profile={profile} />;
}
