import Image from "next/image";
import Link from "next/link";

import { SiteIcon } from "@/components/site/site-icon";
import { formatCarnetPrice, type Carnet } from "@/lib/carnets-content";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CarnetMeta({
  location,
  durationDays,
  durationClassName = "text-brand/50",
}: {
  location: string;
  durationDays: number;
  durationClassName?: string;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-1">
      <p className="flex items-center gap-1.5 type-tag text-brand-secondary">
        <SiteIcon src="/icons/carnets/pin.svg" width={8} height={10} />
        {location}
      </p>
      <p
        className={cn(
          "flex items-center gap-1.5 type-body-small",
          durationClassName,
        )}
      >
        <SiteIcon src="/icons/carnets/duration.svg" size={10} />
        {formatDuration(durationDays)}
      </p>
    </div>
  );
}

export function CarnetCard({ carnet }: { carnet: Carnet }) {
  return (
    <article className="h-full bg-bg-main">
      <Link
        href={`/carnets/${carnet.slug}`}
        className="card group flex h-full cursor-pointer flex-col bg-bg-main p-0 no-underline transition-[box-shadow] duration-300 ease-out hover:shadow-[0_8px_24px_rgb(61_0_0_/_18%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
      >
        <div className="relative h-[258px] shrink-0 overflow-hidden bg-bg-muted">
          <Image
            src={carnet.coverImage}
            alt={carnet.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-5 p-6">
          <div className="flex w-full items-center justify-between gap-4">
            <CarnetMeta
              location={carnet.location}
              durationDays={carnet.durationDays}
            />
            <p className="shrink-0 bg-brand px-2 py-1 type-tag text-text-on-dark">
              {formatCarnetPrice()}
            </p>
          </div>
          <h3 className="type-subtitle text-brand transition-colors duration-300 ease-out group-hover:text-brand-secondary group-focus-visible:text-brand-secondary">
            {carnet.title}
          </h3>
          <p className="flex-1 type-body text-brand/50">
            {carnet.summary}
          </p>
        </div>
      </Link>
    </article>
  );
}
