import Link from "next/link";

import { TripCover } from "@/components/site/trip-cover";
import type { Trip } from "@/lib/data/types";
import { formatDuration, formatPrice } from "@/lib/format";

export function TripCard({ trip }: { trip: Trip }) {
  const duration = formatDuration(trip.durationDays);
  const price = formatPrice(trip.priceFrom);

  return (
    <article className="flex flex-col gap-3">
      <Link href={`/voyages/${trip.slug}`} className="group">
        <TripCover src={trip.coverImageUrl} alt={`${trip.title} — ${trip.destination}`} />
        <h3 className="mt-3 type-subtitle text-text-brand group-hover:opacity-70">
          {trip.title}
        </h3>
      </Link>
      <p className="type-tag text-brand-primary-50">{trip.destination}</p>
      <p className="type-body text-text-brand">{trip.summary}</p>
      <p className="type-body-small text-brand-primary-50">
        {[duration, price ? `à partir de ${price}` : null]
          .filter(Boolean)
          .join(" · ") || "Durée et tarif à définir ensemble"}
      </p>
    </article>
  );
}
