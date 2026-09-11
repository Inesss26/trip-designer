import type { Metadata } from "next";

import { AboutHero } from "@/components/site/about-hero";
import { AboutMap } from "@/components/site/about-map";
import { AboutSocial } from "@/components/site/about-social";
import { AboutStory } from "@/components/site/about-story";
import { AboutTraits } from "@/components/site/about-traits";
import { AboutVision } from "@/components/site/about-vision";
import { HomeCta } from "@/components/site/home-close";
import { MarqueeTape } from "@/components/site/marquee-tape";
import { SiteShell } from "@/components/site/site-shell";
import { getContentMap } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Franco-italienne installée à Rome, Agathe conçoit des voyages sur-mesure et infuse l'esprit de la Dolce Vita dans chacun de vos séjours.",
};

export const revalidate = 3600;

export default async function AboutPage() {
  const content = await getContentMap();

  return (
    <SiteShell content={content}>
      <main className="flex flex-col gap-16 pb-0 lg:gap-[100px]">
        <AboutHero />
        <MarqueeTape variant="rose" />
        <AboutStory />
        <AboutTraits />
        <AboutVision />
        <AboutMap />
        <div>
          <MarqueeTape />
          <AboutSocial instagram={content["site.instagram"]} />
          <HomeCta />
        </div>
      </main>
    </SiteShell>
  );
}
