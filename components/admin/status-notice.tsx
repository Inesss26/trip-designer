import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { SchemaStatus } from "@/lib/data/schema-status";

/**
 * Rappel de l'état de la base, affiché en haut de chaque écran du back-office
 * tant que Supabase n'est pas complètement en place.
 */
export function StatusNotice({
  status,
  canWrite,
}: {
  status: SchemaStatus;
  canWrite: boolean;
}) {
  if (status === "unconfigured") {
    return (
      <Alert>
        <AlertTitle>Mode démonstration</AlertTitle>
        <AlertDescription>
          Supabase n&apos;est pas configuré. Vous pouvez tester
          l&apos;administration, mais les modifications sont conservées en
          mémoire seulement et disparaissent au redémarrage du serveur.
          Renseignez NEXT_PUBLIC_SUPABASE_URL, la clé publique et la clé secrète
          dans <code className="font-mono">.env.local</code> pour enregistrer
          réellement.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === "missing") {
    return (
      <Alert variant="destructive">
        <AlertTitle>Schéma Supabase non appliqué</AlertTitle>
        <AlertDescription>
          Le projet Supabase répond, mais les tables n&apos;existent pas encore.
          Ouvrez l&apos;éditeur SQL du dashboard Supabase et exécutez{" "}
          <code className="font-mono">supabase/migrations/0001_init.sql</code>,
          puis rechargez cette page. En attendant, le site affiche les contenus
          de démonstration et vos modifications ne sont pas enregistrées.
        </AlertDescription>
      </Alert>
    );
  }

  if (!canWrite) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Clé secrète Supabase manquante</AlertTitle>
        <AlertDescription>
          La lecture des contenus publiés fonctionne, mais aucune modification
          ne peut être enregistrée sans <code className="font-mono">
            SUPABASE_SECRET_KEY
          </code>{" "}
          (ou <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code>).
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
