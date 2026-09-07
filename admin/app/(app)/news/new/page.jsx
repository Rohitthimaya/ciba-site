import { requireStaff } from "@/lib/auth";
import NewsEditor from "@/components/NewsEditor";

export default async function NewNewsPage() {
  const { allowed, profile } = await requireStaff();
  if (!allowed) return null;
  return <NewsEditor profile={profile} />;
}
