import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-20 font-body text-text-brand">
      <h1 className="type-h1">Page introuvable</h1>
      <p className="mt-3 type-body text-brand-primary-50">
        Ce voyage a peut-être été retiré, ou l&apos;adresse comporte une faute de
        frappe.
      </p>
      <div className="mt-6">
        <Button asChild variant="primary" size="cta">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </main>
  );
}
