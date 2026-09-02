import { demoId, demoStore, demoTimestamp } from "@/lib/data/demo-store";
import type { Service } from "@/lib/data/types";
import {
  byDisplayOrder,
  DataError,
  requireWriteClient,
  toNumber,
} from "@/lib/data/utils";
import { getReadClient } from "@/lib/supabase/client";
import type { PublicationStatus, ServiceInput } from "@/lib/validation/schemas";

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  price_from: number | string | null;
  features: string[] | null;
  status: PublicationStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const COLUMNS =
  "id, slug, title, tagline, description, price_from, features, status, sort_order, created_at, updated_at";

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    priceFrom: toNumber(row.price_from),
    features: row.features ?? [],
    status: row.status,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(input: ServiceInput) {
  return {
    slug: input.slug,
    title: input.title,
    tagline: input.tagline,
    description: input.description,
    price_from: input.priceFrom,
    features: input.features,
    status: input.status,
    sort_order: input.sortOrder,
  };
}

export async function listPublishedServices(): Promise<Service[]> {
  const client = getReadClient();

  if (!client) {
    return demoStore()
      .services.filter((service) => service.status === "published")
      .sort(byDisplayOrder);
  }

  const { data, error } = await client
    .from("services")
    .select(COLUMNS)
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new DataError(`Lecture des services impossible : ${error.message}`);
  }

  return (data as ServiceRow[]).map(mapService);
}

export async function listAllServices(): Promise<Service[]> {
  const client = requireWriteClient();

  if (!client) {
    return [...demoStore().services].sort(byDisplayOrder);
  }

  const { data, error } = await client
    .from("services")
    .select(COLUMNS)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new DataError(`Lecture des services impossible : ${error.message}`);
  }

  return (data as ServiceRow[]).map(mapService);
}

export async function getServiceById(id: string): Promise<Service | null> {
  const client = requireWriteClient();

  if (!client) {
    return demoStore().services.find((service) => service.id === id) ?? null;
  }

  const { data, error } = await client
    .from("services")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new DataError(`Lecture du service impossible : ${error.message}`);
  }

  return data ? mapService(data as ServiceRow) : null;
}

export async function createService(input: ServiceInput): Promise<Service> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();

    if (store.services.some((service) => service.slug === input.slug)) {
      throw new DataError("Un service utilise déjà cet identifiant d'URL.");
    }

    const timestamp = demoTimestamp();
    const service: Service = {
      id: demoId(),
      ...input,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    store.services.push(service);
    return service;
  }

  const { data, error } = await client
    .from("services")
    .insert(toRow(input))
    .select(COLUMNS)
    .single();

  if (error) {
    throw new DataError(translateWriteError(error.message));
  }

  return mapService(data as ServiceRow);
}

export async function updateService(
  id: string,
  input: ServiceInput,
): Promise<Service> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    const index = store.services.findIndex((service) => service.id === id);

    if (index === -1) {
      throw new DataError("Ce service n'existe plus.");
    }

    if (
      store.services.some(
        (service) => service.slug === input.slug && service.id !== id,
      )
    ) {
      throw new DataError("Un service utilise déjà cet identifiant d'URL.");
    }

    const updated: Service = {
      ...store.services[index],
      ...input,
      updatedAt: demoTimestamp(),
    };
    store.services[index] = updated;
    return updated;
  }

  const { data, error } = await client
    .from("services")
    .update(toRow(input))
    .eq("id", id)
    .select(COLUMNS)
    .single();

  if (error) {
    throw new DataError(translateWriteError(error.message));
  }

  return mapService(data as ServiceRow);
}

export async function deleteService(id: string): Promise<void> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    store.services = store.services.filter((service) => service.id !== id);
    return;
  }

  const { error } = await client.from("services").delete().eq("id", id);

  if (error) {
    throw new DataError(`Suppression impossible : ${error.message}`);
  }
}

function translateWriteError(message: string): string {
  if (message.includes("services_slug_key")) {
    return "Un service utilise déjà cet identifiant d'URL.";
  }

  return `Enregistrement impossible : ${message}`;
}
