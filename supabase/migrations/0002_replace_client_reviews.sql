-- Remplace l'intégralité des avis par le jeu validé de la vitrine.

delete from public.reviews;

insert into public.reviews (
  id, author_name, author_location, rating, content, trip_id, travel_date,
  status, is_featured, sort_order
) values
(
  'bbbbbbb1-bbbb-4bbb-8bbb-bbbbbbbbbbb1',
  'Karine',
  'Voyage sur mesure',
  5,
  $review1$Une organisation sans faute ! Agathe a su cerner nos envies dès le premier échange. Les adresses recommandées étaient de vraies pépites hors des sentiers battus.$review1$,
  null,
  '2026-09-03',
  'published',
  true,
  1
),
(
  'bbbbbbb2-bbbb-4bbb-8bbb-bbbbbbbbbbb2',
  'Alya',
  'Road trip & Carnet',
  5,
  $review2$Un gain de temps incroyable et zéro charge mentale. Le carnet de voyage était d'une précision exemplaire, nous n'avions plus qu'à profiter.$review2$,
  null,
  '2026-04-12',
  'published',
  true,
  2
),
(
  'bbbbbbb3-bbbb-4bbb-8bbb-bbbbbbbbbbb3',
  'Chema',
  'Séjour personnalisé',
  5,
  $review3$Grâce à Agathe, nous avons évité tous les pièges à touristes. Un itinéraire parfaitement équilibré entre visites culturelles et moments de détente.$review3$,
  null,
  '2026-07-20',
  'published',
  true,
  3
);
