import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { ContactHero } from "@/components/site/contact-hero";
import { FormulesFaq } from "@/components/site/formules-faq";
import { SiteShell } from "@/components/site/site-shell";
import { getCarnetBySlug } from "@/lib/carnets-content";
import { getContentMap } from "@/lib/data/content";
import { listPublishedTrips } from "@/lib/data/trips";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Appel découverte",
  description:
    "Un appel de 30 minutes, gratuit et sans engagement, pour comprendre vos envies — ou écrivez-moi, je réponds sous 48h.",
};

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const [content, trips, query] = await Promise.all([
    getContentMap(),
    listPublishedTrips(),
    searchParams,
  ]);

  const requestedVoyageSlug =
    typeof query.voyage === "string" ? query.voyage : undefined;
  const requestedCarnetSlug =
    typeof query.carnet === "string" ? query.carnet : undefined;
  const requestedTrip = requestedVoyageSlug
    ? trips.find((trip) => trip.slug === requestedVoyageSlug)
    : undefined;
  const requestedCarnet = requestedCarnetSlug
    ? getCarnetBySlug(requestedCarnetSlug)
    : undefined;
  const email = content["site.email"] || CONTACT_EMAIL;

  return (
    <SiteShell content={content}>
      <main className="flex flex-col gap-16 pb-16 lg:gap-[100px]">
        <ContactHero />

        <section
          id="formulaire"
          className="mx-auto flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-8 px-4 sm:px-8 lg:px-[115px]"
        >
          <div className="flex w-full flex-col gap-5">
            <h2 className="type-h2 text-text-brand">
              Parlez-moi de
              <span className="block type-h2-italic text-brand-secondary">votre projet.</span>
            </h2>
            <p className="type-body text-brand/50">
              Pour toute demande générale, projet de voyage ou simple
              curiosité — je lis chaque message et réponds sous 48h.
            </p>
          </div>

          {requestedCarnet ? (
            <p className="max-w-[665px] border border-brand-primary-30 bg-bg-default px-4 py-3 type-body">
              Votre demande porte sur le carnet «&nbsp;{requestedCarnet.title}
              &nbsp;».
            </p>
          ) : requestedTrip ? (
            <p className="max-w-[665px] border border-brand-primary-30 bg-bg-default px-4 py-3 type-body">
              Votre demande porte sur le voyage «&nbsp;{requestedTrip.title}
              &nbsp;». Précisez ce que vous aimeriez changer.
            </p>
          ) : null}

          <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-12">
            <div className="w-full min-w-0 flex-1">
              <ContactForm
                defaultDestination={
                  requestedCarnet?.title ?? requestedTrip?.destination ?? ""
                }
              />
            </div>
            <aside className="card-muted flex w-full shrink-0 flex-col gap-8 p-8 lg:w-[360px]">
              <h3 className="type-subtitle text-brand">
                Contact direct & Infos
              </h3>
              <div className="flex flex-col gap-3">
                <p className="type-tag text-brand/30">
                  Par Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="type-body text-brand hover:opacity-70"
                >
                  {email}
                </a>
              </div>
              <div className="h-px w-full bg-brand/30" />
              <div className="flex flex-col gap-3">
                <p className="type-tag text-brand/30">
                  Délai de réponse
                </p>
                <p className="type-body text-brand">
                  Sous 48h maximum.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <FormulesFaq />
      </main>
    </SiteShell>
  );
}
