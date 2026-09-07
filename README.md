# Central Interior Business Accelerator — Website

A Next.js website for the Central Interior Business Accelerator (CIBA), inspired by Wealthsimple's animated homepage.

## Features

- Animated hero: shifting brand-colour gradients, floating image tiles, and a self-drawing market-style line
- Pill navigation bar with CIBA branding (Home, About, Programs, Partners, News, Contact Us)
- About, Programs, Partners, News, and Contact sections
- Pause/play control for the hero animation (also respects `prefers-reduced-motion`)
- Fully responsive

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy (public site + admin)

See **[DEPLOY.md](./DEPLOY.md)** for a step-by-step handoff guide (domain + server), including:

1. **Keep Vercel and attach your real domain** (fastest)
2. **Run both apps on your own Linux server**
3. Other hosts (Netlify, etc.)

Printable PDF: [`docs/CIBA-Hosting-Domain-Handoff-Guide.pdf`](./docs/CIBA-Hosting-Domain-Handoff-Guide.pdf)

## Adding your own images

All images live in **`public/images/`** and are picked up automatically — the
server checks which files exist, so nothing ever shows as broken. Supported
extensions everywhere: `.jpg`, `.jpeg`, `.png`, `.webp` (logos also `.svg`).

### Hero animation (floating tiles + centre image)

Drop any photos into `public/images/hero/` — **any filename, no config
needed**. They're detected automatically; dummy picsum.photos images are shown
only while the folder is empty.

**How many?** Anything from 8 to 20 works well — around 14 is the sweet spot.
Square-ish photos around 500×500px look best.

### Everything else (drop the file in — no code changes needed)

| Image | File to add |
| --- | --- |
| About section photo (home) | `public/images/about.jpg` |
| News posts | `public/images/news/news-1.jpg` … (match each post's `base` in `lib/newsData.js`) |
| Supporter logos (8, in order) | `public/images/partners/supporter-1.png` … `supporter-8.png` |
| Partner logos (13, in order) | `public/images/partners/partner-1.png` … `partner-13.png` |
| Team photos | `public/images/team/<name>.jpg`, e.g. `sachin-singh.jpg`, `fiona-chan.jpg` |
| Program logos | `public/images/programs/tru-generator.png`, `innovate-bc.png`, `accelerate-ip.png`, `accelerate-okanagan.png`, `discovery-foundation.png` |
| TRU Generator page | `public/images/generator/hero.jpg`, `visit.jpg`, `events.jpg`, `meet.jpg`, `quote.jpg` |

Missing news/about images fall back to placeholders; missing team photos show
initials; missing logos show the organization's name as text until you add the file.

Note: in production (`npm run build`), images are detected at build time — 
rebuild after adding new ones. The dev server picks them up on refresh.

## Brand colours

| Colour | Hex |
| --- | --- |
| Plum | `#615b73` |
| Sage | `#a9d3bd` |
| Ink | `#3c352f` |
| Cream | `#f4f2e9` |
| White | `#ffffff` |

## Project structure

```
app/            public site pages, layout, global styles
admin/          separate admin CMS app (see admin/README.md)
components/     Navbar, Hero, Footer, GenCalendar, …
lib/            CMS helpers, news/events fallbacks, images
packages/shared role helpers shared with admin
supabase/       SQL migrations + seed
public/images/  static images
```

## Admin CMS

A separate admin app manages news, events, people, partners, programs, FAQs, media, settings, and users.

See **[admin/README.md](admin/README.md)** for Supabase setup, env vars, and deploying `ciba-admin` on Vercel (Root Directory = `admin`).

```bash
npm run dev:admin   # http://localhost:3002
```
