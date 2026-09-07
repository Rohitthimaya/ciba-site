#!/usr/bin/env node
/**
 * Import existing hardcoded news posts into Supabase news_posts.
 *
 * Usage (from repo root, with admin/.env.local or env vars set):
 *   node --env-file=admin/.env.local scripts/seed-news.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { pathToFileURL } from "url";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!url || !service) {
  console.error("Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const srcPath = path.join(root, "lib/newsData.fallback.js");
let src = readFileSync(srcPath, "utf8");
src = src.replace(
  /import\s*\{\s*dummyImage\s*\}\s*from\s*["']@\/lib\/siteImages["'];?/,
  "const dummyImage = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w || 900}/${h || 600}`;",
);
const tmp = path.join(root, ".tmp-news-seed.mjs");
writeFileSync(tmp, src);

let NEWS;
try {
  ({ NEWS } = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`));
} finally {
  try {
    unlinkSync(tmp);
  } catch {
    /* ignore */
  }
}

function parseDate(label) {
  if (!label) return null;
  const d = new Date(label);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function findImagePath(base) {
  if (!base) return null;
  // Prefer a stable public path; admin/public site resolve via findImage
  return base;
}

const admin = createClient(url, service, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const rows = NEWS.map((n, i) => ({
  slug: n.slug,
  title: n.title,
  tag: n.tag || null,
  teaser: n.text || null,
  published_at: parseDate(n.date),
  read_time: n.readTime || null,
  author: n.author || "CIBA",
  body: n.blocks || [],
  status: "published",
  image_path: findImagePath(n.base),
  media_contact: n.mediaContact || null,
  views: n.views || 0,
  likes: n.likes || 0,
}));

console.log(`Upserting ${rows.length} posts…`);

const { data, error } = await admin.from("news_posts").upsert(rows, {
  onConflict: "slug",
});

if (error) {
  console.error(error);
  process.exit(1);
}

const { count } = await admin
  .from("news_posts")
  .select("*", { count: "exact", head: true });
console.log(`Done. news_posts count = ${count}`);
