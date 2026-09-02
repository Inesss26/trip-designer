import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { FormState } from "@/lib/forms";

export function FormFeedback({ state }: { state: FormState }) {
  if (state.status === "idle" || !state.message) {
    return null;
  }

  const isError = state.status === "error";

  return (
    <Alert variant={isError ? "destructive" : "default"} aria-live="polite">
      <AlertTitle>{isError ? "Enregistrement impossible" : "Enregistré"}</AlertTitle>
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
}
