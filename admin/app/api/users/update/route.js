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

  const patch = {};
  if (typeof body.role === "string") patch.role = body.role;
  if (typeof body.active === "boolean") patch.active = body.active;

  try {
    const admin = createServiceClient();
    const { error } = await admin.from("profiles").update(patch).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
