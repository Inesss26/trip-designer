export const formulesHeroCopy = {
  kicker: "Formules & Services",
  title: "Choisissez votre façon de voyager",
  subtitle:
    "Des formules complètes pour créer des souvenirs impérissables, adaptées à votre rythme et vos envies.",
} as const;

export const formulesDisclaimer =
  "Les tarifs indiqués correspondent uniquement à la prestation de recherche, de conseil et de création de My Trip Designer. Les réservations finales restent à la charge du client.";

export const formulesPageFormulas = [
  {
    id: "dolce-vita",
    featured: false,
    kicker: "Votre séjour dans un seul point de chute.",
    kickerAccent: false,
    name: "DOLCE VITA",
    description:
      "Idéal si vous séjournez dans un seul endroit : posez vos valises et explorez la région en toute liberté, guidé par mes conseils.",
    features: [
      {
        title: "Comparaison de transports",
        detail:
          "Comparaison des vols et liaisons ferroviaires selon vos dates et vos critères.",
      },
      {
        title: "Recommandations de transferts",
        detail:
          "Propositions de solutions fluides pour rejoindre votre logement.",
      },
      {
        title: "Sélection d'hébergements",
        detail:
          "Recherche de logements selon vos critères, retenus pour leur emplacement et confort.",
      },
      {
        title: "Carnet de voyage",
        detail:
          "Remise d'un guide incluant toutes les infos pratiques et meilleures adresses.",
      },
    ],
    pricing: {
      variant: "single" as const,
      price: "280€",
      caption: "Tarif fixe quelque soit le nombre de jours",
    },
    ctaVariant: "brandSecondary" as const,
  },
  {
    id: "la-strada",
    featured: true,
    kicker: "Le grand itinéraire multi-étapes.",
    kickerAccent: true,
    name: "LA STRADA",
    description:
      "La formule idéale pour explorer plusieurs régions lors d'un roadtrip ou d'un voyage itinérant, sans la moindre contrainte logistique.",
    features: [
      {
        title: "Construction de l'itinéraire",
        detail:
          "Création d'un parcours fluide (jusqu'à 7 étapes), façonné selon votre rythme et vos priorités.",
      },
      {
        title: "Comparaison de transports",
        detail:
          "Comparaison des vols et liaisons ferroviaires selon vos dates et vos critères.",
      },
      {
        title: "Recommandations de transferts",
        detail:
          "Optimisation de vos déplacements entre chaque étape pour des trajets sans stress.",
      },
      {
        title: "Sélection d'hébergements",
        detail:
          "Recherche de logements selon vos critères, retenus pour leur emplacement et confort.",
      },
      {
        title: "Carnet de voyage",
        detail: "Carnet regroupant le détail de toutes vos étapes et adresses.",
      },
    ],
    pricing: {
      variant: "tiers" as const,
      tiers: [
        { label: "Jusqu'à 3 points de chute:", price: "430€" },
        { label: "5 points de chute:", price: "680€" },
        { label: "7 points de chute:", price: "930€" },
      ],
    },
    ctaVariant: "brand" as const,
  },
  {
    id: "far-niente",
    featured: false,
    kicker: "Vos journées clés en main, à la carte.",
    kickerAccent: false,
    name: "FAR NIENTE",
    description:
      "À cumuler avec Dolce Vita ou La Strada : la formule idéale pour profiter d'un programme sur-mesure au quotidien, sans lever le petit doigt.",
    features: [
      {
        title: "Planning détaillé jour par jour",
        detail:
          "Programme quotidien sur-mesure selon vos envies (sur le nombre de jours de votre choix*).",
      },
      {
        title: "Proposition d'activités locales",
        detail:
          "Suggestions ciblées et réservations (cours de cuisine, visites...).",
      },
      {
        title: "Carnet de voyage Premium",
        detail:
          "Un guide sur-mesure regroupant vos infos pratiques et votre itinéraire complet.",
      },
      {
        title: "Carte interactive mobile",
        detail:
          "Carte personnalisée (My Maps) réunissant vos adresses et étapes géolocalisées sur mobile.",
      },
    ],
    note: "*Vous choisissez librement le nombre de jours à planifier (par exemple : 3 jours détaillés sur un séjour de 7 jours).",
    pricing: {
      variant: "daily" as const,
      price: "40€",
      suffix: "/jour",
      caption: "sur devis (tarif dégressif)",
    },
    ctaVariant: "brandSecondary" as const,
  },
] as const;

export const formulesCompare = {
  kicker: "Comparatif",
  title: "Quelle formule est faite pour vous ?",
  subtitle:
    "Un aperçu clair pour choisir l'accompagnement le plus adapté à vos envies.",
  features: [
    "Points de chute",
    "Recherche Transports & Transferts",
    "Sélection d'Hébergements",
    "Conception de l'Itinéraire",
    "Trajets entre les étapes",
    "Programme détaillé jour par jour",
    "Activités locales",
    "Carnet de Voyage",
    "Carte Interactive Mobile (My Maps)",
  ],
  columns: [
    {
      id: "dolce-vita",
      featured: false,
      kicker: "Formule 01",
      name: "Dolce Vita",
      subtitle: null,
      cells: [
        { type: "text" as const, value: "1", strong: true },
        { type: "check" as const },
        { type: "check" as const },
        { type: "dash" as const },
        { type: "dash" as const },
        { type: "dash" as const },
        { type: "dash" as const },
        { type: "text" as const, value: "Carnet digital" },
        { type: "dash" as const },
      ],
      price: "280 €",
      priceCaption: "fixe",
    },
    {
      id: "la-strada",
      featured: true,
      kicker: "Formule 02",
      name: "La Strada",
      subtitle: null,
      cells: [
        { type: "text" as const, value: "2 à 7", strong: true },
        { type: "check" as const },
        { type: "check" as const },
        { type: "check" as const },
        { type: "check" as const },
        { type: "dash" as const },
        { type: "dash" as const },
        { type: "text" as const, value: "Carnet Multi-étapes" },
        { type: "dash" as const },
      ],
      price: "dès 430 €",
      priceCaption: "fixe par point de chute",
    },
    {
      id: "far-niente",
      featured: false,
      kicker: "Formule 03",
      name: "Far Niente",
      subtitle: "cumulable avec Dolce Vita ou La Strada",
      cells: [
        { type: "text" as const, value: "Selon la formule", strong: true },
        { type: "check" as const },
        { type: "check" as const },
        { type: "text" as const, value: "Option cumulable" },
        { type: "text" as const, value: "Option cumulable" },
        { type: "check" as const },
        { type: "check" as const },
        { type: "text" as const, value: "Version Premium" },
        { type: "check" as const },
      ],
      price: "+ 40 € /jour",
      priceCaption: "dégressif",
    },
  ],
} as const;

export const formulesFaq = [
  {
    question: "C'est quoi un travel planner ?",
    answer:
      "Un travel planner conçoit votre voyage sur-mesure, de l'itinéraire aux adresses, sans vous vendre de forfait. Je compare, je sélectionne et je vous livre un carnet clair : vous réservez ensuite en toute sérénité, au juste prix.",
  },
  {
    question:
      "Pourquoi faire appel à un travel planner plutôt qu'à une agence de voyage ?",
    answer:
      "Une agence vend souvent des packages déjà ficelés. Je pars d'une page blanche : vos envies, votre rythme, vos contraintes. Pas de circuit stéréotypé, pas de commission cachée sur des prestations imposées — uniquement un accompagnement d'experte.",
  },
  {
    question:
      "Pourquoi suis-je la personne idéale pour organiser votre voyage en Italie ?",
    answer:
      "Franco-italienne installée à Rome, l'Italie est mon terrain de jeu quotidien. Je connais les adresses locales, les pièges à touristes et les rythmes réels des lieux. Cette intimité avec le territoire se retrouve dans chaque recommandation.",
  },
  {
    question: "Quels sont les différents services proposés ?",
    answer:
      "Trois formules — Dolce Vita (un point de chute), La Strada (roadtrip multi-étapes) et Far Niente (planning jour par jour, à cumuler) — plus des services à la carte : consultation My Trip Advisor, négociation hôtelière et coups de main ciblés.",
  },
  {
    question:
      "Quelle est la différence entre un carnet prêt à l'emploi et un carnet sur-mesure ?",
    answer:
      "Un carnet prêt à l'emploi est un itinéraire déjà conçu, à suivre tel quel. Un carnet sur-mesure est créé pour vous : dates, rythme, hébergements et adresses collent à votre projet, pas à un modèle universel.",
  },
  {
    question: "Comment ça se passe concrètement ?",
    answer:
      "Un appel découverte gratuit de 30 minutes, puis un devis. Une fois validé, je construis votre feuille de route, on affine ensemble, et vous recevez votre carnet finalisé avec toutes les infos pratiques pour partir l'esprit léger.",
  },
  {
    question: "Est-ce que tu organises uniquement des voyages en Italie ?",
    answer:
      "L'Italie est ma spécialité, mais je conçois aussi des séjours uniques en Europe et dans le monde entier, toujours avec la même exigence d'immersion et d'authenticité.",
  },
  {
    question: "De quoi dois-je m'occuper ?",
    answer:
      "Je m'occupe de la recherche, des conseils et de la création du carnet. Les réservations finales (transports, hébergements, activités) restent à votre charge — je vous guide pas à pas pour les finaliser sans stress.",
  },
  {
    question:
      "J'ai déjà acheté un carnet prêt à l'emploi (ou je souhaite en acheter un), puis-je demander un itinéraire sur-mesure jour par jour ?",
    answer:
      "Oui. Far Niente se cumule avec un carnet existant ou une formule : vous choisissez le nombre de jours à détailler, et je compose un programme quotidien sur-mesure autour de votre itinéraire.",
  },
] as const;
