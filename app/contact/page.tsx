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
          <div className="flex max-w-[665px] flex-col gap-5">
            <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
              Parlez moi de
              <span className="block italic text-brand-teal">votre projet.</span>
            </h2>
            <p className="text-[15px] leading-5 font-light text-brand/50">
              Pour toute demande générale, projet de voyage ou simple
              curiosité — je lis chaque message et réponds sous 48h.
            </p>
          </div>

          {requestedCarnet ? (
            <p className="max-w-[665px] border border-brand/20 bg-white px-4 py-3 text-sm">
              Votre demande porte sur le carnet «&nbsp;{requestedCarnet.title}
              &nbsp;».
            </p>
          ) : requestedTrip ? (
            <p className="max-w-[665px] border border-brand/20 bg-white px-4 py-3 text-sm">
              Votre demande porte sur le voyage «&nbsp;{requestedTrip.title}
              &nbsp;». Précisez ce que vous aimeriez changer.
            </p>
          ) : null}

          <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-[136px]">
            <div className="w-full max-w-[665px]">
              <ContactForm
                confirmationMessage={
                  content["contact.confirmation"] ||
                  "Merci, votre demande est bien arrivée."
                }
                defaultDestination={
                  requestedCarnet?.title ?? requestedTrip?.destination ?? ""
                }
              />
            </div>
            <aside className="flex w-full flex-col gap-8 bg-brand-sand p-8 lg:max-w-[360px]">
              <h3 className="font-heading text-[24px] leading-[30px] font-bold text-brand">
                Contact direct & Infos
              </h3>
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
                  Par Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-[15px] leading-5 font-light text-brand hover:opacity-70"
                >
                  {email}
                </a>
              </div>
              <div className="h-px w-full bg-brand/30" />
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
                  Délai de réponse
                </p>
                <p className="text-[15px] leading-5 font-light text-brand">
                  Sous 48h maximum.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <FormulesFaq contactHref="#formulaire" />
      </main>
    </SiteShell>
  );
}
