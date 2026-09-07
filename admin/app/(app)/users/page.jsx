import { requireStaff } from "@/lib/auth";
import { redirect } from "next/navigation";
import { canManageUsers } from "@/lib/roles";
import UsersManager from "@/components/UsersManager";

export default async function UsersPage() {
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;
  if (!canManageUsers(profile.role)) redirect("/?error=forbidden");

  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  return <UsersManager initialUsers={users || []} profile={profile} />;
}
