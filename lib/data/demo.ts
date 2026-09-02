import type {
  Lead,
  Review,
  Service,
  SiteContentEntry,
  Trip,
} from "@/lib/data/types";

/**
 * Jeu de démonstration utilisé tant que Supabase n'est pas configuré.
 *
 * Il reprend le contenu de supabase/seed.sql : une fois les clés renseignées et
 * le seed appliqué, le site affiche exactement la même chose, mais persistée.
 * Les images pointent vers picsum.photos et sont des placeholders.
 */

const now = "2026-01-15T09:00:00.000Z";

export const demoTrips: Trip[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    slug: "japon-tokyo-alpes-japonaises",
    title: "Le Japon entre Tokyo et les Alpes japonaises",
    destination: "Tokyo, Takayama, Kyoto",
    country: "Japon",
    durationDays: 15,
    priceFrom: 2450,
    summary:
      "Quinze jours pour relier l'effervescence de Tokyo aux villages de montagne de Hida, puis descendre vers Kyoto en évitant les heures de foule.",
    description:
      "Ce voyage alterne grandes villes et vallées reculées, avec des trajets pensés pour ne jamais passer plus de trois heures dans un train.\n\nAu programme : trois nuits à Tokyo dans le quartier de Yanaka, la route du Nakasendo à pied entre Magome et Tsumago, deux nuits en ryokan à Takayama avec bain thermal privatif, puis Kyoto en fin de parcours quand la fatigue invite à ralentir.\n\nLe carnet remis avant le départ contient les réservations de trains, les horaires conseillés pour chaque temple et une sélection de trente adresses testées, des izakaya de quartier aux cafés de Nishiki.",
    coverImageUrl: "https://picsum.photos/seed/mtd-japon/1200/800",
    gallery: [
      "https://picsum.photos/seed/mtd-japon-2/1200/800",
      "https://picsum.photos/seed/mtd-japon-3/1200/800",
    ],
    tags: ["Culture", "Randonnée", "Première fois au Japon"],
    status: "published",
    isFeatured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    slug: "islande-road-trip-sud",
    title: "Road trip en Islande, du sud aux Hautes Terres",
    destination: "Reykjavik, Vík, Landmannalaugar",
    country: "Islande",
    durationDays: 10,
    priceFrom: 2100,
    summary:
      "Dix jours de conduite libre le long de la côte sud, avec deux incursions dans les Hautes Terres et des étapes calées sur la météo plutôt que sur un planning rigide.",
    description:
      "L'Islande se prête mal aux itinéraires figés : la météo décide. Ce parcours propose donc deux versions de chaque journée, l'une par beau temps, l'autre par pluie ou vent fort.\n\nLe véhicule 4x4 et les hébergements sont réservés à l'avance, mais l'ordre des étapes reste souple jusqu'à 24 heures avant. Vous recevez chaque matin les prévisions traduites et l'état des pistes F.\n\nInclus : la piste F208 vers Landmannalaugar, deux sources chaudes hors des circuits, et un créneau aurores boréales conseillé selon l'indice KP.",
    coverImageUrl: "https://picsum.photos/seed/mtd-islande/1200/800",
    gallery: ["https://picsum.photos/seed/mtd-islande-2/1200/800"],
    tags: ["Road trip", "Nature", "Petit groupe"],
    status: "published",
    isFeatured: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    slug: "portugal-lisbonne-alentejo-famille",
    title: "Lisbonne et l'Alentejo en famille",
    destination: "Lisbonne, Évora, Comporta",
    country: "Portugal",
    durationDays: 8,
    priceFrom: 1250,
    summary:
      "Une semaine pensée pour des enfants de 4 à 10 ans : des journées courtes, des plages à proximité et des hébergements avec cuisine.",
    description:
      "Voyager avec de jeunes enfants demande de retirer des étapes plutôt que d'en ajouter. Ce parcours ne compte que trois hébergements en huit jours.\n\nLisbonne sur trois nuits, avec les tramways comme attraction principale et le marché de Campo de Ourique pour les repas. Puis Évora et ses cigognes, avant quatre nuits à Comporta entre rizières et plage.\n\nLe carnet indique pour chaque activité la durée réelle avec enfants, les points d'eau et les restaurants qui acceptent les arrivées à 19 h.",
    coverImageUrl: "https://picsum.photos/seed/mtd-portugal/1200/800",
    gallery: [],
    tags: ["Famille", "Plage", "Court séjour"],
    status: "published",
    isFeatured: false,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    slug: "perou-cusco-vallee-sacree",
    title: "Pérou : Cusco, la Vallée sacrée et le Machu Picchu",
    destination: "Cusco, Ollantaytambo, Aguas Calientes",
    country: "Pérou",
    durationDays: 12,
    priceFrom: 2900,
    summary:
      "Douze jours avec une acclimatation progressive à l'altitude avant le Machu Picchu, et deux jours de marge pour les imprévus ferroviaires.",
    description:
      "Brouillon en cours de préparation : les hébergements de la Vallée sacrée sont en cours de sélection et les tarifs 2027 ne sont pas encore publiés.\n\nL'ossature du parcours est en place : arrivée à Cusco, trois nuits à 2 800 m dans la Vallée sacrée avant de remonter, entrée au Machu Picchu en créneau de 6 h, puis retour par Puno et le lac Titicaca.",
    coverImageUrl: "https://picsum.photos/seed/mtd-perou/1200/800",
    gallery: [],
    tags: ["Altitude", "Patrimoine"],
    status: "draft",
    isFeatured: false,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
];

export const demoServices: Service[] = [
  {
    id: "aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
    slug: "appel-decouverte",
    title: "Appel découverte",
    tagline: "45 minutes pour cadrer le projet",
    description:
      "Un échange en visio pour comprendre vos envies, votre budget et vos contraintes de dates. Vous repartez avec une première trame de voyage et une estimation de budget réaliste, même si vous ne poursuivez pas ensuite.",
    priceFrom: 45,
    features: [
      "Visio de 45 minutes",
      "Compte rendu écrit sous 48 h",
      "Estimation de budget",
      "Déduit du tarif si vous poursuivez",
    ],
    status: "published",
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2",
    slug: "itineraire-sur-mesure",
    title: "Itinéraire sur mesure",
    tagline: "Le parcours, jour par jour",
    description:
      "Je construis l'itinéraire complet à partir de vos envies : rythme, distances, saison, hébergements conseillés et alternatives en cas de mauvais temps. Vous réservez vous-même, avec les liens et les fourchettes de prix.",
    priceFrom: 290,
    features: [
      "Itinéraire jour par jour",
      "Deux allers-retours de modifications",
      "Hébergements présélectionnés",
      "Alternatives météo",
    ],
    status: "published",
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "aaaaaaa3-aaaa-4aaa-8aaa-aaaaaaaaaaa3",
    slug: "carnet-de-voyage",
    title: "Carnet de voyage complet",
    tagline: "Tout le voyage dans un seul document",
    description:
      "L'itinéraire sur mesure, enrichi d'un carnet consultable hors connexion : cartes annotées, adresses testées, phrases utiles, budget détaillé et fiches pratiques par étape.",
    priceFrom: 450,
    features: [
      "Carnet PDF et version mobile hors connexion",
      "Cartes annotées téléchargeables",
      "30 à 50 adresses sélectionnées",
      "Fiches pratiques par étape",
    ],
    status: "published",
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "aaaaaaa4-aaaa-4aaa-8aaa-aaaaaaaaaaa4",
    slug: "reservations-et-logistique",
    title: "Réservations et logistique",
    tagline: "Je m'occupe de tout réserver",
    description:
      "Vols, trains, hébergements, location de voiture et activités à créneau : je réserve à votre place et centralise les confirmations. Une assistance par message reste ouverte pendant tout le voyage.",
    priceFrom: 190,
    features: [
      "Réservations effectuées à votre place",
      "Confirmations centralisées",
      "Assistance par message pendant le voyage",
      "Gestion des annulations",
    ],
    status: "published",
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
];

export const demoReviews: Review[] = [
  {
    id: "bbbbbbb1-bbbb-4bbb-8bbb-bbbbbbbbbbb1",
    authorName: "Claire et Julien",
    authorLocation: "Nantes",
    rating: 5,
    content:
      "Nous avions trois semaines et aucune idée de comment les organiser. Le carnet nous a évité deux erreurs de logistique qui nous auraient coûté une journée chacune. Les adresses de Takayama étaient le point fort du voyage.",
    tripId: "11111111-1111-4111-8111-111111111111",
    travelDate: "2026-04-12",
    status: "published",
    isFeatured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bbbbbbb2-bbbb-4bbb-8bbb-bbbbbbbbbbb2",
    authorName: "Sophie M.",
    authorLocation: "Lyon",
    rating: 5,
    content:
      "Le double programme selon la météo m'a paru excessif avant de partir. Sur dix jours en Islande, nous avons basculé sur la version pluie quatre fois. Sans ça, nous aurions perdu ces journées.",
    tripId: "22222222-2222-4222-8222-222222222222",
    travelDate: "2026-09-03",
    status: "published",
    isFeatured: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bbbbbbb3-bbbb-4bbb-8bbb-bbbbbbbbbbb3",
    authorName: "Famille Ferreira",
    authorLocation: "Bordeaux",
    rating: 4,
    content:
      "Un vrai voyage de famille, avec des journées calibrées pour nos deux enfants. Seul regret : nous aurions aimé une nuit de plus à Lisbonne, ce qui n'est pas la faute de l'itinéraire mais de notre billet d'avion.",
    tripId: "33333333-3333-4333-8333-333333333333",
    travelDate: "2026-07-20",
    status: "published",
    isFeatured: false,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bbbbbbb4-bbbb-4bbb-8bbb-bbbbbbbbbbb4",
    authorName: "Antoine D.",
    authorLocation: "Paris",
    rating: 5,
    content:
      "J'ai pris uniquement l'appel découverte pour un voyage que je voulais organiser seul. Le compte rendu m'a fait revoir complètement l'ordre de mes étapes. Quarante-cinq minutes très bien investies.",
    tripId: null,
    travelDate: "2026-02-08",
    status: "published",
    isFeatured: false,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bbbbbbb5-bbbb-4bbb-8bbb-bbbbbbbbbbb5",
    authorName: "Marion L.",
    authorLocation: "Toulouse",
    rating: 5,
    content:
      "Avis déposé après notre retour, à valider avant publication. Le voyage était magnifique et l'assistance par message pendant le séjour nous a sauvés lors d'une grève de train.",
    tripId: null,
    travelDate: "2026-10-01",
    status: "pending",
    isFeatured: false,
    sortOrder: 5,
    createdAt: now,
    updatedAt: now,
  },
];

export const demoLeads: Lead[] = [
  {
    id: "ccccccc1-cccc-4ccc-8ccc-ccccccccccc1",
    name: "Hélène Rousseau",
    email: "helene.rousseau@example.fr",
    phone: "06 12 34 56 78",
    destination: "Vietnam",
    travelPeriod: "Février 2027, 3 semaines",
    partySize: 2,
    budgetRange: "4 000 à 6 000 €",
    message:
      "Nous fêtons nos dix ans de mariage et souhaitons un voyage du nord au sud, sans trop de vols intérieurs. Nous aimons marcher mais pas les treks difficiles.",
    status: "new",
    adminNotes: null,
    createdAt: "2026-01-14T16:20:00.000Z",
    updatedAt: "2026-01-14T16:20:00.000Z",
  },
  {
    id: "ccccccc2-cccc-4ccc-8ccc-ccccccccccc2",
    name: "Karim Belaïd",
    email: "karim.belaid@example.fr",
    phone: null,
    destination: "Écosse",
    travelPeriod: "Août 2026, 10 jours",
    partySize: 4,
    budgetRange: "Moins de 3 000 €",
    message:
      "Road trip avec deux ados. Nous avons déjà la voiture de location, il nous manque l'itinéraire et les hébergements sur la route des îles.",
    status: "in_progress",
    adminNotes: "Devis carnet complet envoyé le 12/01, relancer vendredi.",
    createdAt: "2026-01-10T08:45:00.000Z",
    updatedAt: "2026-01-12T10:05:00.000Z",
  },
];

export const demoContent: SiteContentEntry[] = [
  {
    key: "site.name",
    label: "Nom affiché du site",
    kind: "text",
    value: "MyTripDesigner",
    sortOrder: 1,
    updatedAt: now,
  },
  {
    key: "site.email",
    label: "Adresse e-mail de contact",
    kind: "text",
    value: "bonjour@mytripdesigner.fr",
    sortOrder: 2,
    updatedAt: now,
  },
  {
    key: "site.phone",
    label: "Téléphone (optionnel)",
    kind: "text",
    value: "",
    sortOrder: 3,
    updatedAt: now,
  },
  {
    key: "site.instagram",
    label: "Compte Instagram (optionnel)",
    kind: "text",
    value: "@mytripdesigner",
    sortOrder: 4,
    updatedAt: now,
  },
  {
    key: "home.hero.eyebrow",
    label: "Accueil — surtitre",
    kind: "text",
    value: "Créatrice de voyages sur mesure",
    sortOrder: 10,
    updatedAt: now,
  },
  {
    key: "home.hero.title",
    label: "Accueil — titre principal",
    kind: "text",
    value: "Des voyages construits pour vous, pas pour tout le monde",
    sortOrder: 11,
    updatedAt: now,
  },
  {
    key: "home.hero.subtitle",
    label: "Accueil — sous-titre",
    kind: "richtext",
    value:
      "Je conçois des itinéraires détaillés, testés et adaptés à votre rythme. Vous partez avec un carnet complet et l'assurance de ne rien avoir à improviser.",
    sortOrder: 12,
    updatedAt: now,
  },
  {
    key: "home.hero.cta",
    label: "Accueil — libellé du bouton principal",
    kind: "text",
    value: "Parlons de votre projet",
    sortOrder: 13,
    updatedAt: now,
  },
  {
    key: "home.services.title",
    label: "Accueil — titre de la section services",
    kind: "text",
    value: "Comment nous pouvons travailler ensemble",
    sortOrder: 20,
    updatedAt: now,
  },
  {
    key: "home.services.intro",
    label: "Accueil — introduction des services",
    kind: "richtext",
    value:
      "Quatre formules, du simple appel de cadrage à la prise en charge complète des réservations.",
    sortOrder: 21,
    updatedAt: now,
  },
  {
    key: "home.trips.title",
    label: "Accueil — titre de la section voyages",
    kind: "text",
    value: "Quelques voyages déjà conçus",
    sortOrder: 30,
    updatedAt: now,
  },
  {
    key: "home.trips.intro",
    label: "Accueil — introduction des voyages",
    kind: "richtext",
    value:
      "Ces itinéraires ont été construits pour de vraies familles et de vrais couples. Ils servent de point de départ, jamais de catalogue figé.",
    sortOrder: 31,
    updatedAt: now,
  },
  {
    key: "home.reviews.title",
    label: "Accueil — titre de la section avis",
    kind: "text",
    value: "Ce qu'en disent les voyageurs",
    sortOrder: 40,
    updatedAt: now,
  },
  {
    key: "home.about.title",
    label: "Accueil — titre « à propos »",
    kind: "text",
    value: "Pourquoi passer par une travel planner",
    sortOrder: 50,
    updatedAt: now,
  },
  {
    key: "home.about.body",
    label: "Accueil — texte « à propos »",
    kind: "richtext",
    value:
      "Organiser un voyage prend en moyenne une trentaine d'heures de recherche, et la fatigue arrive avant les bonnes décisions. Mon travail consiste à faire ces heures pour vous, puis à vous rendre un parcours lisible que vous pouvez encore modifier.",
    sortOrder: 51,
    updatedAt: now,
  },
  {
    key: "contact.title",
    label: "Contact — titre",
    kind: "text",
    value: "Parlons de votre prochain voyage",
    sortOrder: 60,
    updatedAt: now,
  },
  {
    key: "contact.intro",
    label: "Contact — introduction",
    kind: "richtext",
    value:
      "Décrivez votre projet en quelques lignes, même s'il est encore flou. Je réponds sous deux jours ouvrés avec une première piste et le tarif correspondant.",
    sortOrder: 61,
    updatedAt: now,
  },
  {
    key: "contact.confirmation",
    label: "Contact — message après envoi",
    kind: "richtext",
    value:
      "Merci, votre demande est bien arrivée. Je vous réponds sous deux jours ouvrés à l'adresse indiquée.",
    sortOrder: 62,
    updatedAt: now,
  },
  {
    key: "footer.tagline",
    label: "Pied de page — accroche",
    kind: "text",
    value:
      "Itinéraires sur mesure, carnets de voyage et logistique gérée de bout en bout.",
    sortOrder: 70,
    updatedAt: now,
  },
];
