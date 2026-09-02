"use client";

import { useActionState } from "react";

import { saveTrip } from "@/app/admin/(dashboard)/voyages/actions";
import { FormFeedback } from "@/components/admin/form-feedback";
import { NativeSelect } from "@/components/admin/native-select";
import { FieldError } from "@/components/site/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Trip } from "@/lib/data/types";
import { formInitialState } from "@/lib/forms";

type TripFormProps = {
  trip?: Trip;
  canUploadImages: boolean;
};

export function TripForm({ trip, canUploadImages }: TripFormProps) {
  const [state, formAction, pending] = useActionState(
    saveTrip.bind(null, trip?.id ?? null),
    formInitialState,
  );

  return (
    <form action={formAction} className="space-y-8">
      <FormFeedback state={state} />

      <section className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={trip?.title ?? ""}
            />
            <FieldError errors={state.fieldErrors} name="title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Identifiant d&apos;URL *</Label>
            <Input
              id="slug"
              name="slug"
              required
              placeholder="japon-tokyo-alpes-japonaises"
              defaultValue={trip?.slug ?? ""}
            />
            <p className="text-sm text-muted-foreground">
              Adresse publique : /voyages/identifiant
            </p>
            <FieldError errors={state.fieldErrors} name="slug" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destinations *</Label>
            <Input
              id="destination"
              name="destination"
              required
              placeholder="Tokyo, Takayama, Kyoto"
              defaultValue={trip?.destination ?? ""}
            />
            <FieldError errors={state.fieldErrors} name="destination" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Pays</Label>
            <Input
              id="country"
              name="country"
              defaultValue={trip?.country ?? ""}
            />
            <FieldError errors={state.fieldErrors} name="country" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="durationDays">Durée (en jours)</Label>
            <Input
              id="durationDays"
              name="durationDays"
              type="number"
              min={1}
              defaultValue={trip?.durationDays ?? ""}
            />
            <FieldError errors={state.fieldErrors} name="durationDays" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceFrom">Tarif à partir de (en euros)</Label>
            <Input
              id="priceFrom"
              name="priceFrom"
              type="number"
              min={0}
              step="10"
              defaultValue={trip?.priceFrom ?? ""}
            />
            <FieldError errors={state.fieldErrors} name="priceFrom" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Résumé *</Label>
          <Textarea
            id="summary"
            name="summary"
            rows={3}
            required
            maxLength={400}
            placeholder="Deux phrases qui donnent envie et posent le cadre."
            defaultValue={trip?.summary ?? ""}
          />
          <p className="text-sm text-muted-foreground">
            Affiché sur la page d&apos;accueil, 400 caractères maximum.
          </p>
          <FieldError errors={state.fieldErrors} name="summary" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description détaillée</Label>
          <Textarea
            id="description"
            name="description"
            rows={10}
            placeholder="Séparez les paragraphes par une ligne vide."
            defaultValue={trip?.description ?? ""}
          />
          <FieldError errors={state.fieldErrors} name="description" />
        </div>
      </section>

      <section className="space-y-6 border-t pt-6">
        <h2 className="text-base font-medium">Photos</h2>

        <div className="space-y-2">
          <Label htmlFor="coverImageUrl">URL de la photo principale</Label>
          <Input
            id="coverImageUrl"
            name="coverImageUrl"
            type="url"
            placeholder="https://…"
            defaultValue={trip?.coverImageUrl ?? ""}
          />
          <FieldError errors={state.fieldErrors} name="coverImageUrl" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverFile">Ou envoyer une image</Label>
          <Input
            id="coverFile"
            name="coverFile"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            disabled={!canUploadImages}
          />
          <p className="text-sm text-muted-foreground">
            {canUploadImages
              ? "JPEG, PNG, WebP ou AVIF, 8 Mo maximum. L'image envoyée remplace l'URL ci-dessus."
              : "L'envoi de fichiers nécessite Supabase. En attendant, collez une URL d'image."}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gallery">Galerie</Label>
          <Textarea
            id="gallery"
            name="gallery"
            rows={4}
            placeholder={"https://…\nhttps://…"}
            defaultValue={trip?.gallery.join("\n") ?? ""}
          />
          <p className="text-sm text-muted-foreground">
            Une URL d&apos;image par ligne.
          </p>
          <FieldError errors={state.fieldErrors} name="gallery" />
        </div>
      </section>

      <section className="space-y-6 border-t pt-6">
        <h2 className="text-base font-medium">Publication</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <NativeSelect
              id="status"
              name="status"
              defaultValue={trip?.status ?? "draft"}
            >
              <option value="draft">Brouillon (invisible sur le site)</option>
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
              defaultValue={trip?.sortOrder ?? 0}
            />
            <p className="text-sm text-muted-foreground">
              Les plus petits nombres apparaissent en premier.
            </p>
            <FieldError errors={state.fieldErrors} name="sortOrder" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Étiquettes</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="Famille, Randonnée, Road trip"
              defaultValue={trip?.tags.join(", ") ?? ""}
            />
            <p className="text-sm text-muted-foreground">
              Séparées par des virgules.
            </p>
            <FieldError errors={state.fieldErrors} name="tags" />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Switch
              id="isFeatured"
              name="isFeatured"
              defaultChecked={trip?.isFeatured ?? false}
            />
            <Label htmlFor="isFeatured">Mettre en avant</Label>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3 border-t pt-6">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Enregistrement…"
            : trip
              ? "Enregistrer les modifications"
              : "Créer le voyage"}
        </Button>
      </div>
    </form>
  );
}
