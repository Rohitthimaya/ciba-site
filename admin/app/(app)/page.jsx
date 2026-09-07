import { requireStaff } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const { supabase, allowed } = await requireStaff();
  if (!allowed) return null;

  const [
    { count: newsCount },
    { count: eventsCount },
    { count: peopleCount },
    { count: partnersCount },
    { data: upcoming },
    { data: recentNews },
  ] = await Promise.all([
    supabase.from("news_posts").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("people").select("*", { count: "exact", head: true }),
    supabase.from("partners").select("*", { count: "exact", head: true }),
    supabase
      .from("events")
      .select("id, title, start_at, tag")
      .gte("start_at", new Date().toISOString())
      .order("start_at", { ascending: true })
      .limit(5),
    supabase
      .from("news_posts")
      .select("id, title, status, published_at")
      .order("updated_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <>
      <div className="toolbar">
        <h2>Dashboard</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link className="btn btn--primary btn--sm" href="/news/new">
            New post
          </Link>
          <Link className="btn btn--teal btn--sm" href="/events/new">
            New event
          </Link>
        </div>
      </div>

      <div className="grid-stats">
        <div className="stat">
          <strong>{newsCount ?? 0}</strong>
          <span>News posts</span>
        </div>
        <div className="stat">
          <strong>{eventsCount ?? 0}</strong>
          <span>Events</span>
        </div>
        <div className="stat">
          <strong>{peopleCount ?? 0}</strong>
          <span>People</span>
        </div>
        <div className="stat">
          <strong>{partnersCount ?? 0}</strong>
          <span>Partners</span>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Upcoming events</h3>
        {!upcoming?.length ? (
          <p className="empty">No upcoming events.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>When</th>
                  <th>Tag</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <Link href={`/events/${e.id}`}>{e.title}</Link>
                    </td>
                    <td>{new Date(e.start_at).toLocaleString()}</td>
                    <td>
                      <span className="badge">{e.tag || "—"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Recent news</h3>
        {!recentNews?.length ? (
          <p className="empty">No posts yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentNews.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/news/${p.id}`}>{p.title}</Link>
                    </td>
                    <td>
                      <span className={`badge ${p.status === "published" ? "badge--ok" : "badge--warn"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>{p.published_at || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
