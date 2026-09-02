"use server";

import type { ContactFormState } from "@/app/contact/state";
import { createLead } from "@/lib/data/leads";
import { DataError } from "@/lib/data/utils";
import { leadInputSchema, toFieldErrors } from "@/lib/validation/schemas";

const FIELDS = [
  "name",
  "email",
  "phone",
  "destination",
  "travelPeriod",
  "partySize",
  "budgetRange",
  "message",
] as const;

/** Délai minimal entre l'affichage du formulaire et l'envoi, en millisecondes. */
const MIN_FILL_DURATION = 1500;

export async function submitContactRequest(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values: Record<string, string> = {};

  for (const field of FIELDS) {
    values[field] = String(formData.get(field) ?? "");
  }

  // Anti-spam : un robot remplit tous les champs, y compris celui-ci, qui est
  // masqué. Il soumet aussi le formulaire quasi instantanément.
  const honeypot = String(formData.get("siteWeb") ?? "");
  const renderedAt = Number(formData.get("renderedAt") ?? 0);
  const elapsed = Date.now() - renderedAt;

  if (honeypot.length > 0 || (renderedAt > 0 && elapsed < MIN_FILL_DURATION)) {
    return {
      status: "error",
      message:
        "Votre envoi a été bloqué par le filtre anti-spam. Patientez quelques secondes puis réessayez.",
      fieldErrors: {},
      values,
    };
  }

  const parsed = leadInputSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs doivent être corrigés.",
      fieldErrors: toFieldErrors(parsed.error),
      values,
    };
  }

  try {
    await createLead(parsed.data);
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof DataError
          ? error.message
          : "Une erreur inattendue est survenue. Réessayez dans un instant.",
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: null,
    fieldErrors: {},
    values: {},
  };
}
