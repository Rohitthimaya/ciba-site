import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { canWriteContent } from "@/lib/roles";
import RowActions from "@/components/RowActions";

export default async function EventsPage() {
  const { allowed, profile, supabase } = await requireStaff();
  if (!allowed) return null;
  const writable = canWriteContent(profile.role);

  const { data: events } = await supabase
    .from("events")
    .select("id, title, start_at, end_at, tag, published, location")
    .order("start_at", { ascending: false });

  return (
    <>
      <div className="toolbar">
        <h2>Events</h2>
        {writable && (
          <Link className="btn btn--primary" href="/events/new">
            New event
          </Link>
        )}
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Start</th>
              <th>Tag</th>
              <th>Status</th>
              {writable && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {(events || []).map((e) => (
              <tr key={e.id}>
                <td>
                  <Link href={`/events/${e.id}`}>{e.title}</Link>
                  <div className="hint">{e.location}</div>
                </td>
                <td>{new Date(e.start_at).toLocaleString()}</td>
                <td>
                  <span className="badge">{e.tag || "—"}</span>
                </td>
                <td>
                  <span className={`badge ${e.published ? "badge--ok" : "badge--warn"}`}>
                    {e.published ? "Published" : "Hidden"}
                  </span>
                </td>
                {writable && (
                  <td>
                    <RowActions
                      href={`/events/${e.id}`}
                      table="events"
                      id={e.id}
                      confirmLabel="Delete this event?"
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
