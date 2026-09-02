import type { FieldErrors } from "@/lib/validation/schemas";

/** État commun à tous les formulaires de l'administration. */
export type FormState = {
  status: "idle" | "error" | "success";
  message: string | null;
  fieldErrors: FieldErrors;
};

export const formInitialState: FormState = {
  status: "idle",
  message: null,
  fieldErrors: {},
};

export function formError(
  message: string,
  fieldErrors: FieldErrors = {},
): FormState {
  return { status: "error", message, fieldErrors };
}

export function formSuccess(message: string): FormState {
  return { status: "success", message, fieldErrors: {} };
}

/** Lit un champ texte de `FormData` sous forme de chaîne. */
export function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}
