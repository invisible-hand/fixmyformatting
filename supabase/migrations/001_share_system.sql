create extension if not exists pgcrypto;

create table if not exists public.shares (
  id text primary key check (id ~ '^[a-zA-Z0-9_-]{8}$'),
  tool text not null,
  input text not null check (octet_length(input) <= 512000),
  settings jsonb not null default '{}'::jsonb,
  stat jsonb not null default '{}'::jsonb,
  ip_hash text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '180 days'
);

create index if not exists shares_expiry_idx on public.shares (expires_at);
create index if not exists shares_rate_idx on public.shares (ip_hash, created_at desc);

alter table public.shares enable row level security;
revoke all on public.shares from anon, authenticated;

create or replace function public.create_share(
  share_id text,
  share_tool text,
  share_input text,
  share_settings jsonb,
  share_stat jsonb,
  request_ip_hash text
)
returns text
language plpgsql
security definer
set search_path = public
as $$
begin
  if octet_length(share_input) > 512000 then
    raise exception 'share_too_large';
  end if;
  if (
    select count(*) from public.shares
    where ip_hash = request_ip_hash
      and created_at > now() - interval '1 hour'
  ) >= 30 then
    raise exception 'rate_limit_exceeded';
  end if;
  insert into public.shares (id, tool, input, settings, stat, ip_hash)
  values (share_id, share_tool, share_input, coalesce(share_settings, '{}'::jsonb), coalesce(share_stat, '{}'::jsonb), request_ip_hash);
  return share_id;
end;
$$;

create or replace function public.get_share(share_id text)
returns table (id text, tool text, input text, settings jsonb, stat jsonb, created_at timestamptz)
language sql
security definer
stable
set search_path = public
as $$
  select s.id, s.tool, s.input, s.settings, s.stat, s.created_at
  from public.shares s
  where s.id = share_id and s.expires_at > now()
  limit 1;
$$;

grant execute on function public.create_share(text, text, text, jsonb, jsonb, text) to anon;
grant execute on function public.get_share(text) to anon;

create table if not exists public.tool_events (
  id bigint generated always as identity primary key,
  tool text not null,
  event text not null check (event in ('conversion', 'share', 'copy', 'download', 'embed')),
  created_at timestamptz not null default now()
);

alter table public.tool_events enable row level security;
create policy "anonymous event inserts" on public.tool_events for insert to anon with check (true);
revoke select, update, delete on public.tool_events from anon, authenticated;
grant insert on public.tool_events to anon;

create or replace function public.delete_expired_shares()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.shares where expires_at <= now();
$$;
