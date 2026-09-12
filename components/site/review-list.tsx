import type { Review, Trip } from "@/lib/data/types";
import { formatDate } from "@/lib/format";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="type-body" aria-label={`Note : ${rating} sur 5`}>
      <span aria-hidden="true">
        {"★".repeat(rating)}
        <span className="text-brand-primary-30">{"★".repeat(5 - rating)}</span>
      </span>
    </p>
  );
}

export function ReviewList({
  reviews,
  trips = [],
}: {
  reviews: Review[];
  trips?: Trip[];
}) {
  if (reviews.length === 0) {
    return (
      <p className="type-body text-brand-primary-50">
        Les premiers avis seront publiés au retour des prochains voyageurs.
      </p>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {reviews.map((review) => {
        const trip = trips.find((item) => item.id === review.tripId);
        const date = formatDate(review.travelDate);

        return (
          <li key={review.id} className="space-y-2 border-l-2 pl-4">
            <Stars rating={review.rating} />
            <blockquote className="type-body">{review.content}</blockquote>
            <footer className="type-body-small text-brand-primary-50">
              {review.authorName}
              {review.authorLocation ? `, ${review.authorLocation}` : ""}
              {trip ? ` — ${trip.title}` : ""}
              {date ? ` (${date})` : ""}
            </footer>
          </li>
        );
      })}
    </ul>
  );
}
