import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * Rappel permanent que rien n'est persisté tant que Supabase n'est pas branché.
 */
export function DemoNotice() {
  return (
    <Alert>
      <AlertTitle>Mode démonstration</AlertTitle>
      <AlertDescription>
        Supabase n&apos;est pas configuré. Vous pouvez tester l&apos;ensemble de
        l&apos;administration, mais les modifications sont conservées en mémoire
        seulement et disparaissent au redémarrage du serveur. Renseignez
        NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY et
        SUPABASE_SERVICE_ROLE_KEY pour enregistrer réellement.
      </AlertDescription>
    </Alert>
  );
}
