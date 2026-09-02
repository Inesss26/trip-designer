"use server";

import { redirect } from "next/navigation";

import { assertAdminSession } from "@/lib/auth/guard";
import {
  createReview,
  deleteReview,
  setReviewStatus,
  updateReview,
} from "@/lib/data/reviews";
import { DataError } from "@/lib/data/utils";
import { field, formError, formSuccess, type FormState } from "@/lib/forms";
import { revalidatePublicPages } from "@/lib/revalidate";
import { reviewInputSchema, toFieldErrors } from "@/lib/validation/schemas";
import type { ReviewStatus } from "@/lib/validation/schemas";

export async function saveReview(
  reviewId: string | null,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await assertAdminSession();

  const parsed = reviewInputSchema.safeParse({
    authorName: field(formData, "authorName"),
    authorLocation: field(formData, "authorLocation"),
    rating: field(formData, "rating"),
    content: field(formData, "content"),
    tripId: field(formData, "tripId"),
    travelDate: field(formData, "travelDate"),
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
    if (reviewId) {
      await updateReview(reviewId, parsed.data);
    } else {
      createdId = (await createReview(parsed.data)).id;
    }
  } catch (error) {
    if (error instanceof DataError) {
      return formError(error.message);
    }

    throw error;
  }

  revalidatePublicPages();

  if (createdId) {
    redirect(`/admin/avis/${createdId}?cree=1`);
  }

  return formSuccess("Les modifications ont été enregistrées.");
}

/** Publication ou dépublication directement depuis la liste. */
export async function changeReviewStatus(
  reviewId: string,
  status: ReviewStatus,
): Promise<void> {
  await assertAdminSession();
  await setReviewStatus(reviewId, status);
  revalidatePublicPages();
}

export async function removeReview(reviewId: string): Promise<void> {
  await assertAdminSession();
  await deleteReview(reviewId);
  revalidatePublicPages();
  redirect("/admin/avis");
}
