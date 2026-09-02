import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { SiteShell } from "@/components/site/site-shell";
import { getContentMap } from "@/lib/data/content";
import { listPublishedTrips } from "@/lib/data/trips";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Décrivez votre projet de voyage : je réponds sous deux jours ouvrés avec une première piste et le tarif correspondant.",
};

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const [content, trips, query] = await Promise.all([
    getContentMap(),
    listPublishedTrips(),
    searchParams,
  ]);

  const requestedSlug =
    typeof query.voyage === "string" ? query.voyage : undefined;
  const requestedTrip = requestedSlug
    ? trips.find((trip) => trip.slug === requestedSlug)
    : undefined;

  return (
    <SiteShell content={content}>
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-brand">
          {content["contact.title"]}
        </h1>
        <p className="mt-3 text-brand/50">{content["contact.intro"]}</p>

        {requestedTrip ? (
          <p className="mt-4 rounded-md border border-brand/20 bg-white px-4 py-3 text-sm">
            Votre demande porte sur le voyage «&nbsp;{requestedTrip.title}
            &nbsp;». Précisez ce que vous aimeriez changer.
          </p>
        ) : null}

        <div className="mt-8">
          <ContactForm
            confirmationMessage={
              content["contact.confirmation"] ||
              "Merci, votre demande est bien arrivée."
            }
            defaultDestination={requestedTrip?.destination ?? ""}
          />
        </div>
      </main>
    </SiteShell>
  );
}
