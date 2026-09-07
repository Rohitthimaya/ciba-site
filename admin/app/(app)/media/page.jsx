import { requireStaff } from "@/lib/auth";
import MediaManager from "@/components/MediaManager";

export default async function MediaPage() {
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;

  const { data } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false });

  return <MediaManager initialAssets={data || []} profile={profile} />;
}
