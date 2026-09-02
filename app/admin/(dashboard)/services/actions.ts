"use server";

import { redirect } from "next/navigation";

import { assertAdminSession } from "@/lib/auth/guard";
import {
  createService,
  deleteService,
  updateService,
} from "@/lib/data/services";
import { DataError } from "@/lib/data/utils";
import { field, formError, formSuccess, type FormState } from "@/lib/forms";
import { revalidatePublicPages } from "@/lib/revalidate";
import { serviceInputSchema, toFieldErrors } from "@/lib/validation/schemas";

export async function saveService(
  serviceId: string | null,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await assertAdminSession();

  const parsed = serviceInputSchema.safeParse({
    slug: field(formData, "slug"),
    title: field(formData, "title"),
    tagline: field(formData, "tagline"),
    description: field(formData, "description"),
    priceFrom: field(formData, "priceFrom"),
    features: field(formData, "features"),
    status: field(formData, "status"),
    sortOrder: field(formData, "sortOrder"),
  });

  if (!parsed.success) {
    return formError(
      "Certains champs doivent être corrigés.",
      toFieldErrors(parsed.error),
    );
  }

  let createdId: string | null = null;

  try {
    if (serviceId) {
      await updateService(serviceId, parsed.data);
    } else {
      createdId = (await createService(parsed.data)).id;
    }
  } catch (error) {
    if (error instanceof DataError) {
      return formError(error.message);
    }

    throw error;
  }

  revalidatePublicPages();

  if (createdId) {
    redirect(`/admin/services/${createdId}?cree=1`);
  }

  return formSuccess("Les modifications ont été enregistrées.");
}

export async function removeService(serviceId: string): Promise<void> {
  await assertAdminSession();
  await deleteService(serviceId);
  revalidatePublicPages();
  redirect("/admin/services");
}
