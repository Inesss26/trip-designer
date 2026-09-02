import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReviewList } from "@/components/site/review-list";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TripCover } from "@/components/site/trip-cover";
import { Button } from "@/components/ui/button";
import { getContentMap } from "@/lib/data/content";
import { listPublishedReviewsForTrip } from "@/lib/data/reviews";
import { getPublishedTripBySlug } from "@/lib/data/trips";
import { formatDuration, formatPrice } from "@/lib/format";

export async function generateMetadata({
  params,
}: PageProps<"/voyages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getPublishedTripBySlug(slug);

  if (!trip) {
    return { title: "Voyage introuvable" };
  }

  return {
    title: trip.title,
    description: trip.summary,
  };
}

export default async function TripPage({
  params,
}: PageProps<"/voyages/[slug]">) {
  const { slug } = await params;
  const trip = await getPublishedTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  const [content, reviews] = await Promise.all([
    getContentMap(),
    listPublishedReviewsForTrip(trip.id),
  ]);

  const duration = formatDuration(trip.durationDays);
  const price = formatPrice(trip.priceFrom);
  const paragraphs = (trip.description ?? "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <SiteHeader siteName={content["site.name"] ?? "MyTripDesigner"} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
        <nav aria-label="Fil d'Ariane" className="text-sm text-muted-foreground">
          <Link href="/#voyages" className="hover:underline">
            Retour aux voyages
          </Link>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          {trip.title}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {[trip.destination, trip.country].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {[duration, price ? `à partir de ${price}` : null]
            .filter(Boolean)
            .join(" · ") || "Durée et tarif à définir ensemble"}
        </p>

        <div className="mt-8">
          <TripCover
            src={trip.coverImageUrl}
            alt={`${trip.title} — ${trip.destination}`}
            className="aspect-[16/9]"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <p className="mt-8 text-lg">{trip.summary}</p>

        {paragraphs.length > 0 ? (
          <div className="mt-6 space-y-4 text-muted-foreground">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        {trip.tags.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {trip.tags.map((tag) => (
              <li key={tag} className="rounded-full border px-3 py-1">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        {trip.gallery.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">En images</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {trip.gallery.map((url, index) => (
                <TripCover
                  key={url}
                  src={url}
                  alt={`${trip.title} — photo ${index + 1}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}
            </div>
          </section>
        ) : null}

        {reviews.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">
              Les retours des voyageurs
            </h2>
            <div className="mt-4">
              <ReviewList reviews={reviews} trips={[trip]} />
            </div>
          </section>
        ) : null}

        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold tracking-tight">
            Ce voyage vous parle ?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Il sert de base : les étapes, la durée et le budget s&apos;adaptent à
            vos envies.
          </p>
          <div className="mt-4">
            <Button asChild>
              <Link href={`/contact?voyage=${trip.slug}`}>
                Demander une version sur mesure
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter content={content} />
    </>
  );
}
