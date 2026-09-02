import type { FieldErrors } from "@/lib/validation/schemas";

/**
 * État du formulaire de contact.
 *
 * Séparé de actions.ts : un fichier « use server » ne peut exporter que des
 * fonctions asynchrones.
 */
export type ContactFormState = {
  status: "idle" | "error" | "success";
  message: string | null;
  fieldErrors: FieldErrors;
  values: Record<string, string>;
};

export const contactInitialState: ContactFormState = {
  status: "idle",
  message: null,
  fieldErrors: {},
  values: {},
};
