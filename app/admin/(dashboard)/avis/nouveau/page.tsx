import Link from "next/link";

import { ReviewForm } from "@/components/admin/review-form";
import { listAllTrips } from "@/lib/data/trips";

export default async function NewReviewPage() {
  const trips = await listAllTrips();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/avis"
          className="text-sm text-muted-foreground hover:underline"
        >
          Retour à la liste
        </Link>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">
          Nouvel avis
        </h1>
        <p className="text-sm text-muted-foreground">
          Saisissez l&apos;avis tel que vous l&apos;avez reçu, puis publiez-le
          après relecture.
        </p>
      </div>

      <ReviewForm trips={trips} />
    </div>
  );
}
