# CIBA Website & Admin CMS — Hosting & Domain Handoff Guide

**Audience:** Person or agency that owns the **domain** and a **server** (or DNS access), and needs to put this site live on the real domain.

**Prepared for:** Central Interior Business Accelerator (CIBA)  
**Source code:** https://github.com/Rohitthimaya/ciba-site  
**Document date:** September 2026

---

## 1. What you are taking over

This project is **two websites** plus one shared database:

| Piece | Purpose | Suggested live URL |
| --- | --- | --- |
| **Public website** | Visitor-facing site (Home, About, Programs, Partners, News, TRU Generator) | `https://www.YOURDOMAIN.com` |
| **Admin CMS** | Staff login to edit news, events, people, FAQs, media, users | `https://admin.YOURDOMAIN.com` |
| **Supabase** | Database, login, and image storage (already set up) | Managed at supabase.com |

Both apps are built with **Next.js** (Node.js). They are **not** plain HTML you can upload by FTP to shared hosting.

### Current temporary live URLs (Vercel)

These already work. You can either **point the real domain at them**, or **move the apps onto your own server**.

| App | Temporary URL |
| --- | --- |
| Public site | https://ciba-site.vercel.app |
| Admin CMS | https://ciba-admin.vercel.app |

---

## 2. Choose one path (read this first)

| Path | When to use | Effort |
| --- | --- | --- |
| **Path 1 — Keep Vercel, attach your domain** | You have a domain (and maybe a server you don’t want to use for this). Fastest. | Low |
| **Path 2 — Run both apps on your own server** | You have a Linux VPS/server and want everything under your hosting. | Medium |
| **Path 3 — Other hosts (Netlify, etc.)** | You already standardize on another Next.js-capable host. | Medium |

**Not supported:** cPanel / PHP-only / FTP-only shared hosting. If that is all you have, use **Path 1** (domain DNS only) and leave the apps on Vercel.

Replace `YOURDOMAIN.com` everywhere below with the real domain (e.g. `acceleratebusiness.ca`).

---

## 3. Information pack (give / collect these)

### 3.1 From the developer (hand this over)

- [ ] GitHub repo access: https://github.com/Rohitthimaya/ciba-site  
- [ ] This guide (PDF or `DEPLOY.md`)  
- [ ] Supabase project invite **or** API keys (see below)  
- [ ] Admin login email (super admin)  
- [ ] Confirmation of temporary URLs above  

### 3.2 Supabase API values (Project Settings → API)

| Name | Used by | Secret? |
| --- | --- | --- |
| Project URL (`https://….supabase.co`) | Public + Admin | No |
| `anon` public key (JWT) | Public + Admin | No (browser-safe) |
| `service_role` key (JWT) | **Admin only** | **Yes — never share publicly** |

### 3.3 Environment variables

**Public website**

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

**Admin CMS** (all of the above, plus)

```
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
SUPER_ADMIN_EMAIL=you@YOURDOMAIN.com
NEXT_PUBLIC_SITE_URL=https://www.YOURDOMAIN.com
```

`NEXT_PUBLIC_SITE_URL` must be the **public** site URL, not the admin URL.

### 3.4 From the domain / server owner (fill in)

| Item | Your value |
| --- | --- |
| Production public domain | `https://www.____________` |
| Production admin domain | `https://admin.____________` |
| DNS provider (where DNS is edited) | ________________ |
| Server type (if Path 2): Ubuntu / Debian / other | ________________ |
| Server public IP | ________________ |
| SSH access available? | Yes / No |
| Preferred path | Path 1 / Path 2 / Path 3 |

---

## 4. Path 1 — Keep Vercel apps, use your original domain (recommended if you only have domain + DNS)

This replaces `ciba-site.vercel.app` and `ciba-admin.vercel.app` with your real domain. The apps stay hosted on Vercel; you only change DNS.

### 4.1 Prerequisites

1. Access to the Vercel team/projects that own:
   - `ciba-site` (public)
   - `ciba-admin` (admin)
2. Access to DNS for `YOURDOMAIN.com` (wherever the domain is registered or managed).

If Vercel access must transfer: invite the new owner under Vercel → Team → Members, or transfer the projects.

### 4.2 Attach the public domain

1. Open Vercel → project **ciba-site** → **Settings → Domains**.
2. Add:
   - `www.YOURDOMAIN.com`
   - `YOURDOMAIN.com` (optional; redirect to `www`)
3. Vercel shows exact DNS records. Typical pattern:

| Type | Host / Name | Value (confirm in Vercel UI) |
| --- | --- | --- |
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

4. In your DNS panel, create those records. Remove conflicting old `A`/`CNAME` records for `@` and `www`.
5. Wait until Vercel shows the domain as **Valid** (minutes to a few hours).

Result: `https://www.YOURDOMAIN.com` serves the public site (same content as `ciba-site.vercel.app`).

### 4.3 Attach the admin domain

1. Vercel → project **ciba-admin** → **Settings → Domains**.
2. Add `admin.YOURDOMAIN.com`.
3. DNS:

| Type | Host / Name | Value (confirm in Vercel UI) |
| --- | --- | --- |
| `CNAME` | `admin` | `cname.vercel-dns.com` |

4. Wait for Valid status.

Result: `https://admin.YOURDOMAIN.com` serves the CMS (same as `ciba-admin.vercel.app`).

### 4.4 Update environment variable for the public URL

In Vercel → **ciba-admin** → Settings → Environment Variables, set:

```
NEXT_PUBLIC_SITE_URL=https://www.YOURDOMAIN.com
```

Redeploy the admin project after changing it.

### 4.5 Update Supabase Auth URLs (required for login on the new domain)

Supabase dashboard → **Authentication → URL Configuration**:

1. **Site URL:** `https://admin.YOURDOMAIN.com`
2. **Redirect URLs** — add:

```
https://admin.YOURDOMAIN.com/**
https://admin.YOURDOMAIN.com/auth/callback
https://ciba-admin.vercel.app/**
http://localhost:3002/**
```

Save. Then test login at `https://admin.YOURDOMAIN.com/login`.

### 4.6 Optional cleanup

- Keep the `*.vercel.app` URLs as backups, or remove them later.
- Change the admin password after handoff.
- Rotate `SUPABASE_SERVICE_ROLE_KEY` if it was shared earlier, then update Vercel admin env and redeploy.

---

## 5. Path 2 — Deploy on your own server + domain

Use this when you have a **Linux server** (VPS) with SSH and want to host both apps yourself.

### 5.1 Server requirements

- Ubuntu 22.04 / 24.04 (or similar)
- Public IPv4 (and IPv6 if you use it)
- Ports 80 and 443 open
- At least 1 GB RAM (2 GB preferred)
- Node.js **20+** (Node 22 or 24 recommended)
- Git
- A reverse proxy with HTTPS: **Caddy** (easiest) or Nginx + Certbot

### 5.2 DNS first (point domain at your server)

At your DNS provider:

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | `YOUR_SERVER_IP` |
| `A` | `www` | `YOUR_SERVER_IP` |
| `A` | `admin` | `YOUR_SERVER_IP` |

(Or use `AAAA` for IPv6.)  
Wait until `ping www.YOURDOMAIN.com` and `ping admin.YOURDOMAIN.com` resolve to your server.

### 5.3 Install Node.js and tools (Ubuntu example)

```bash
sudo apt update
sudo apt install -y git curl build-essential

# Node 22 via NodeSource (or use nvm)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

node -v
npm -v

sudo npm install -g pm2
```

### 5.4 Clone the repository

```bash
sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www
cd /var/www
git clone https://github.com/Rohitthimaya/ciba-site.git
cd ciba-site
```

(Use a deploy key or personal access token if the repo is private.)

### 5.5 Configure environment files

**Public site** — create `/var/www/ciba-site/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

**Admin** — create `/var/www/ciba-site/admin/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
SUPER_ADMIN_EMAIL=you@YOURDOMAIN.com
NEXT_PUBLIC_SITE_URL=https://www.YOURDOMAIN.com
```

Protect secrets:

```bash
chmod 600 /var/www/ciba-site/.env.local /var/www/ciba-site/admin/.env.local
```

### 5.6 Build both apps

```bash
cd /var/www/ciba-site
npm install
npm run build

cd /var/www/ciba-site/admin
npm install
npm run build
```

### 5.7 Run with PM2

```bash
cd /var/www/ciba-site
pm2 start npm --name ciba-web -- start
# listens on port 3000

cd /var/www/ciba-site/admin
pm2 start npm --name ciba-admin -- start
# listens on port 3002

pm2 save
pm2 startup
# run the command PM2 prints so processes restart on reboot
```

Check:

```bash
pm2 status
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1:3002
```

### 5.8 HTTPS reverse proxy with Caddy (recommended)

Install Caddy, then `/etc/caddy/Caddyfile`:

```caddy
www.YOURDOMAIN.com {
  reverse_proxy localhost:3000
}

YOURDOMAIN.com {
  redir https://www.YOURDOMAIN.com{uri} permanent
}

admin.YOURDOMAIN.com {
  reverse_proxy localhost:3002
}
```

```bash
sudo systemctl reload caddy
```

Caddy obtains Let’s Encrypt certificates automatically.

### 5.9 HTTPS with Nginx + Certbot (alternative)

Example server blocks (HTTP first, then Certbot):

```nginx
server {
  listen 80;
  server_name www.YOURDOMAIN.com YOURDOMAIN.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

server {
  listen 80;
  server_name admin.YOURDOMAIN.com;
  location / {
    proxy_pass http://127.0.0.1:3002;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

```bash
sudo certbot --nginx -d www.YOURDOMAIN.com -d YOURDOMAIN.com -d admin.YOURDOMAIN.com
```

### 5.10 Supabase Auth URLs (same as Path 1)

Set Site URL and Redirect URLs to `https://admin.YOURDOMAIN.com` (see section 4.5).

### 5.11 Updating the site later

```bash
cd /var/www/ciba-site
git pull
npm install
npm run build
cd admin && npm install && npm run build
pm2 restart ciba-web ciba-admin
```

---

## 6. Path 3 — Brief notes for other hosts

### Netlify

- Create **two** sites from the same Git repo.
- Public site: base directory `/`
- Admin site: base directory `admin`
- Add the same env vars as above
- Attach `www` and `admin` custom domains in Netlify
- Complete Supabase Auth URL steps (4.5)

### Cloudflare Pages / Workers

Only if your team already runs Next.js App Router there. Still need two projects, env vars, domains, and Supabase Auth URLs.

---

## 7. Admin login & roles

1. Open `https://admin.YOURDOMAIN.com/login`
2. Sign in with the super admin email/password provided at handoff
3. **Change the password immediately**

To create a new super admin in Supabase:

1. Authentication → Users → Add user  
2. SQL:

```sql
update public.profiles
set role = 'super_admin', active = true, full_name = 'Your Name'
where email = 'you@YOURDOMAIN.com';
```

Roles: `super_admin` (users + everything), `editor` (content), `viewer` (read-only).

---

## 8. Supabase handoff

### Keep existing project (usual)

1. Invite new owner in Supabase organization  
2. Update Auth URLs for the real admin domain  
3. Rotate `service_role` after handoff; update host env; redeploy  
4. Reset admin password  

### New Supabase project (only if required)

1. Create project  
2. Run `supabase/ALL.sql` in SQL Editor  
3. Optionally: `node --env-file=admin/.env.local scripts/seed-news.mjs`  
4. Create super admin (section 7)  
5. Point both apps’ env vars at the new project  

---

## 9. Go-live verification checklist

### Public — `https://www.YOURDOMAIN.com`

- [ ] Home loads (hero, news, partners)  
- [ ] HTTPS padlock works  
- [ ] `/news` shows articles and images  
- [ ] `/tru-generator` calendar shows events  
- [ ] `/tru-generator/resources` FAQs load  
- [ ] `/about`, `/partners`, `/programs` load  
- [ ] Contact / mailto uses a real email  

### Admin — `https://admin.YOURDOMAIN.com`

- [ ] Login page loads  
- [ ] Sign-in succeeds  
- [ ] News / Events / Media open  
- [ ] Edit a news post → appears on public site after refresh  
- [ ] Media upload works  

### DNS / SSL

- [ ] `www` and `admin` resolve correctly  
- [ ] Apex domain redirects to `www` (if configured)  
- [ ] Old parking page / old host DNS removed  

---

## 10. Architecture diagram

```
  Visitors -----> https://www.YOURDOMAIN.com  -----> Public Next.js app
                                                      |
  Staff --------> https://admin.YOURDOMAIN.com -----> Admin Next.js app
                                                      |
                                                      v
                                              Supabase (DB + Auth + Storage)
```

Hosting for the two Next.js apps can be:

- **Vercel** (Path 1 — domain only), or  
- **Your server** (Path 2 — Node + Caddy/Nginx), or  
- Another Next-capable host (Path 3).

---

## 11. Security reminders

1. Never commit `.env` / `.env.local`  
2. Never put `SUPABASE_SERVICE_ROLE_KEY` on the public site  
3. Rotate secrets after handoff if they were shared in chat/email  
4. Use unique staff accounts in Admin → Users  
5. Restrict SSH and keep the server patched (Path 2)  

---

## 12. Quick decision guide

| Situation | Do this |
| --- | --- |
| “We have the domain; we just want it live on www / admin” | **Path 1** — attach domains in Vercel + DNS + Supabase Auth URLs |
| “We have our own Linux server and want to host it ourselves” | **Path 2** — Node + PM2 + Caddy/Nginx + DNS to server IP |
| “We only have cPanel/FTP” | Use **Path 1** (apps stay on Vercel; you only manage DNS) |
| “We use Netlify already” | **Path 3** |

---

## 13. Support contacts / handoff notes

| Role | Name | Email |
| --- | --- | --- |
| Developer / build contact | | |
| Domain / DNS contact | | |
| Server admin | | |
| Content / admin CMS users | | |

**Chosen path:** ________________  
**Go-live target date:** ________________  
**Public URL:** https://www.________________  
**Admin URL:** https://admin.________________  

---

*End of guide. Full technical detail also lives in the repo as `DEPLOY.md`.*
