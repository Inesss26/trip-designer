import Link from "next/link";
import { notFound } from "next/navigation";

import { removeReview } from "@/app/admin/(dashboard)/avis/actions";
import { DeleteForm } from "@/components/admin/delete-form";
import { ReviewForm } from "@/components/admin/review-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getReviewById } from "@/lib/data/reviews";
import { listAllTrips } from "@/lib/data/trips";

export default async function EditReviewPage({
  params,
  searchParams,
}: PageProps<"/admin/avis/[id]">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const [review, trips] = await Promise.all([
    getReviewById(id),
    listAllTrips(),
  ]);

  if (!review) {
    notFound();
  }

  const deleteReview = removeReview.bind(null, review.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/avis"
            className="text-sm text-muted-foreground hover:underline"
          >
            Retour à la liste
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">
            Avis de {review.authorName}
          </h1>
        </div>
        <DeleteForm
          action={deleteReview}
          label="Supprimer cet avis"
          confirmMessage={`Supprimer définitivement l'avis de ${review.authorName} ?`}
        />
      </div>

      {query.cree === "1" ? (
        <Alert>
          <AlertDescription>L&apos;avis a été ajouté.</AlertDescription>
        </Alert>
      ) : null}

      <ReviewForm review={review} trips={trips} />
    </div>
  );
}
