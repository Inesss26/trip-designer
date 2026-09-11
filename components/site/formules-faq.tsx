import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formulesFaq } from "@/lib/formules-content";

export function FormulesFaq({
  contactHref = "/contact",
}: {
  contactHref?: string;
}) {
  return (
    <section
      id="faq"
      className="mx-auto flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-11 px-4 sm:px-8 lg:px-12"
    >
      <div className="flex flex-col gap-6">
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
          Questions fréquentes
        </p>
        <h2 className="max-w-[513px] font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
          Tout ce que vous
          <br />
          voulez <span className="italic text-brand-teal">savoir.</span>
        </h2>
      </div>

      <div>
        {formulesFaq.map((item) => (
          <details
            key={item.question}
            className="group border-b border-brand/30"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <p className="px-4 py-3 text-[15px] leading-5 font-semibold text-brand">
                {item.question}
              </p>
              <span
                aria-hidden
                className="shrink-0 text-[20px] leading-5 font-semibold text-brand/50"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="max-w-[920px] px-4 pb-6 text-[15px] leading-5 font-light text-brand/70">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex max-w-[618px] flex-col gap-4 text-brand-navy">
          <p className="font-heading text-[24px] leading-[30px] font-bold">
            Une autre question ?
          </p>
          <p className="text-[15px] leading-5 font-light">
            Expliquez-moi votre projet ou doute, je vous répondrai dans les plus
            brefs délais.
          </p>
        </div>
        <Button asChild variant="brandOutline" size="cta">
          <Link href={contactHref}>contactez moi !</Link>
        </Button>
      </div>
    </section>
  );
}
