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
  keyFacts: {
    season: string;
    formalities: string;
    transport: string;
  };
  highlights: [string, string, string];
  coverImage: string;
  heroImage: string;
  heroImageClassName?: string;
  gallery: [string, string, string];
  ctaLabel: string;
};

export const CARNET_PRICE_EUR = 39.9;

const carnetPriceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export function formatCarnetPrice(value = CARNET_PRICE_EUR): string {
  return carnetPriceFormatter.format(value).replace(/[\u00a0\u202f]/g, " ");
}

export const carnetFilters = [
  { id: "tous", label: "Tous" },
  { id: "italie", label: "Italie" },
  { id: "europe", label: "Europe" },
  { id: "monde", label: "Reste du monde" },
] as const;

export type CarnetFilterId = (typeof carnetFilters)[number]["id"];

export const carnetRegionLabels: Record<CarnetRegion, string> = {
  italie: "Italie",
  europe: "Europe",
  monde: "Reste du monde",
};

export const carnets: Carnet[] = [
  {
    slug: "barcelone",
    title: "Barcelone",
    location: "Catalogne, Espagne",
    region: "europe",
    durationDays: 5,
    summary:
      "Une escapade catalane entre mer, architecture moderniste et créativité",
    tagline:
      "Une escapade catalane entre mer, architecture moderniste et créativité",
    description:
      "Barcelone se déguste entre mer et collines, du modernisme de Gaudí aux ruelles du Born. Ce carnet pose le rythme d'une escapade catalane : les incontournables sans la foule, les tapas au bon moment, les transports qui font gagner du temps. Un aperçu pour partir l'esprit léger — le détail se feuillette dans le carnet.",
    keyFacts: {
      season: "Mai (18-24 °C)",
      formalities: "Carte d'identité/Passeport (Schengen)",
      transport: "Métro, bus, pass T-casual ou Hola Barcelona",
    },
    highlights: [
      "Les étapes incontournables (Sagrada Família, Parc Güell...)",
      "Les moments forts (ateliers, découvertes culinaires)",
      "Sélection de bonnes adresses (tapas, rooftops)",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579282240050-141d4ecef9e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539037116277-4db20810953d?auto=format&fit=crop&w=1200&q=80",
    ],
    ctaLabel: "voir ce carnet",
  },
  {
    slug: "florence",
    title: "Florence",
    location: "Toscane, Italie",
    region: "italie",
    durationDays: 4,
    summary:
      "Joyau de la Renaissance, berceau de l'art et douceur de vivre toscane",
    tagline:
      "Joyau de la Renaissance, berceau de l'art et douceur de vivre toscane",
    description:
      "Florence concentre cinq siècles d'art dans une ville que l'on parcourt à pied. Ce carnet ouvre le joyau de la Renaissance sans s'y perdre : Duomo, Offices, ateliers de cuir et cafés historiques, au bon tempo. L'essentiel pour savourer la douceur toscane — le programme complet est dans le carnet.",
    keyFacts: {
      season: "Printemps (10-25 °C)",
      formalities: "Carte d'identité/Passeport (Schengen)",
      transport: "À pied, réseau bus & tramway",
    },
    highlights: [
      "Les joyaux architecturaux (Duomo, Offices, Ponte Vecchio...)",
      "Les expériences artisanales (cuir, papier marbré)",
      "Adresses coups de cœur (cafés historiques, rooftops)",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1767037447367-99ffa711277c?auto=format&fit=crop&w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1767037447367-99ffa711277c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1775343969930-6dfde1a057e0?auto=format&fit=crop&w=1200&q=80",
    ],
    ctaLabel: "voir ce carnet",
  },
  {
    slug: "londres",
    title: "Londres",
    location: "Angleterre, Royaume-Uni",
    region: "europe",
    durationDays: 5,
    summary:
      "Cité cosmopolite entre traditions royales, culture alternative et modernité",
    tagline:
      "Cité cosmopolite entre traditions royales, culture alternative et modernité",
    description:
      "Londres mêle traditions royales, marchés bruyants et quartiers qui changent d'un arrêt de métro à l'autre. Ce carnet pose les classiques, l'Underground et les adresses qui font la différence. Une accroche cosmopolite — le détail se tourne page après page dans le carnet.",
    keyFacts: {
      season: "Février (5-10 °C)",
      formalities: "Passeport valide obligatoire",
      transport: "Underground, bus, Oyster / Contactless",
    },
    highlights: [
      "Les classiques londoniens (Westminster, Tower Bridge, musées...)",
      "L'ambiance des marchés (Covent Garden, Camden...)",
      "Excursions et expériences uniques",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1761063814673-a9f0499d2081?auto=format&fit=crop&w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1761063814673-a9f0499d2081?auto=format&fit=crop&w=1600&q=80",
    heroImageClassName: "object-bottom",
    gallery: [
      "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1766442784315-7011b13de2a6?auto=format&fit=crop&w=1200&q=80",
    ],
    ctaLabel: "voir ce carnet",
  },
  {
    slug: "palerme",
    title: "Palerme",
    location: "Sicile, Italie",
    region: "italie",
    durationDays: 5,
    summary:
      "Carrefour arabo-normand, marchés vibrants et douceurs méditerranéennes",
    tagline:
      "Carrefour arabo-normand, marchés vibrants et douceurs méditerranéennes",
    description:
      "Palerme est un carrefour : arabo-normand, baroque, marchés et mer à deux pas. Ce carnet vous y installe sans improvisation : patrimoine, street food, bus AMAT et escapades côtières. L'esprit méditerranéen en quelques pages — le reste se feuillette dans le carnet.",
    keyFacts: {
      season: "Juin (21-28 °C)",
      formalities: "Carte d'identité/Passeport (Schengen)",
      transport: "À pied, bus AMAT, train régional",
    },
    highlights: [
      "Le patrimoine arabo-normand et baroque",
      "L'ambiance des marchés et la street food",
      "Escapades proches (mer et villages)",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-fdcd5d5c0d0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605723517503-3cadb0c4d325?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69d2c8b?auto=format&fit=crop&w=1200&q=80",
    ],
    ctaLabel: "voir ce carnet",
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
  return carnets.filter((item) => item.slug !== carnet.slug);
}

export function filterCarnets(
  list: Carnet[],
  filter: CarnetFilterId,
): Carnet[] {
  if (filter === "tous") {
    return list;
  }

  if (filter === "europe") {
    return list.filter(
      (carnet) => carnet.region === "europe" || carnet.region === "italie",
    );
  }

  return list.filter((carnet) => carnet.region === filter);
}

export function countCarnets(filter: CarnetFilterId): number {
  return filterCarnets(carnets, filter).length;
}
