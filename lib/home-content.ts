export const homeHeroCopy = {
  title: "Votre voyage sur-mesure, avec l'esprit Dolce Vita",
  subtitle:
    "Spécialiste de l'Italie, je conçois des itinéraires uniques et immersifs en Europe et dans le monde entier.\nConfiez-moi votre projet et partez l'esprit léger.",
} as const;

export const homeStats = [
  { value: "+150", label: "Voyages organisés" },
  { value: "+80", label: "Destinations mondiales" },
  { value: "+100", label: "Voyageurs conquis" },
] as const;

export const marqueeItems = [
  "Voyages Sur-Mesure",
  "Dolce Vita",
  "Italie Authentique",
  "Depuis 2021",
] as const;

export const homeBenefits = [
  {
    icon: "/icons/benefit-savings.svg",
    title: "Des économies concrètes",
    body: "L'assurance de payer chaque prestation au juste prix, sans frais cachés.",
  },
  {
    icon: "/icons/benefit-circuits.svg",
    title: "Adieu aux circuits stéréotypés",
    body: "Aucun itinéraire préconçu, chaque voyage est créé à partir d'une page blanche.",
  },
  {
    icon: "/icons/benefit-support.svg",
    title: "Un accompagnement serein",
    body: "Partez l'esprit léger grâce à mes conseils d'experte et mes recommandations sur mesure.",
  },
  {
    icon: "/icons/benefit-time.svg",
    title: "Jusqu'à 40h de recherches gagnées",
    body: "Gagnez un temps précieux et libérez-vous de toute la charge mentale.",
  },
  {
    icon: "/icons/benefit-local.svg",
    title: "Zéro pièges à touristes",
    body: "Profitez d'adresses locales authentiques et évitez les erreurs coûteuses.",
  },
] as const;

export const homeEngagements = [
  {
    image: "/images/home/engagement-1.png",
    imageClassName: "object-[center_75%]",
    title: "01. Immersion",
    body: "Vivre votre voyage de l'intérieur, comme un local. Chaque étape vous plonge dans le quotidien et les rythmes réels des lieux traversés.",
  },
  {
    image: "/images/home/engagement-2.png",
    imageClassName: "object-cover",
    title: "02. Authenticité",
    body: "Des lieux choisis pour ce qu'ils racontent vraiment : des adresses locales, authentiques et de charme.",
  },
  {
    image: "/images/home/engagement-3.png",
    imageClassName: "object-[center_35%]",
    title: "03. Savoir-faire",
    body: "Artisans, producteurs, gestes transmis de génération en génération : chaque région d'Italie a son savoir-faire. Je mets en lumière ce qui fait l'excellence de son territoire.",
  },
] as const;

export const homeFormulas = [
  {
    id: "dolce-vita",
    featured: false,
    name: "DOLCE VITA",
    tagline: "Séjour fixe — un seul point de chute",
    description:
      "Idéal si vous posez vos valises dans un seul endroit et explorez en toute liberté.",
    features: [
      "Comparaison de transports",
      "Recommandations de transferts",
      "Sélection d'hébergements",
      "Carnet de voyage",
    ],
    priceLabel: "Fixe",
    price: "280€",
  },
  {
    id: "la-strada",
    featured: true,
    name: "LA STRADA",
    tagline: "Roadtrip & itinérance multi-étapes",
    description:
      "La formule idéale pour les roadtrips et voyages multi-étapes sans contrainte d'organisation.",
    features: [
      "Construction de l'itinéraire",
      "Comparaison de transports",
      "Recommandations de transferts/déplacements",
      "Sélection d'hébergements",
      "Carnet de voyage",
    ],
    priceLabel: "À partir de",
    price: "430€",
  },
  {
    id: "far-niente",
    featured: false,
    name: "FAR NIENTE",
    tagline: "Option programme jour par jour",
    description:
      "À cumuler avec une formule ou un carnet pour un planning détaillé jour par jour.",
    features: [
      "Élaboration du programme",
      "Proposition d'activités locales",
      "Carnet de voyage Premium",
      "Carte interactive",
    ],
    priceLabel: "Sur devis  (tarif dégressif)",
    price: "40€",
    priceSuffix: "/jour",
  },
] as const;

export const homeProcess = [
  {
    step: "1",
    title: "Prise de rendez-vous & formulaire :",
    body: "Ce premier échange est 100% gratuit et sans engagement. Pour l'optimiser au mieux, je vous invite à remplir un court formulaire lors de votre réservation afin de me partager vos premières envies de voyage.",
  },
  {
    step: "2",
    title: "Appel découverte :",
    body: "Durant une trentaine de minutes, vous me faites part en détail de vos envies, intérêts, besoins et critères. Cela me permet de vous orienter vers la formule la plus adaptée à votre projet.",
  },
  {
    step: "3",
    title: "Réception du devis & Validation :",
    body: "À l'issue de notre appel, vous recevez un récapitulatif de notre échange, un devis ainsi que les Conditions Générales de Vente.",
  },
  {
    step: "4",
    title: "Création du voyage :",
    body: "Dès que la validation est signée, je donne vie à votre projet. Je commence à concevoir votre feuille de route personnalisée et à rassembler mes meilleures recommandations locales pour poser les bases de votre futur séjour.",
  },
  {
    step: "5",
    title: "Suivi & Ajustements :",
    body: "Je vous propose mes premières pistes. Nous affinons ensemble chaque élément du programme, en procédant à des ajustements jusqu'à ce que le projet corresponde à 100 % à vos attentes.",
  },
  {
    step: "6",
    title: "Réception du carnet de voyage :",
    body: "Vous recevez votre carnet de voyage finalisé regroupant l'intégralité des réservations et tous les détails pratiques pour voyager l'esprit serein.",
  },
] as const;

export const reviewImages = [
  "/images/home/review-1.png",
  "/images/home/review-2.png",
  "/images/home/review-3.png",
] as const;
