import { demoId, demoStore, demoTimestamp } from "@/lib/data/demo-store";
import type { Review } from "@/lib/data/types";
import { byDisplayOrder, DataError, requireWriteClient } from "@/lib/data/utils";
import { getReadClient } from "@/lib/supabase/client";
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

export async function listPublishedReviews(): Promise<Review[]> {
  const client = getReadClient();

  if (!client) {
    return demoStore()
      .reviews.filter((review) => review.status === "published")
      .sort(byDisplayOrder);
  }

  const { data, error } = await client
    .from("reviews")
    .select(COLUMNS)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new DataError(`Lecture des avis impossible : ${error.message}`);
  }

  return (data as ReviewRow[]).map(mapReview);
}

export async function listPublishedReviewsForTrip(
  tripId: string,
): Promise<Review[]> {
  const reviews = await listPublishedReviews();
  return reviews.filter((review) => review.tripId === tripId);
}

export async function listAllReviews(): Promise<Review[]> {
  const client = requireWriteClient();

  if (!client) {
    return [...demoStore().reviews].sort(byDisplayOrder);
  }

  const { data, error } = await client
    .from("reviews")
    .select(COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new DataError(`Lecture des avis impossible : ${error.message}`);
  }

  return (data as ReviewRow[]).map(mapReview);
}

export async function getReviewById(id: string): Promise<Review | null> {
  const client = requireWriteClient();

  if (!client) {
    return demoStore().reviews.find((review) => review.id === id) ?? null;
  }

  const { data, error } = await client
    .from("reviews")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
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
    throw new DataError(`Enregistrement impossible : ${error.message}`);
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
    throw new DataError(`Enregistrement impossible : ${error.message}`);
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
    throw new DataError(`Mise à jour impossible : ${error.message}`);
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
    throw new DataError(`Suppression impossible : ${error.message}`);
  }
}
