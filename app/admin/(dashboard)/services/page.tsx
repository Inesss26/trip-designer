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
import { listAllServices } from "@/lib/data/services";
import { formatPrice } from "@/lib/format";

export default async function AdminServicesPage() {
  const services = await listAllServices();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Formules</h1>
          <p className="text-sm text-muted-foreground">
            Les prestations affichées sur la page d&apos;accueil.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/nouveau">Nouvelle formule</Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="rounded-md border border-dashed px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Aucune formule pour l&apos;instant.
          </p>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/admin/services/nouveau">Créer une formule</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Accroche</TableHead>
                <TableHead>Tarif</TableHead>
                <TableHead>Ordre</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {service.tagline ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatPrice(service.priceFrom) ?? "Sur devis"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {service.sortOrder}
                  </TableCell>
                  <TableCell>
                    <PublicationBadge status={service.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/services/${service.id}`}>
                        Modifier
                      </Link>
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
