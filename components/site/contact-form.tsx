"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  defaultDestination?: string;
};

const fieldClass =
  "h-[46px] rounded-[4px] border-brand-primary-30 bg-bg-default px-[17px] type-body-small text-text-brand placeholder:text-brand-primary-30 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20";

const labelClass = "type-tag text-brand/50";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const SUCCESS_MESSAGE =
  "Merci ! Votre message a bien été envoyé, nous vous répondrons sous 48h.";

export function ContactForm({ defaultDestination = "" }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      errorRef.current?.focus();
    }
  }, [error]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    setPending(true);
    setSuccess(false);
    setError(null);

    if (!accessKey) {
      setPending(false);
      setError("L'envoi n'a pas pu aboutir. Réessayez dans un instant.");
      return;
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: String(formData.get("name") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          project_type: String(formData.get("destination") ?? "").trim(),
          message: String(formData.get("message") ?? "").trim(),
        }),
      });

      const payload = (await response.json()) as { success?: boolean };

      if (!response.ok || payload.success !== true) {
        throw new Error("Web3Forms rejected the submission");
      }

      form.reset();
      setSuccess(true);
    } catch {
      setError("L'envoi n'a pas pu aboutir. Réessayez dans un instant.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-8"
    >
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
            className={fieldClass}
          />
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
            className={fieldClass}
          />
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
          defaultValue={defaultDestination}
          className={fieldClass}
        />
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
          className={cn(
            fieldClass,
            "h-[140px] min-h-[140px] py-[13px] field-sizing-fixed",
          )}
        />
      </div>

      <div className="flex flex-col gap-5">
        <Button
          type="submit"
          variant="primary"
          size="cta"
          className="w-full"
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Envoi en cours..." : "Envoyer mon message"}
        </Button>
        {success ? (
          <p
            className="border-l-2 border-accent-dark pl-4 type-body-small text-accent-dark"
            role="status"
          >
            {SUCCESS_MESSAGE}
          </p>
        ) : null}
        {error ? (
          <p
            ref={errorRef}
            tabIndex={-1}
            className="type-body-small text-brand-primary/70"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        <p className="text-center type-body-small text-brand/30">
          Toute donnée partagée est strictement confidentielle
        </p>
      </div>
    </form>
  );
}
