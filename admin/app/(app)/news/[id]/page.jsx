import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import NewsEditor from "@/components/NewsEditor";

export default async function EditNewsPage({ params }) {
  const { id } = await params;
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;

  const { data } = await supabase.from("news_posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <NewsEditor initial={data} profile={profile} />;
}
