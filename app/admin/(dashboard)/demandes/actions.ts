"use server";

import { redirect } from "next/navigation";

import { assertAdminSession } from "@/lib/auth/guard";
import { deleteLead, updateLead } from "@/lib/data/leads";
import { DataError } from "@/lib/data/utils";
import { field, formError, formSuccess, type FormState } from "@/lib/forms";
import { leadUpdateSchema, toFieldErrors } from "@/lib/validation/schemas";

export async function saveLead(
  leadId: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await assertAdminSession();

  const parsed = leadUpdateSchema.safeParse({
    status: field(formData, "status"),
    adminNotes: field(formData, "adminNotes"),
  });

  if (!parsed.success) {
    return formError(
      "Le suivi n'a pas pu être enregistré.",
      toFieldErrors(parsed.error),
    );
  }

  try {
    await updateLead(leadId, parsed.data);
  } catch (error) {
    if (error instanceof DataError) {
      return formError(error.message);
    }

    throw error;
  }

  return formSuccess("Le suivi a été enregistré.");
}

export async function removeLead(leadId: string): Promise<void> {
  await assertAdminSession();
  await deleteLead(leadId);
  redirect("/admin/demandes");
}
