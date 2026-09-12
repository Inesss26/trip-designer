import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { homeFormulas } from "@/lib/home-content";
import { cn } from "@/lib/utils";

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
        <div className="absolute inset-0 bg-gradient-to-b from-text-main/30 to-brand-primary/20" />
      </div>

      <div className="relative flex flex-col gap-6">
        <p className="type-tag text-brand-sand">
          formules
        </p>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-[450px] type-h2 text-text-on-dark">
            Choisissez votre façon de voyager
          </h2>
          <Button asChild variant="dark" size="cta">
            <Link href="/formules">voir toutes les formules</Link>
          </Button>
        </div>
      </div>

      <div className="relative grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)_minmax(0,1fr)]">
        {homeFormulas.map((formula) => (
          <article
            key={formula.id}
            className={cn(
              "card flex flex-col gap-6 !p-[28px] shadow-[0_2px_4px_var(--color-accent-dark)]",
              formula.featured && "lg:z-[1] lg:shadow-[0_6px_16px_var(--color-accent-dark)]",
            )}
          >
            {formula.featured ? (
              <p className="flex items-center justify-start gap-2 type-tag text-brand-secondary">
                <span className="type-tag">✦</span>
                Le plus populaire
              </p>
            ) : null}
            <div className="flex flex-col gap-2">
              <h3 className="type-h3 text-text-brand">
                {formula.name}
              </h3>
              <p className="type-tag text-brand/30">
                {formula.tagline}
              </p>
            </div>
            <p className="type-body text-brand">
              {formula.description}
            </p>
            <div className="flex flex-col gap-2.5">
              <p className="type-body-strong text-brand">
                Compris dans ma prestation :
              </p>
              <ul className="flex flex-col gap-1">
                {formula.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 type-body text-brand"
                  >
                    <span className="type-tag text-brand-secondary">
                      ✦
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto bg-bg-muted px-4 py-3">
              <p className="type-tag text-brand/50">
                Tarif
              </p>
              <div className="flex items-center justify-between text-brand">
                <p className="type-body-small">{formula.priceLabel}</p>
                <p className="type-h2">
                  {formula.price}
                  {"priceSuffix" in formula && formula.priceSuffix ? (
                    <span className="type-subtitle">
                      {formula.priceSuffix}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
            <Button
              asChild
              variant={formula.featured ? "primary" : "tertiary"}
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
