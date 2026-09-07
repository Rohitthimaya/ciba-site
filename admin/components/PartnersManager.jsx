"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { canWriteContent } from "@/lib/roles";

const empty = { name: "", url: "", tier: "partner", logo_path: "", sort_order: 0 };

export default function PartnersManager({ initial, profile }) {
  const router = useRouter();
  const writable = canWriteContent(profile?.role);
  const [items, setItems] = useState(initial || []);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  async function save(e) {
    e.preventDefault();
    if (!writable) return;
    setError("");
    const supabase = createClient();
    const payload = {
      name: form.name,
      url: form.url || null,
      tier: form.tier,
      logo_path: form.logo_path || null,
      sort_order: Number(form.sort_order) || 0,
    };
    try {
      if (editingId) {
        const { error: err } = await supabase.from("partners").update(payload).eq("id", editingId);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("partners").insert(payload);
        if (err) throw err;
      }
      setForm(empty);
      setEditingId(null);
      const { data } = await supabase.from("partners").select("*").order("sort_order");
      setItems(data || []);
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!writable || !confirm("Delete partner?")) return;
    const supabase = createClient();
    await supabase.from("partners").delete().eq("id", id);
    setItems((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <>
      <div className="toolbar">
        <h2>Partners &amp; supporters</h2>
      </div>
      {error && <div className="alert alert--error">{error}</div>}
      {writable && (
        <form className="form card" onSubmit={save}>
          <div className="form__row">
            <label>
              Name
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
              URL
              <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
            </label>
          </div>
          <div className="form__row">
            <label>
              Tier
              <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })}>
                <option value="partner">Partner</option>
                <option value="supporter">Supporter</option>
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
            Logo path / URL
            <input value={form.logo_path} onChange={(e) => setForm({ ...form, logo_path: e.target.value })} />
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
                  setForm(empty);
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
              <th>Tier</th>
              <th>URL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
                  <span className="badge">{p.tier}</span>
                </td>
                <td>{p.url || "—"}</td>
                <td>
                  {writable && (
                    <>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => {
                          setEditingId(p.id);
                          setForm({
                            name: p.name,
                            url: p.url || "",
                            tier: p.tier,
                            logo_path: p.logo_path || "",
                            sort_order: p.sort_order,
                          });
                        }}
                      >
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
