import { demoId, demoStore, demoTimestamp } from "@/lib/data/demo-store";
import type { Trip } from "@/lib/data/types";
import {
  adminReadClient,
  byDisplayOrder,
  DataError,
  isSchemaMissingError,
  requireWriteClient,
  toNumber,
  toStringArray,
  writeErrorMessage,
} from "@/lib/data/utils";
import { getReadClient } from "@/lib/supabase/client";
import type { PublicationStatus, TripInput } from "@/lib/validation/schemas";

type TripRow = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string | null;
  duration_days: number | null;
  price_from: number | string | null;
  summary: string;
  description: string | null;
  cover_image_url: string | null;
  gallery: unknown;
  tags: string[] | null;
  status: PublicationStatus;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const COLUMNS =
  "id, slug, title, destination, country, duration_days, price_from, summary, description, cover_image_url, gallery, tags, status, is_featured, sort_order, created_at, updated_at";

function mapTrip(row: TripRow): Trip {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    destination: row.destination,
    country: row.country,
    durationDays: row.duration_days,
    priceFrom: toNumber(row.price_from),
    summary: row.summary,
    description: row.description,
    coverImageUrl: row.cover_image_url,
    gallery: toStringArray(row.gallery),
    tags: row.tags ?? [],
    status: row.status,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(input: TripInput) {
  return {
    slug: input.slug,
    title: input.title,
    destination: input.destination,
    country: input.country,
    duration_days: input.durationDays,
    price_from: input.priceFrom,
    summary: input.summary,
    description: input.description,
    cover_image_url: input.coverImageUrl,
    gallery: input.gallery,
    tags: input.tags,
    status: input.status,
    is_featured: input.isFeatured,
    sort_order: input.sortOrder,
  };
}

// ---------------------------------------------------------------------------
// Lecture publique
// ---------------------------------------------------------------------------

function demoPublishedTrips(): Trip[] {
  return demoStore()
    .trips.filter((trip) => trip.status === "published")
    .sort(byDisplayOrder);
}

export async function listPublishedTrips(): Promise<Trip[]> {
  const client = getReadClient();

  if (!client) {
    return demoPublishedTrips();
  }

  const { data, error } = await client
    .from("trips")
    .select(COLUMNS)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    // Le site reste lisible tant que la migration n'a pas été appliquée.
    if (isSchemaMissingError(error)) {
      return demoPublishedTrips();
    }

    throw new DataError(`Lecture des voyages impossible : ${error.message}`);
  }

  return (data as TripRow[]).map(mapTrip);
}

export async function listFeaturedTrips(limit = 3): Promise<Trip[]> {
  const trips = await listPublishedTrips();
  const featured = trips.filter((trip) => trip.isFeatured);
  const selection = featured.length > 0 ? featured : trips;

  return selection.slice(0, limit);
}

export async function getPublishedTripBySlug(
  slug: string,
): Promise<Trip | null> {
  const client = getReadClient();
  const fromDemo = () =>
    demoPublishedTrips().find((trip) => trip.slug === slug) ?? null;

  if (!client) {
    return fromDemo();
  }

  const { data, error } = await client
    .from("trips")
    .select(COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    if (isSchemaMissingError(error)) {
      return fromDemo();
    }

    throw new DataError(`Lecture du voyage impossible : ${error.message}`);
  }

  return data ? mapTrip(data as TripRow) : null;
}

// ---------------------------------------------------------------------------
// Administration
// ---------------------------------------------------------------------------

export async function listAllTrips(): Promise<Trip[]> {
  const client = adminReadClient();

  if (!client) {
    return [...demoStore().trips].sort(byDisplayOrder);
  }

  const { data, error } = await client
    .from("trips")
    .select(COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (isSchemaMissingError(error)) {
      return [...demoStore().trips].sort(byDisplayOrder);
    }

    throw new DataError(`Lecture des voyages impossible : ${error.message}`);
  }

  return (data as TripRow[]).map(mapTrip);
}

export async function getTripById(id: string): Promise<Trip | null> {
  const client = adminReadClient();
  const fromDemo = () =>
    demoStore().trips.find((trip) => trip.id === id) ?? null;

  if (!client) {
    return fromDemo();
  }

  const { data, error } = await client
    .from("trips")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    if (isSchemaMissingError(error)) {
      return fromDemo();
    }

    throw new DataError(`Lecture du voyage impossible : ${error.message}`);
  }

  return data ? mapTrip(data as TripRow) : null;
}

export async function createTrip(input: TripInput): Promise<Trip> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();

    if (store.trips.some((trip) => trip.slug === input.slug)) {
      throw new DataError("Un voyage utilise déjà cet identifiant d'URL.");
    }

    const timestamp = demoTimestamp();
    const trip: Trip = {
      id: demoId(),
      ...input,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    store.trips.push(trip);
    return trip;
  }

  const { data, error } = await client
    .from("trips")
    .insert(toRow(input))
    .select(COLUMNS)
    .single();

  if (error) {
    throw new DataError(translateWriteError(error));
  }

  return mapTrip(data as TripRow);
}

export async function updateTrip(id: string, input: TripInput): Promise<Trip> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    const index = store.trips.findIndex((trip) => trip.id === id);

    if (index === -1) {
      throw new DataError("Ce voyage n'existe plus.");
    }

    if (store.trips.some((trip) => trip.slug === input.slug && trip.id !== id)) {
      throw new DataError("Un voyage utilise déjà cet identifiant d'URL.");
    }

    const updated: Trip = {
      ...store.trips[index],
      ...input,
      updatedAt: demoTimestamp(),
    };
    store.trips[index] = updated;
    return updated;
  }

  const { data, error } = await client
    .from("trips")
    .update(toRow(input))
    .eq("id", id)
    .select(COLUMNS)
    .single();

  if (error) {
    throw new DataError(translateWriteError(error));
  }

  return mapTrip(data as TripRow);
}

export async function deleteTrip(id: string): Promise<void> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    store.trips = store.trips.filter((trip) => trip.id !== id);
    store.reviews = store.reviews.map((review) =>
      review.tripId === id ? { ...review, tripId: null } : review,
    );
    return;
  }

  const { error } = await client.from("trips").delete().eq("id", id);

  if (error) {
    throw new DataError(writeErrorMessage(error, "Suppression impossible"));
  }
}

function translateWriteError(error: {
  code?: string;
  message: string;
}): string {
  if (error.message.includes("trips_slug_key")) {
    return "Un voyage utilise déjà cet identifiant d'URL.";
  }

  return writeErrorMessage(error);
}
