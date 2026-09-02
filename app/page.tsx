import Link from "next/link";

import { ReviewList } from "@/components/site/review-list";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TripCard } from "@/components/site/trip-card";
import { Button } from "@/components/ui/button";
import { getContentMap } from "@/lib/data/content";
import { listPublishedReviews } from "@/lib/data/reviews";
import { listPublishedServices } from "@/lib/data/services";
import { listPublishedTrips } from "@/lib/data/trips";
import { formatPrice } from "@/lib/format";

/**
 * La page est régénérée à la demande après chaque modification dans
 * l'administration (voir lib/revalidate.ts). Ce délai n'est qu'un filet de
 * sécurité si un contenu est modifié directement dans Supabase.
 */
export const revalidate = 3600;

export default async function HomePage() {
  const [content, services, trips, reviews] = await Promise.all([
    getContentMap(),
    listPublishedServices(),
    listPublishedTrips(),
    listPublishedReviews(),
  ]);

  const siteName = content["site.name"] ?? "MyTripDesigner";

  return (
    <>
      <SiteHeader siteName={siteName} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4">
        <section className="border-b py-14">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            {content["home.hero.eyebrow"]}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {content["home.hero.title"]}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            {content["home.hero.subtitle"]}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/contact">
                {content["home.hero.cta"] ?? "Parlons de votre projet"}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#voyages">Voir les voyages</Link>
            </Button>
          </div>
        </section>

        <section id="services" className="border-b py-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            {content["home.services.title"]}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {content["home.services.intro"]}
          </p>

          {services.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Les formules sont en cours de préparation.
            </p>
          ) : (
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {services.map((service) => {
                const price = formatPrice(service.priceFrom);

                return (
                  <li key={service.id} className="space-y-2">
                    <h3 className="text-lg font-medium">{service.title}</h3>
                    {service.tagline ? (
                      <p className="text-sm text-muted-foreground">
                        {service.tagline}
                      </p>
                    ) : null}
                    <p className="text-sm">{service.description}</p>
                    {service.features.length > 0 ? (
                      <ul className="list-inside list-disc text-sm text-muted-foreground">
                        {service.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    ) : null}
                    {price ? (
                      <p className="text-sm font-medium">
                        À partir de {price}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section id="voyages" className="border-b py-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            {content["home.trips.title"]}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {content["home.trips.intro"]}
          </p>

          {trips.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Aucun voyage n&apos;est publié pour le moment. Écrivez-moi et nous
              construirons le vôtre depuis une page blanche.
            </p>
          ) : (
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </section>

        <section id="avis" className="border-b py-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            {content["home.reviews.title"]}
          </h2>
          <div className="mt-8">
            <ReviewList reviews={reviews} trips={trips} />
          </div>
        </section>

        <section id="a-propos" className="py-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            {content["home.about.title"]}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {content["home.about.body"]}
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/contact">Décrire mon projet</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter content={content} />
    </>
  );
}
