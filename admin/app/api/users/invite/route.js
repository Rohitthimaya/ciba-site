import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/auth";
import { canManageUsers } from "@/lib/roles";
import { createServiceClient } from "@/lib/supabase/admin";

export async function POST(request) {
  const { allowed, profile } = await requireStaff();
  if (!allowed || !canManageUsers(profile?.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const fullName = String(body.fullName || "").trim();
  const role = body.role || "viewer";
  const password = body.password ? String(body.password) : null;

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    const admin = createServiceClient();

    if (password) {
      const { data, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName, role },
      });
      if (error) throw error;
      await admin
        .from("profiles")
        .update({ role, full_name: fullName || null, active: true, email })
        .eq("id", data.user.id);
      return NextResponse.json({ message: `Created ${email} with password login.` });
    }

    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: fullName, role },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL?.replace("3000", "3002") || "http://localhost:3002"}/auth/callback`,
    });
    if (error) throw error;
    if (data?.user?.id) {
      await admin
        .from("profiles")
        .update({ role, full_name: fullName || null, active: true, email })
        .eq("id", data.user.id);
    }
    return NextResponse.json({ message: `Invite sent to ${email}.` });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Invite failed" }, { status: 500 });
  }
}
