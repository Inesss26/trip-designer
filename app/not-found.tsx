import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">Page introuvable</h1>
      <p className="mt-3 text-muted-foreground">
        Ce voyage a peut-être été retiré, ou l&apos;adresse comporte une faute de
        frappe.
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </main>
  );
}
