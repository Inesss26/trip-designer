import type { Metadata } from "next";
import Link from "next/link";

import { logout } from "@/app/admin/login/actions";
import { AdminNav } from "@/components/admin/admin-nav";
import { DemoNotice } from "@/components/admin/demo-notice";
import { Button } from "@/components/ui/button";
import { requireAdminSession } from "@/lib/auth/guard";
import { isDemoMode } from "@/lib/env";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  // Contrôle qui fait autorité : le proxy ne sert qu'au confort de navigation.
  await requireAdminSession();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold">MyTripDesigner · administration</p>
            <AdminNav />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-muted-foreground hover:underline">
              Voir le site
            </Link>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                Se déconnecter
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-8">
        {isDemoMode() ? <DemoNotice /> : null}
        {children}
      </main>
    </div>
  );
}
