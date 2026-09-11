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
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(90deg,rgba(30,72,84,0.2),rgba(30,72,84,0.2))]"
        />
        <div className="relative flex max-w-[716px] flex-col gap-8">
          <p className="text-[10px] font-bold tracking-[1.7px] text-white uppercase">
            {formulesHeroCopy.kicker}
          </p>
          <h1 className="font-heading text-[40px] leading-[44px] font-bold tracking-[-1.2px] text-white sm:text-[64px] sm:leading-[68px] sm:tracking-[-1.92px]">
            {formulesHeroCopy.title}
          </h1>
          <p className="max-w-[448px] text-[15px] leading-5 font-semibold text-white">
            {formulesHeroCopy.subtitle}
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] -translate-y-10 flex-col gap-8 px-4 sm:-translate-y-[88px] sm:px-8 lg:px-11">
        <div className="grid items-end gap-5 lg:grid-cols-3">
          {formulesPageFormulas.map((formula) => (
            <article
              key={formula.id}
              className={cn(
                "flex flex-col gap-9 bg-white px-8 pt-11 pb-10",
                formula.featured
                  ? "shadow-[0_4px_5.5px_rgba(61,0,0,0.5)] lg:min-h-[1050px]"
                  : "shadow-[0_4px_4px_rgba(30,72,84,0.3)] lg:min-h-[905px]",
              )}
            >
              <div className="flex flex-col gap-4">
                <p
                  className={cn(
                    "text-[10px] font-bold tracking-[1.7px] uppercase",
                    formula.kickerAccent ? "text-brand-teal" : "text-brand/30",
                  )}
                >
                  {formula.kicker}
                </p>
                <h2 className="font-heading text-[32px] text-brand">
                  {formula.name}
                </h2>
              </div>

              <p className="text-[15px] leading-5 font-light text-brand">
                {formula.description}
              </p>

              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
                  Compris dans ma prestation :
                </p>
                <ul className="flex flex-col gap-3">
                  {formula.features.map((feature) => (
                    <li key={feature.title} className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <SiteIcon src="/icons/diamond.svg" size={8} />
                        <p className="text-[15px] leading-5 font-semibold text-brand">
                          {feature.title}
                        </p>
                      </div>
                      <p className="text-[15px] leading-5 font-light text-brand/50">
                        {feature.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {"note" in formula && formula.note ? (
                <p className="text-[12px] leading-[15px] font-medium text-brand/50">
                  {formula.note}
                </p>
              ) : null}

              <div className="mt-auto flex flex-col gap-8">
                <div className="flex flex-col gap-1 pt-8">
                  {formula.pricing.variant === "single" ? (
                    <>
                      <p className="font-heading text-[42px] leading-12 font-bold tracking-[-0.84px] text-brand">
                        {formula.pricing.price}
                      </p>
                      <p className="text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
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
                          <p className="text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
                            {tier.label}
                          </p>
                          <p className="font-heading text-[36px] leading-[42px] font-bold text-brand">
                            {tier.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {formula.pricing.variant === "daily" ? (
                    <>
                      <p className="font-heading text-[42px] leading-12 font-bold tracking-[-0.84px] text-brand">
                        {formula.pricing.price}
                        <span className="text-[20px] font-normal">
                          {" "}
                          {formula.pricing.suffix}
                        </span>
                      </p>
                      <p className="text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
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

        <p className="mx-auto max-w-[672px] text-center text-[12px] leading-[15px] font-medium text-brand/50">
          {formulesDisclaimer}
        </p>
      </div>
    </section>
  );
}
