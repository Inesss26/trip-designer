import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { homeFormulas } from "@/lib/home-content";

export function HomeFormulas() {
  return (
    <section
      id="formules"
      className="relative mx-auto flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-11 px-4 py-10 sm:px-8 sm:py-[52px] lg:px-11"
    >
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/home/formulas-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-brand/20" />
      </div>

      <div className="relative flex flex-col gap-6">
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand-sand uppercase">
          formules
        </p>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-[450px] font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-white sm:text-[42px] sm:leading-[48px]">
            Choisissez votre façon de voyager
          </h2>
          <Button asChild variant="brandSecondary" size="cta">
            <Link href="#services-complementaires">
              voir toutes les formules
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative grid items-stretch gap-5 lg:grid-cols-3">
        {homeFormulas.map((formula) => (
          <article
            key={formula.id}
            className="flex flex-col gap-6 bg-white p-8 shadow-[0_2px_4px_#1e4854]"
          >
            {formula.featured ? (
              <p className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-[1.7px] text-brand-teal uppercase">
                <span className="text-[9px] tracking-[2.25px]">✦</span>
                Le plus populaire
              </p>
            ) : null}
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-[32px] text-brand">
                {formula.name}
              </h3>
              <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
                {formula.tagline}
              </p>
            </div>
            <p className="text-[15px] leading-5 font-light text-brand">
              {formula.description}
            </p>
            <div className="flex flex-col gap-2.5">
              <p className="text-[15px] leading-5 font-semibold text-brand">
                Compris dans ma prestation :
              </p>
              <ul className="flex flex-col gap-1">
                {formula.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-[15px] leading-5 font-light text-brand"
                  >
                    <span className="text-[9px] font-bold tracking-[2.25px] text-brand-teal">
                      ✦
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto bg-brand-sand px-4 py-3">
              <p className="text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
                Tarif
              </p>
              <div className="flex items-center justify-between text-brand">
                <p className="text-[12px] font-medium">{formula.priceLabel}</p>
                <p className="font-heading text-[32px] font-bold">
                  {formula.price}
                  {"priceSuffix" in formula && formula.priceSuffix ? (
                    <span className="text-[20px] font-normal">
                      {formula.priceSuffix}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
            <Button
              asChild
              variant={formula.featured ? "brand" : "brandOutline"}
              size="cta"
              className="w-full"
            >
              <Link href="/contact">Réserver mon appel</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
