"use client";

import { useActionState } from "react";

import { saveContent } from "@/app/admin/(dashboard)/contenus/actions";
import { FieldError } from "@/components/site/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteContentEntry } from "@/lib/data/types";
import { formInitialState } from "@/lib/forms";

/** Un bloc de texte du site, enregistré indépendamment des autres. */
export function ContentForm({ entry }: { entry: SiteContentEntry }) {
  const [state, formAction, pending] = useActionState(
    saveContent,
    formInitialState,
  );

  const fieldId = `content-${entry.key}`;

  return (
    <form action={formAction} className="space-y-2 border-t py-5 first:border-t-0">
      <input type="hidden" name="key" value={entry.key} />

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Label htmlFor={fieldId}>{entry.label}</Label>
        <code className="text-xs text-muted-foreground">{entry.key}</code>
      </div>

      {entry.kind === "richtext" ? (
        <Textarea
          id={fieldId}
          name="value"
          rows={4}
          defaultValue={entry.value}
        />
      ) : (
        <Input id={fieldId} name="value" defaultValue={entry.value} />
      )}

      <FieldError errors={state.fieldErrors} name="value" />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="outline" size="sm" disabled={pending}>
          {pending ? "Enregistrement…" : "Enregistrer"}
        </Button>
        {state.message ? (
          <p
            className={
              state.status === "error"
                ? "text-sm text-destructive"
                : "text-sm text-muted-foreground"
            }
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
