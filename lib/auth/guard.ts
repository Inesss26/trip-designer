import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

/**
 * Garde-fou à appeler dans le layout admin ET dans chaque Server Action de
 * mutation. Le proxy ne fait que du confort de navigation : l'autorisation
 * réelle est vérifiée ici, au plus près de la donnée.
 */
export async function requireAdminSession(): Promise<void> {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }
}

/**
 * Variante pour les Server Actions : renvoie une erreur plutôt qu'une
 * redirection, afin que le formulaire affiche un message explicite.
 */
export async function assertAdminSession(): Promise<void> {
  if (!(await hasAdminSession())) {
    throw new Error("Session expirée. Reconnectez-vous pour continuer.");
  }
}
