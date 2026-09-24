-- Remplace l'ancien seed (Claire et Julien, Sophie M., Famille Ferreira,
-- Antoine D., Marion L.) par les trois avis validés de la vitrine.

delete from public.reviews;

insert into public.reviews (
  id, author_name, author_location, rating, content, trip_id, travel_date,
  status, is_featured, sort_order
) values
(
  'bbbbbbb1-bbbb-4bbb-8bbb-bbbbbbbbbbb1',
  'Alya',
  'Roadtrip en Italie',
  5,
  $review1$Un voyage magnifique en famille ! Grâce aux recommandations d'Agathe, on a profité de tellement de choses en peu de temps et évité les pièges à touristes. Un mix parfait de culture, nature et gastronomie. Vivement notre prochain voyage !$review1$,
  null,
  '2026-04-12',
  'published',
  true,
  1
),
(
  'bbbbbbb2-bbbb-4bbb-8bbb-bbbbbbbbbbb2',
  'Karine',
  'Family Trip à Florence',
  5,
  $review2$Ce carnet m'a été précieux, quel temps de gagné ! C'est ultra-complet sans avoir à parcourir des centaines de pages. Les adresses ont été un sans-faute et de vraies pépite locales. Un séjour sur mesure sans aucune charge mentale ni stress !$review2$,
  null,
  '2026-09-03',
  'published',
  true,
  2
),
(
  'bbbbbbb3-bbbb-4bbb-8bbb-bbbbbbbbbbb3',
  'Chema',
  'Family & Friend Trip à Barcelone',
  5,
  $review3$Agathe a parfaitement compris notre besoin pour ce voyage en famille. Elle a su allier détente, culture et activités adaptées aux enfants. Un grand merci pour ce joli carnet aussi utile qu'attentionné !$review3$,
  null,
  '2026-07-20',
  'published',
  true,
  3
);
