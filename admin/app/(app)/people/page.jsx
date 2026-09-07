import { requireStaff } from "@/lib/auth";
import PeopleManager from "@/components/PeopleManager";

export default async function PeoplePage() {
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;
  const { data } = await supabase.from("people").select("*").order("sort_order");
  return <PeopleManager initial={data || []} profile={profile} />;
}
