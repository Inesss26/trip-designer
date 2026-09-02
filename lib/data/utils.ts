import { getReadClient, getWriteClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Erreur métier remontée jusqu'aux Server Actions pour affichage à l'écran. */
export class DataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataError";
  }
}

/**
 * Renvoie le client d'écriture, ou explique pourquoi l'écriture est impossible.
 * En mode démo (aucune clé Supabase), renvoie `null` : l'appelant bascule alors
 * sur le magasin en mémoire.
 */
export function requireWriteClient(): SupabaseClient | null {
  const client = getWriteClient();

  if (client) {
    return client;
  }

  if (getReadClient()) {
    throw new DataError(
      "SUPABASE_SERVICE_ROLE_KEY est absente : la lecture fonctionne mais aucune modification ne peut être enregistrée.",
    );
  }

  return null;
}

/** `numeric` revient de PostgreSQL sous forme de chaîne. */
export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string" && value.length > 0) {
    try {
      return toStringArray(JSON.parse(value));
    } catch {
      return [];
    }
  }

  return [];
}

/** Tri d'affichage commun : ordre manuel, puis date de création décroissante. */
export function byDisplayOrder<
  T extends { sortOrder: number; createdAt: string },
>(a: T, b: T): number {
  if (a.sortOrder !== b.sortOrder) {
    return a.sortOrder - b.sortOrder;
  }

  return b.createdAt.localeCompare(a.createdAt);
}
