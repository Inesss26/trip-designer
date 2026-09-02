import { revalidatePath } from "next/cache";

/**
 * Invalide les pages publiques après une modification dans l'administration,
 * pour que le changement soit visible immédiatement côté visiteur.
 */
export function revalidatePublicPages(): void {
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/voyages/[slug]", "page");
}
