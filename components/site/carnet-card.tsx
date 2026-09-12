import Image from "next/image";
import Link from "next/link";

import { SiteIcon } from "@/components/site/site-icon";
import { Button } from "@/components/ui/button";
import type { Carnet } from "@/lib/carnets-content";
import { formatDuration } from "@/lib/format";

export function CarnetMeta({
  location,
  durationDays,
}: {
  location: string;
  durationDays: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <p className="flex items-center gap-1.5 type-tag text-brand-secondary">
        <SiteIcon src="/icons/carnets/pin.svg" width={8} height={10} />
        {location}
      </p>
      <p className="flex items-center gap-1.5 type-body-small text-brand/50">
        <SiteIcon src="/icons/carnets/duration.svg" size={10} />
        {formatDuration(durationDays)}
      </p>
    </div>
  );
}

export function CarnetCard({ carnet }: { carnet: Carnet }) {
  return (
    <article className="card flex h-full flex-col p-0">
      <div className="relative h-[258px] overflow-hidden bg-bg-muted">
        <Image
          src={carnet.coverImage}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <CarnetMeta
          location={carnet.location}
          durationDays={carnet.durationDays}
        />
        <h3 className="type-subtitle text-brand">
          {carnet.title}
        </h3>
        <p className="flex-1 type-body text-brand/50">
          {carnet.summary}
        </p>
        <Button asChild variant="tertiary" size="cta" className="w-full">
          <Link href={`/carnets/${carnet.slug}`}>{carnet.ctaLabel}</Link>
        </Button>
      </div>
    </article>
  );
}
