"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { canWriteContent } from "@/lib/roles";

const emptyPerson = {
  name: "",
  role: "",
  bio: "",
  kind: "board",
  sort_order: 0,
  photo_path: "",
};

export default function PeopleManager({ initial, profile }) {
  const router = useRouter();
  const writable = canWriteContent(profile?.role);
  const [items, setItems] = useState(initial || []);
  const [form, setForm] = useState(emptyPerson);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  function startEdit(row) {
    setEditingId(row.id);
    setForm({
      name: row.name,
      role: row.role,
      bio: (row.bio || []).join("\n\n"),
      kind: row.kind,
      sort_order: row.sort_order,
      photo_path: row.photo_path || "",
    });
  }

  async function save(e) {
    e.preventDefault();
    if (!writable) return;
    setError("");
    const supabase = createClient();
    const payload = {
      name: form.name,
      role: form.role,
      bio: form.bio
        .split(/\n\n+/)
        .map((t) => t.trim())
        .filter(Boolean),
      kind: form.kind,
      sort_order: Number(form.sort_order) || 0,
      photo_path: form.photo_path || null,
    };
    try {
      if (editingId) {
        const { error: err } = await supabase.from("people").update(payload).eq("id", editingId);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("people").insert(payload);
        if (err) throw err;
      }
      setForm(emptyPerson);
      setEditingId(null);
      router.refresh();
      const { data } = await supabase.from("people").select("*").order("sort_order");
      setItems(data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!writable || !confirm("Delete this person?")) return;
    const supabase = createClient();
    await supabase.from("people").delete().eq("id", id);
    setItems((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <>
      <div className="toolbar">
        <h2>People</h2>
      </div>
      {error && <div className="alert alert--error">{error}</div>}
      {writable && (
        <form className="form card" onSubmit={save}>
          <h3 style={{ margin: 0 }}>{editingId ? "Edit person" : "Add person"}</h3>
          <div className="form__row">
            <label>
              Name
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
              Role / title
              <input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </label>
          </div>
          <div className="form__row">
            <label>
              Kind
              <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
                <option value="exec">Executive</option>
                <option value="board">Board</option>
              </select>
            </label>
            <label>
              Sort order
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              />
            </label>
          </div>
          <label>
            Photo path / URL
            <input value={form.photo_path} onChange={(e) => setForm({ ...form, photo_path: e.target.value })} />
          </label>
          <label>
            Bio (paragraphs separated by blank lines)
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </label>
          <div className="form__actions">
            <button className="btn btn--primary" type="submit">
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyPerson);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
      <div className="table-wrap card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Kind</th>
              <th>Order</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.role}</td>
                <td>
                  <span className="badge">{p.kind}</span>
                </td>
                <td>{p.sort_order}</td>
                <td>
                  {writable && (
                    <>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => startEdit(p)}>
                        Edit
                      </button>{" "}
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => remove(p.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
