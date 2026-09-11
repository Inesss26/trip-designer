export type CarnetRegion = "italie" | "europe" | "monde";

export type Carnet = {
  slug: string;
  title: string;
  location: string;
  region: CarnetRegion;
  durationDays: number;
  summary: string;
  tagline: string;
  description: string;
  coverImage: string;
  heroImage: string;
  gallery: string[];
  ctaLabel: string;
  relatedSlugs: [string, string, string];
};

export const CARNET_PRICE_EUR = 39.9;

const carnetPriceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export function formatCarnetPrice(value = CARNET_PRICE_EUR): string {
  return carnetPriceFormatter.format(value);
}

export const carnetFilters = [
  { id: "tous", label: "Tous" },
  { id: "italie", label: "Italie" },
  { id: "europe", label: "europe" },
  { id: "monde", label: "reste du monde" },
] as const;

export type CarnetFilterId = (typeof carnetFilters)[number]["id"];

export const carnetRegionLabels: Record<CarnetRegion, string> = {
  italie: "Italie",
  europe: "Europe",
  monde: "Reste du monde",
};

export const carnets: Carnet[] = [
  {
    slug: "rome-dolce-vita",
    title: "Rome & la Dolce Vita",
    location: "Latium",
    region: "italie",
    durationDays: 6,
    summary:
      "Quartiers d'artistes, trattorias centenaires, jardins oubliés — la Rome des initiés.",
    tagline:
      "Quartiers d'artistes, trattorias centenaires, jardins oubliés — la Rome des initiés.",
    description:
      "Rome se mérite hors des files d'attente et des clichés. Ce carnet vous ouvre les quartiers d'artistes, les trattorias centenaires et les jardins oubliés — la ville des initiés, à votre rythme, saison après saison.",
    coverImage: "/images/carnets/rome.png",
    heroImage: "/images/carnets/rome.png",
    gallery: [],
    ctaLabel: "voir ce carnet",
    relatedSlugs: ["cote-amalfitaine", "echappee-toscane", "cyclades-insolites"],
  },
  {
    slug: "cote-amalfitaine",
    title: "La Côte Amalfitaine",
    location: "Campanie, Italie",
    region: "italie",
    durationDays: 8,
    summary:
      "Ravello, Positano, Praiano : chaque virage révèle une terrasse suspendue sur la Méditerranée.",
    tagline:
      "Ravello, Positano, Praiano — chaque virage, une terrasse sur la Méditerranée.",
    description:
      "La côte Amalfitaine est l'une des plus belles routes du monde — et l'une des plus piégeuses pour les voyageurs non préparés. Ce carnet vous donne toutes les clés pour l'explorer à votre rythme, en évitant les bus bondés et les restaurants attrape-touristes. 8 jours de programme affiné saison après saison.",
    coverImage: "/images/carnets/amalfi.png",
    heroImage: "/images/carnets/amalfi-hero.png",
    gallery: [
      "/images/carnets/amalfi-gallery-1.png",
      "/images/carnets/amalfi-gallery-2.png",
      "/images/carnets/amalfi-gallery-3.png",
    ],
    ctaLabel: "voir ce carnet",
    relatedSlugs: ["rome-dolce-vita", "echappee-toscane", "alentejo-cote-sauvage"],
  },
  {
    slug: "echappee-toscane",
    title: "Échappée en Toscane",
    location: "Toscane",
    region: "italie",
    durationDays: 9,
    summary:
      "Vignobles de Montepulciano, fermes bio, bourgs médiévaux — la Toscane hors des radars.",
    tagline:
      "Vignobles de Montepulciano, fermes bio, bourgs médiévaux — la Toscane hors des radars.",
    description:
      "Loin des files de Chianti, ce carnet déroule une Toscane plus secrète : vignobles de Montepulciano, fermes bio et bourgs médiévaux. Neuf jours pour savourer la campagne italienne sans la circulation des grands axes.",
    coverImage: "/images/carnets/toscane.png",
    heroImage: "/images/carnets/toscane.png",
    gallery: [],
    ctaLabel: "voir ce carnet",
    relatedSlugs: ["rome-dolce-vita", "cote-amalfitaine", "andalousie-profonde"],
  },
  {
    slug: "cyclades-insolites",
    title: "Cyclades insolites",
    location: "Grèce",
    region: "europe",
    durationDays: 11,
    summary:
      "Folegandros, Milos, Sifnos — les Cyclades sauvages, loin de Santorin.",
    tagline:
      "Folegandros, Milos, Sifnos — les Cyclades sauvages, loin de Santorin.",
    description:
      "Oubliez Santorin saturée. Ce carnet relie Folegandros, Milos et Sifnos : villages blancs, criques minérales et tavernes de pêcheurs. Onze jours pour une Grèce des îles plus sauvage, au bon rythme des ferries.",
    coverImage: "/images/carnets/cyclades.png",
    heroImage: "/images/carnets/cyclades.png",
    gallery: [],
    ctaLabel: "voir le carnet",
    relatedSlugs: ["alentejo-cote-sauvage", "andalousie-profonde", "rome-dolce-vita"],
  },
  {
    slug: "alentejo-cote-sauvage",
    title: "Alentejo & côte sauvage",
    location: "Portugal",
    region: "europe",
    durationDays: 9,
    summary:
      "Vignobles, liège, villages blancs et plages désertes — le Portugal authentique.",
    tagline:
      "Vignobles, liège, villages blancs et plages désertes — le Portugal authentique.",
    description:
      "L'Alentejo déroule ses plaines de liège, ses villages blancs et une côte encore déserte. Ce carnet assemble neuf jours de Portugal authentique — vignobles, océan et tables d'auberge — loin des circuits de Lisbonne.",
    coverImage: "/images/carnets/alentejo.png",
    heroImage: "/images/carnets/alentejo.png",
    gallery: [],
    ctaLabel: "voir le carnet",
    relatedSlugs: ["cyclades-insolites", "andalousie-profonde", "cote-amalfitaine"],
  },
  {
    slug: "andalousie-profonde",
    title: "Andalousie profonde",
    location: "Espagne",
    region: "europe",
    durationDays: 10,
    summary:
      "Séville, Ronda et les pueblos blancos — une Espagne ardente et hors du temps.",
    tagline:
      "Séville, Ronda et les pueblos blancos — une Espagne ardente et hors du temps.",
    description:
      "Séville, Ronda et les pueblos blancos : une Andalousie ardente, loin des plages de Costa. Dix jours pour les patios, les tapas de quartier et les routes de montagne, avec les bons horaires et les bonnes adresses.",
    coverImage: "/images/carnets/andalousie.png",
    heroImage: "/images/carnets/andalousie.png",
    gallery: [],
    ctaLabel: "voir le carnet",
    relatedSlugs: ["cyclades-insolites", "alentejo-cote-sauvage", "echappee-toscane"],
  },
  {
    slug: "sud-marocain",
    title: "Sud marocain, dunes & kasbahs",
    location: "Maroc",
    region: "monde",
    durationDays: 10,
    summary:
      "Ouarzazate, le désert de Merzouga, la vallée du Drâa — un grand sud inoubliable.",
    tagline:
      "Ouarzazate, le désert de Merzouga, la vallée du Drâa — un grand sud inoubliable.",
    description:
      "Ouarzazate, Merzouga, la vallée du Drâa : le grand sud marocain, entre kasbahs et dunes. Ce carnet pose un rythme tenable — routes, nuits sous les étoiles et palmeraies — pour un voyage intense sans improviser les étapes.",
    coverImage: "/images/carnets/maroc.png",
    heroImage: "/images/carnets/maroc.png",
    gallery: [],
    ctaLabel: "voir le carnet",
    relatedSlugs: ["japon-rural-ryokans", "georgie-caucase", "andalousie-profonde"],
  },
  {
    slug: "japon-rural-ryokans",
    title: "Japon rural & ryokans",
    location: "Japon",
    region: "monde",
    durationDays: 14,
    summary:
      "Kanazawa, Shirakawa-go, Kyoto hors saison. Le Japon profond et contemplatif.",
    tagline:
      "Kanazawa, Shirakawa-go, Kyoto hors saison. Le Japon profond et contemplatif.",
    description:
      "Kanazawa, Shirakawa-go, Kyoto hors saison : un Japon rural et contemplatif, ryokans compris. Quatorze jours pour les trains, les onsen et les villages de montagne, avec une feuille de route claire pour voyager sans friction.",
    coverImage: "/images/carnets/japon.png",
    heroImage: "/images/carnets/japon.png",
    gallery: [],
    ctaLabel: "voir le carnet",
    relatedSlugs: ["georgie-caucase", "sud-marocain", "cyclades-insolites"],
  },
  {
    slug: "georgie-caucase",
    title: "Géorgie & Caucase",
    location: "Géorgie",
    region: "monde",
    durationDays: 12,
    summary:
      "Tbilissi baroque, monastères en montagne, vignes millénaires — une destination rare.",
    tagline:
      "Tbilissi baroque, monastères en montagne, vignes millénaires — une destination rare.",
    description:
      "Tbilissi baroque, monastères perchés, vignes millénaires : la Géorgie reste une destination rare. Douze jours pour le Caucase, les tables de supra et les routes de montagne, avec les infos pratiques qui manquent encore aux guides génériques.",
    coverImage: "/images/carnets/georgie.png",
    heroImage: "/images/carnets/georgie.png",
    gallery: [],
    ctaLabel: "voir le carnet",
    relatedSlugs: ["japon-rural-ryokans", "sud-marocain", "rome-dolce-vita"],
  },
];

export const carnetBenefits = [
  {
    title: "Informations pratiques",
    text: "Formalités, santé, transports et astuces pour partir l'esprit 100 % libre.",
    icon: "/icons/carnets/benefit-info.svg",
    iconWidth: 24,
    iconHeight: 24,
  },
  {
    title: "Incontournables sélectionnés",
    text: "Les lieux emblématiques à ne pas manquer, optimisés selon le bon rythme de visite.",
    icon: "/icons/carnets/benefit-places.svg",
    iconWidth: 19,
    iconHeight: 24,
  },
  {
    title: "Adresses authentiques",
    text: "Des pépites locales testées et approuvées avec soin.",
    icon: "/icons/carnets/benefit-addresses.svg",
    iconWidth: 22,
    iconHeight: 24,
  },
  {
    title: "Format ergonomique",
    text: "Disponible sur smartphone, consultable hors connexion pendant votre séjour.",
    icon: "/icons/carnets/benefit-format.svg",
    iconWidth: 16,
    iconHeight: 24,
  },
] as const;

export const carnetIncludes = [
  "Itinéraire complet débloqué",
  "Toutes les adresses authentiques",
  "PDF téléchargeable à vie",
] as const;

export const carnetsCompare = {
  kicker: "Comparatif",
  title: "Quel carnet vous correspond ?",
  subtitle:
    "Un aperçu clair pour choisir l'accompagnement le plus adapté à vos envies.",
  features: [
    "Infos pratiques & conseils locaux",
    "Incontournables & sélection d'adresses",
    "Récapitulatif vols & hébergements",
    "Itinéraire",
    "Carte interactive Google My Maps",
  ],
  columns: [
    {
      id: "pret",
      kicker: null,
      name: "Prêt à l'emploi",
      featured: false,
      cells: [
        { type: "check" as const },
        { type: "check" as const },
        { type: "dash" as const },
        { type: "dash" as const },
        { type: "dash" as const },
      ],
      price: formatCarnetPrice(),
    },
    {
      id: "sur-mesure",
      kicker: "Dolce Vita / La Strada",
      name: "Sur mesure",
      featured: false,
      cells: [
        { type: "check" as const },
        { type: "check" as const },
        { type: "check" as const },
        { type: "check" as const },
        { type: "dash" as const },
      ],
      price: "Inclus dans la formule",
    },
    {
      id: "premium",
      kicker: "far niente",
      name: "Premium",
      featured: true,
      cells: [
        { type: "check" as const },
        { type: "check" as const },
        { type: "check" as const },
        { type: "check" as const },
        { type: "check" as const },
      ],
      price: "Sur devis",
    },
  ],
} as const;

export function getCarnetBySlug(slug: string): Carnet | undefined {
  return carnets.find((carnet) => carnet.slug === slug);
}

export function getRelatedCarnets(carnet: Carnet): Carnet[] {
  return carnet.relatedSlugs
    .map((slug) => getCarnetBySlug(slug))
    .filter((related): related is Carnet => Boolean(related));
}

export function filterCarnets(
  list: Carnet[],
  filter: CarnetFilterId,
): Carnet[] {
  if (filter === "tous") {
    return list;
  }

  return list.filter((carnet) => carnet.region === filter);
}

export function countCarnets(filter: CarnetFilterId): number {
  return filterCarnets(carnets, filter).length;
}
