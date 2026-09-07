-- CIBA CMS schema
create extension if not exists "pgcrypto";

create type public.user_role as enum ('super_admin', 'editor', 'viewer');
create type public.content_status as enum ('draft', 'published');
create type public.person_kind as enum ('exec', 'board');
create type public.partner_tier as enum ('partner', 'supporter');

-- Profiles (1:1 with auth.users)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role public.user_role not null default 'viewer',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tag text,
  teaser text,
  published_at date,
  read_time text,
  author text default 'CIBA',
  body jsonb not null default '[]'::jsonb,
  status public.content_status not null default 'draft',
  image_path text,
  media_contact jsonb,
  views int not null default 0,
  likes int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  tag text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text[] not null default '{}',
  kind public.person_kind not null default 'board',
  sort_order int not null default 0,
  photo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text,
  tier public.partner_tier not null default 'partner',
  logo_path text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  logo_path text,
  links jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workshops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text,
  program_id uuid references public.programs (id) on delete set null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resource_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  alt text,
  mime text,
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Helpers
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger news_posts_updated before update on public.news_posts
  for each row execute function public.set_updated_at();
create trigger events_updated before update on public.events
  for each row execute function public.set_updated_at();
create trigger people_updated before update on public.people
  for each row execute function public.set_updated_at();
create trigger partners_updated before update on public.partners
  for each row execute function public.set_updated_at();
create trigger programs_updated before update on public.programs
  for each row execute function public.set_updated_at();
create trigger workshops_updated before update on public.workshops
  for each row execute function public.set_updated_at();
create trigger faqs_updated before update on public.faqs
  for each row execute function public.set_updated_at();
create trigger resource_links_updated before update on public.resource_links
  for each row execute function public.set_updated_at();
create trigger site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();

create or replace function public.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles
  where id = auth.uid() and active = true;
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and active = true
      and role in ('super_admin', 'editor')
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and active = true
      and role = 'super_admin'
  );
$$;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'viewer')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.news_posts enable row level security;
alter table public.events enable row level security;
alter table public.people enable row level security;
alter table public.partners enable row level security;
alter table public.programs enable row level security;
alter table public.workshops enable row level security;
alter table public.faqs enable row level security;
alter table public.resource_links enable row level security;
alter table public.site_settings enable row level security;
alter table public.media_assets enable row level security;

-- Profiles
create policy "profiles_select_authenticated"
  on public.profiles for select to authenticated
  using (true);
create policy "profiles_update_self_or_super"
  on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_super_admin())
  with check (id = auth.uid() or public.is_super_admin());
create policy "profiles_insert_super"
  on public.profiles for insert to authenticated
  with check (public.is_super_admin());

-- News
create policy "news_public_read"
  on public.news_posts for select to anon, authenticated
  using (status = 'published' or public.is_staff());
create policy "news_staff_write"
  on public.news_posts for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Events
create policy "events_public_read"
  on public.events for select to anon, authenticated
  using (published = true or public.is_staff());
create policy "events_staff_write"
  on public.events for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- People / partners / programs / workshops — public read all (site content)
create policy "people_public_read"
  on public.people for select to anon, authenticated using (true);
create policy "people_staff_write"
  on public.people for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "partners_public_read"
  on public.partners for select to anon, authenticated using (true);
create policy "partners_staff_write"
  on public.partners for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "programs_public_read"
  on public.programs for select to anon, authenticated using (true);
create policy "programs_staff_write"
  on public.programs for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "workshops_public_read"
  on public.workshops for select to anon, authenticated using (true);
create policy "workshops_staff_write"
  on public.workshops for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "faqs_public_read"
  on public.faqs for select to anon, authenticated
  using (published = true or public.is_staff());
create policy "faqs_staff_write"
  on public.faqs for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "resource_links_public_read"
  on public.resource_links for select to anon, authenticated using (true);
create policy "resource_links_staff_write"
  on public.resource_links for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "settings_public_read"
  on public.site_settings for select to anon, authenticated using (true);
create policy "settings_staff_write"
  on public.site_settings for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "media_public_read"
  on public.media_assets for select to anon, authenticated using (true);
create policy "media_staff_write"
  on public.media_assets for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media_bucket_public_read"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

create policy "media_bucket_staff_write"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_staff());

create policy "media_bucket_staff_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_staff());

create policy "media_bucket_staff_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_staff());
-- Default site settings keys (safe to re-run)
insert into public.site_settings (key, value) values
  ('contact', '{"email":"hello@acceleratebusiness.ca","generatorEmail":"generator@acceleratebusiness.ca","phone":""}'::jsonb),
  ('socials', '{"instagram":"https://www.instagram.com/","facebook":"https://www.facebook.com/","linkedin":"https://www.linkedin.com/"}'::jsonb),
  ('land_acknowledgment', '{"text":"CIBA acknowledges that we live, work, and gather on the traditional and unceded territory of the Secwépemc Nation."}'::jsonb),
  ('generator', '{"videoId":"teA9WDKivuY"}'::jsonb),
  ('stats', '[{"label":"Ventures supported","value":"100+"},{"label":"Jobs created","value":"150+"},{"label":"Revenue generated","value":"$40M+"},{"label":"New investment","value":"$10M+"}]'::jsonb)
on conflict (key) do nothing;

-- Sample absolute events (editable in admin)
insert into public.events (title, description, location, tag, start_at, end_at, published)
select * from (values
  ('Startup Coffee', 'Casual drop-in for student founders — share ideas over coffee.', 'TRU Generator, Brown Family House of Learning', 'Meetup', now() + interval '2 days' + interval '10 hours', now() + interval '2 days' + interval '11 hours', true),
  ('Lean Startup Workshop', 'Learn Lean Startup principles and map your first experiments.', 'TRU Generator', 'Workshop', now() + interval '5 days' + interval '13 hours', now() + interval '5 days' + interval '15 hours', true),
  ('Open Mentorship Hours', 'Book time with a business mentor to pressure-test your idea.', 'TRU Generator', 'Mentorship', now() + interval '9 days' + interval '14 hours', now() + interval '9 days' + interval '16 hours', true),
  ('Pitch Practice Night', 'Practice your pitch and get feedback from peers and mentors.', 'TRU Generator', 'Workshop', now() + interval '14 days' + interval '17 hours', now() + interval '14 days' + interval '19 hours', true),
  ('Founder Speaker Series', 'Hear from a local founder on building in the Interior.', 'Brown Family House of Learning', 'Speaker', now() + interval '21 days' + interval '18 hours', now() + interval '21 days' + interval '19 hours 30 minutes', true)
) as v(title, description, location, tag, start_at, end_at, published)
where not exists (select 1 from public.events limit 1);

insert into public.resource_links (label, href, sort_order)
select * from (values
  ('Lean Startup Principles', 'http://theleanstartup.com/principles', 1),
  ('Business Model Canvas', 'https://canvanizer.com/new/business-model-canvas', 2)
) as v(label, href, sort_order)
where not exists (select 1 from public.resource_links limit 1);
-- Optional: seed Generator FAQs (safe if already present)
insert into public.faqs (question, answer, sort_order, published)
select * from (values
  ('What is the TRU Generator?', 'We provide mentorship, education, and entrepreneurial support, as well as helping identify possible grant opportunities for TRU students, alumni, faculty, and staff.', 1, true),
  ('What is Kamloops Innovation Centre?', 'We are a non-profit that supports tech entrepreneurs with programs, mentorship, and shared office spaces in Kamloops and the region.', 2, true),
  ('Can you help me start my business?', 'Definitely! We can provide a business mentor and connect you with community resources.', 3, true),
  ('Does my business need to feature a lot of technology?', 'No. Ventures need to be innovative, but not necessarily technology-focused.', 4, true),
  ('Does the TRU Generator take a share in my company?', 'No. We do not take equity in your company.', 5, true)
) as v(question, answer, sort_order, published)
where not exists (select 1 from public.faqs limit 1);
