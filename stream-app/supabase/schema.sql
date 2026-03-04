-- ============================================================
-- StreamApp - Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ========================
-- SHOWS
-- ========================
create table if not exists public.shows (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  thumbnail   text not null,
  banner      text not null,
  category    text not null,       -- 'series' | 'movie' | 'live'
  genres      text[] not null default '{}',
  year        integer not null,
  rating      text not null,       -- e.g. 'PG-13', 'TV-MA'
  featured    boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.shows enable row level security;

create policy "Shows are viewable by everyone"
  on public.shows for select using (true);

-- ========================
-- EPISODES
-- ========================
create table if not exists public.episodes (
  id             uuid primary key default uuid_generate_v4(),
  show_id        uuid not null references public.shows(id) on delete cascade,
  title          text not null,
  description    text not null,
  video_url      text not null,
  season         integer not null default 1,
  episode_number integer not null,
  duration       integer not null,  -- in seconds
  thumbnail      text not null,
  created_at     timestamptz not null default now()
);

alter table public.episodes enable row level security;

create policy "Episodes are viewable by everyone"
  on public.episodes for select using (true);

-- ========================
-- WATCHLIST
-- ========================
create table if not exists public.watchlist (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  show_id    uuid not null references public.shows(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, show_id)
);

alter table public.watchlist enable row level security;

create policy "Users can manage their own watchlist"
  on public.watchlist for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ========================
-- WATCH PROGRESS
-- ========================
create table if not exists public.watch_progress (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  episode_id  uuid not null references public.episodes(id) on delete cascade,
  progress    integer not null default 0,  -- seconds watched
  completed   boolean not null default false,
  updated_at  timestamptz not null default now(),
  unique(user_id, episode_id)
);

alter table public.watch_progress enable row level security;

create policy "Users can manage their own watch progress"
  on public.watch_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ========================
-- INDEXES
-- ========================
create index on public.episodes(show_id);
create index on public.episodes(season, episode_number);
create index on public.watchlist(user_id);
create index on public.watch_progress(user_id);
create index on public.watch_progress(episode_id);
create index on public.shows(category);
create index on public.shows(featured) where featured = true;
