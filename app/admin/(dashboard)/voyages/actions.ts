"use server";

import { redirect } from "next/navigation";

import { assertAdminSession } from "@/lib/auth/guard";
import { createTrip, deleteTrip, updateTrip } from "@/lib/data/trips";
import { DataError } from "@/lib/data/utils";
import { field, formError, formSuccess, type FormState } from "@/lib/forms";
import { revalidatePublicPages } from "@/lib/revalidate";
import { uploadMedia } from "@/lib/supabase/storage";
import { toFieldErrors, tripInputSchema } from "@/lib/validation/schemas";

async function resolveCoverImageUrl(formData: FormData): Promise<string> {
  const file = formData.get("coverFile");

  if (file instanceof File && file.size > 0) {
    return uploadMedia(file);
  }

  return field(formData, "coverImageUrl");
}

export async function saveTrip(
  tripId: string | null,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await assertAdminSession();

  let coverImageUrl: string;

  try {
    coverImageUrl = await resolveCoverImageUrl(formData);
  } catch (error) {
    return formError(
      error instanceof DataError
        ? error.message
        : "L'image n'a pas pu être envoyée.",
    );
  }

  const parsed = tripInputSchema.safeParse({
    slug: field(formData, "slug"),
    title: field(formData, "title"),
    destination: field(formData, "destination"),
    country: field(formData, "country"),
    durationDays: field(formData, "durationDays"),
    priceFrom: field(formData, "priceFrom"),
    summary: field(formData, "summary"),
    description: field(formData, "description"),
    coverImageUrl,
    gallery: field(formData, "gallery"),
    tags: field(formData, "tags"),
    status: field(formData, "status"),
    isFeatured: formData.get("isFeatured") === "on" ? "on" : "",
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
    if (tripId) {
      await updateTrip(tripId, parsed.data);
    } else {
      createdId = (await createTrip(parsed.data)).id;
    }
  } catch (error) {
    if (error instanceof DataError) {
      return formError(error.message);
    }

    throw error;
  }

  revalidatePublicPages();

  // `redirect` lève une exception interne : elle doit rester hors du `try`.
  if (createdId) {
    redirect(`/admin/voyages/${createdId}?cree=1`);
  }

  return formSuccess("Les modifications ont été enregistrées.");
}

export async function removeTrip(tripId: string): Promise<void> {
  await assertAdminSession();
  await deleteTrip(tripId);
  revalidatePublicPages();
  redirect("/admin/voyages");
}
