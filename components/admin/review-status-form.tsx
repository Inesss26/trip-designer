"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline" size="sm" disabled={pending}>
      {pending ? "…" : label}
    </Button>
  );
}

/** Bascule publication / dépublication d'un avis, sans quitter la liste. */
export function ReviewStatusForm({
  action,
  label,
}: {
  action: () => Promise<void>;
  label: string;
}) {
  return (
    <form action={action}>
      <SubmitButton label={label} />
    </form>
  );
}
