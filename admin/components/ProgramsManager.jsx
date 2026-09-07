"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { canWriteContent } from "@/lib/roles";

const emptyProgram = { title: "", body: "", logo_path: "", sort_order: 0, cta_label: "", cta_href: "" };
const emptyWorkshop = { title: "", date: "", sort_order: 0 };

export default function ProgramsManager({ initialPrograms, initialWorkshops, profile }) {
  const router = useRouter();
  const writable = canWriteContent(profile?.role);
  const [programs, setPrograms] = useState(initialPrograms || []);
  const [workshops, setWorkshops] = useState(initialWorkshops || []);
  const [form, setForm] = useState(emptyProgram);
  const [editingId, setEditingId] = useState(null);
  const [wsForm, setWsForm] = useState(emptyWorkshop);
  const [editingWsId, setEditingWsId] = useState(null);
  const [error, setError] = useState("");

  async function saveProgram(e) {
    e.preventDefault();
    if (!writable) return;
    setError("");
    const supabase = createClient();
    const links = form.cta_href
      ? [{ label: form.cta_label || "Learn more", href: form.cta_href }]
      : [];
    const payload = {
      title: form.title,
      body: form.body || null,
      logo_path: form.logo_path || null,
      sort_order: Number(form.sort_order) || 0,
      links,
    };
    try {
      if (editingId) {
        const { error: err } = await supabase.from("programs").update(payload).eq("id", editingId);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("programs").insert(payload);
        if (err) throw err;
      }
      setForm(emptyProgram);
      setEditingId(null);
      const { data } = await supabase.from("programs").select("*").order("sort_order");
      setPrograms(data || []);
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function saveWorkshop(e) {
    e.preventDefault();
    if (!writable) return;
    setError("");
    const supabase = createClient();
    const payload = {
      title: wsForm.title,
      date: wsForm.date || null,
      sort_order: Number(wsForm.sort_order) || 0,
    };
    try {
      if (editingWsId) {
        const { error: err } = await supabase.from("workshops").update(payload).eq("id", editingWsId);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("workshops").insert(payload);
        if (err) throw err;
      }
      setWsForm(emptyWorkshop);
      setEditingWsId(null);
      const { data } = await supabase.from("workshops").select("*").order("sort_order");
      setWorkshops(data || []);
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeProgram(id) {
    if (!confirm("Delete program?")) return;
    const supabase = createClient();
    await supabase.from("programs").delete().eq("id", id);
    setPrograms((rows) => rows.filter((r) => r.id !== id));
  }

  async function removeWorkshop(id) {
    if (!confirm("Delete workshop?")) return;
    const supabase = createClient();
    await supabase.from("workshops").delete().eq("id", id);
    if (editingWsId === id) {
      setEditingWsId(null);
      setWsForm(emptyWorkshop);
    }
    setWorkshops((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <>
      <div className="toolbar">
        <h2>Programs &amp; workshops</h2>
      </div>
      {error && <div className="alert alert--error">{error}</div>}

      {writable && (
        <form className="form card" onSubmit={saveProgram}>
          <h3 style={{ margin: 0 }}>{editingId ? "Edit program" : "Add program"}</h3>
          <label>
            Title
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label>
            Body
            <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </label>
          <div className="form__row">
            <label>
              CTA label
              <input value={form.cta_label} onChange={(e) => setForm({ ...form, cta_label: e.target.value })} />
            </label>
            <label>
              CTA href
              <input value={form.cta_href} onChange={(e) => setForm({ ...form, cta_href: e.target.value })} />
            </label>
          </div>
          <div className="form__row">
            <label>
              Logo path
              <input value={form.logo_path} onChange={(e) => setForm({ ...form, logo_path: e.target.value })} />
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
          <button className="btn btn--primary" type="submit">
            {editingId ? "Update program" : "Add program"}
          </button>
        </form>
      )}

      <div className="table-wrap card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>Program</th>
              <th>Order</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.title}</strong>
                  <div className="hint">{p.body?.slice(0, 120)}</div>
                </td>
                <td>{p.sort_order}</td>
                <td>
                  {writable && (
                    <>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => {
                          setEditingId(p.id);
                          const link = p.links?.[0] || {};
                          setForm({
                            title: p.title,
                            body: p.body || "",
                            logo_path: p.logo_path || "",
                            sort_order: p.sort_order,
                            cta_label: link.label || "",
                            cta_href: link.href || "",
                          });
                        }}
                      >
                        Edit
                      </button>{" "}
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => removeProgram(p.id)}>
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

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Workshops</h3>
        {writable && (
          <form className="form" onSubmit={saveWorkshop} style={{ marginBottom: "1rem" }}>
            <h4 style={{ margin: 0 }}>{editingWsId ? "Edit workshop" : "Add workshop"}</h4>
            <div className="form__row">
              <label>
                Title
                <input required value={wsForm.title} onChange={(e) => setWsForm({ ...wsForm, title: e.target.value })} />
              </label>
              <label>
                Date label
                <input value={wsForm.date} onChange={(e) => setWsForm({ ...wsForm, date: e.target.value })} />
              </label>
            </div>
            <div className="form__actions">
              <button className="btn btn--teal btn--sm" type="submit">
                {editingWsId ? "Update workshop" : "Add workshop"}
              </button>
              {editingWsId && (
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => {
                    setEditingWsId(null);
                    setWsForm(emptyWorkshop);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workshops.map((w) => (
                <tr key={w.id}>
                  <td>{w.date || "—"}</td>
                  <td>{w.title}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {writable && (
                      <>
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => {
                            setEditingWsId(w.id);
                            setWsForm({
                              title: w.title,
                              date: w.date || "",
                              sort_order: w.sort_order || 0,
                            });
                          }}
                        >
                          Edit
                        </button>{" "}
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => removeWorkshop(w.id)}
                        >
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
      </div>
    </>
  );
}
