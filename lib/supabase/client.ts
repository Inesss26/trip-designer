import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import {
  supabaseAnonKey,
  supabaseServiceRoleKey,
  supabaseUrl,
} from "@/lib/env";

let readClient: SupabaseClient | null = null;
let writeClient: SupabaseClient | null = null;

const clientOptions = {
  auth: { persistSession: false, autoRefreshToken: false },
} as const;

/**
 * Client de lecture publique (clé `anon`). Les politiques RLS s'appliquent :
 * seuls les contenus publiés sont visibles.
 */
export function getReadClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  readClient ??= createClient(supabaseUrl, supabaseAnonKey, clientOptions);
  return readClient;
}

/**
 * Client d'administration (clé `service_role`, contourne RLS).
 *
 * À n'utiliser que dans du code serveur protégé par une session admin. Ce
 * module n'est jamais importé depuis un composant client.
 */
export function getWriteClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  writeClient ??= createClient(
    supabaseUrl,
    supabaseServiceRoleKey,
    clientOptions,
  );
  return writeClient;
}
