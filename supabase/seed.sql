-- MyTripDesigner — jeu de données de départ
--
-- Reprend exactement le contenu de lib/data/demo.ts, afin qu'un projet Supabase
-- fraîchement initialisé ressemble à ce que l'on voit en mode démo.
-- Les images pointent vers picsum.photos : ce sont des placeholders, à remplacer
-- par les photos réelles depuis l'administration.
--
-- Idempotent : relancer ce fichier met à jour les lignes existantes.

-- ---------------------------------------------------------------------------
-- Voyages
-- ---------------------------------------------------------------------------

insert into public.trips (
  id, slug, title, destination, country, duration_days, price_from,
  summary, description, cover_image_url, gallery, tags, status, is_featured, sort_order
) values
(
  '11111111-1111-4111-8111-111111111111',
  'japon-tokyo-alpes-japonaises',
  'Le Japon entre Tokyo et les Alpes japonaises',
  'Tokyo, Takayama, Kyoto',
  'Japon',
  15,
  2450.00,
  'Quinze jours pour relier l''effervescence de Tokyo aux villages de montagne de Hida, puis descendre vers Kyoto en évitant les heures de foule.',
  E'Ce voyage alterne grandes villes et vallées reculées, avec des trajets pensés pour ne jamais passer plus de trois heures dans un train.\n\nAu programme : trois nuits à Tokyo dans le quartier de Yanaka, la route du Nakasendo à pied entre Magome et Tsumago, deux nuits en ryokan à Takayama avec bain thermal privatif, puis Kyoto en fin de parcours quand la fatigue invite à ralentir.\n\nLe carnet remis avant le départ contient les réservations de trains, les horaires conseillés pour chaque temple et une sélection de trente adresses testées, des izakaya de quartier aux cafés de Nishiki.',
  'https://picsum.photos/seed/mtd-japon/1200/800',
  '["https://picsum.photos/seed/mtd-japon-2/1200/800", "https://picsum.photos/seed/mtd-japon-3/1200/800"]'::jsonb,
  array['Culture', 'Randonnée', 'Première fois au Japon'],
  'published',
  true,
  1
),
(
  '22222222-2222-4222-8222-222222222222',
  'islande-road-trip-sud',
  'Road trip en Islande, du sud aux Hautes Terres',
  'Reykjavik, Vík, Landmannalaugar',
  'Islande',
  10,
  2100.00,
  'Dix jours de conduite libre le long de la côte sud, avec deux incursions dans les Hautes Terres et des étapes calées sur la météo plutôt que sur un planning rigide.',
  E'L''Islande se prête mal aux itinéraires figés : la météo décide. Ce parcours propose donc deux versions de chaque journée, l''une par beau temps, l''autre par pluie ou vent fort.\n\nLe véhicule 4x4 et les hébergements sont réservés à l''avance, mais l''ordre des étapes reste souple jusqu''à 24 heures avant. Vous recevez chaque matin les prévisions traduites et l''état des pistes F.\n\nInclus : la piste F208 vers Landmannalaugar, deux sources chaudes hors des circuits, et un créneau aurores boréales conseillé selon l''indice KP.',
  'https://picsum.photos/seed/mtd-islande/1200/800',
  '["https://picsum.photos/seed/mtd-islande-2/1200/800"]'::jsonb,
  array['Road trip', 'Nature', 'Petit groupe'],
  'published',
  true,
  2
),
(
  '33333333-3333-4333-8333-333333333333',
  'portugal-lisbonne-alentejo-famille',
  'Lisbonne et l''Alentejo en famille',
  'Lisbonne, Évora, Comporta',
  'Portugal',
  8,
  1250.00,
  'Une semaine pensée pour des enfants de 4 à 10 ans : des journées courtes, des plages à proximité et des hébergements avec cuisine.',
  E'Voyager avec de jeunes enfants demande de retirer des étapes plutôt que d''en ajouter. Ce parcours ne compte que trois hébergements en huit jours.\n\nLisbonne sur trois nuits, avec les tramways comme attraction principale et le marché de Campo de Ourique pour les repas. Puis Évora et ses cigognes, avant quatre nuits à Comporta entre rizières et plage.\n\nLe carnet indique pour chaque activité la durée réelle avec enfants, les points d''eau et les restaurants qui acceptent les arrivées à 19 h.',
  'https://picsum.photos/seed/mtd-portugal/1200/800',
  '[]'::jsonb,
  array['Famille', 'Plage', 'Court séjour'],
  'published',
  false,
  3
),
(
  '44444444-4444-4444-8444-444444444444',
  'perou-cusco-vallee-sacree',
  'Pérou : Cusco, la Vallée sacrée et le Machu Picchu',
  'Cusco, Ollantaytambo, Aguas Calientes',
  'Pérou',
  12,
  2900.00,
  'Douze jours avec une acclimatation progressive à l''altitude avant le Machu Picchu, et deux jours de marge pour les imprévus ferroviaires.',
  E'Brouillon en cours de préparation : les hébergements de la Vallée sacrée sont en cours de sélection et les tarifs 2027 ne sont pas encore publiés.\n\nL''ossature du parcours est en place : arrivée à Cusco, trois nuits à 2 800 m dans la Vallée sacrée avant de remonter, entrée au Machu Picchu en créneau de 6 h, puis retour par Puno et le lac Titicaca.',
  'https://picsum.photos/seed/mtd-perou/1200/800',
  '[]'::jsonb,
  array['Altitude', 'Patrimoine'],
  'draft',
  false,
  4
)
on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  destination = excluded.destination,
  country = excluded.country,
  duration_days = excluded.duration_days,
  price_from = excluded.price_from,
  summary = excluded.summary,
  description = excluded.description,
  cover_image_url = excluded.cover_image_url,
  gallery = excluded.gallery,
  tags = excluded.tags,
  status = excluded.status,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;

-- ---------------------------------------------------------------------------
-- Services
-- ---------------------------------------------------------------------------

insert into public.services (
  id, slug, title, tagline, description, price_from, features, status, sort_order
) values
(
  'aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
  'appel-decouverte',
  'Appel découverte',
  '45 minutes pour cadrer le projet',
  'Un échange en visio pour comprendre vos envies, votre budget et vos contraintes de dates. Vous repartez avec une première trame de voyage et une estimation de budget réaliste, même si vous ne poursuivez pas ensuite.',
  45.00,
  array['Visio de 45 minutes', 'Compte rendu écrit sous 48 h', 'Estimation de budget', 'Déduit du tarif si vous poursuivez'],
  'published',
  1
),
(
  'aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
  'itineraire-sur-mesure',
  'Itinéraire sur mesure',
  'Le parcours, jour par jour',
  'Je construis l''itinéraire complet à partir de vos envies : rythme, distances, saison, hébergements conseillés et alternatives en cas de mauvais temps. Vous réservez vous-même, avec les liens et les fourchettes de prix.',
  290.00,
  array['Itinéraire jour par jour', 'Deux allers-retours de modifications', 'Hébergements présélectionnés', 'Alternatives météo'],
  'published',
  2
),
(
  'aaaaaaa3-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
  'carnet-de-voyage',
  'Carnet de voyage complet',
  'Tout le voyage dans un seul document',
  'L''itinéraire sur mesure, enrichi d''un carnet consultable hors connexion : cartes annotées, adresses testées, phrases utiles, budget détaillé et fiches pratiques par étape.',
  450.00,
  array['Carnet PDF et version mobile hors connexion', 'Cartes annotées téléchargeables', '30 à 50 adresses sélectionnées', 'Fiches pratiques par étape'],
  'published',
  3
),
(
  'aaaaaaa4-aaaa-4aaa-8aaa-aaaaaaaaaaa4',
  'reservations-et-logistique',
  'Réservations et logistique',
  'Je m''occupe de tout réserver',
  'Vols, trains, hébergements, location de voiture et activités à créneau : je réserve à votre place et centralise les confirmations. Une assistance par message reste ouverte pendant tout le voyage.',
  190.00,
  array['Réservations effectuées à votre place', 'Confirmations centralisées', 'Assistance par message pendant le voyage', 'Gestion des annulations'],
  'published',
  4
)
on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  tagline = excluded.tagline,
  description = excluded.description,
  price_from = excluded.price_from,
  features = excluded.features,
  status = excluded.status,
  sort_order = excluded.sort_order;

-- ---------------------------------------------------------------------------
-- Avis
-- ---------------------------------------------------------------------------

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
),
(
  'bbbbbbb5-bbbb-4bbb-8bbb-bbbbbbbbbbb5',
  'Marion L.',
  'Toulouse',
  5,
  'Avis déposé après notre retour, à valider avant publication. Le voyage était magnifique et l''assistance par message pendant le séjour nous a sauvés lors d''une grève de train.',
  null,
  '2026-10-01',
  'pending',
  false,
  4
)
on conflict (id) do update set
  author_name = excluded.author_name,
  author_location = excluded.author_location,
  rating = excluded.rating,
  content = excluded.content,
  trip_id = excluded.trip_id,
  travel_date = excluded.travel_date,
  status = excluded.status,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;

-- ---------------------------------------------------------------------------
-- Contenus de pages éditables
-- ---------------------------------------------------------------------------

insert into public.site_content (key, label, kind, value, sort_order) values
('site.name', 'Nom affiché du site', 'text', 'MyTripDesigner', 1),
('site.email', 'Adresse e-mail de contact', 'text', 'agathe@mytripdesigner.fr', 2),
('site.phone', 'Téléphone (optionnel)', 'text', '', 3),
('site.instagram', 'Compte Instagram (optionnel)', 'text', '@my_trip_designer', 4),
('home.hero.eyebrow', 'Accueil — surtitre', 'text', 'Créatrice de voyages sur mesure', 10),
('home.hero.title', 'Accueil — titre principal', 'text', 'Votre voyage sur-mesure, avec l''esprit Dolce Vita', 11),
('home.hero.subtitle', 'Accueil — sous-titre', 'richtext', 'Je conçois des itinéraires uniques et immersifs en Europe et dans le monde entier, avec une expertise toute particulière pour l''Italie. Confiez-moi votre projet et partez l''esprit léger.', 12),
('home.hero.cta', 'Accueil — libellé du bouton principal', 'text', 'Réserver mon appel découverte', 13),
('home.services.title', 'Accueil — titre de la section services', 'text', 'Choisissez votre façon de voyager', 20),
('home.services.intro', 'Accueil — introduction des services', 'richtext', 'Quatre formules, du simple appel de cadrage à la prise en charge complète des réservations.', 21),
('home.trips.title', 'Accueil — titre de la section voyages', 'text', 'Quelques voyages déjà conçus', 30),
('home.trips.intro', 'Accueil — introduction des voyages', 'richtext', 'Ces itinéraires ont été construits pour de vraies familles et de vrais couples. Ils servent de point de départ, jamais de catalogue figé.', 31),
('home.reviews.title', 'Accueil — titre de la section avis', 'text', 'Ce qu''en disent les voyageurs', 40),
('home.about.title', 'Accueil — titre « à propos »', 'text', 'Ciao, moi c''est Agathe !', 50),
('home.about.body', 'Accueil — texte « à propos »', 'richtext', 'Franco-italienne installée à Rome, j''infuse l''esprit de la Dolce Vita dans chacun de vos voyages. Si l''Italie est mon terrain de jeu quotidien, mon expertise s''étend à l''Europe et au reste du monde pour concevoir des séjours uniques.' || E'\n\n' || 'Mon obsession ? Ne pas seulement vous faire visiter une destination, mais vous faire repartir avec des souvenirs plein la tête.', 51),
('contact.title', 'Contact — titre', 'text', 'Parlons de votre prochain voyage', 60),
('contact.intro', 'Contact — introduction', 'richtext', 'Décrivez votre projet en quelques lignes, même s''il est encore flou. Je réponds sous deux jours ouvrés avec une première piste et le tarif correspondant.', 61),
('contact.confirmation', 'Contact — message après envoi', 'richtext', 'Merci, votre demande est bien arrivée. Je vous réponds sous deux jours ouvrés à l''adresse indiquée.', 62),
('footer.tagline', 'Pied de page — accroche', 'text', 'Créatrice de souvenirs', 70)
-- `value` est volontairement absent du update : relancer le seed ne réécrit pas
-- les textes déjà modifiés depuis l'administration.
on conflict (key) do update set
  label = excluded.label,
  kind = excluded.kind,
  sort_order = excluded.sort_order;
