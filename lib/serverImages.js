import fs from "fs";
import path from "path";

/* Server-side image resolution: we check which files actually exist
   in public/ at render time, so the browser is never handed a URL
   that could 404. Drop images in with any supported extension. */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EXTS = ["jpg", "jpeg", "png", "webp", "svg"];

/**
 * Given a base path like "images/team/sachin-singh", returns the
 * public URL of the first existing file trying each extension,
 * or null if none exists.
 */
export function findImage(base) {
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(PUBLIC_DIR, `${base}.${ext}`))) {
      return `/${base}.${ext}`;
    }
  }
  return null;
}

/**
 * Lists all images in a public/ folder (e.g. "images/hero"),
 * returning their public URLs sorted by filename.
 */
export function listImages(dir) {
  const abs = path.join(PUBLIC_DIR, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => `/${dir}/${f}`);
}

/** "John O'Fee" -> "john-ofee" (matches team photo filenames) */
export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
