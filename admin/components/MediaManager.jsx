"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { canWriteContent } from "@/lib/roles";

export default function MediaManager({ initialAssets, profile }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const writable = canWriteContent(profile?.role);

  async function onUpload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");
    const supabase = createClient();

    try {
      for (const file of files) {
        const ext = file.name.split(".").pop();
        const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
          upsert: false,
          contentType: file.type,
        });
        if (upErr) throw upErr;
        const { error: dbErr } = await supabase.from("media_assets").insert({
          path,
          alt: file.name,
          mime: file.type,
          uploaded_by: profile.id,
        });
        if (dbErr) throw dbErr;
      }
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove(asset) {
    if (!confirm("Delete this file?")) return;
    const supabase = createClient();
    await supabase.storage.from("media").remove([asset.path]);
    await supabase.from("media_assets").delete().eq("id", asset.id);
    router.refresh();
  }

  function publicUrl(path) {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return `${base}/storage/v1/object/public/media/${path}`;
  }

  return (
    <>
      <div className="toolbar">
        <h2>Media library</h2>
        {writable && (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onUpload}
            />
            <button
              type="button"
              className="btn btn--primary"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? "Uploading…" : "Upload images"}
            </button>
          </>
        )}
      </div>
      {error && <div className="alert alert--error">{error}</div>}
      {!initialAssets?.length ? (
        <div className="card empty">No media yet.</div>
      ) : (
        <div className="media-grid">
          {initialAssets.map((a) => (
            <figure className="media-item" key={a.id}>
              <img src={publicUrl(a.path)} alt={a.alt || ""} />
              <figcaption>
                {a.path}
                {writable && (
                  <div style={{ marginTop: 6 }}>
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => remove(a)}>
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => navigator.clipboard.writeText(publicUrl(a.path))}
                    >
                      Copy URL
                    </button>
                  </div>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
