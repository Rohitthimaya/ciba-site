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
