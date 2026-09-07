import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { canWriteContent } from "@/lib/roles";
import RowActions from "@/components/RowActions";

export default async function NewsListPage() {
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;
  const writable = canWriteContent(profile.role);

  const { data: posts } = await supabase
    .from("news_posts")
    .select("id, title, slug, status, published_at, tag")
    .order("updated_at", { ascending: false });

  return (
    <>
      <div className="toolbar">
        <h2>News</h2>
        {writable && (
          <Link className="btn btn--primary" href="/news/new">
            New post
          </Link>
        )}
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Tag</th>
              <th>Status</th>
              <th>Date</th>
              {writable && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {(posts || []).map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={`/news/${p.id}`}>{p.title}</Link>
                </td>
                <td>{p.tag || "—"}</td>
                <td>
                  <span className={`badge ${p.status === "published" ? "badge--ok" : "badge--warn"}`}>
                    {p.status}
                  </span>
                </td>
                <td>{p.published_at || "—"}</td>
                {writable && (
                  <td>
                    <RowActions
                      href={`/news/${p.id}`}
                      table="news_posts"
                      id={p.id}
                      confirmLabel="Delete this post?"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
