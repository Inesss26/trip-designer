import Link from "next/link";
import { notFound } from "next/navigation";

import { removeTrip } from "@/app/admin/(dashboard)/voyages/actions";
import { DeleteForm } from "@/components/admin/delete-form";
import { TripForm } from "@/components/admin/trip-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getTripById } from "@/lib/data/trips";
import { isSupabaseWritable } from "@/lib/env";

export default async function EditTripPage({
  params,
  searchParams,
}: PageProps<"/admin/voyages/[id]">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const trip = await getTripById(id);

  if (!trip) {
    notFound();
  }

  const justCreated = query.cree === "1";
  const deleteTrip = removeTrip.bind(null, trip.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/voyages"
            className="text-sm text-muted-foreground hover:underline"
          >
            Retour à la liste
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">
            {trip.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {trip.status === "published" ? (
              <Link href={`/voyages/${trip.slug}`} className="hover:underline">
                Voir la page publique
              </Link>
            ) : (
              "Ce voyage est en brouillon : il n'apparaît pas sur le site."
            )}
          </p>
        </div>
        <DeleteForm
          action={deleteTrip}
          label="Supprimer ce voyage"
          confirmMessage={`Supprimer définitivement « ${trip.title} » ?`}
        />
      </div>

      {justCreated ? (
        <Alert>
          <AlertDescription>
            Le voyage a été créé. Complétez-le puis passez-le en « publié ».
          </AlertDescription>
        </Alert>
      ) : null}

      <TripForm trip={trip} canUploadImages={isSupabaseWritable()} />
    </div>
  );
}
