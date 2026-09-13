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
    ctaVariant: "dark" as const,
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
    ctaVariant: "primary" as const,
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
    ctaVariant: "dark" as const,
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

export type FormulesFaqRichPart =
  | { type: "text"; text: string }
  | { type: "strong"; text: string; tone?: "brand" | "teal" }
  | { type: "break" };

export type FormulesFaqItem =
  | {
      id: string;
      question: string;
      kind: "paragraphs";
      paragraphs: string[];
    }
  | {
      id: string;
      question: string;
      kind: "rich";
      blocks: FormulesFaqRichPart[][];
    }
  | {
      id: string;
      question: string;
      kind: "compare";
      columns: [string, string];
      rows: {
        label: string;
        planner: string[];
        agency: string[];
      }[];
    }
  | {
      id: string;
      question: string;
      kind: "steps";
      steps: { step: string; title: string; body: string }[];
    }
  | {
      id: string;
      question: string;
      kind: "bullets";
      items: {
        title: string;
        suffix: string;
        body: string;
      }[];
    };

export const formulesFaq: FormulesFaqItem[] = [
  {
    id: "travel-planner",
    question: "C’est quoi un travel planner ?",
    kind: "paragraphs",
    paragraphs: [
      "Un travel planner est un professionnel de l’organisation de voyages sur-mesure. Contrairement à une agence de voyages traditionnelle, il conçoit votre séjour de manière personnalisée en fonction de vos envies, votre budget et votre style de découverte, tout en vous laissant la liberté de réserver directement vos prestations. Son rôle est de rechercher, structurer et optimiser votre voyage : sélection d’hébergements, itinéraire cohérent, recommandations locales, conseils pratiques… Vous bénéficiez ainsi d’une expertise et d’un accompagnement personnalisé, tout en gardant le contrôle de votre voyage.",
    ],
  },
  {
    id: "vs-agency",
    question:
      "Pourquoi faire appel à un travel planner plutôt qu’à une agence de voyage ?",
    kind: "compare",
    columns: ["Travel planner", "Agence de voyage"],
    rows: [
      {
        label: "Concept",
        planner: [
          "Crée des voyages sur-mesure qui respectent les critères, les besoins et le budget du client",
        ],
        agency: [
          "Vend des séjours sous forme de package pré-fabriqués destinés à Monsieur et Madame tout le monde.",
        ],
      },
      {
        label: "Prestations",
        planner: [
          "Fait des propositions adaptées à vos critères et besoins",
        ],
        agency: [
          "Propose des prestations avec lesquels il a des partenariats",
        ],
      },
      {
        label: "Tarifs",
        planner: [
          "Payé uniquement pour son service de recherche, de création de voyage et de négociation, tout en faisant bénéficier le voyageur des tarifs négociés ou au juste prix",
        ],
        agency: [
          "Manque de transparence, prend des commissions sur toutes les prestations, incluses dans le tarif total du séjour",
        ],
      },
      {
        label: "Réservation",
        planner: [
          "Peut assister le client sur le processus de réservations, mais ne peut effectuer la réservation à sa place",
        ],
        agency: ["Effectue les réservations"],
      },
      {
        label: "Relation",
        planner: ["Humain et accessible, contact direct"],
        agency: [
          "Pas d’interlocuteur privilégié, qualité du service client non garantie",
        ],
      },
      {
        label: "Conseils",
        planner: [
          "Conseils personnalisés, vous bénéficiez de recommandations et de bon plans",
        ],
        agency: ["Peu voir pas de conseils personnalisés"],
      },
      {
        label: "Les plus",
        planner: [
          "Carnet de voyage sur-mesure reprenant toutes les informations du séjour (informations pratiques sur la destination, hébergement, incontournables, adresses locales,  activités…",
          "Carte interactive reprenant votre itinéraire et regroupant toutes vos adresses, lieux d’intérêt et recommandations pour un accès simple et fluide pendant votre séjour.",
        ],
        agency: [],
      },
    ],
  },
  {
    id: "italy-expert",
    question:
      "Pourquoi suis-je la personne idéale pour organiser votre voyage en Italie ?",
    kind: "paragraphs",
    paragraphs: [
      "Franco-italienne, j’ai grandi entre deux cultures, deux sensibilités, deux façons de vivre.",
      "Je suis née et ai grandi à Paris. Puis il y a eu Rome. En 2019, j’y vis pour la première fois. Trois mois qui changent tout. Je tombe amoureuse de la Cité Éternelle et de ses ruelles où l’on se perd sans jamais vraiment se perdre. À ce moment-là, une évidence s’impose : je veux partager ma vie entre Paris et Rome.",
      "En 2024, j’y retourne pour un an. Cette fois, je ne suis plus de passage. Je vis Rome au quotidien. Je découvre les cafés de quartier, les adresses que l’on se murmure à voix basse, les lieux absents des guides. En 2026, je m’y installe pour de bon.",
      "Entre-temps, mon parcours en événementiel et en travel planning m’a appris à transformer une destination en expérience, et à concevoir un séjour comme un événement : avec cohérence, fluidité et sens du détail.",
      "Mais au fond, ce qui m’anime est simple : voir les gens sourire. Créer des souvenirs qui restent. Offrir une Italie authentique qui ne se contente pas d’être visitée, mais pleinement vécue.",
    ],
  },
  {
    id: "services",
    question: "Quels sont les différents services proposés ?",
    kind: "rich",
    blocks: [
      [
        { type: "text", text: "My Trip Designer propose " },
        {
          type: "strong",
          text: "deux formules principales",
          tone: "teal",
        },
        {
          type: "text",
          text: " d’organisation de voyage : Dolce Vita, idéale pour un séjour dans une seule destination, et La Strada, conçue pour un itinéraire personnalisé avec plusieurs points de chute. Ces deux formules incluent la recherche d’hébergements, de transports et de transferts, ainsi qu’un carnet sur-mesure regroupant toutes les informations utiles à votre séjour.",
        },
      ],
      [
        {
          type: "text",
          text: "Il est possible d’ajouter à une de ces deux formules le surclassement Far Niente afin de bénéficier d’un programme détaillé jour par jour ainsi que d’une carte interactive.",
        },
      ],
      [
        {
          type: "text",
          text: "Sont également proposés comme prestations: la consultation My Trip Advisor, le Carnet de voyages prêt à l’emploi, un service de négociation, ainsi que des prestations à la carte (recherche d’hébergements, de transports…).",
        },
      ],
    ],
  },
  {
    id: "process",
    question: "Comment ça se passe concrètement ?",
    kind: "steps",
    steps: [
      {
        step: "1",
        title: "Tout commence par un appel gratuit : ",
        body: "Ce premier échange est 100% gratuit et sans engagement. Pour l'optimiser au mieux, je vous invite à remplir un court formulaire lors de votre réservation afin de me partager vos premières envies de voyage.",
      },
      {
        step: "2",
        title: "Appel découverte : ",
        body: "Durant une trentaine de minutes, vous me faites part en détail de vos envies, intérêts, besoins et critères. Cela me permet de vous orienter vers la formule la plus adaptée à votre projet.",
      },
      {
        step: "3",
        title: "Réception du devis & Validation : ",
        body: "À l’issue de notre appel, vous recevez un récapitulatif de notre échange, un devis ainsi que les Conditions Générales de Vente.",
      },
      {
        step: "4",
        title: "Création du voyage :",
        body: "Dès que la validation est signée, je donne vie à votre projet. Je commence à concevoir votre feuille de route personnalisée et à rassembler mes meilleures recommandations locales pour poser les bases de votre futur séjour.",
      },
      {
        step: "5",
        title: "Suivi & Ajustements :",
        body: "Je vous propose mes premières pistes. Nous affinons ensemble chaque élément du programme, en procédant à des ajustements jusqu’à ce que le projet corresponde à 100 % à vos attentes.",
      },
      {
        step: "6",
        title: "Réception du carnet de voyage :",
        body: "Vous recevez votre carnet de voyage finalisé regroupant l'intégralité des réservations et tous les détails pratiques pour voyager l'esprit serein. Vous n’avez qu’à vous occuper des réservations et des valises !",
      },
    ],
  },
  {
    id: "italy-only",
    question: "Est-ce que tu organises uniquement des voyages en Italie ?",
    kind: "rich",
    blocks: [
      [
        {
          type: "text",
          text: "Non, je n’organise pas uniquement des voyages en Italie!",
        },
      ],
      [
        { type: "text", text: "My Trip Designer c’est déjà " },
        { type: "strong", text: "+150 voyages", tone: "teal" },
        { type: "text", text: " organisés dans " },
        { type: "strong", text: "80 destinations ", tone: "teal" },
        {
          type: "text",
          text: "dans le monde entier.",
        },
        { type: "break" },
        {
          type: "text",
          text: "Passionnée de voyage, j’ai personnellement exploré 16 pays et travaillé sur plus d’une vingtaine de destinations en Europe, Afrique, Amérique et Asie. Je peux donc également vous accompagner dans l’organisation d’autres voyages, avec la même exigence et le même souci du détail.",
        },
      ],
    ],
  },
  {
    id: "client-tasks",
    question: "De quoi dois-je m’occuper ?",
    kind: "paragraphs",
    paragraphs: [
      "Il vous sera uniquement demandé de valider les propositions, d’effectuer les réservations (la profession de travel planner ne me permet pas de le faire à votre place), et de préparer vos valises! ",
    ],
  },
  {
    id: "carnet-difference",
    question:
      "Quelle est la différence entre un carnet prêt à l'emploi et un carnet sur-mesure ?",
    kind: "bullets",
    items: [
      {
        title: "Le carnet prêt à l’emploi ",
        suffix: "— disponible directement à l’achat (39,90€)",
        body: "Un guide digital complet sur votre destination, pensé pour organiser votre voyage en autonomie : informations pratiques, conseils et recommandations, incontournables et pépites à visiter, adresses locales et bien plus encore.",
      },
      {
        title: "Le carnet sur mesure ",
        suffix: "— inclus dans les formules Dolce Vita et La Strada",
        body: "Tout le contenu du carnet prêt à l'emploi, mais élaboré spécialement pour vous. La différence : il intègre vos réservations (vols, hébergement...) et s'adapte à votre voyage réel, pas à un voyage type.",
      },
      {
        title: "Le carnet Premium",
        suffix: " — inclus dans la formule Far Niente",
        body: "Le carnet sur-mesure, augmenté. En plus dans votre carnet, un programme détaillé jour par jour adapté à votre rythme, des propositions d'activités selon vos centres d'intérêt, et une carte interactive My Maps avec vos itinéraires, points d'intérêt et adresses.",
      },
    ],
  },
  {
    id: "far-niente-addon",
    question:
      "J'ai déjà acheté un carnet prêt à l'emploi (ou je souhaite en acheter un), puis-je demander un itinéraire sur-mesure jour par jour ?",
    kind: "rich",
    blocks: [
      [
        { type: "text", text: "Tout à fait ! Vous pouvez ajouter l'option " },
        { type: "strong", text: "Far Niente", tone: "brand" },
        {
          type: "text",
          text: " (+40 €/jour). Je me base sur le carnet pour vous concevoir un programme sur-mesure jour par jour avec carte interactive.",
        },
      ],
    ],
  },
];
