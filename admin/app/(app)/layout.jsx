import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import { requireStaff } from "@/lib/auth";

export default async function AppLayout({ children }) {
  const { allowed, profile } = await requireStaff();
  if (!allowed) {
    redirect("/login?error=unauthorized");
  }

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
