import { HomeAbout } from "@/components/site/home-about";
import { HomeCommunity, HomeCta } from "@/components/site/home-close";
import { HomeEngagement } from "@/components/site/home-engagement";
import { HomeExtras } from "@/components/site/home-extras";
import { HomeFormulas } from "@/components/site/home-formulas";
import { HomeHero } from "@/components/site/home-hero";
import { HomeProcess } from "@/components/site/home-process";
import { HomeReviews } from "@/components/site/home-reviews-lazy";
import { HomeTrust } from "@/components/site/home-trust";
import { MarqueeTape } from "@/components/site/marquee-tape";
import { SiteShell } from "@/components/site/site-shell";
import { getContentMap } from "@/lib/data/content";
import { listPublishedReviews } from "@/lib/data/reviews";
import { listPublishedTrips } from "@/lib/data/trips";

/**
 * La page est régénérée à la demande après chaque modification dans
 * l'administration (voir lib/revalidate.ts). Ce délai n'est qu'un filet de
 * sécurité si un contenu est modifié directement dans Supabase.
 */
export const revalidate = 3600;

export default async function HomePage() {
  const [content, trips, reviews] = await Promise.all([
    getContentMap(),
    listPublishedTrips(),
    listPublishedReviews(),
  ]);

  return (
    <SiteShell content={content}>
      <main className="flex flex-col gap-[72px] pb-0 lg:gap-[100px]">
        <div>
          <HomeHero />
          <MarqueeTape />
          <HomeTrust />
        </div>
        <HomeEngagement />
        <HomeFormulas />
        <HomeExtras />
        <HomeProcess />
        <MarqueeTape variant="rose" />
        <HomeAbout />
        <HomeReviews reviews={reviews} trips={trips} />
        <div>
          <HomeCommunity />
          <HomeCta />
        </div>
      </main>
    </SiteShell>
  );
}
