import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { instagramUrl, LINKEDIN_URL } from "@/lib/site";

export function HomeCommunity({ instagram }: { instagram?: string }) {
  const instagramHref = instagramUrl(instagram);

  return (
    <section className="bg-bg-muted px-4 py-14 sm:px-8 sm:py-[72px] lg:px-11">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex max-w-[436px] flex-col gap-5">
            <p className="type-tag text-brand/30">
              Communauté & réseaux
            </p>
            <h2 className="type-h2 text-text-brand">
              La Dolce Vita au{" "}
              <span className="type-h2-italic text-brand-secondary">quotidien.</span>
            </h2>
          </div>
          <p className="max-w-[437px] type-body text-brand">
            Découvrez mes adresses authentiques, mes astuces et les coulisses de
            mon métier de Travel Designer. Autant de pépites et de savoir-faire
            partagés au quotidien pour vous inspirer et construire votre prochain
            séjour.
          </p>
        </div>

        <a
          href={instagramHref}
          target="_blank"
          rel="noreferrer"
          className="relative block h-[280px] overflow-hidden border border-brand/30 sm:h-[448px]"
        >
          <Image
            src="/images/home/instagram-feed.png"
            alt="Aperçu du compte Instagram My Trip Designer"
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
        </a>

        <div className="flex flex-col items-start gap-4">
          <Button asChild variant="primary" size="cta">
            <a href={instagramHref} target="_blank" rel="noreferrer">
              Suivre sur Instagram @my_trip_designer
            </a>
          </Button>
          <Button asChild variant="tertiary" size="cta">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              retrouvez moi aussi sur linkedin
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
          <Link href="/contact">réserver mon appel découverte</Link>
        </Button>
        <p className="type-tag text-text-on-dark">
          Réponse garantie sous 48h · Aucun engagement
        </p>
      </div>
    </section>
  );
}
