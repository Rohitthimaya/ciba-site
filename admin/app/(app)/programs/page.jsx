import { requireStaff } from "@/lib/auth";
import ProgramsManager from "@/components/ProgramsManager";

export default async function ProgramsPage() {
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;
  const [{ data: programs }, { data: workshops }] = await Promise.all([
    supabase.from("programs").select("*").order("sort_order"),
    supabase.from("workshops").select("*").order("sort_order"),
  ]);
  return (
    <ProgramsManager
      initialPrograms={programs || []}
      initialWorkshops={workshops || []}
      profile={profile}
    />
  );
}
