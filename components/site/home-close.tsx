import Image from "next/image";

import { ZcalLink } from "@/components/site/zcal-link";
import { Button } from "@/components/ui/button";
import { aboutSocial } from "@/lib/about-content";
import { INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/site";

export function HomeCommunity() {
  return (
    <section className="bg-bg-muted px-4 py-16 sm:px-8 sm:py-24 lg:px-11">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex max-w-[436px] flex-col gap-5">
            <p className="type-tag text-brand/30">
              {aboutSocial.kicker}
            </p>
            <h2 className="type-h2 text-text-brand">
              {aboutSocial.title}
              <br />
              <span className="type-h2-italic text-brand-secondary">
                {aboutSocial.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-[437px] type-body text-brand">
            {aboutSocial.text}
          </p>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir le compte Instagram My Trip Designer"
        >
          <Image
            src="/images/about/instagram-gallery.jpg"
            alt="Publications Instagram My Trip Designer"
            width={1024}
            height={341}
            sizes="100vw"
            className="h-auto w-full"
          />
        </a>

        <div className="flex w-fit flex-col items-stretch gap-4 self-start">
          <Button asChild variant="primary" size="cta">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Suivre sur Instagram
            </a>
          </Button>
          <Button asChild variant="tertiary" size="cta" className="bg-white">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              retrouvez moi sur linkedin
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HomeCta() {
  return (
    <section className="relative flex min-h-[520px] flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:min-h-[674px] sm:px-8">
      <Image
        src="/images/home/cta-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-navy/65 to-brand-navy/40"
      />
      <div aria-hidden className="absolute inset-0 bg-black/10" />
      <div className="relative flex max-w-[512px] flex-col items-center gap-6">
        <div className="relative size-[95px] opacity-80">
          <Image
            src="/images/home/logo.png"
            alt=""
            fill
            sizes="95px"
            className="object-cover"
          />
        </div>
        <p className="type-tag text-text-on-dark">
          Commençons l&apos;aventure
        </p>
        <h2 className="type-h2 text-text-on-dark">
          Votre dolce vita vous attend.
          <br />
          Parlons-en.
        </h2>
        <p className="max-w-[448px] type-body text-text-on-dark">
          Un appel de 30 minutes, gratuit et sans engagement, pour comprendre
          vos envies et vous expliquer comment je peux les transformer en voyage
          inoubliable.
        </p>
        <Button asChild variant="primary" size="cta">
          <ZcalLink>réserver mon appel découverte</ZcalLink>
        </Button>
        <p className="type-tag text-text-on-dark">
          Réponse garantie sous 48h · Aucun engagement
        </p>
      </div>
    </section>
  );
}
