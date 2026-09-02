import Link from "next/link";

/**
 * Navigation publique volontairement minimale : la mise en forme définitive
 * viendra des maquettes Figma.
 */
export function SiteHeader({ siteName }: { siteName: string }) {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteName}
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            <li>
              <Link href="/#services" className="hover:underline">
                Formules
              </Link>
            </li>
            <li>
              <Link href="/#voyages" className="hover:underline">
                Voyages
              </Link>
            </li>
            <li>
              <Link href="/#avis" className="hover:underline">
                Avis
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-medium hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
