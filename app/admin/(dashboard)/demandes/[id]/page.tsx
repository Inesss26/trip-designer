import Link from "next/link";
import { notFound } from "next/navigation";

import { removeLead } from "@/app/admin/(dashboard)/demandes/actions";
import { DeleteForm } from "@/components/admin/delete-form";
import { LeadForm } from "@/components/admin/lead-form";
import { LeadBadge } from "@/components/admin/status-badge";
import { getLeadById } from "@/lib/data/leads";
import { formatDateTime } from "@/lib/format";

export default async function LeadPage({
  params,
}: PageProps<"/admin/demandes/[id]">) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  const deleteLead = removeLead.bind(null, lead.id);

  const details: Array<[string, string | null]> = [
    ["Téléphone", lead.phone],
    ["Destination", lead.destination],
    ["Période", lead.travelPeriod],
    [
      "Voyageurs",
      lead.partySize === null ? null : String(lead.partySize),
    ],
    ["Budget", lead.budgetRange],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/demandes"
            className="text-sm text-muted-foreground hover:underline"
          >
            Retour aux demandes
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">
            {lead.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Reçue le {formatDateTime(lead.createdAt)} ·{" "}
            <a href={`mailto:${lead.email}`} className="hover:underline">
              {lead.email}
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LeadBadge status={lead.status} />
          <DeleteForm
            action={deleteLead}
            label="Supprimer"
            confirmMessage={`Supprimer définitivement la demande de ${lead.name} ?`}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4 rounded-md border p-6">
          <h2 className="text-base font-medium">La demande</h2>
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt className="text-muted-foreground">{label}</dt>
                <dd>{value ?? "Non précisé"}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-2">
            <h3 className="text-sm text-muted-foreground">Message</h3>
            <p className="whitespace-pre-line text-sm">{lead.message}</p>
          </div>
          <p className="text-sm">
            <a
              href={`mailto:${lead.email}?subject=${encodeURIComponent("Votre projet de voyage")}`}
              className="hover:underline"
            >
              Répondre par e-mail
            </a>
          </p>
        </section>

        <section className="space-y-4 rounded-md border p-6">
          <h2 className="text-base font-medium">Suivi</h2>
          <LeadForm lead={lead} />
        </section>
      </div>
    </div>
  );
}
