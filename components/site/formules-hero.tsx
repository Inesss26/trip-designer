import Image from "next/image";
import Link from "next/link";

import { SiteIcon } from "@/components/site/site-icon";
import { Button } from "@/components/ui/button";
import {
  formulesDisclaimer,
  formulesHeroCopy,
  formulesPageFormulas,
} from "@/lib/formules-content";
import { cn } from "@/lib/utils";

export function FormulesHero() {
  return (
    <section className="flex flex-col">
      <div className="relative flex min-h-[420px] flex-col justify-center gap-8 overflow-hidden px-4 py-16 sm:min-h-[550px] sm:px-8 sm:py-[100px] lg:px-11">
        <Image
          src="/images/formules/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-accent-dark/20"
        />
        <div className="relative flex max-w-[716px] flex-col gap-8">
          <p className="type-tag text-text-on-dark">
            {formulesHeroCopy.kicker}
          </p>
          <h1 className="type-h1 text-text-on-dark">
            {formulesHeroCopy.title}
          </h1>
          <p className="max-w-[448px] type-body-strong text-text-on-dark">
            {formulesHeroCopy.subtitle}
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] -translate-y-10 flex-col gap-8 px-4 sm:-translate-y-[88px] sm:px-8 lg:px-11">
        <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-[145px_auto]">
          {formulesPageFormulas.map((formula) => (
            <article
              key={formula.id}
              className={cn(
                "card flex flex-col gap-9 pt-11 pb-10",
                formula.featured
                  ? "shadow-[0_4px_5.5px_var(--color-brand-primary-50)] lg:col-start-2 lg:row-span-2 lg:min-h-[1050px]"
                  : "shadow-[0_4px_4px_color-mix(in_srgb,var(--color-accent-dark)_30%,transparent)] lg:row-start-2 lg:h-full",
                formula.id === "dolce-vita" && "lg:col-start-1",
                formula.id === "far-niente" && "lg:col-start-3",
              )}
            >
              <div className="flex flex-col gap-4">
                <p
                  className={cn(
                    "type-tag",
                    formula.kickerAccent ? "text-brand-secondary" : "text-brand/30",
                  )}
                >
                  {formula.kicker}
                </p>
                <h2 className="type-h3 text-text-brand">
                  {formula.name}
                </h2>
              </div>

              <p className="type-body text-brand">
                {formula.description}
              </p>

              <div className="flex flex-col gap-4">
                <p className="type-tag text-brand/50">
                  Compris dans ma prestation :
                </p>
                <ul className="flex flex-col gap-3">
                  {formula.features.map((feature) => (
                    <li key={feature.title} className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <SiteIcon src="/icons/diamond.svg" size={8} />
                        <p className="type-body-strong text-brand">
                          {feature.title}
                        </p>
                      </div>
                      <p className="type-body text-brand/50">
                        {feature.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {"note" in formula && formula.note ? (
                <p className="type-body-small text-brand/50">
                  {formula.note}
                </p>
              ) : null}

              <div className="mt-auto flex flex-col gap-8">
                <div className="flex flex-col gap-1 pt-8">
                  {formula.pricing.variant === "single" ? (
                    <>
                      <p className="type-h2 text-brand">
                        {formula.pricing.price}
                      </p>
                      <p className="type-tag text-brand/50">
                        {formula.pricing.caption}
                      </p>
                    </>
                  ) : null}
                  {formula.pricing.variant === "tiers" ? (
                    <div className="flex flex-col gap-3">
                      {formula.pricing.tiers.map((tier) => (
                        <div
                          key={tier.label}
                          className="flex items-center justify-between gap-4"
                        >
                          <p className="type-tag text-brand/50">
                            {tier.label}
                          </p>
                          <p className="type-h2 text-text-brand">
                            {tier.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {formula.pricing.variant === "daily" ? (
                    <>
                      <p className="type-h2 text-brand">
                        {formula.pricing.price}
                        <span className="type-subtitle">
                          {" "}
                          {formula.pricing.suffix}
                        </span>
                      </p>
                      <p className="type-tag text-brand/50">
                        {formula.pricing.caption}
                      </p>
                    </>
                  ) : null}
                </div>

                <Button
                  asChild
                  variant={formula.ctaVariant}
                  size="cta"
                  className="w-full"
                >
                  <Link href="/contact">réserver mon appel</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto max-w-[672px] text-center type-body-small text-brand/50">
          {formulesDisclaimer}
        </p>
      </div>
    </section>
  );
}
