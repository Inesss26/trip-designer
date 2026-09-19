"use client";

import { useActionState, useEffect, useRef } from "react";

import { submitContactRequest } from "@/app/contact/actions";
import { contactInitialState } from "@/app/contact/state";
import { FieldError } from "@/components/site/field-error";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  confirmationMessage: string;
  defaultDestination?: string;
};

const fieldClass =
  "h-[46px] rounded-[4px] border-brand-primary-30 bg-bg-default px-[17px] type-body-small text-text-brand placeholder:text-brand-primary-30 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20";

const labelClass =
  "type-tag text-brand/50";

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
    <form action={formAction} className="flex w-full flex-col gap-8" noValidate>
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
        <input
          id="siteWeb"
          name="siteWeb"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className={labelClass}>
            Nom complet *
          </Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Camille Dupont"
            defaultValue={value("name")}
            className={fieldClass}
            aria-invalid={Boolean(state.fieldErrors.name)}
            aria-describedby={state.fieldErrors.name ? "name-error" : undefined}
          />
          <FieldError errors={state.fieldErrors} name="name" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className={labelClass}>
            Adresse email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="camille@email.com"
            defaultValue={value("email")}
            className={fieldClass}
            aria-invalid={Boolean(state.fieldErrors.email)}
            aria-describedby={
              state.fieldErrors.email ? "email-error" : undefined
            }
          />
          <FieldError errors={state.fieldErrors} name="email" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="destination" className={labelClass}>
          Destination / Type de projet *
        </Label>
        <Input
          id="destination"
          name="destination"
          required
          aria-required="true"
          placeholder="Italie, carnet sur-mesure, appel découverte…"
          defaultValue={value("destination", defaultDestination)}
          className={fieldClass}
          aria-invalid={Boolean(state.fieldErrors.destination)}
          aria-describedby={
            state.fieldErrors.destination ? "destination-error" : undefined
          }
        />
        <FieldError errors={state.fieldErrors} name="destination" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className={labelClass}>
          Votre message
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Décrivez votre projet, vos envies, vos dates…"
          defaultValue={value("message")}
          className={cn(
            fieldClass,
            "h-[140px] min-h-[140px] py-[13px] field-sizing-fixed",
          )}
          aria-invalid={Boolean(state.fieldErrors.message)}
          aria-describedby={
            state.fieldErrors.message ? "message-error" : undefined
          }
        />
        <FieldError errors={state.fieldErrors} name="message" />
      </div>

      <div className="flex flex-col gap-5">
        <Button
          type="submit"
          variant="primary"
          size="cta"
          className="w-full"
          disabled={pending}
        >
          {pending ? "Envoi en cours…" : "Envoyer mon message"}
        </Button>
        <p className="text-center type-body-small text-brand/30">
          Toute donnée partagée est strictement confidentielle
        </p>
      </div>
    </form>
  );
}
