"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { canWriteContent } from "@/lib/roles";

export default function SettingsManager({ initial, profile }) {
  const writable = canWriteContent(profile?.role);
  const contact = initial.contact || {};
  const socials = initial.socials || {};
  const land = initial.land_acknowledgment || {};
  const generator = initial.generator || {};
  const stats = initial.stats || [];

  const [form, setForm] = useState({
    email: contact.email || "",
    generatorEmail: contact.generatorEmail || "",
    phone: contact.phone || "",
    instagram: socials.instagram || "",
    facebook: socials.facebook || "",
    linkedin: socials.linkedin || "",
    landText: land.text || "",
    videoId: generator.videoId || "",
    statsText: Array.isArray(stats)
      ? stats.map((s) => `${s.label}|${s.value}`).join("\n")
      : "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(e) {
    e.preventDefault();
    if (!writable) return;
    setSaving(true);
    setError("");
    setMessage("");
    const supabase = createClient();
    const statsParsed = form.statsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, value] = line.split("|");
        return { label: (label || "").trim(), value: (value || "").trim() };
      });

    const rows = [
      {
        key: "contact",
        value: {
          email: form.email,
          generatorEmail: form.generatorEmail,
          phone: form.phone,
        },
      },
      {
        key: "socials",
        value: {
          instagram: form.instagram,
          facebook: form.facebook,
          linkedin: form.linkedin,
        },
      },
      { key: "land_acknowledgment", value: { text: form.landText } },
      { key: "generator", value: { videoId: form.videoId } },
      { key: "stats", value: statsParsed },
    ];

    try {
      for (const row of rows) {
        const { error: err } = await supabase.from("site_settings").upsert(row);
        if (err) throw err;
      }
      setMessage("Settings saved.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="toolbar">
        <h2>Site settings</h2>
      </div>
      {error && <div className="alert alert--error">{error}</div>}
      {message && <div className="alert alert--ok">{message}</div>}
      <form className="form form--wide card" onSubmit={save}>
        <h3 style={{ margin: 0 }}>Contact</h3>
        <div className="form__row">
          <label>
            Main email
            <input disabled={!writable} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>
            Generator email
            <input
              disabled={!writable}
              value={form.generatorEmail}
              onChange={(e) => setForm({ ...form, generatorEmail: e.target.value })}
            />
          </label>
        </div>
        <label>
          Phone
          <input disabled={!writable} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </label>

        <h3>Socials</h3>
        <div className="form__row">
          <label>
            Instagram
            <input
              disabled={!writable}
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
            />
          </label>
          <label>
            Facebook
            <input
              disabled={!writable}
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
            />
          </label>
        </div>
        <label>
          LinkedIn
          <input
            disabled={!writable}
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          />
        </label>

        <h3>Land acknowledgment</h3>
        <label>
          Text
          <textarea
            disabled={!writable}
            value={form.landText}
            onChange={(e) => setForm({ ...form, landText: e.target.value })}
          />
        </label>

        <h3>TRU Generator</h3>
        <label>
          YouTube video ID
          <input
            disabled={!writable}
            value={form.videoId}
            onChange={(e) => setForm({ ...form, videoId: e.target.value })}
          />
        </label>

        <h3>Stats</h3>
        <p className="hint">One per line: Label|Value</p>
        <label>
          Stats
          <textarea
            disabled={!writable}
            value={form.statsText}
            onChange={(e) => setForm({ ...form, statsText: e.target.value })}
          />
        </label>

        {writable && (
          <button className="btn btn--primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save settings"}
          </button>
        )}
      </form>
    </>
  );
}
