import Link from "next/link";

import { LeadBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listLeads } from "@/lib/data/leads";
import { formatDateTime } from "@/lib/format";

export default async function AdminLeadsPage() {
  const leads = await listLeads();
  const newCount = leads.filter((lead) => lead.status === "new").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Demandes</h1>
        <p className="text-sm text-muted-foreground">
          {newCount > 0
            ? `${newCount} demande${newCount > 1 ? "s" : ""} à traiter.`
            : "Aucune nouvelle demande."}
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-md border border-dashed px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Les demandes envoyées depuis la page contact apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reçue le</TableHead>
                <TableHead>Personne</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead>Suivi</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(lead.createdAt)}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{lead.name}</span>
                    <br />
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      {lead.email}
                    </a>
                  </TableCell>
                  <TableCell className="max-w-xs text-muted-foreground">
                    {[lead.destination, lead.travelPeriod]
                      .filter(Boolean)
                      .join(" · ") || "Non précisé"}
                  </TableCell>
                  <TableCell>
                    <LeadBadge status={lead.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/demandes/${lead.id}`}>Ouvrir</Link>
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
