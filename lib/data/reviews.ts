import { demoReviews } from "@/lib/data/demo";
import { demoId, demoStore, demoTimestamp } from "@/lib/data/demo-store";
import type { Review } from "@/lib/data/types";
import {
  adminReadClient,
  byDisplayOrder,
  DataError,
  isSchemaMissingError,
  requireWriteClient,
  writeErrorMessage,
} from "@/lib/data/utils";
import type { ReviewInput, ReviewStatus } from "@/lib/validation/schemas";

type ReviewRow = {
  id: string;
  author_name: string;
  author_location: string | null;
  rating: number;
  content: string;
  trip_id: string | null;
  travel_date: string | null;
  status: ReviewStatus;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const COLUMNS =
  "id, author_name, author_location, rating, content, trip_id, travel_date, status, is_featured, sort_order, created_at, updated_at";

function mapReview(row: ReviewRow): Review {
  return {
    id: row.id,
    authorName: row.author_name,
    authorLocation: row.author_location,
    rating: row.rating,
    content: row.content,
    tripId: row.trip_id,
    travelDate: row.travel_date,
    status: row.status,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(input: ReviewInput) {
  return {
    author_name: input.authorName,
    author_location: input.authorLocation,
    rating: input.rating,
    content: input.content,
    trip_id: input.tripId,
    travel_date: input.travelDate,
    status: input.status,
    is_featured: input.isFeatured,
    sort_order: input.sortOrder,
  };
}

function demoPublishedReviews(): Review[] {
  return demoReviews
    .filter((review) => review.status === "published")
    .sort(byDisplayOrder);
}

/**
 * Jeu d'avis de la vitrine : Karine, Alya et Chema.
 * Lu depuis demo.ts pour ne pas dépendre d'un seed Supabase périmé.
 */
export async function listPublishedReviews(): Promise<Review[]> {
  return demoPublishedReviews();
}

export async function listPublishedReviewsForTrip(
  tripId: string,
): Promise<Review[]> {
  const reviews = await listPublishedReviews();
  return reviews.filter((review) => review.tripId === tripId);
}

export async function listAllReviews(): Promise<Review[]> {
  const client = adminReadClient();

  if (!client) {
    return [...demoStore().reviews].sort(byDisplayOrder);
  }

  const { data, error } = await client
    .from("reviews")
    .select(COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (isSchemaMissingError(error)) {
      return [...demoStore().reviews].sort(byDisplayOrder);
    }

    throw new DataError(`Lecture des avis impossible : ${error.message}`);
  }

  return (data as ReviewRow[]).map(mapReview);
}

export async function getReviewById(id: string): Promise<Review | null> {
  const client = adminReadClient();
  const fromDemo = () =>
    demoStore().reviews.find((review) => review.id === id) ?? null;

  if (!client) {
    return fromDemo();
  }

  const { data, error } = await client
    .from("reviews")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    if (isSchemaMissingError(error)) {
      return fromDemo();
    }

    throw new DataError(`Lecture de l'avis impossible : ${error.message}`);
  }

  return data ? mapReview(data as ReviewRow) : null;
}

export async function createReview(input: ReviewInput): Promise<Review> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    const timestamp = demoTimestamp();
    const review: Review = {
      id: demoId(),
      ...input,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    store.reviews.push(review);
    return review;
  }

  const { data, error } = await client
    .from("reviews")
    .insert(toRow(input))
    .select(COLUMNS)
    .single();

  if (error) {
    throw new DataError(writeErrorMessage(error));
  }

  return mapReview(data as ReviewRow);
}

export async function updateReview(
  id: string,
  input: ReviewInput,
): Promise<Review> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    const index = store.reviews.findIndex((review) => review.id === id);

    if (index === -1) {
      throw new DataError("Cet avis n'existe plus.");
    }

    const updated: Review = {
      ...store.reviews[index],
      ...input,
      updatedAt: demoTimestamp(),
    };
    store.reviews[index] = updated;
    return updated;
  }

  const { data, error } = await client
    .from("reviews")
    .update(toRow(input))
    .eq("id", id)
    .select(COLUMNS)
    .single();

  if (error) {
    throw new DataError(writeErrorMessage(error));
  }

  return mapReview(data as ReviewRow);
}

export async function setReviewStatus(
  id: string,
  status: ReviewStatus,
): Promise<void> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    const index = store.reviews.findIndex((review) => review.id === id);

    if (index === -1) {
      throw new DataError("Cet avis n'existe plus.");
    }

    store.reviews[index] = {
      ...store.reviews[index],
      status,
      updatedAt: demoTimestamp(),
    };
    return;
  }

  const { error } = await client
    .from("reviews")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new DataError(writeErrorMessage(error, "Mise à jour impossible"));
  }
}

export async function deleteReview(id: string): Promise<void> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    store.reviews = store.reviews.filter((review) => review.id !== id);
    return;
  }

  const { error } = await client.from("reviews").delete().eq("id", id);

  if (error) {
    throw new DataError(writeErrorMessage(error, "Suppression impossible"));
  }
}
