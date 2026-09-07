# CIBA Admin Panel

Separate Next.js app for managing CIBA website content. Deploys as its own Vercel project.

## Stack
- Next.js 16 (App Router) in `admin/`
- Supabase Auth + Postgres + Storage
- Roles: `super_admin`, `editor`, `viewer`

## One-time Supabase setup
1. Create a project at https://supabase.com
2. In **SQL Editor**, paste and run [`supabase/ALL.sql`](../supabase/ALL.sql) (migration + seed in one file)
   - Or run individually: `supabase/migrations/…`, `seed.sql`, `seed_faqs.sql`
3. Auth → enable Email provider (password + magic link)
4. Create your first user (Authentication → Users → Add user), then in SQL:

```sql
update public.profiles
set role = 'super_admin', active = true, full_name = 'Your Name'
where email = 'you@example.com';
```

Or apply from a machine with the DB password:

```bash
DATABASE_URL='postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres' node scripts/apply-supabase.mjs
```

## Local env

**Public site** (repo root) `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_or_publishable_key
# or: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_…
```

**Admin** `admin/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_or_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_or_secret_key
SUPER_ADMIN_EMAIL=you@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Never commit service role keys.

## Run locally
```bash
# public site
npm install
npm run dev

# admin (port 3002)
cd admin && npm install && npm run dev
```

Open http://localhost:3002 and sign in.

## Vercel (second project)
1. Import the same GitHub repo again as a new Vercel project (e.g. `ciba-admin`)
2. **Root Directory:** `admin`
3. Add the admin env vars above (set `NEXT_PUBLIC_SITE_URL` to your public production URL)
4. Deploy → you get `ciba-admin.vercel.app` (or attach `admin.yourdomain.com`)

Public site project keeps Root Directory `/` and only needs the anon URL/key.

## Modules
| Path | Who |
|------|-----|
| `/` Dashboard | all staff |
| `/news` | editors+ |
| `/events` | editors+ |
| `/people` | editors+ |
| `/partners` | editors+ |
| `/programs` | editors+ |
| `/faqs` | editors+ |
| `/media` | editors+ |
| `/settings` | editors+ |
| `/users` | super_admin only |

Without Supabase configured, the public site keeps using built-in fallback content (news, events, FAQs).
