import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import EventEditor from "@/components/EventEditor";

export default async function EditEventPage({ params }) {
  const { id } = await params;
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;
  const { data } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <EventEditor initial={data} profile={profile} />;
}
