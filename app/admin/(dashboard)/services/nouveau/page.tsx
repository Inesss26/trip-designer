import Link from "next/link";

import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/services"
          className="text-sm text-muted-foreground hover:underline"
        >
          Retour à la liste
        </Link>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">
          Nouvelle formule
        </h1>
      </div>

      <ServiceForm />
    </div>
  );
}
