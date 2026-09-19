export const siteNav = [
  { href: "/", label: "Accueil" },
  { href: "/formules", label: "Formules" },
  { href: "/carnets", label: "Carnets de voyage" },
  { href: "/a-propos", label: "À propos" },
] as const;

export const CONTACT_EMAIL = "agathe@mytripdesigner.fr";

function encodeMailtoQuery(value: string) {
  return encodeURIComponent(value).replace(/['!]/g, (char) => {
    return `%${char.charCodeAt(0).toString(16).toUpperCase()}`;
  });
}

function mailtoHref(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeMailtoQuery(subject)}&body=${encodeMailtoQuery(body)}`;
}

export const MAILTO_NEGOTIATION = mailtoHref(
  "Demande de négociation d'hôtel - [Votre Nom]",
  [
    "Bonjour Agathe,",
    "",
    "Je souhaite faire appel à ton service de négociation pour mon futur séjour. Voici les détails de ma demande :",
    "",
    "- Nom de l'hôtel ciblé : ",
    "- Lien de l'hôtel ou réservation visée : ",
    "- Dates du séjour : ",
    "- Nombre de personnes : ",
    "- Tarif actuel constaté : ",
    "- Mes critères prioritaires (ex: réduction, petit-déjeuner, upgrade, flexibilité) : ",
    "",
    "Merci !",
  ].join("\n"),
);

export const MAILTO_FAQ = mailtoHref(
  "Question sur My Trip Designer - [Votre Nom]",
  [
    "Bonjour Agathe,",
    "",
    "Je souhaite te poser une question concernant mon projet de voyage :",
    "",
    "[Posez votre question ici]",
    "",
    "Merci !",
  ].join("\n"),
);

export const MAILTO_A_LA_CARTE = mailtoHref(
  "Demande de service à la carte - [Votre Nom]",
  [
    "Bonjour Agathe,",
    "",
    "Je souhaite obtenir un coup de main pour l'organisation de mon voyage. Voici les informations sur mon projet :",
    "",
    "- Type de besoin (Recherche transports / Hébergements / Événement spécial) : ",
    "- Destination : ",
    "- Dates du voyage : ",
    "- Nombre de voyageurs : ",
    "- Budget approximatif : ",
    "- Détails de ma demande : ",
    "",
    "Merci !",
  ].join("\n"),
);

export const ZCAL_URL = "https://zcal.co/mytripdesigner-it";
export const ZCAL_DISCOVERY_URL = `${ZCAL_URL}/appeldecouverte`;
export const ZCAL_ADVISOR_URL = `${ZCAL_URL}/mytripadvisor`;

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  const path = href.split("#")[0];
  if (!path || path === "/") {
    return false;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

export const INSTAGRAM_URL = "https://www.instagram.com/my_trip_designer/";
export const LINKEDIN_URL = "https://www.linkedin.com/";
