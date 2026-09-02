import Link from "next/link";

import { changeReviewStatus } from "@/app/admin/(dashboard)/avis/actions";
import { ReviewStatusForm } from "@/components/admin/review-status-form";
import { ReviewBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listAllReviews } from "@/lib/data/reviews";
import { listAllTrips } from "@/lib/data/trips";
import { formatDate } from "@/lib/format";

export default async function AdminReviewsPage() {
  const [reviews, trips] = await Promise.all([listAllReviews(), listAllTrips()]);
  const pendingCount = reviews.filter(
    (review) => review.status === "pending",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Avis</h1>
          <p className="text-sm text-muted-foreground">
            {pendingCount > 0
              ? `${pendingCount} avis en attente de validation.`
              : "Tous les avis enregistrés sont traités."}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/avis/nouveau">Ajouter un avis</Link>
        </Button>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-md border border-dashed px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Aucun avis enregistré. Ajoutez-les au retour de vos voyageurs.
          </p>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/admin/avis/nouveau">Ajouter un avis</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Auteur</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Voyage</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => {
                const trip = trips.find((item) => item.id === review.tripId);
                const nextStatus =
                  review.status === "published" ? "pending" : "published";
                const toggleStatus = changeReviewStatus.bind(
                  null,
                  review.id,
                  nextStatus,
                );

                return (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">
                      {review.authorName}
                      {review.authorLocation ? (
                        <span className="text-muted-foreground">
                          {" "}
                          · {review.authorLocation}
                        </span>
                      ) : null}
                    </TableCell>
                    <TableCell>{review.rating} / 5</TableCell>
                    <TableCell className="text-muted-foreground">
                      {trip?.title ?? "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(review.travelDate) ?? "—"}
                    </TableCell>
                    <TableCell>
                      <ReviewBadge status={review.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <ReviewStatusForm
                          action={toggleStatus}
                          label={
                            review.status === "published"
                              ? "Dépublier"
                              : "Publier"
                          }
                        />
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/avis/${review.id}`}>Modifier</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
