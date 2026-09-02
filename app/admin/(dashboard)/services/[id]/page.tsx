import Link from "next/link";
import { notFound } from "next/navigation";

import { removeService } from "@/app/admin/(dashboard)/services/actions";
import { DeleteForm } from "@/components/admin/delete-form";
import { ServiceForm } from "@/components/admin/service-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getServiceById } from "@/lib/data/services";

export default async function EditServicePage({
  params,
  searchParams,
}: PageProps<"/admin/services/[id]">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  const deleteService = removeService.bind(null, service.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/services"
            className="text-sm text-muted-foreground hover:underline"
          >
            Retour à la liste
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">
            {service.title}
          </h1>
        </div>
        <DeleteForm
          action={deleteService}
          label="Supprimer cette formule"
          confirmMessage={`Supprimer définitivement « ${service.title} » ?`}
        />
      </div>

      {query.cree === "1" ? (
        <Alert>
          <AlertDescription>La formule a été créée.</AlertDescription>
        </Alert>
      ) : null}

      <ServiceForm service={service} />
    </div>
  );
}
