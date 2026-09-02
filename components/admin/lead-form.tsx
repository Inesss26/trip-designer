"use client";

import { useActionState } from "react";

import { saveLead } from "@/app/admin/(dashboard)/demandes/actions";
import { FormFeedback } from "@/components/admin/form-feedback";
import { NativeSelect } from "@/components/admin/native-select";
import { LEAD_LABELS } from "@/components/admin/status-badge";
import { FieldError } from "@/components/site/field-error";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Lead } from "@/lib/data/types";
import { formInitialState } from "@/lib/forms";
import { LEAD_STATUSES } from "@/lib/validation/schemas";

export function LeadForm({ lead }: { lead: Lead }) {
  const [state, formAction, pending] = useActionState(
    saveLead.bind(null, lead.id),
    formInitialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <FormFeedback state={state} />

      <div className="space-y-2 sm:max-w-xs">
        <Label htmlFor="status">Suivi</Label>
        <NativeSelect id="status" name="status" defaultValue={lead.status}>
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {LEAD_LABELS[status]}
            </option>
          ))}
        </NativeSelect>
        <FieldError errors={state.fieldErrors} name="status" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="adminNotes">Notes internes</Label>
        <Textarea
          id="adminNotes"
          name="adminNotes"
          rows={5}
          placeholder="Devis envoyé le…, relancer le…"
          defaultValue={lead.adminNotes ?? ""}
        />
        <p className="text-sm text-muted-foreground">
          Visibles uniquement dans cette administration.
        </p>
        <FieldError errors={state.fieldErrors} name="adminNotes" />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer le suivi"}
      </Button>
    </form>
  );
}
