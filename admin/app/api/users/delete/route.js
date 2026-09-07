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
  const id = body.id;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (id === profile.id) {
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
  }

  try {
    const admin = createServiceClient();
    const { error } = await admin.auth.admin.deleteUser(id);
    if (error) throw error;
    await admin.from("profiles").delete().eq("id", id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
