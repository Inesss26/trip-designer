import Link from "next/link";

import { TripForm } from "@/components/admin/trip-form";
import { isSupabaseWritable } from "@/lib/env";

export default function NewTripPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/voyages"
          className="text-sm text-muted-foreground hover:underline"
        >
          Retour à la liste
        </Link>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">
          Nouveau voyage
        </h1>
        <p className="text-sm text-muted-foreground">
          Enregistrez-le en brouillon pour le préparer tranquillement, puis
          publiez-le quand il est prêt.
        </p>
      </div>

      <TripForm canUploadImages={isSupabaseWritable()} />
    </div>
  );
}
