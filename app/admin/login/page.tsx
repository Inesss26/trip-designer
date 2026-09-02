import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/app/admin/login/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminPassword } from "@/lib/env";

export const metadata: Metadata = {
  title: "Connexion à l'administration",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const query = await searchParams;
  const nextPath = typeof query.suivant === "string" ? query.suivant : "/admin";
  const usesDevelopmentPassword =
    process.env.NODE_ENV !== "production" && !adminPassword;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 items-center px-4 py-16">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Administration</CardTitle>
          <CardDescription>
            Espace réservé à la gestion des voyages, des avis et des demandes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm nextPath={nextPath} />

          {usesDevelopmentPassword ? (
            <p className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
              ADMIN_PASSWORD n&apos;est pas défini : en développement, le mot de
              passe est <code className="font-mono">admin</code>.
            </p>
          ) : null}

          <p className="text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
              Retour au site
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
