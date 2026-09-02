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

/**
 * Supabase a renommé ses clés d'API : `anon` devient « publishable »
 * (`sb_publishable_…`) et `service_role` devient « secret » (`sb_secret_…`).
 * Les deux jeux de noms sont acceptés, l'ancien restant valide.
 */
export const supabaseAnonKey =
  read("NEXT_PUBLIC_SUPABASE_ANON_KEY") ??
  read("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

export const supabaseServiceRoleKey =
  read("SUPABASE_SERVICE_ROLE_KEY") ?? read("SUPABASE_SECRET_KEY");

/** Le site peut-il lire ses contenus dans Supabase ? */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/** L'administration peut-elle écrire dans Supabase ? */
export function isSupabaseWritable(): boolean {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

export const adminPassword = read("ADMIN_PASSWORD");
export const adminSessionSecret = read("ADMIN_SESSION_SECRET");

const DEVELOPMENT_SESSION_SECRET =
  "mytripdesigner-secret-de-developpement-uniquement";

/**
 * Le secret est-il réellement configuré ?
 *
 * Sert à refuser la connexion en production plutôt qu'à faire échouer la
 * vérification du cookie : une exception levée pendant la vérification serait
 * silencieusement interprétée comme « session invalide », et le message
 * d'erreur n'atteindrait jamais l'écran.
 */
export function isSessionSecretConfigured(): boolean {
  return Boolean(adminSessionSecret && adminSessionSecret.length >= 32);
}

/**
 * En développement, un secret par défaut évite d'avoir à configurer quoi que ce
 * soit. En production, la connexion est refusée en amont (voir l'action de
 * connexion) : aucune session ne peut donc être signée avec cette valeur
 * publique.
 */
export function resolveSessionSecret(): string {
  return isSessionSecretConfigured()
    ? adminSessionSecret!
    : DEVELOPMENT_SESSION_SECRET;
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
