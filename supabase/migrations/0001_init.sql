-- MyTripDesigner — schéma initial
--
-- À appliquer sur un projet Supabase, soit via la CLI (`supabase db push`),
-- soit en collant ce fichier dans l'éditeur SQL du dashboard.
--
-- Modèle de sécurité :
--   * le site public lit avec la clé `anon`, encadrée par les politiques RLS
--     définies plus bas (seuls les contenus publiés sont lisibles) ;
--   * l'administration écrit avec la clé `service_role`, qui contourne RLS et
--     n'est jamais exposée au navigateur.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------

do $$ begin
  create type publication_status as enum ('draft', 'published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type review_status as enum ('pending', 'published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_status as enum ('new', 'in_progress', 'answered', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type content_kind as enum ('text', 'richtext');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Fonction utilitaire : mise à jour automatique de updated_at
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- trips — voyages et exemples d'itinéraires
-- ---------------------------------------------------------------------------

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  destination text not null,
  country text,
  duration_days integer check (duration_days is null or duration_days > 0),
  price_from numeric(10, 2) check (price_from is null or price_from >= 0),
  summary text not null,
  description text,
  cover_image_url text,
  gallery jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  status publication_status not null default 'draft',
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists trips_status_sort_idx
  on public.trips (status, sort_order, created_at desc);

drop trigger if exists trips_set_updated_at on public.trips;
create trigger trips_set_updated_at
  before update on public.trips
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- services — formules proposées
-- ---------------------------------------------------------------------------

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text,
  description text not null,
  price_from numeric(10, 2) check (price_from is null or price_from >= 0),
  features text[] not null default '{}',
  status publication_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists services_status_sort_idx
  on public.services (status, sort_order);

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- reviews — avis clients
-- ---------------------------------------------------------------------------

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_location text,
  rating smallint not null check (rating between 1 and 5),
  content text not null,
  trip_id uuid references public.trips (id) on delete set null,
  travel_date date,
  status review_status not null default 'pending',
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reviews_status_sort_idx
  on public.reviews (status, sort_order, created_at desc);
create index if not exists reviews_trip_idx on public.reviews (trip_id);

drop trigger if exists reviews_set_updated_at on public.reviews;
create trigger reviews_set_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- leads — demandes de contact / devis
-- ---------------------------------------------------------------------------

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  destination text,
  travel_period text,
  party_size integer check (party_size is null or party_size > 0),
  budget_range text,
  message text not null,
  status lead_status not null default 'new',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_created_idx
  on public.leads (status, created_at desc);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- site_content — blocs de texte éditables
-- ---------------------------------------------------------------------------

create table if not exists public.site_content (
  key text primary key,
  label text not null,
  kind content_kind not null default 'text',
  value text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.trips enable row level security;
alter table public.services enable row level security;
alter table public.reviews enable row level security;
alter table public.leads enable row level security;
alter table public.site_content enable row level security;

-- Lecture publique : uniquement les contenus publiés.
drop policy if exists "trips_public_read" on public.trips;
create policy "trips_public_read" on public.trips
  for select to anon, authenticated
  using (status = 'published');

drop policy if exists "services_public_read" on public.services;
create policy "services_public_read" on public.services
  for select to anon, authenticated
  using (status = 'published');

drop policy if exists "reviews_public_read" on public.reviews;
create policy "reviews_public_read" on public.reviews
  for select to anon, authenticated
  using (status = 'published');

drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read" on public.site_content
  for select to anon, authenticated
  using (true);

-- Le formulaire de contact peut créer une demande, mais personne ne peut la
-- relire avec la clé anon : les demandes ne sortent que côté serveur.
drop policy if exists "leads_public_insert" on public.leads;
create policy "leads_public_insert" on public.leads
  for insert to anon, authenticated
  with check (true);

-- Aucune politique d'écriture sur les autres tables : les mutations de
-- l'administration passent exclusivement par la clé service_role.

-- ---------------------------------------------------------------------------
-- Storage : bucket public pour les photos de voyages
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'media');
