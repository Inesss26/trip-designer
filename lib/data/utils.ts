import { getReadClient, getWriteClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Erreur métier remontée jusqu'aux Server Actions pour affichage à l'écran. */
export class DataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataError";
  }
}

export const SCHEMA_MISSING_MESSAGE =
  "Le schéma n'a pas encore été appliqué sur le projet Supabase : exécutez supabase/migrations/0001_init.sql dans l'éditeur SQL du dashboard.";

/**
 * Le projet Supabase répond, mais la table demandée n'existe pas.
 *
 * Cas courant juste après la création du projet, quand la migration n'a pas
 * encore été appliquée. PostgREST renvoie alors `PGRST205` (table absente du
 * cache de schéma) ou l'erreur PostgreSQL `42P01`.
 */
export function isSchemaMissingError(error: {
  code?: string;
  message?: string;
}): boolean {
  return (
    error.code === "PGRST205" ||
    error.code === "PGRST202" ||
    error.code === "42P01" ||
    Boolean(error.message?.includes("schema cache"))
  );
}

/**
 * Client utilisé par les écrans de l'administration.
 *
 * La clé secrète est préférée car elle voit aussi les brouillons et les
 * demandes de contact. Si seule la clé publique est configurée, on lit quand
 * même : l'administration reste consultable, avec les limites imposées par RLS,
 * et un bandeau explique ce qui manque.
 */
export function adminReadClient(): SupabaseClient | null {
  return getWriteClient() ?? getReadClient();
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
      "La clé secrète Supabase (SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY) est absente : la lecture fonctionne, mais aucune modification ne peut être enregistrée.",
    );
  }

  return null;
}

/**
 * Message d'écriture lisible : le cas « schéma non appliqué » est expliqué,
 * les autres erreurs sont reprises telles quelles.
 */
export function writeErrorMessage(
  error: { code?: string; message: string },
  prefix = "Enregistrement impossible",
): string {
  return isSchemaMissingError(error)
    ? SCHEMA_MISSING_MESSAGE
    : `${prefix} : ${error.message}`;
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
