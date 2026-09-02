"use server";

import { assertAdminSession } from "@/lib/auth/guard";
import { updateContentValue } from "@/lib/data/content";
import { DataError } from "@/lib/data/utils";
import { field, formError, formSuccess, type FormState } from "@/lib/forms";
import { revalidatePublicPages } from "@/lib/revalidate";
import { contentUpdateSchema, toFieldErrors } from "@/lib/validation/schemas";

export async function saveContent(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await assertAdminSession();

  const parsed = contentUpdateSchema.safeParse({
    key: field(formData, "key"),
    value: field(formData, "value"),
  });

  if (!parsed.success) {
    return formError(
      "Ce texte n'a pas pu être enregistré.",
      toFieldErrors(parsed.error),
    );
  }

  try {
    await updateContentValue(parsed.data.key, parsed.data.value);
  } catch (error) {
    if (error instanceof DataError) {
      return formError(error.message);
    }

    throw error;
  }

  revalidatePublicPages();
  return formSuccess("Le texte a été mis à jour.");
}
