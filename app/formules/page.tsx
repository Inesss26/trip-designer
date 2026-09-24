import type { Metadata } from "next";

import { FormulesCompare } from "@/components/site/formules-compare";
import { FormulesFaq } from "@/components/site/formules-faq";
import { FormulesHero } from "@/components/site/formules-hero";
import { HomeCta } from "@/components/site/home-close";
import { HomeCarnetsBanner } from "@/components/site/home-carnets-banner";
import { HomeExtras } from "@/components/site/home-extras";
import { MarqueeTape } from "@/components/site/marquee-tape";
import { SiteShell } from "@/components/site/site-shell";
import { getContentMap } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Formules",
  description:
    "Dolce Vita, La Strada, Far Niente : choisissez la formule My Trip Designer adaptée à votre façon de voyager.",
};

export const revalidate = 3600;

export default async function FormulesPage() {
  const content = await getContentMap();

  return (
    <SiteShell content={content}>
      <main className="flex flex-col gap-16 pb-0 lg:gap-24">
        <div className="flex flex-col">
          <FormulesHero />
          <FormulesCompare />
        </div>
        <MarqueeTape />
        <div className="flex flex-col gap-8 lg:gap-10">
          <HomeExtras />
          <HomeCarnetsBanner />
        </div>
        <FormulesFaq />
        <HomeCta />
      </main>
    </SiteShell>
  );
}
