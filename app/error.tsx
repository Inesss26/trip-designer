"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">
        Cette page n&apos;a pas pu être affichée
      </h1>
      <p className="mt-3 text-muted-foreground">
        Le contenu n&apos;a pas pu être chargé. Réessayez, et si le problème
        persiste, écrivez-moi directement par e-mail.
      </p>
      <div className="mt-6">
        <Button onClick={reset}>Réessayer</Button>
      </div>
    </main>
  );
}
