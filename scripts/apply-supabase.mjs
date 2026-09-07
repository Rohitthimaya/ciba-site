#!/usr/bin/env node
/**
 * Apply CIBA migrations via Postgres connection URI.
 *
 * Usage:
 *   DATABASE_URL='postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres' node scripts/apply-supabase.mjs
 *
 * Or set DATABASE_URL in the environment.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const files = [
  "supabase/migrations/20260907120000_initial.sql",
  "supabase/seed.sql",
  "supabase/seed_faqs.sql",
];

const client = new pg.Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  for (const rel of files) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) {
      console.warn("Skip missing", rel);
      continue;
    }
    const sql = fs.readFileSync(full, "utf8");
    console.log("Applying", rel, "…");
    await client.query(sql);
    console.log("OK", rel);
  }
  console.log("Done.");
} finally {
  await client.end();
}
