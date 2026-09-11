import Image from "next/image";

import { SiteIcon } from "@/components/site/site-icon";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/site";

const perks = [
  "Appel 100 % offert, sans engagement",
  "Réponse garantie sous 48h",
] as const;

export function ContactHero() {
  const href = CALENDLY_URL || "#formulaire";
  const external = href.startsWith("http");

  return (
    <section className="bg-brand px-4 py-16 sm:px-8 sm:py-16 lg:px-11">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-12 lg:flex-row">
        <div className="flex max-w-[552px] flex-col gap-11">
          <div className="flex flex-col gap-5">
            <p className="text-[10px] font-bold tracking-[1.7px] text-brand-cream/25 uppercase">
              premier échange
            </p>
            <h1 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand-cream sm:text-[42px] sm:leading-[48px]">
              Réservez votre
              <span className="block italic text-brand-teal">
                appel découverte.
              </span>
            </h1>
          </div>
          <p className="text-[15px] leading-5 font-light text-brand-cream">
            Un appel de 30 minutes, gratuit et sans engagement, pour
            comprendre vos envies et vous expliquer comment je peux les
            transformer en voyage inoubliable.
          </p>
          <ul className="flex flex-col gap-3">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-4 text-[12px] leading-[15px] font-medium text-brand-cream"
              >
                <SiteIcon src="/icons/contact/check.svg" width={8} height={5.5} />
                {perk}
              </li>
            ))}
          </ul>
          <Button asChild variant="brandSecondary" size="cta">
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noreferrer" }
                : undefined)}
            >
              Réserver mon appel découverte
            </a>
          </Button>
        </div>
        <div className="relative h-[320px] w-full max-w-[323px] overflow-hidden sm:h-[400px] lg:h-[420px]">
          <Image
            src="/images/contact/hero.png"
            alt="Agathe, fondatrice de My Trip Designer"
            fill
            priority
            sizes="323px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
