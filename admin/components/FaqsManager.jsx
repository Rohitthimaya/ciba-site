"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { canWriteContent } from "@/lib/roles";

export default function FaqsManager({ initialFaqs, initialLinks, profile }) {
  const router = useRouter();
  const writable = canWriteContent(profile?.role);
  const [faqs, setFaqs] = useState(initialFaqs || []);
  const [links, setLinks] = useState(initialLinks || []);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", published: true });
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [linkForm, setLinkForm] = useState({ label: "", href: "" });
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [error, setError] = useState("");

  async function refreshFaqs(supabase) {
    const { data } = await supabase.from("faqs").select("*").order("sort_order");
    setFaqs(data || []);
    router.refresh();
  }

  async function refreshLinks(supabase) {
    const { data } = await supabase.from("resource_links").select("*").order("sort_order");
    setLinks(data || []);
    router.refresh();
  }

  async function saveFaq(e) {
    e.preventDefault();
    if (!writable) return;
    setError("");
    const supabase = createClient();
    const payload = {
      question: faqForm.question,
      answer: faqForm.answer,
      published: Boolean(faqForm.published),
    };
    try {
      if (editingFaqId) {
        const { error: err } = await supabase.from("faqs").update(payload).eq("id", editingFaqId);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("faqs").insert({
          ...payload,
          sort_order: faqs.length + 1,
        });
        if (err) throw err;
      }
      setFaqForm({ question: "", answer: "", published: true });
      setEditingFaqId(null);
      await refreshFaqs(supabase);
    } catch (err) {
      setError(err.message);
    }
  }

  async function saveLink(e) {
    e.preventDefault();
    if (!writable) return;
    setError("");
    const supabase = createClient();
    const payload = { label: linkForm.label, href: linkForm.href };
    try {
      if (editingLinkId) {
        const { error: err } = await supabase
          .from("resource_links")
          .update(payload)
          .eq("id", editingLinkId);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("resource_links").insert({
          ...payload,
          sort_order: links.length + 1,
        });
        if (err) throw err;
      }
      setLinkForm({ label: "", href: "" });
      setEditingLinkId(null);
      await refreshLinks(supabase);
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeFaq(id) {
    if (!writable || !confirm("Delete this FAQ?")) return;
    const supabase = createClient();
    await supabase.from("faqs").delete().eq("id", id);
    if (editingFaqId === id) {
      setEditingFaqId(null);
      setFaqForm({ question: "", answer: "", published: true });
    }
    setFaqs((rows) => rows.filter((r) => r.id !== id));
  }

  async function removeLink(id) {
    if (!writable || !confirm("Delete this link?")) return;
    const supabase = createClient();
    await supabase.from("resource_links").delete().eq("id", id);
    if (editingLinkId === id) {
      setEditingLinkId(null);
      setLinkForm({ label: "", href: "" });
    }
    setLinks((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <>
      <div className="toolbar">
        <h2>FAQs &amp; resources</h2>
      </div>
      {error && <div className="alert alert--error">{error}</div>}

      {writable && (
        <form className="form card" onSubmit={saveFaq}>
          <h3 style={{ margin: 0 }}>{editingFaqId ? "Edit FAQ" : "Add FAQ"}</h3>
          <label>
            Question
            <input
              required
              value={faqForm.question}
              onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
            />
          </label>
          <label>
            Answer
            <textarea
              required
              value={faqForm.answer}
              onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={faqForm.published}
              onChange={(e) => setFaqForm({ ...faqForm, published: e.target.checked })}
            />
            Published
          </label>
          <div className="form__actions">
            <button className="btn btn--primary" type="submit">
              {editingFaqId ? "Update FAQ" : "Add FAQ"}
            </button>
            {editingFaqId && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setEditingFaqId(null);
                  setFaqForm({ question: "", answer: "", published: true });
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
              <th>Question</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <tr key={f.id}>
                <td>
                  <strong>{f.question}</strong>
                  <div className="hint">{f.answer?.slice(0, 120)}</div>
                </td>
                <td>
                  <span className={`badge ${f.published ? "badge--ok" : "badge--warn"}`}>
                    {f.published ? "Published" : "Hidden"}
                  </span>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {writable && (
                    <>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => {
                          setEditingFaqId(f.id);
                          setFaqForm({
                            question: f.question,
                            answer: f.answer,
                            published: f.published,
                          });
                        }}
                      >
                        Edit
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => removeFaq(f.id)}
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

      {writable && (
        <form className="form card" onSubmit={saveLink}>
          <h3 style={{ margin: 0 }}>{editingLinkId ? "Edit resource link" : "Add resource link"}</h3>
          <div className="form__row">
            <label>
              Label
              <input
                required
                value={linkForm.label}
                onChange={(e) => setLinkForm({ ...linkForm, label: e.target.value })}
              />
            </label>
            <label>
              URL
              <input
                required
                value={linkForm.href}
                onChange={(e) => setLinkForm({ ...linkForm, href: e.target.value })}
              />
            </label>
          </div>
          <div className="form__actions">
            <button className="btn btn--teal" type="submit">
              {editingLinkId ? "Update link" : "Add link"}
            </button>
            {editingLinkId && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setEditingLinkId(null);
                  setLinkForm({ label: "", href: "" });
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
              <th>Label</th>
              <th>URL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {links.map((l) => (
              <tr key={l.id}>
                <td>{l.label}</td>
                <td>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.href}
                  </a>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {writable && (
                    <>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => {
                          setEditingLinkId(l.id);
                          setLinkForm({ label: l.label, href: l.href });
                        }}
                      >
                        Edit
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => removeLink(l.id)}
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
    </>
  );
}
