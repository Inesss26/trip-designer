import { DataError } from "@/lib/data/utils";
import { web3formsAccessKey } from "@/lib/env";
import type { LeadInput } from "@/lib/validation/schemas";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

/**
 * Envoie le message du formulaire à l'adresse liée à la clé Web3Forms
 * (à créer avec agathe@mytripdesigner.fr).
 *
 * Sans clé, l'envoi est seulement simulé en développement pour pouvoir
 * vérifier le formulaire. En production, l'absence de clé est une erreur.
 */
export async function sendContactEmail(input: LeadInput): Promise<void> {
  const accessKey = web3formsAccessKey();

  if (!accessKey) {
    if (process.env.NODE_ENV === "production") {
      throw new DataError(
        "L'envoi n'a pas pu aboutir. Réessayez dans un instant.",
      );
    }

    return;
  }

  let response: Response;

  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Nouveau message de ${input.name}`,
        from_name: "My Trip Designer",
        name: input.name,
        email: input.email,
        projet: input.destination,
        message: input.message || "(aucun message)",
      }),
    });
  } catch {
    throw new DataError(
      "L'envoi n'a pas pu aboutir. Réessayez dans un instant.",
    );
  }

  let payload: Web3FormsResponse | null = null;

  try {
    payload = (await response.json()) as Web3FormsResponse;
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.success !== true) {
    throw new DataError(
      "L'envoi n'a pas pu aboutir. Réessayez dans un instant.",
    );
  }
}
