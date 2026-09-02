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
        <h3 className="mt-3 text-lg font-medium group-hover:underline">
          {trip.title}
        </h3>
      </Link>
      <p className="text-sm text-muted-foreground">{trip.destination}</p>
      <p className="text-sm">{trip.summary}</p>
      <p className="text-sm text-muted-foreground">
        {[duration, price ? `à partir de ${price}` : null]
          .filter(Boolean)
          .join(" · ") || "Durée et tarif à définir ensemble"}
      </p>
    </article>
  );
}
