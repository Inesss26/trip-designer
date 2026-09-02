"use client";

import { useActionState } from "react";

import { saveService } from "@/app/admin/(dashboard)/services/actions";
import { FormFeedback } from "@/components/admin/form-feedback";
import { NativeSelect } from "@/components/admin/native-select";
import { FieldError } from "@/components/site/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Service } from "@/lib/data/types";
import { formInitialState } from "@/lib/forms";

export function ServiceForm({ service }: { service?: Service }) {
  const [state, formAction, pending] = useActionState(
    saveService.bind(null, service?.id ?? null),
    formInitialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <FormFeedback state={state} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titre *</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={service?.title ?? ""}
          />
          <FieldError errors={state.fieldErrors} name="title" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Identifiant *</Label>
          <Input
            id="slug"
            name="slug"
            required
            placeholder="itineraire-sur-mesure"
            defaultValue={service?.slug ?? ""}
          />
          <FieldError errors={state.fieldErrors} name="slug" />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="tagline">Accroche</Label>
          <Input
            id="tagline"
            name="tagline"
            placeholder="Le parcours, jour par jour"
            defaultValue={service?.tagline ?? ""}
          />
          <FieldError errors={state.fieldErrors} name="tagline" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          rows={6}
          required
          defaultValue={service?.description ?? ""}
        />
        <FieldError errors={state.fieldErrors} name="description" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Ce qui est inclus</Label>
        <Textarea
          id="features"
          name="features"
          rows={5}
          placeholder={"Itinéraire jour par jour\nDeux allers-retours de modifications"}
          defaultValue={service?.features.join("\n") ?? ""}
        />
        <p className="text-sm text-muted-foreground">Un élément par ligne.</p>
        <FieldError errors={state.fieldErrors} name="features" />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="priceFrom">Tarif à partir de (en euros)</Label>
          <Input
            id="priceFrom"
            name="priceFrom"
            type="number"
            min={0}
            step="5"
            defaultValue={service?.priceFrom ?? ""}
          />
          <FieldError errors={state.fieldErrors} name="priceFrom" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <NativeSelect
            id="status"
            name="status"
            defaultValue={service?.status ?? "draft"}
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </NativeSelect>
          <FieldError errors={state.fieldErrors} name="status" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sortOrder">Ordre d&apos;affichage</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={service?.sortOrder ?? 0}
          />
          <FieldError errors={state.fieldErrors} name="sortOrder" />
        </div>
      </div>

      <div className="border-t pt-6">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Enregistrement…"
            : service
              ? "Enregistrer les modifications"
              : "Créer la formule"}
        </Button>
      </div>
    </form>
  );
}
