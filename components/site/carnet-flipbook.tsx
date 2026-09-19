"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { SiteIcon } from "@/components/site/site-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TOTAL_PAGES = 18;
const EXCERPT_PAGES = 4;
const SPREAD_COUNT = EXCERPT_PAGES / 2;
const ZOOM_MIN = 100;
const ZOOM_MAX = 200;
const ZOOM_STEP = 25;

function FlipbookCircleButton({
  label,
  disabled,
  onClick,
  src,
  hoverSrc,
  disabledSrc,
  size,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  src: string;
  hoverSrc: string;
  disabledSrc: string;
  size: 28 | 40;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size={size === 40 ? "icon" : "icon-sm"}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group rounded-full bg-transparent p-0 hover:bg-transparent disabled:opacity-100",
        size === 40 ? "size-10" : "size-7",
      )}
    >
      <SiteIcon
        src={disabled ? disabledSrc : src}
        hoverSrc={disabled ? undefined : hoverSrc}
        width={size}
        height={size}
      />
    </Button>
  );
}

export function CarnetFlipbook() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(0);
  const [zoom, setZoom] = useState(ZOOM_MIN);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pageLabel = spread * 2 + 1;
  const atStart = spread === 0;
  const atEnd = spread >= SPREAD_COUNT - 1;
  const atMinZoom = zoom <= ZOOM_MIN;
  const atMaxZoom = zoom >= ZOOM_MAX;

  const goPrev = useCallback(() => {
    setSpread((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setSpread((current) => Math.min(SPREAD_COUNT - 1, current + 1));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((current) => Math.max(ZOOM_MIN, current - ZOOM_STEP));
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((current) => Math.min(ZOOM_MAX, current + ZOOM_STEP));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const node = viewerRef.current;
    if (!node) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      await node.requestFullscreen();
    } catch {
      /* Fullscreen can be denied by the browser; the preview stays inline. */
    }
  }, []);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(document.fullscreenElement === viewerRef.current);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <div className="flex w-full flex-col gap-10 border-t border-brand/30 pt-11">
      <div className="flex flex-col gap-4">
        <p className="type-tag text-brand/30">Aperçu interactif</p>
        <h2 className="type-h2 text-text-brand">
          À quoi ressemble{" "}
          <span className="type-h2-italic text-brand-secondary">
            votre carnet ?
          </span>
        </h2>
        <p className="type-body text-brand/50">
          Découvrez un aperçu des conseils d&apos;experte et de la sélection
          d&apos;adresses.
        </p>
      </div>

      <div
        ref={viewerRef}
        className="flex flex-col items-center gap-6 bg-bg-muted p-5 [:fullscreen]:h-full [:fullscreen]:justify-center"
      >
        <div className="flex h-[220px] w-full items-stretch gap-4 sm:h-[360px] lg:h-[463px] [:fullscreen]:h-[min(80vh,720px)]">
          <div className="flex shrink-0 items-center">
            <FlipbookCircleButton
              label="Page précédente"
              disabled={atStart}
              onClick={goPrev}
              src="/icons/flipbook/prev.svg"
              hoverSrc="/icons/flipbook/prev-hover.svg"
              disabledSrc="/icons/flipbook/prev-disabled.svg"
              size={40}
            />
          </div>
          <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[3px] bg-bg-default shadow-[0_4px_4px_var(--color-brand-primary-30)]">
            <div
              key={spread}
              className="absolute inset-0 flex origin-center"
              style={{ transform: `scale(${zoom / 100})` }}
            >
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
                className="relative w-2 shrink-0 bg-gradient-to-r from-text-main/10 to-transparent"
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
          </div>
          <div className="flex shrink-0 items-center">
            <FlipbookCircleButton
              label="Page suivante"
              disabled={atEnd}
              onClick={goNext}
              src="/icons/flipbook/next.svg"
              hoverSrc="/icons/flipbook/next-hover.svg"
              disabledSrc="/icons/flipbook/next-disabled.svg"
              size={40}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <p className="type-tag text-brand/50">
            Page {pageLabel} sur {TOTAL_PAGES}
          </p>
          <div aria-hidden className="h-4 w-px bg-brand/30" />
          <div className="flex items-center gap-2">
            <FlipbookCircleButton
              label="Réduire le zoom"
              disabled={atMinZoom}
              onClick={zoomOut}
              src="/icons/flipbook/zoom-out.svg"
              hoverSrc="/icons/flipbook/zoom-out-hover.svg"
              disabledSrc="/icons/flipbook/zoom-out-disabled.svg"
              size={28}
            />
            <p className="type-body-small w-8 text-center text-brand/50" aria-live="polite">
              {zoom}%
            </p>
            <FlipbookCircleButton
              label="Augmenter le zoom"
              disabled={atMaxZoom}
              onClick={zoomIn}
              src="/icons/flipbook/zoom-in.svg"
              hoverSrc="/icons/flipbook/zoom-in-hover.svg"
              disabledSrc="/icons/flipbook/zoom-in-disabled.svg"
              size={28}
            />
          </div>
          <div aria-hidden className="h-4 w-px bg-brand/30" />
          <Button
            type="button"
            variant="ghost"
            aria-pressed={isFullscreen}
            onClick={() => void toggleFullscreen()}
            className="h-auto items-center gap-3 rounded-none p-0 type-tag text-brand/50 hover:bg-transparent hover:text-brand"
          >
            <span className="inline-flex size-[10px] shrink-0 items-center justify-center">
              <SiteIcon
                src="/icons/flipbook/fullscreen.svg"
                width={10}
                height={10}
                className="block"
              />
            </span>
            Plein écran
          </Button>
        </div>
      </div>

      <p className="flex items-center gap-3 type-body-small text-brand/50">
        <SiteIcon src="/icons/carnets/excerpt.svg" width={14} height={16} />
        Extrait limité à 4 pages. Le carnet complet contient 18 pages
        d&apos;itinéraire, adresses secrètes et la carte interactive Google My
        Maps.
      </p>
    </div>
  );
}
