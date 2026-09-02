"use client";

import { useActionState } from "react";

import { saveReview } from "@/app/admin/(dashboard)/avis/actions";
import { FormFeedback } from "@/components/admin/form-feedback";
import { NativeSelect } from "@/components/admin/native-select";
import { FieldError } from "@/components/site/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Review, Trip } from "@/lib/data/types";
import { formInitialState } from "@/lib/forms";

export function ReviewForm({
  review,
  trips,
}: {
  review?: Review;
  trips: Trip[];
}) {
  const [state, formAction, pending] = useActionState(
    saveReview.bind(null, review?.id ?? null),
    formInitialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <FormFeedback state={state} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="authorName">Auteur *</Label>
          <Input
            id="authorName"
            name="authorName"
            required
            defaultValue={review?.authorName ?? ""}
          />
          <FieldError errors={state.fieldErrors} name="authorName" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="authorLocation">Ville</Label>
          <Input
            id="authorLocation"
            name="authorLocation"
            defaultValue={review?.authorLocation ?? ""}
          />
          <FieldError errors={state.fieldErrors} name="authorLocation" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Note sur 5 *</Label>
          <NativeSelect
            id="rating"
            name="rating"
            defaultValue={String(review?.rating ?? 5)}
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} / 5
              </option>
            ))}
          </NativeSelect>
          <FieldError errors={state.fieldErrors} name="rating" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="travelDate">Date du voyage</Label>
          <Input
            id="travelDate"
            name="travelDate"
            type="date"
            defaultValue={review?.travelDate ?? ""}
          />
          <FieldError errors={state.fieldErrors} name="travelDate" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Avis *</Label>
        <Textarea
          id="content"
          name="content"
          rows={6}
          required
          defaultValue={review?.content ?? ""}
        />
        <FieldError errors={state.fieldErrors} name="content" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tripId">Voyage concerné</Label>
          <NativeSelect
            id="tripId"
            name="tripId"
            defaultValue={review?.tripId ?? ""}
          >
            <option value="">Aucun voyage en particulier</option>
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.title}
              </option>
            ))}
          </NativeSelect>
          <FieldError errors={state.fieldErrors} name="tripId" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <NativeSelect
            id="status"
            name="status"
            defaultValue={review?.status ?? "pending"}
          >
            <option value="pending">À valider (invisible sur le site)</option>
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
            defaultValue={review?.sortOrder ?? 0}
          />
          <FieldError errors={state.fieldErrors} name="sortOrder" />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Switch
            id="isFeatured"
            name="isFeatured"
            defaultChecked={review?.isFeatured ?? false}
          />
          <Label htmlFor="isFeatured">Mettre en avant</Label>
        </div>
      </div>

      <div className="border-t pt-6">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Enregistrement…"
            : review
              ? "Enregistrer les modifications"
              : "Ajouter l'avis"}
        </Button>
      </div>
    </form>
  );
}
