"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      size="sm"
      disabled={pending}
      className="text-destructive"
    >
      {pending ? "Suppression…" : label}
    </Button>
  );
}

/**
 * Suppression en un clic, avec confirmation navigateur. Le formulaire reste
 * fonctionnel sans JavaScript : dans ce cas la confirmation est simplement
 * ignorée.
 */
export function DeleteForm({
  action,
  label = "Supprimer",
  confirmMessage,
}: {
  action: () => Promise<void>;
  label?: string;
  confirmMessage: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <SubmitButton label={label} />
    </form>
  );
}
