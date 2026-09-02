import { z } from "zod";

export const PUBLICATION_STATUSES = ["draft", "published"] as const;
export const REVIEW_STATUSES = ["pending", "published"] as const;
export const LEAD_STATUSES = [
  "new",
  "in_progress",
  "answered",
  "archived",
] as const;
export const CONTENT_KINDS = ["text", "richtext"] as const;

export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type ContentKind = (typeof CONTENT_KINDS)[number];

/**
 * Les champs de formulaire arrivent toujours en chaîne de caractères. Ces
 * helpers ramènent une valeur vide à `null` plutôt qu'à une chaîne vide, pour
 * que la base distingue « non renseigné » de « renseigné vide ».
 */
const trimmed = z.string().trim();

const optionalText = trimmed.transform((value) => value || null).nullable();

const optionalNumber = trimmed
  .transform((value) => (value === "" ? null : Number(value.replace(",", "."))))
  .nullable()
  .refine((value) => value === null || Number.isFinite(value), {
    error: "Indiquez un nombre valide.",
  });

const optionalPositiveInteger = optionalNumber.refine(
  (value) => value === null || (Number.isInteger(value) && value > 0),
  { error: "Indiquez un nombre entier supérieur à zéro." },
);

const optionalPrice = optionalNumber.refine(
  (value) => value === null || value >= 0,
  { error: "Le tarif ne peut pas être négatif." },
);

const optionalDate = trimmed
  .transform((value) => value || null)
  .nullable()
  .refine((value) => value === null || /^\d{4}-\d{2}-\d{2}$/.test(value), {
    error: "Utilisez le format AAAA-MM-JJ.",
  });

const optionalUrl = trimmed
  .transform((value) => value || null)
  .nullable()
  .refine((value) => value === null || z.url().safeParse(value).success, {
    error: "Indiquez une URL valide (https://…).",
  });

/** Une liste saisie une valeur par ligne, ou séparée par des virgules. */
const textList = trimmed.transform((value) =>
  value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0),
);

/** Une liste d'URL saisie une par ligne. */
const urlList = trimmed
  .transform((value) =>
    value
      .split(/[\n\s]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0),
  )
  .refine((items) => items.every((item) => z.url().safeParse(item).success), {
    error: "Chaque ligne doit être une URL valide (https://…).",
  });

const checkbox = z
  .union([z.literal("on"), z.literal("true"), z.literal("false"), z.literal("")])
  .optional()
  .transform((value) => value === "on" || value === "true");

const sortOrder = trimmed
  .transform((value) => (value === "" ? 0 : Number(value)))
  .refine((value) => Number.isInteger(value), {
    error: "L'ordre d'affichage doit être un nombre entier.",
  });

export const slugSchema = trimmed
  .min(2, "L'identifiant d'URL doit contenir au moins 2 caractères.")
  .max(120, "L'identifiant d'URL est trop long.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "L'identifiant d'URL n'accepte que des minuscules, des chiffres et des tirets.",
  );

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

// ---------------------------------------------------------------------------
// Voyages
// ---------------------------------------------------------------------------

export const tripInputSchema = z.object({
  slug: slugSchema,
  title: trimmed.min(3, "Le titre doit contenir au moins 3 caractères."),
  destination: trimmed.min(2, "Indiquez au moins une destination."),
  country: optionalText,
  durationDays: optionalPositiveInteger,
  priceFrom: optionalPrice,
  summary: trimmed
    .min(20, "Le résumé doit contenir au moins 20 caractères.")
    .max(400, "Le résumé ne doit pas dépasser 400 caractères."),
  description: optionalText,
  coverImageUrl: optionalUrl,
  gallery: urlList,
  tags: textList,
  status: z.enum(PUBLICATION_STATUSES),
  isFeatured: checkbox,
  sortOrder,
});

export type TripInput = z.output<typeof tripInputSchema>;

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const serviceInputSchema = z.object({
  slug: slugSchema,
  title: trimmed.min(3, "Le titre doit contenir au moins 3 caractères."),
  tagline: optionalText,
  description: trimmed.min(
    20,
    "La description doit contenir au moins 20 caractères.",
  ),
  priceFrom: optionalPrice,
  features: textList,
  status: z.enum(PUBLICATION_STATUSES),
  sortOrder,
});

export type ServiceInput = z.output<typeof serviceInputSchema>;

// ---------------------------------------------------------------------------
// Avis
// ---------------------------------------------------------------------------

export const reviewInputSchema = z.object({
  authorName: trimmed.min(2, "Indiquez le nom de l'auteur de l'avis."),
  authorLocation: optionalText,
  rating: trimmed
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 1 && value <= 5, {
      error: "La note doit être comprise entre 1 et 5.",
    }),
  content: trimmed.min(20, "L'avis doit contenir au moins 20 caractères."),
  tripId: optionalText,
  travelDate: optionalDate,
  status: z.enum(REVIEW_STATUSES),
  isFeatured: checkbox,
  sortOrder,
});

export type ReviewInput = z.output<typeof reviewInputSchema>;

// ---------------------------------------------------------------------------
// Demandes de contact
// ---------------------------------------------------------------------------

export const leadInputSchema = z.object({
  name: trimmed
    .min(2, "Indiquez votre nom.")
    .max(120, "Ce nom est trop long."),
  email: z.email("Cette adresse e-mail semble incorrecte."),
  phone: optionalText,
  destination: optionalText,
  travelPeriod: optionalText,
  partySize: optionalPositiveInteger,
  budgetRange: optionalText,
  message: trimmed
    .min(20, "Décrivez votre projet en 20 caractères au minimum.")
    .max(4000, "Le message ne doit pas dépasser 4000 caractères."),
});

export type LeadInput = z.output<typeof leadInputSchema>;

export const leadUpdateSchema = z.object({
  status: z.enum(LEAD_STATUSES),
  adminNotes: optionalText,
});

export type LeadUpdateInput = z.output<typeof leadUpdateSchema>;

// ---------------------------------------------------------------------------
// Contenus de pages
// ---------------------------------------------------------------------------

export const contentUpdateSchema = z.object({
  key: trimmed.min(1, "Clé de contenu manquante."),
  value: z.string().max(4000, "Ce texte ne doit pas dépasser 4000 caractères."),
});

export type ContentUpdateInput = z.output<typeof contentUpdateSchema>;

// ---------------------------------------------------------------------------
// Connexion à l'administration
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  password: z.string().min(1, "Saisissez le mot de passe."),
});

// ---------------------------------------------------------------------------
// Utilitaires de formulaire
// ---------------------------------------------------------------------------

export type FieldErrors = Record<string, string[]>;

/**
 * Convertit une erreur zod en dictionnaire `champ -> messages`, directement
 * consommable par les composants de formulaire.
 */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};

  for (const issue of error.issues) {
    // Une erreur sans chemin concerne le formulaire dans son ensemble.
    const field = issue.path.length > 0 ? String(issue.path[0]) : "_form";
    (fieldErrors[field] ??= []).push(issue.message);
  }

  return fieldErrors;
}
