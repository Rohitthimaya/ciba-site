"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { canWriteContent } from "@/lib/roles";

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NewsEditor({ initial, profile }) {
  const router = useRouter();
  const writable = canWriteContent(profile?.role);
  const isNew = !initial?.id;

  const [form, setForm] = useState({
    title: initial?.title || "",
    slug: initial?.slug || "",
    tag: initial?.tag || "",
    teaser: initial?.teaser || "",
    published_at: initial?.published_at || "",
    read_time: initial?.read_time || "2 min read",
    author: initial?.author || "CIBA",
    status: initial?.status || "draft",
    image_path: initial?.image_path || "",
    bodyText: Array.isArray(initial?.body)
      ? initial.body
          .filter((b) => b.type === "p")
          .map((b) => b.text)
          .join("\n\n")
      : "",
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
    const slug = form.slug || slugify(form.title);
    const body = form.bodyText
      .split(/\n\n+/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((text) => ({ type: "p", text }));

    const payload = {
      title: form.title,
      slug,
      tag: form.tag || null,
      teaser: form.teaser || null,
      published_at: form.published_at || null,
      read_time: form.read_time || null,
      author: form.author || "CIBA",
      status: form.status,
      image_path: form.image_path || null,
      body,
    };

    try {
      if (isNew) {
        const { data, error: err } = await supabase
          .from("news_posts")
          .insert(payload)
          .select("id")
          .single();
        if (err) throw err;
        router.replace(`/news/${data.id}`);
      } else {
        const { error: err } = await supabase
          .from("news_posts")
          .update(payload)
          .eq("id", initial.id);
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
    if (!writable || isNew || !confirm("Delete this post?")) return;
    const supabase = createClient();
    await supabase.from("news_posts").delete().eq("id", initial.id);
    router.replace("/news");
    router.refresh();
  }

  return (
    <>
      <div className="toolbar">
        <h2>{isNew ? "New post" : "Edit post"}</h2>
        <Link className="btn btn--ghost btn--sm" href="/news">
          Back
        </Link>
      </div>
      {error && <div className="alert alert--error">{error}</div>}
      <form className="form form--wide card" onSubmit={save}>
        <label>
          Title
          <input
            required
            disabled={!writable}
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (isNew) set("slug", slugify(e.target.value));
            }}
          />
        </label>
        <div className="form__row">
          <label>
            Slug
            <input required disabled={!writable} value={form.slug} onChange={(e) => set("slug", e.target.value)} />
          </label>
          <label>
            Tag
            <input disabled={!writable} value={form.tag} onChange={(e) => set("tag", e.target.value)} />
          </label>
        </div>
        <label>
          Teaser
          <textarea disabled={!writable} value={form.teaser} onChange={(e) => set("teaser", e.target.value)} />
        </label>
        <div className="form__row">
          <label>
            Publish date
            <input
              type="date"
              disabled={!writable}
              value={form.published_at || ""}
              onChange={(e) => set("published_at", e.target.value)}
            />
          </label>
          <label>
            Status
            <select disabled={!writable} value={form.status} onChange={(e) => set("status", e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>
        <div className="form__row">
          <label>
            Author
            <input disabled={!writable} value={form.author} onChange={(e) => set("author", e.target.value)} />
          </label>
          <label>
            Read time
            <input disabled={!writable} value={form.read_time} onChange={(e) => set("read_time", e.target.value)} />
          </label>
        </div>
        <label>
          Image path or URL
          <input
            disabled={!writable}
            value={form.image_path}
            onChange={(e) => set("image_path", e.target.value)}
            placeholder="/images/news/news-1.jpg or Storage URL"
          />
        </label>
        <label>
          Body (paragraphs separated by blank lines)
          <textarea
            disabled={!writable}
            style={{ minHeight: 220 }}
            value={form.bodyText}
            onChange={(e) => set("bodyText", e.target.value)}
          />
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
