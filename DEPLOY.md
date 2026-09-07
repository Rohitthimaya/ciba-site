# CIBA website + admin — deployment guide

This repo contains **two apps** that share one **Supabase** backend:

| App | Folder | What it is | Suggested URL |
| --- | --- | --- | --- |
| **Public website** | repo root (`/`) | Marketing site (home, about, news, TRU Generator, etc.) | `https://www.yourdomain.com` |
| **Admin CMS** | `admin/` | Staff login to edit news, events, people, FAQs, media, users | `https://admin.yourdomain.com` |

Both apps are **Next.js** and need a host that supports Node.js server builds (not plain static FTP hosting).

Current reference deploys (for comparison):

- Public: https://ciba-site.vercel.app  
- Admin: https://ciba-admin.vercel.app  
- Source: https://github.com/Rohitthimaya/ciba-site  

---

## What you need before starting

1. Access to this **GitHub repo** (or a fork/transfer).
2. A **domain** you control (DNS access).
3. A **host** that can run Next.js (options below).
4. A **Supabase** project (keep the existing one, or create a new one and migrate).

### Supabase keys you will need

In Supabase → **Project Settings → API**:

| Variable | Where used | Notes |
| --- | --- | --- |
| Project URL | Both apps | Looks like `https://xxxx.supabase.co` |
| `anon` / public key (legacy JWT) | Both apps | Safe to expose in the browser |
| `service_role` key | **Admin only** | Secret — never put on the public site or in git |

Optional newer keys (`sb_publishable_…` / `sb_secret_…`) also work if the legacy JWT keys are unavailable; prefer the legacy **anon** + **service_role** JWTs with `@supabase/supabase-js`.

---

## Recommended architecture

```
                    ┌─────────────────────────┐
   visitors ───────►│  Public site (Vercel)   │──► Supabase (read published content)
                    │  www.yourdomain.com     │
                    └─────────────────────────┘

                    ┌─────────────────────────┐
   staff ──────────►│  Admin app (Vercel)     │──► Supabase (auth + write + Storage)
                    │  admin.yourdomain.com   │
                    └─────────────────────────┘
```

Use **two separate hosting projects** from the **same Git repo**:

- Project A → Root Directory = `/` (public site)  
- Project B → Root Directory = `admin` (admin CMS)

---

# Option A — Vercel (recommended)

This matches how the site is already set up. Fastest and least friction for Next.js.

## A1. Create / connect the public site project

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login is easiest).
2. **Add New Project** → Import `ciba-site` (or your fork).
3. Settings:
   - **Framework Preset:** Next.js  
   - **Root Directory:** leave empty / `.` (repo root)  
   - **Build Command:** `next build` (default)  
   - **Install Command:** `npm install` (default)
4. **Environment Variables** (Production + Preview + Development):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_jwt_key
   ```

5. Deploy. You will get something like `your-project.vercel.app`.

## A2. Create the admin project (same repo, second project)

1. **Add New Project** again → import the **same** GitHub repo.
2. Name it e.g. `ciba-admin`.
3. **Important — Root Directory:** set to `admin`  
   (Vercel → Project Settings → General → Root Directory → `admin`)
4. Framework: Next.js.
5. **Environment Variables:**

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_jwt_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_jwt_key
   SUPER_ADMIN_EMAIL=you@yourdomain.com
   NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
   ```

   - `NEXT_PUBLIC_SITE_URL` must be the **public** site URL (not the admin URL).  
   - Never commit `SUPABASE_SERVICE_ROLE_KEY`.

6. Deploy. You will get something like `ciba-admin.vercel.app`.

## A3. Attach custom domains on Vercel

### Public site

1. Vercel → public project → **Settings → Domains**
2. Add:
   - `www.yourdomain.com`
   - `yourdomain.com` (optional redirect to `www`)
3. Vercel shows the DNS records to create (usually):

   | Type | Name | Value |
   | --- | --- | --- |
   | `A` | `@` | `76.76.21.21` (Vercel; confirm in dashboard) |
   | `CNAME` | `www` | `cname.vercel-dns.com` (confirm in dashboard) |

### Admin site

1. Vercel → admin project → **Settings → Domains**
2. Add `admin.yourdomain.com`
3. DNS:

   | Type | Name | Value |
   | --- | --- | --- |
   | `CNAME` | `admin` | `cname.vercel-dns.com` (confirm in dashboard) |

Wait for DNS to go green in Vercel (can take a few minutes to a few hours).

## A4. Configure Supabase Auth for your domains

In Supabase → **Authentication → URL Configuration**:

1. **Site URL:** `https://admin.yourdomain.com`
2. **Redirect URLs** (add all that apply):

   ```
   https://admin.yourdomain.com/**
   https://admin.yourdomain.com/auth/callback
   http://localhost:3002/**
   http://localhost:3002/auth/callback
   ```

Without this, admin login / magic links will fail on the new domain.

## A5. First admin user

If the project already has a super admin, use that account and change the password.

To create a new one:

1. Supabase → **Authentication → Users → Add user** (email + password).
2. In **SQL Editor**:

   ```sql
   update public.profiles
   set role = 'super_admin', active = true, full_name = 'Your Name'
   where email = 'you@yourdomain.com';
   ```

3. Sign in at `https://admin.yourdomain.com/login`.

---

# Option B — Netlify

Works for Next.js via the Netlify Next runtime, but you still need **two sites** (or two configs) because admin lives in a subfolder.

### Public site

1. New site from Git → same repo.  
2. Base directory: `/`  
3. Build: `npm run build`  
4. Publish: Next.js runtime (Netlify detects Next).  
5. Env vars: same as public Vercel vars.

### Admin site

1. Second Netlify site from the same repo.  
2. Base directory: `admin`  
3. Build: `npm install && npm run build` (from `admin`)  
4. Env vars: same as admin Vercel vars.  
5. Custom domains: `www` + `admin` subdomains in Netlify Domains.

Also complete **Supabase Auth URL** steps (A4).

> If Netlify’s Next adapter mis-detects the monorepo-style `admin/` app, prefer **Option A (Vercel)** or **Option C**.

---

# Option C — Cloudflare Pages / Workers

Possible with Next.js via OpenNext / Cloudflare adapters, but more setup. Use only if the host already standardizes on Cloudflare and can support Next.js 16 App Router.

You still need:

- Two projects (public + admin root `admin/`)
- Same env vars
- Same Supabase Auth redirect URLs
- Custom domains on Cloudflare DNS

---

# Option D — Self-hosted (VPS / Docker / Node server)

Use this if they already have a Linux VPS (DigitalOcean, AWS EC2, Linode, etc.).

### Requirements

- Node.js **20+** (24.x is fine)
- Process manager (`pm2` or systemd)
- Reverse proxy (Caddy or Nginx) with HTTPS
- Two Node processes (or two containers)

### Build & run (example)

```bash
# Public site
git clone https://github.com/ORG/ciba-site.git
cd ciba-site
cp .env.example .env.local   # fill public vars
npm install
npm run build
npx pm2 start npm --name ciba-web -- start   # port 3000

# Admin
cd admin
cp .env.example .env.local   # fill admin vars
npm install
npm run build
npx pm2 start npm --name ciba-admin -- start  # port 3002
```

### Reverse proxy (Caddy example)

```caddy
www.yourdomain.com {
  reverse_proxy localhost:3000
}

admin.yourdomain.com {
  reverse_proxy localhost:3002
}
```

Point DNS `A`/`AAAA` records for `www` and `admin` to the VPS IP.

Complete **Supabase Auth URL** steps (A4).

### Docker note

There is no required Docker setup in the repo today. You can containerize each app yourself (`Dockerfile` at repo root for public; `admin/Dockerfile` for admin). Keep env vars out of the image — inject at runtime.

---

# Option E — Traditional shared hosting (cPanel / FTP only)

**Not supported** as-is. Shared PHP/static hosting cannot run this Next.js App Router project.

If the only available host is cPanel/FTP, they should:

1. Keep the apps on **Vercel/Netlify** (Options A/B), and  
2. Only point the **domain DNS** at that host,

—or upgrade to a VPS (Option D).

---

## Environment variable checklist

### Public site only

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Admin only (plus the two above)

```
SUPABASE_SERVICE_ROLE_KEY=
SUPER_ADMIN_EMAIL=
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
```

After changing env vars on any host, **redeploy** so builds pick up `NEXT_PUBLIC_*` values.

---

## Supabase handoff options

### Keep the existing Supabase project (simplest)

1. Invite the new owner as an org member in Supabase.  
2. Rotate the **service_role** key after handoff (old keys may have been shared during setup).  
3. Update both hosting projects with the new keys.  
4. Update Auth redirect URLs to the new domains (A4).  
5. Reset the admin password.

Content (news, events, etc.) stays in place.

### New Supabase project

1. Create a new Supabase project.  
2. Run `supabase/ALL.sql` in the SQL Editor (schema + seed).  
3. Optionally re-import news:

   ```bash
   node --env-file=admin/.env.local scripts/seed-news.mjs
   ```

4. Create a super admin user (see A5).  
5. Point both apps’ env vars at the new project.  
6. Configure Auth URLs (A4).

---

## DNS quick reference

Replace with the exact values your host shows.

| Host record | Typical purpose |
| --- | --- |
| `A` `@` → host IP / Vercel IP | Apex domain |
| `CNAME` `www` → host target | Public site |
| `CNAME` `admin` → host target | Admin CMS |

Turn off any old website DNS / parking pages that conflict.

---

## Post-deploy verification checklist

### Public site (`www`)

- [ ] Home loads (hero, news, partners)  
- [ ] `/news` shows posts with images  
- [ ] `/tru-generator` calendar shows events  
- [ ] `/tru-generator/resources` FAQs load  
- [ ] `/about`, `/partners`, `/programs` load  
- [ ] Contact CTA mailto uses a real address  

### Admin (`admin`)

- [ ] `/login` loads  
- [ ] Sign-in works with super admin  
- [ ] Can open News / Events / Media  
- [ ] Editing a news post updates the public site after refresh  
- [ ] Upload in Media library works (Supabase Storage bucket `media`)  

### Supabase

- [ ] Auth Site URL + Redirect URLs include the admin domain  
- [ ] Email auth enabled  
- [ ] Storage bucket `media` is public-read as configured in SQL  

---

## Ongoing workflow

1. Developers push to `main` on GitHub.  
2. Host auto-deploys:
   - Public project (root `/`)  
   - Admin project (root `admin/`)  
3. Content editors use **admin** only — no code deploy needed for news/events/FAQs/media.

---

## Security notes for the person taking over

1. **Rotate** `SUPABASE_SERVICE_ROLE_KEY` if it was ever pasted in chat/email.  
2. Change the temporary admin password immediately.  
3. Do not commit `.env` / `.env.local` files (repo already ignores `.env*`).  
4. Only give `service_role` to the admin hosting project.  
5. Prefer inviting staff via Admin → Users (roles: `super_admin`, `editor`, `viewer`) instead of sharing one password.

---

## Who to ask / what to send them

Send this file plus:

1. GitHub repo invite (or transfer ownership).  
2. Supabase project invite (or new project + confirmation that `ALL.sql` was run).  
3. Chosen production URLs, e.g.:
   - Public: `https://www.acceleratebusiness.ca`  
   - Admin: `https://admin.acceleratebusiness.ca`  
4. Confirmation of which hosting option they will use (**A recommended**).

Local admin README (more detail on modules): [`admin/README.md`](./admin/README.md).
