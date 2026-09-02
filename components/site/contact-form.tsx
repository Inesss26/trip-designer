"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  contactInitialState,
  submitContactRequest,
} from "@/app/contact/actions";
import { FieldError } from "@/components/site/field-error";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  confirmationMessage: string;
  defaultDestination?: string;
};

export function ContactForm({
  confirmationMessage,
  defaultDestination = "",
}: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    submitContactRequest,
    contactInitialState,
  );
  const errorRef = useRef<HTMLDivElement>(null);
  const renderedAtRef = useRef<HTMLInputElement>(null);

  // Le timestamp est écrit côté client après hydratation : une valeur rendue
  // par le serveur serait figée par le cache et casserait le filtre anti-spam.
  // Sans JavaScript, il reste à 0 et le contrôle de durée est ignoré.
  useEffect(() => {
    if (renderedAtRef.current) {
      renderedAtRef.current.value = String(Date.now());
    }
  }, []);

  useEffect(() => {
    if (state.status === "error") {
      errorRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <Alert>
        <AlertTitle>Demande envoyée</AlertTitle>
        <AlertDescription>{confirmationMessage}</AlertDescription>
      </Alert>
    );
  }

  const value = (name: string, fallback = "") =>
    state.values[name] ?? fallback;

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.message ? (
        <div ref={errorRef} tabIndex={-1} aria-live="polite">
          <Alert variant="destructive">
            <AlertTitle>Envoi impossible</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        </div>
      ) : null}

      <input
        ref={renderedAtRef}
        type="hidden"
        name="renderedAt"
        defaultValue="0"
      />
      <div aria-hidden="true" className="hidden">
        <label htmlFor="siteWeb">Site web</label>
        <input id="siteWeb" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nom et prénom *</Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            defaultValue={value("name")}
            aria-describedby={state.fieldErrors.name ? "name-error" : undefined}
          />
          <FieldError errors={state.fieldErrors} name="name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Adresse e-mail *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={value("email")}
            aria-describedby={
              state.fieldErrors.email ? "email-error" : undefined
            }
          />
          <FieldError errors={state.fieldErrors} name="email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={value("phone")}
          />
          <FieldError errors={state.fieldErrors} name="phone" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination envisagée</Label>
          <Input
            id="destination"
            name="destination"
            placeholder="Japon, Islande, pas encore d'idée…"
            defaultValue={value("destination", defaultDestination)}
          />
          <FieldError errors={state.fieldErrors} name="destination" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="travelPeriod">Période de voyage</Label>
          <Input
            id="travelPeriod"
            name="travelPeriod"
            placeholder="Printemps 2027, 2 semaines"
            defaultValue={value("travelPeriod")}
          />
          <FieldError errors={state.fieldErrors} name="travelPeriod" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="partySize">Nombre de voyageurs</Label>
          <Input
            id="partySize"
            name="partySize"
            type="number"
            min={1}
            defaultValue={value("partySize")}
            aria-describedby={
              state.fieldErrors.partySize ? "partySize-error" : undefined
            }
          />
          <FieldError errors={state.fieldErrors} name="partySize" />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="budgetRange">Budget approximatif</Label>
          <Input
            id="budgetRange"
            name="budgetRange"
            placeholder="3 000 à 5 000 € hors vols"
            defaultValue={value("budgetRange")}
          />
          <FieldError errors={state.fieldErrors} name="budgetRange" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Votre projet *</Label>
        <Textarea
          id="message"
          name="message"
          rows={7}
          required
          placeholder="Qui part, ce que vous aimez, ce que vous voulez éviter, les contraintes de dates…"
          defaultValue={value("message")}
          aria-describedby={
            state.fieldErrors.message ? "message-error" : undefined
          }
        />
        <FieldError errors={state.fieldErrors} name="message" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Envoi en cours…" : "Envoyer ma demande"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Les champs marqués d&apos;une astérisque sont obligatoires.
        </p>
      </div>
    </form>
  );
}
