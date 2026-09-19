import Image from "next/image";

import { SiteIcon } from "@/components/site/site-icon";
import { ZcalLink } from "@/components/site/zcal-link";
import { Button } from "@/components/ui/button";

const perks = [
  "Appel 100 % offert, sans engagement",
  "Réponse garantie sous 48h",
] as const;

export function ContactHero() {
  return (
    <section className="bg-brand-primary py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-12 px-4 sm:px-8 lg:flex-row lg:px-[115px]">
        <div className="flex max-w-[552px] flex-col gap-11">
          <div className="flex flex-col gap-5">
            <p className="type-tag text-text-on-dark/25">
              premier échange
            </p>
            <h1 className="type-h2 text-text-on-dark">
              Réservez votre
              <span className="block type-h2-italic text-brand-secondary">
                appel découverte.
              </span>
            </h1>
          </div>
          <p className="type-body text-text-on-dark">
            Un appel de 30 minutes, gratuit et sans engagement, pour
            comprendre vos envies et vous expliquer comment je peux les
            transformer en voyage inoubliable.
          </p>
          <ul className="flex flex-col gap-3">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-4 type-body-small text-text-on-dark"
              >
                <SiteIcon src="/icons/contact/check.svg" width={8} height={5.5} />
                {perk}
              </li>
            ))}
          </ul>
          <Button asChild variant="dark" size="cta" className="self-start">
            <ZcalLink>Réserver mon appel découverte</ZcalLink>
          </Button>
        </div>
        <div className="relative h-[320px] w-full max-w-[323px] overflow-hidden sm:h-[400px] lg:h-[420px]">
          <Image
            src="/images/contact/hero.png"
            alt="Agathe, fondatrice de My Trip Designer"
            fill
            priority
            sizes="323px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
