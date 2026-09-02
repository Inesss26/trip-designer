"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/voyages", label: "Voyages" },
  { href: "/admin/services", label: "Formules" },
  { href: "/admin/avis", label: "Avis" },
  { href: "/admin/demandes", label: "Demandes" },
  { href: "/admin/contenus", label: "Contenus" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigation de l'administration">
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {LINKS.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "hover:underline",
                  isActive ? "font-medium" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
