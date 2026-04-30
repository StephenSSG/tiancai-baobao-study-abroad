create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  grade text not null,
  city text not null default '',
  curriculum text not null,
  target_direction text not null,
  academic_profile text not null,
  contact text not null,
  note text,
  source text not null default 'website',
  status text not null default 'new',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.leads add column if not exists city text not null default '';

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

alter table public.leads enable row level security;

drop policy if exists "No public read access" on public.leads;
create policy "No public read access"
  on public.leads
  for select
  using (false);

drop policy if exists "No public write access" on public.leads;
create policy "No public write access"
  on public.leads
  for insert
  with check (false);
