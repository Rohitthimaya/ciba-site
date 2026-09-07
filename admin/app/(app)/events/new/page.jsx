import { requireStaff } from "@/lib/auth";
import EventEditor from "@/components/EventEditor";

export default async function NewEventPage() {
  const { allowed, profile } = await requireStaff();
  if (!allowed) return null;
  return <EventEditor profile={profile} />;
}
