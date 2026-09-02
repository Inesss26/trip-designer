import Link from "next/link";

import { LeadBadge } from "@/components/admin/status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listLeads } from "@/lib/data/leads";
import { listAllReviews } from "@/lib/data/reviews";
import { listAllServices } from "@/lib/data/services";
import { listAllTrips } from "@/lib/data/trips";
import { formatDateTime } from "@/lib/format";

export default async function AdminDashboardPage() {
  const [trips, services, reviews, leads] = await Promise.all([
    listAllTrips(),
    listAllServices(),
    listAllReviews(),
    listLeads(),
  ]);

  const newLeads = leads.filter((lead) => lead.status === "new");
  const pendingReviews = reviews.filter((review) => review.status === "pending");

  const cards = [
    {
      href: "/admin/demandes",
      title: "Demandes à traiter",
      value: newLeads.length,
      description: `${leads.length} demande${leads.length > 1 ? "s" : ""} au total`,
    },
    {
      href: "/admin/voyages",
      title: "Voyages publiés",
      value: trips.filter((trip) => trip.status === "published").length,
      description: `${trips.filter((trip) => trip.status === "draft").length} en brouillon`,
    },
    {
      href: "/admin/avis",
      title: "Avis à valider",
      value: pendingReviews.length,
      description: `${reviews.filter((review) => review.status === "published").length} avis publiés`,
    },
    {
      href: "/admin/services",
      title: "Formules publiées",
      value: services.filter((service) => service.status === "published").length,
      description: `${services.length} formule${services.length > 1 ? "s" : ""} enregistrée${services.length > 1 ? "s" : ""}`,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Tableau de bord
        </h1>
        <p className="text-sm text-muted-foreground">
          L&apos;essentiel de ce qui demande votre attention.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="group">
            <Card className="h-full transition-colors group-hover:border-ring">
              <CardHeader>
                <CardDescription>{card.title}</CardDescription>
                <CardTitle className="text-3xl">{card.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-base font-medium">Dernières demandes</h2>
          <Link
            href="/admin/demandes"
            className="text-sm text-muted-foreground hover:underline"
          >
            Tout voir
          </Link>
        </div>

        {leads.length === 0 ? (
          <p className="rounded-md border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
            Aucune demande reçue pour l&apos;instant.
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {leads.slice(0, 5).map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/admin/demandes/${lead.id}`}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 hover:bg-muted/50"
                >
                  <span>
                    <span className="font-medium">{lead.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      · {lead.destination ?? "destination à définir"}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {formatDateTime(lead.createdAt)}
                    </span>
                    <LeadBadge status={lead.status} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {pendingReviews.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-base font-medium">Avis en attente</h2>
            <Link
              href="/admin/avis"
              className="text-sm text-muted-foreground hover:underline"
            >
              Modérer
            </Link>
          </div>
          <ul className="divide-y rounded-md border">
            {pendingReviews.slice(0, 5).map((review) => (
              <li key={review.id}>
                <Link
                  href={`/admin/avis/${review.id}`}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 hover:bg-muted/50"
                >
                  <span className="font-medium">{review.authorName}</span>
                  <span className="text-sm text-muted-foreground">
                    {review.rating} / 5
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
