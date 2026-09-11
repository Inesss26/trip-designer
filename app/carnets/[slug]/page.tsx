import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CarnetPurchase } from "@/components/site/carnet-purchase";
import { HomeCta } from "@/components/site/home-close";
import { SiteShell } from "@/components/site/site-shell";
import {
  carnets,
  getCarnetBySlug,
  getRelatedCarnets,
} from "@/lib/carnets-content";
import { getContentMap } from "@/lib/data/content";

export const revalidate = 3600;

export function generateStaticParams() {
  return carnets.map((carnet) => ({ slug: carnet.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/carnets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const carnet = getCarnetBySlug(slug);

  if (!carnet) {
    return { title: "Carnet introuvable" };
  }

  return {
    title: carnet.title,
    description: carnet.summary,
  };
}

export default async function CarnetPage({
  params,
}: PageProps<"/carnets/[slug]">) {
  const { slug } = await params;
  const carnet = getCarnetBySlug(slug);

  if (!carnet) {
    notFound();
  }

  const content = await getContentMap();
  const related = getRelatedCarnets(carnet);

  return (
    <SiteShell content={content}>
      <main className="flex flex-col gap-16 pb-0 lg:gap-24">
        <CarnetPurchase carnet={carnet} related={related} />
        <HomeCta />
      </main>
    </SiteShell>
  );
}
