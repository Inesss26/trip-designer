"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { SiteIcon } from "@/components/site/site-icon";
import { cn } from "@/lib/utils";

const TOTAL_PAGES = 18;
const EXCERPT_PAGES = 4;
const SPREAD_COUNT = EXCERPT_PAGES / 2;

export function CarnetFlipbook() {
  const [spread, setSpread] = useState(0);
  const pageLabel = spread * 2 + 1;
  const atStart = spread === 0;
  const atEnd = spread >= SPREAD_COUNT - 1;

  const goPrev = useCallback(() => {
    setSpread((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setSpread((current) => Math.min(SPREAD_COUNT - 1, current + 1));
  }, []);

  return (
    <div className="flex w-full flex-col gap-10 border-t border-brand/30 pt-11">
      <div className="flex flex-col gap-4">
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
          Aperçu interactif
        </p>
        <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
          Feuilletez un{" "}
          <span className="italic text-brand-teal">extrait du carnet.</span>
        </h2>
        <p className="text-[15px] leading-5 font-light text-brand/50">
          Découvrez un aperçu des conseils d&apos;experte et de la sélection
          d&apos;adresses.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 bg-brand-sand px-4 py-8 sm:px-6">
        <div className="flex w-full items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={goPrev}
            disabled={atStart}
            aria-label="Page précédente"
            className="shrink-0 disabled:opacity-40"
          >
            <SiteIcon src="/icons/btn-prev.svg" width={43} height={40} />
          </button>
          <div className="relative flex min-h-[220px] flex-1 overflow-hidden rounded-[3px] bg-white shadow-[0_4px_4px_rgba(61,0,0,0.2)] sm:min-h-[360px] lg:min-h-[463px]">
            <div className="relative min-w-0 flex-1 overflow-hidden">
              <Image
                src="/images/carnets/flipbook-left.png"
                alt={`Extrait du carnet, page ${pageLabel}`}
                fill
                sizes="(max-width: 768px) 50vw, 320px"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="relative w-2 shrink-0 bg-gradient-to-r from-[rgba(0,0,0,0.08)] to-[rgba(0,0,0,0.02)]"
            />
            <div className="relative min-w-0 flex-1 overflow-hidden">
              <Image
                src="/images/carnets/flipbook-right.png"
                alt={`Extrait du carnet, page ${pageLabel + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 320px"
                className="object-cover"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={goNext}
            disabled={atEnd}
            aria-label="Page suivante"
            className={cn("shrink-0", atEnd && "opacity-40")}
          >
            <SiteIcon src="/icons/btn-next.svg" width={43} height={40} />
          </button>
        </div>
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
          Page {pageLabel} sur {TOTAL_PAGES}
        </p>
      </div>

      <p className="flex items-center gap-3 text-[12px] leading-[15px] font-medium text-brand/50">
        <SiteIcon src="/icons/carnets/excerpt.svg" width={14} height={16} />
        Extrait limité à 4 pages. Le carnet complet contient 18 pages
        d&apos;itinéraire, adresses secrètes et la carte interactive Google My
        Maps.
      </p>
    </div>
  );
}
