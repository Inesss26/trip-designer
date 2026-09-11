import type { Metadata } from "next";

import { CarnetsBenefits } from "@/components/site/carnets-benefits";
import { CarnetsCatalog } from "@/components/site/carnets-catalog";
import { CarnetsUpsell } from "@/components/site/carnets-upsell";
import { FormulesFaq } from "@/components/site/formules-faq";
import { HomeCta } from "@/components/site/home-close";
import { MarqueeTape } from "@/components/site/marquee-tape";
import { SiteShell } from "@/components/site/site-shell";
import { getContentMap } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Carnets de voyage",
  description:
    "Des guides digitaux complets pour explorer différentes destinations en toute autonomie. Téléchargez votre carnet et partez l'esprit tranquille.",
};

export const revalidate = 3600;

export default async function CarnetsPage() {
  const content = await getContentMap();

  return (
    <SiteShell content={content}>
      <main className="flex flex-col gap-16 pb-0 lg:gap-24">
        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-12 sm:px-8 sm:pt-[72px] lg:px-11">
          <div className="flex max-w-[665px] flex-col gap-8">
            <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
              boutique
            </p>
            <h1 className="font-heading text-[40px] leading-[44px] font-bold tracking-[-1.2px] text-brand sm:text-[64px] sm:leading-[68px] sm:tracking-[-1.92px]">
              Vos carnets de voyage{" "}
              <span className="italic text-brand-teal">prêts à l&apos;emploi.</span>
            </h1>
            <p className="text-[15px] leading-5 font-light text-brand">
              Des guides digitaux complets conçus par mes soins pour explorer
              différentes destinations en toute autonomie. Téléchargez votre
              carnet et partez l&apos;esprit tranquille.
            </p>
          </div>
          <CarnetsCatalog />
        </section>
        <CarnetsBenefits />
        <MarqueeTape />
        <CarnetsUpsell />
        <FormulesFaq />
        <HomeCta />
      </main>
    </SiteShell>
  );
}
