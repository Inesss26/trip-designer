import Link from "next/link";

import { PublicationBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listAllTrips } from "@/lib/data/trips";
import { formatDateTime, formatDuration, formatPrice } from "@/lib/format";

export default async function AdminTripsPage() {
  const trips = await listAllTrips();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Voyages</h1>
          <p className="text-sm text-muted-foreground">
            {trips.length === 0
              ? "Aucun voyage pour l'instant."
              : `${trips.length} voyage${trips.length > 1 ? "s" : ""}, dont ${trips.filter((trip) => trip.status === "published").length} publié${trips.filter((trip) => trip.status === "published").length > 1 ? "s" : ""}.`}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/voyages/nouveau">Nouveau voyage</Link>
        </Button>
      </div>

      {trips.length === 0 ? (
        <div className="rounded-md border border-dashed px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Créez un premier voyage pour l&apos;afficher sur la page
            d&apos;accueil.
          </p>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/admin/voyages/nouveau">Créer un voyage</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Durée et tarif</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Modifié le</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">
                    {trip.title}
                    {trip.isFeatured ? (
                      <span className="ml-2 text-xs text-muted-foreground">
                        mis en avant
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {[
                      formatDuration(trip.durationDays),
                      formatPrice(trip.priceFrom),
                    ]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </TableCell>
                  <TableCell>
                    <PublicationBadge status={trip.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(trip.updatedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/voyages/${trip.id}`}>Modifier</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
