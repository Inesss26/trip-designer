/**
 * Lecture centralisée des variables d'environnement.
 *
 * Le site est conçu pour démarrer même sans configuration : tant que Supabase
 * n'est pas branché, la couche de données bascule sur le jeu de démonstration
 * (voir lib/data/demo.ts).
 */

function read(name: string): string | null {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : null;
}

export const supabaseUrl = read("NEXT_PUBLIC_SUPABASE_URL");
export const supabaseAnonKey = read("NEXT_PUBLIC_SUPABASE_ANON_KEY");
export const supabaseServiceRoleKey = read("SUPABASE_SERVICE_ROLE_KEY");

/** Le site peut-il lire ses contenus dans Supabase ? */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/** L'administration peut-elle écrire dans Supabase ? */
export function isSupabaseWritable(): boolean {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

/** Aucune persistance disponible : les écritures ne sont pas enregistrées. */
export function isDemoMode(): boolean {
  return !isSupabaseWritable();
}

export const adminPassword = read("ADMIN_PASSWORD");
export const adminSessionSecret = read("ADMIN_SESSION_SECRET");

/**
 * En développement, un secret par défaut évite de bloquer le démarrage. En
 * production l'absence de secret est une erreur : on refuse de signer une
 * session avec une valeur connue de tous.
 */
export function resolveSessionSecret(): string {
  if (adminSessionSecret && adminSessionSecret.length >= 32) {
    return adminSessionSecret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_SESSION_SECRET est absent ou trop court (32 caractères minimum).",
    );
  }

  return "mytripdesigner-secret-de-developpement-uniquement";
}

/** Mot de passe admin effectif, avec repli explicite en développement. */
export function resolveAdminPassword(): string | null {
  if (adminPassword) {
    return adminPassword;
  }

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return "admin";
}

export const storageBucket = "media";
