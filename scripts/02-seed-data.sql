-- Insert sample songs
INSERT INTO public.songs (id, title, artist, cover_art, price, genre, rating, popularity) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Midnight Dreams', 'Luna Eclipse', '/midnight-dreams-album-cover.png', 1.99, 'electronic', 4.5, 95),
('550e8400-e29b-41d4-a716-446655440002', 'Ocean Waves', 'Coastal Vibes', '/album-cover-ocean-waves.png', 2.49, 'ambient', 4.2, 87),
('550e8400-e29b-41d4-a716-446655440003', 'Electric Storm', 'Thunder Bolt', '/placeholder-bvbxg.png', 1.79, 'rock', 4.8, 92),
('550e8400-e29b-41d4-a716-446655440004', 'Jazz Café', 'Smooth Operators', '/jazz-cafe-album-cover.png', 2.99, 'jazz', 4.6, 78),
('550e8400-e29b-41d4-a716-446655440005', 'Digital Horizon', 'Cyber Pulse', '/album-cover-digital-horizon.png', 1.99, 'electronic', 4.3, 89),
('550e8400-e29b-41d4-a716-446655440006', 'Mountain Echo', 'Alpine Sounds', '/placeholder-m2dqb.png', 2.29, 'folk', 4.4, 73),
('550e8400-e29b-41d4-a716-446655440007', 'Neon Nights', 'Retro Wave', '/neon-nights-album-cover.png', 1.89, 'synthwave', 4.7, 91),
('550e8400-e29b-41d4-a716-446655440008', 'Urban Pulse', 'City Beats', '/album-cover-urban-pulse.png', 2.19, 'hip-hop', 4.1, 85),
('550e8400-e29b-41d4-a716-446655440009', 'Starlight Serenade', 'Celestial Harmony', '/album-cover-starlight-serenade.png', 2.79, 'classical', 4.9, 76),
('550e8400-e29b-41d4-a716-446655440010', 'Sunset Boulevard', 'Golden Hour', '/album-cover-sunset-boulevard.png', 1.99, 'indie', 4.5, 82),
('550e8400-e29b-41d4-a716-446655440011', 'Bass Drop', 'Heavy Frequency', '/album-cover-bass-drop.png', 1.69, 'dubstep', 4.2, 88),
('550e8400-e29b-41d4-a716-446655440012', 'Acoustic Dreams', 'Gentle Strings', '/acoustic-dreams-album-cover.png', 2.39, 'acoustic', 4.6, 71)
ON CONFLICT (id) DO NOTHING;
