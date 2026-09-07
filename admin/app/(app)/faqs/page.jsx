import { requireStaff } from "@/lib/auth";
import FaqsManager from "@/components/FaqsManager";

export default async function FaqsPage() {
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;
  const [{ data: faqs }, { data: links }] = await Promise.all([
    supabase.from("faqs").select("*").order("sort_order"),
    supabase.from("resource_links").select("*").order("sort_order"),
  ]);
  return (
    <FaqsManager initialFaqs={faqs || []} initialLinks={links || []} profile={profile} />
  );
}
