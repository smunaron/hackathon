-- ============================================================
-- StreamApp - Seed Data
-- Run AFTER schema.sql in your Supabase SQL Editor
-- Uses Picsum Photos for thumbnails and Big Buck Bunny for video
-- ============================================================

-- SHOWS
insert into public.shows (id, title, description, thumbnail, banner, category, genres, year, rating, featured) values
(
  'a1b2c3d4-0001-0000-0000-000000000001',
  'Neon Horizon',
  'In a sprawling cyberpunk megacity, a rogue detective hunts a serial killer who leaves digital fingerprints in the city''s neural network. A gripping noir thriller set in 2087.',
  'https://picsum.photos/seed/neon/400/600',
  'https://picsum.photos/seed/neonbanner/1920/800',
  'series',
  array['Thriller', 'Sci-Fi', 'Crime'],
  2024, 'TV-MA', true
),
(
  'a1b2c3d4-0002-0000-0000-000000000002',
  'The Last Harvest',
  'A family of farmers fights to save their land against a massive agro-corporation while uncovering a dark secret buried beneath their fields.',
  'https://picsum.photos/seed/harvest/400/600',
  'https://picsum.photos/seed/harvestbanner/1920/800',
  'series',
  array['Drama', 'Mystery'],
  2023, 'TV-14', false
),
(
  'a1b2c3d4-0003-0000-0000-000000000003',
  'Velocity',
  'The world''s most daring street racer must navigate underground circuits across five continents to clear his brother''s name.',
  'https://picsum.photos/seed/velocity/400/600',
  'https://picsum.photos/seed/velocitybanner/1920/800',
  'movie',
  array['Action', 'Thriller'],
  2024, 'PG-13', true
),
(
  'a1b2c3d4-0004-0000-0000-000000000004',
  'Deep Blue Silence',
  'A marine biologist discovers an ancient intelligence lurking in the Mariana Trench. But making contact may cost her everything.',
  'https://picsum.photos/seed/ocean/400/600',
  'https://picsum.photos/seed/oceanbanner/1920/800',
  'movie',
  array['Sci-Fi', 'Adventure'],
  2023, 'PG-13', false
),
(
  'a1b2c3d4-0005-0000-0000-000000000005',
  'Crowned',
  'Behind the glittering facade of Europe''s last absolute monarchy, loyalties fracture and alliances crumble as the king''s health fails.',
  'https://picsum.photos/seed/crown/400/600',
  'https://picsum.photos/seed/crownbanner/1920/800',
  'series',
  array['Drama', 'Historical'],
  2024, 'TV-14', false
),
(
  'a1b2c3d4-0006-0000-0000-000000000006',
  'Laughing Stock',
  'A stand-up comedian gets hired as a CEO''s personal coach and accidentally ends up saving the company.',
  'https://picsum.photos/seed/comedy/400/600',
  'https://picsum.photos/seed/comedybanner/1920/800',
  'series',
  array['Comedy'],
  2024, 'TV-14', false
),
(
  'a1b2c3d4-0007-0000-0000-000000000007',
  'Iron Verdict',
  'A no-nonsense judge navigates a justice system rotten to the core, fighting corruption case by case.',
  'https://picsum.photos/seed/judge/400/600',
  'https://picsum.photos/seed/judgebanner/1920/800',
  'series',
  array['Crime', 'Drama'],
  2023, 'TV-MA', false
),
(
  'a1b2c3d4-0008-0000-0000-000000000008',
  'Frostbound',
  'A survival story set in the Arctic: six strangers stranded after a plane crash must work together—or perish.',
  'https://picsum.photos/seed/frost/400/600',
  'https://picsum.photos/seed/frostbanner/1920/800',
  'series',
  array['Thriller', 'Adventure'],
  2024, 'TV-14', false
),
(
  'a1b2c3d4-0009-0000-0000-000000000009',
  'Wavelength',
  'Two strangers begin hearing each other''s thoughts through an inexplicable connection—and fall dangerously in love.',
  'https://picsum.photos/seed/wave/400/600',
  'https://picsum.photos/seed/wavebanner/1920/800',
  'movie',
  array['Romance', 'Sci-Fi'],
  2023, 'PG-13', false
),
(
  'a1b2c3d4-0010-0000-0000-000000000010',
  'The Botanist',
  'A reclusive plant scientist accidentally creates a sentient organism and must decide its fate before the government finds out.',
  'https://picsum.photos/seed/plant/400/600',
  'https://picsum.photos/seed/plantbanner/1920/800',
  'movie',
  array['Sci-Fi', 'Drama'],
  2024, 'PG-13', false
);

-- EPISODES for Neon Horizon (S1)
insert into public.episodes (show_id, title, description, video_url, season, episode_number, duration, thumbnail) values
(
  'a1b2c3d4-0001-0000-0000-000000000001',
  'Ghost Signal',
  'Detective Mara Vale receives a cryptic tip from an anonymous source inside the neural grid.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  1, 1, 2640,
  'https://picsum.photos/seed/ep1neon/400/225'
),
(
  'a1b2c3d4-0001-0000-0000-000000000001',
  'Phantom Protocol',
  'The killer strikes again, leaving a trail only Mara can decode.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  1, 2, 2820,
  'https://picsum.photos/seed/ep2neon/400/225'
),
(
  'a1b2c3d4-0001-0000-0000-000000000001',
  'Layers',
  'Mara goes undercover in the city''s illegal augmentation market.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  1, 3, 2700,
  'https://picsum.photos/seed/ep3neon/400/225'
),
(
  'a1b2c3d4-0001-0000-0000-000000000001',
  'Dead Frequency',
  'A witness goes missing just before they were to testify.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  1, 4, 2760,
  'https://picsum.photos/seed/ep4neon/400/225'
),
(
  'a1b2c3d4-0001-0000-0000-000000000001',
  'Dark Matter',
  'The trail leads Mara to the highest levels of corporate power.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  1, 5, 3180,
  'https://picsum.photos/seed/ep5neon/400/225'
);

-- EPISODES for The Last Harvest (S1)
insert into public.episodes (show_id, title, description, video_url, season, episode_number, duration, thumbnail) values
(
  'a1b2c3d4-0002-0000-0000-000000000002',
  'Roots',
  'The Calloway family braces for another difficult season on their ancestral farm.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  1, 1, 2580,
  'https://picsum.photos/seed/ep1harvest/400/225'
),
(
  'a1b2c3d4-0002-0000-0000-000000000002',
  'The Offer',
  'A suspicious buyout offer arrives from MegaCrop Inc.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  1, 2, 2520,
  'https://picsum.photos/seed/ep2harvest/400/225'
),
(
  'a1b2c3d4-0002-0000-0000-000000000002',
  'What Lies Beneath',
  'Excavation on the far field reveals something that was never meant to be found.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  1, 3, 2700,
  'https://picsum.photos/seed/ep3harvest/400/225'
);

-- EPISODES for Velocity (Movie — 1 entry)
insert into public.episodes (show_id, title, description, video_url, season, episode_number, duration, thumbnail) values
(
  'a1b2c3d4-0003-0000-0000-000000000003',
  'Velocity',
  'Full movie — underground racing across five continents.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  1, 1, 6840,
  'https://picsum.photos/seed/velocityep/400/225'
);

-- EPISODES for Deep Blue Silence (Movie)
insert into public.episodes (show_id, title, description, video_url, season, episode_number, duration, thumbnail) values
(
  'a1b2c3d4-0004-0000-0000-000000000004',
  'Deep Blue Silence',
  'Full movie — the Mariana Trench hides more than fish.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  1, 1, 7200,
  'https://picsum.photos/seed/oceanep/400/225'
);

-- EPISODES for Crowned (S1)
insert into public.episodes (show_id, title, description, video_url, season, episode_number, duration, thumbnail) values
(
  'a1b2c3d4-0005-0000-0000-000000000005',
  'The Throne Room',
  'The king''s condition worsens, setting off a scramble for succession.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  1, 1, 3000,
  'https://picsum.photos/seed/ep1crown/400/225'
),
(
  'a1b2c3d4-0005-0000-0000-000000000005',
  'Alliances',
  'The royal council forms unlikely partnerships.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  1, 2, 2880,
  'https://picsum.photos/seed/ep2crown/400/225'
);

-- EPISODES for Laughing Stock (S1)
insert into public.episodes (show_id, title, description, video_url, season, episode_number, duration, thumbnail) values
(
  'a1b2c3d4-0006-0000-0000-000000000006',
  'Day One',
  'Marcus''s first day as a CEO coach goes spectacularly wrong.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  1, 1, 1740,
  'https://picsum.photos/seed/ep1comedy/400/225'
),
(
  'a1b2c3d4-0006-0000-0000-000000000006',
  'The Pitch',
  'Marcus is accidentally put in front of the board of directors.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  1, 2, 1800,
  'https://picsum.photos/seed/ep2comedy/400/225'
);
