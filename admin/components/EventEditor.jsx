"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { canWriteContent } from "@/lib/roles";

function toLocalInput(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EventEditor({ initial, profile }) {
  const router = useRouter();
  const writable = canWriteContent(profile?.role);
  const isNew = !initial?.id;

  const [form, setForm] = useState({
    title: initial?.title || "",
    description: initial?.description || "",
    location: initial?.location || "",
    tag: initial?.tag || "",
    start_at: toLocalInput(initial?.start_at) || toLocalInput(new Date().toISOString()),
    end_at: toLocalInput(initial?.end_at) || "",
    published: initial?.published ?? true,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save(e) {
    e.preventDefault();
    if (!writable) return;
    setSaving(true);
    setError("");
    const supabase = createClient();
    const start = new Date(form.start_at);
    const end = form.end_at ? new Date(form.end_at) : new Date(start.getTime() + 90 * 60000);

    const payload = {
      title: form.title,
      description: form.description || null,
      location: form.location || null,
      tag: form.tag || null,
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      published: Boolean(form.published),
    };

    try {
      if (isNew) {
        const { data, error: err } = await supabase.from("events").insert(payload).select("id").single();
        if (err) throw err;
        router.replace(`/events/${data.id}`);
      } else {
        const { error: err } = await supabase.from("events").update(payload).eq("id", initial.id);
        if (err) throw err;
        router.refresh();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!writable || isNew || !confirm("Delete this event?")) return;
    const supabase = createClient();
    await supabase.from("events").delete().eq("id", initial.id);
    router.replace("/events");
  }

  return (
    <>
      <div className="toolbar">
        <h2>{isNew ? "New event" : "Edit event"}</h2>
        <Link className="btn btn--ghost btn--sm" href="/events">
          Back
        </Link>
      </div>
      {error && <div className="alert alert--error">{error}</div>}
      <form className="form card" onSubmit={save}>
        <label>
          Title
          <input required disabled={!writable} value={form.title} onChange={(e) => set("title", e.target.value)} />
        </label>
        <label>
          Description
          <textarea disabled={!writable} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </label>
        <div className="form__row">
          <label>
            Location
            <input disabled={!writable} value={form.location} onChange={(e) => set("location", e.target.value)} />
          </label>
          <label>
            Tag
            <input disabled={!writable} value={form.tag} onChange={(e) => set("tag", e.target.value)} />
          </label>
        </div>
        <div className="form__row">
          <label>
            Starts
            <input
              type="datetime-local"
              required
              disabled={!writable}
              value={form.start_at}
              onChange={(e) => set("start_at", e.target.value)}
            />
          </label>
          <label>
            Ends
            <input
              type="datetime-local"
              disabled={!writable}
              value={form.end_at}
              onChange={(e) => set("end_at", e.target.value)}
            />
          </label>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            disabled={!writable}
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
          />
          Published on public calendar
        </label>
        {writable && (
          <div className="form__actions">
            <button className="btn btn--primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            {!isNew && (
              <button type="button" className="btn btn--danger" onClick={remove}>
                Delete
              </button>
            )}
          </div>
        )}
      </form>
    </>
  );
}
