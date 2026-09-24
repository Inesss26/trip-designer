import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HomeCarnetsBanner() {
  return (
    <section className="bg-bg-muted">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-8 px-4 py-[52px] sm:px-8 lg:flex-row lg:items-end lg:gap-10 lg:px-11">
        <div className="flex w-full max-w-[820px] flex-col gap-5">
          <p className="flex items-center gap-2 type-tag text-brand-secondary">
            <span aria-hidden="true">✦</span>
            Guides Prêts à l&apos;emploi
          </p>
          <h2 className="type-h3 text-text-brand">
            L&apos;esprit My Trip Designer dans votre poche
          </h2>
          <p className="type-body text-brand/80">
            Mes meilleures adresses et itinéraires regroupés dans des carnets de
            voyage digitaux (PDF + carte interactive) pour visiter mes villes
            coups de cœur.
          </p>
        </div>
        <Button asChild variant="primary" size="cta" className="w-full shrink-0 px-11 sm:w-auto">
          <Link href="/carnets">parcourir les carnets</Link>
        </Button>
      </div>
    </section>
  );
}
