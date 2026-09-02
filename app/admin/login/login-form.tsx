"use client";

import { useActionState } from "react";

import { login } from "@/app/admin/login/actions";
import { loginInitialState } from "@/app/admin/login/state";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [state, formAction, pending] = useActionState(
    login,
    loginInitialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <Alert variant="destructive" aria-live="polite">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : null}

      <input type="hidden" name="suivant" value={nextPath} />

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
        />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Vérification…" : "Se connecter"}
      </Button>
    </form>
  );
}
