import { isSchemaMissingError } from "@/lib/data/utils";
import { getReadClient } from "@/lib/supabase/client";

/**
 * État de la base, tel qu'affiché dans l'administration.
 *
 * - `unconfigured` : aucune clé Supabase, le site tourne sur les données de
 *   démonstration en mémoire.
 * - `missing` : le projet Supabase répond mais la migration n'a pas été
 *   appliquée. Le site reste lisible grâce aux données de démonstration.
 * - `ready` : lecture et écriture normales.
 */
export type SchemaStatus = "unconfigured" | "missing" | "ready";

const CACHE_TTL_MS = 30_000;

let cached: { status: SchemaStatus; checkedAt: number } | null = null;

export async function getSchemaStatus(): Promise<SchemaStatus> {
  const client = getReadClient();

  if (!client) {
    return "unconfigured";
  }

  if (cached && Date.now() - cached.checkedAt < CACHE_TTL_MS) {
    return cached.status;
  }

  const { error } = await client.from("trips").select("id").limit(1);
  const status: SchemaStatus =
    error && isSchemaMissingError(error) ? "missing" : "ready";

  cached = { status, checkedAt: Date.now() };
  return status;
}

export function invalidateSchemaStatus(): void {
  cached = null;
}
