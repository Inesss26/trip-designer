import Link from "next/link";

import type { SiteContentMap } from "@/lib/data/types";

export function SiteFooter({ content }: { content: SiteContentMap }) {
  const siteName = content["site.name"] ?? "MyTripDesigner";
  const email = content["site.email"];
  const phone = content["site.phone"];
  const instagram = content["site.instagram"];

  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md space-y-1">
          <p className="font-semibold">{siteName}</p>
          <p className="text-muted-foreground">{content["footer.tagline"]}</p>
        </div>
        <div className="space-y-1">
          {email ? (
            <p>
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </p>
          ) : null}
          {phone ? <p className="text-muted-foreground">{phone}</p> : null}
          {instagram ? (
            <p className="text-muted-foreground">Instagram {instagram}</p>
          ) : null}
          <p>
            <Link href="/admin" className="text-muted-foreground hover:underline">
              Administration
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
