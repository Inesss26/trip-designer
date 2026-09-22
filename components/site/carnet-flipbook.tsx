"use client";

import { PageFlip } from "page-flip";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { SiteIcon } from "@/components/site/site-icon";
import { Button } from "@/components/ui/button";
import {
  CARNET_PREVIEW_PDF,
  renderPdfPages,
  type PdfPagePreview,
} from "@/lib/pdf-page-images";
import { cn } from "@/lib/utils";

const ZOOM_MIN = 100;
const ZOOM_MAX = 200;
const ZOOM_STEP = 25;
const BOOK_MAX_HEIGHT_CLASS =
  "h-[220px] sm:h-[360px] lg:h-[463px] [:fullscreen]:h-[min(80vh,720px)]";
const SPREAD_MEDIA_QUERY = "(min-width: 1024px)";

function createFlipPageElements(images: string[]): HTMLElement[] {
  return images.map((src, index) => {
    const page = document.createElement("div");
    page.className = "carnet-flipbook-page";
    page.dataset.density =
      index === 0 || index === images.length - 1 ? "hard" : "soft";

    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.draggable = false;
    page.appendChild(img);
    return page;
  });
}

function useSpreadLayout() {
  const [useSpread, setUseSpread] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(SPREAD_MEDIA_QUERY).matches
      : false,
  );

  useEffect(() => {
    const media = window.matchMedia(SPREAD_MEDIA_QUERY);
    const sync = () => setUseSpread(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return useSpread;
}

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

function FlipbookBookFrame({
  children,
  className,
  style,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "relative min-h-0 overflow-hidden rounded-[3px] bg-bg-default shadow-[0_4px_4px_var(--color-brand-primary-30)]",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export function CarnetFlipbook() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const bookHostRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const pagesRef = useRef<string[]>([]);
  const loadedPageCountRef = useRef(0);
  const currentIndexRef = useRef(0);

  const [pages, setPages] = useState<string[]>([]);
  const [pageWidth, setPageWidth] = useState(320);
  const [pageHeight, setPageHeight] = useState(453);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loadStatus, setLoadStatus] = useState("Chargement de l'aperçu…");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "landscape",
  );
  const [zoom, setZoom] = useState(ZOOM_MIN);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const useSpread = useSpreadLayout();

  pagesRef.current = pages;
  currentIndexRef.current = currentIndex;
  const pageCount = totalPages || pages.length;
  const loadedCount = pages.length;
  const isCoverOrBack =
    currentIndex === 0 || (loadedCount > 1 && currentIndex >= loadedCount - 1);
  const showAsSpread = useSpread && !isCoverOrBack;
  const pageLabel = Math.min(currentIndex + 1, pageCount || currentIndex + 1);
  const atStart = currentIndex <= 0;
  const atEnd = loadedCount === 0 || currentIndex >= loadedCount - 1;
  const atMinZoom = zoom <= ZOOM_MIN;
  const atMaxZoom = zoom >= ZOOM_MAX;
  const hasBook = pages.length > 0 && !error;

  useEffect(() => {
    let cancelled = false;
    setError(null);

    renderPdfPages(CARNET_PREVIEW_PDF, (preview: PdfPagePreview) => {
      if (cancelled) return;
      setPages(preview.pages);
      setTotalPages(preview.total);
      setPageWidth(preview.pageWidth);
      setPageHeight(preview.pageHeight);
      if (preview.status) setLoadStatus(preview.status);
    })
      .then((preview) => {
        if (cancelled) return;
        setPages(preview.pages);
        setTotalPages(preview.total);
        setPageWidth(preview.pageWidth);
        setPageHeight(preview.pageHeight);
      })
      .catch((cause: unknown) => {
        if (cancelled) return;
        console.error(cause);
        setError("Impossible de charger l'aperçu du carnet.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const hasPages = pages.length > 0;

  useEffect(() => {
    if (!hasPages) return;
    const host = bookHostRef.current;
    if (!host) return;

    const startPage = currentIndexRef.current;
    const root = document.createElement("div");
    root.className = "h-full w-full";
    host.replaceChildren(root);

    const pageW = Math.max(1, Math.round(pageWidth));
    const pageH = Math.max(1, Math.round(pageHeight));
    const pageFlip = new PageFlip(root, {
      width: pageW,
      height: pageH,
      size: "stretch",
      minWidth: Math.max(160, Math.round(pageW * 0.37)),
      maxWidth: pageW,
      minHeight: Math.max(220, Math.round(pageH * 0.33)),
      maxHeight: pageH,
      drawShadow: true,
      flippingTime: 800,
      usePortrait: true,
      startZIndex: 0,
      autoSize: true,
      maxShadowOpacity: 0.35,
      showCover: true,
      mobileScrollSupport: true,
      useMouseEvents: true,
      showPageCorners: true,
      disableFlipByClick: false,
      swipeDistance: 30,
      startPage,
    });

    const items = createFlipPageElements(pagesRef.current);
    pageFlip.loadFromHTML(items);
    loadedPageCountRef.current = items.length;
    pageFlip.on("flip", (event) => {
      setCurrentIndex(typeof event.data === "number" ? event.data : 0);
    });
    pageFlip.on("changeOrientation", (event) => {
      setOrientation(event.data === "portrait" ? "portrait" : "landscape");
    });
    pageFlipRef.current = pageFlip;
    setOrientation(pageFlip.getOrientation());

    return () => {
      pageFlip.destroy();
      pageFlipRef.current = null;
      loadedPageCountRef.current = 0;
    };
  }, [hasPages, useSpread, pageWidth, pageHeight]);

  useEffect(() => {
    const pageFlip = pageFlipRef.current;
    if (!pageFlip || pages.length === 0) return;
    if (pages.length === loadedPageCountRef.current) return;
    pageFlip.updateFromHtml(createFlipPageElements(pages));
    loadedPageCountRef.current = pages.length;
  }, [pages]);

  useEffect(() => {
    const pageFlip = pageFlipRef.current;
    if (!pageFlip) return;
    pageFlip.update();
    pageFlip.turnToPage(currentIndexRef.current);
    setOrientation(pageFlip.getOrientation());
  }, [zoom, isFullscreen, showAsSpread]);

  useEffect(() => {
    const host = bookHostRef.current;
    if (!host || !hasBook) return;

    const observer = new ResizeObserver(() => {
      pageFlipRef.current?.update();
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, [hasBook]);

  const goPrev = useCallback(() => {
    const pageFlip = pageFlipRef.current;
    if (!pageFlip) return;
    if (pageFlip.getOrientation() === "portrait") {
      pageFlip.turnToPrevPage();
      setCurrentIndex(pageFlip.getCurrentPageIndex());
      return;
    }
    pageFlip.flipPrev();
  }, []);

  const goNext = useCallback(() => {
    const pageFlip = pageFlipRef.current;
    if (!pageFlip) return;
    if (pageFlip.getOrientation() === "portrait") {
      pageFlip.turnToNextPage();
      setCurrentIndex(pageFlip.getCurrentPageIndex());
      return;
    }
    pageFlip.flipNext();
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const viewer = viewerRef.current;
      const active = document.activeElement;
      const inViewer =
        viewer !== null &&
        (viewer === active || viewer.contains(active));
      const full = document.fullscreenElement === viewer;
      if (!inViewer && !full) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "Escape" && document.fullscreenElement) {
        event.preventDefault();
        void document.exitFullscreen();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  return (
    <section
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16 sm:px-8 lg:px-11"
    >
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
        tabIndex={0}
        role="region"
        aria-label="Aperçu interactif du carnet. Utilisez les flèches gauche et droite pour tourner les pages, Échap pour quitter le plein écran."
        onMouseDown={() => viewerRef.current?.focus({ preventScroll: true })}
        className="flex flex-col items-center gap-6 bg-bg-muted p-5 outline-none [:fullscreen]:h-full [:fullscreen]:justify-center"
      >
        <div
          className={cn(
            "relative flex w-full items-center justify-center sm:gap-4",
            BOOK_MAX_HEIGHT_CLASS,
          )}
        >
          <div className="absolute top-1/2 left-0 z-10 -translate-y-1/2 sm:static sm:flex sm:shrink-0 sm:translate-y-0 sm:items-center">
            <FlipbookCircleButton
              label="Page précédente"
              disabled={!hasBook || atStart}
              onClick={goPrev}
              src="/icons/flipbook/prev.svg"
              hoverSrc="/icons/flipbook/prev-hover.svg"
              disabledSrc="/icons/flipbook/prev-disabled.svg"
              size={40}
            />
          </div>

          <FlipbookBookFrame
            className="h-full max-w-full"
            style={{
              aspectRatio: showAsSpread
                ? `${pageWidth * 2} / ${pageHeight}`
                : `${pageWidth} / ${pageHeight}`,
              width: "auto",
            }}
          >
            {error ? (
              <p className="flex h-full items-center justify-center px-6 text-center type-body text-brand/50">
                {error}
              </p>
            ) : null}
            {!error && pages.length === 0 ? (
              <p className="flex h-full items-center justify-center px-6 text-center type-body text-brand/50">
                {totalPages > 0
                  ? `${loadStatus} · ${Math.max(pages.length, 1)} / ${totalPages}`
                  : loadStatus}
              </p>
            ) : null}
            <div
              className={cn(
                "h-full w-full origin-center",
                pages.length === 0 && "hidden",
              )}
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <div
                ref={bookHostRef}
                className="carnet-flipbook-book h-full w-full"
              />
            </div>
          </FlipbookBookFrame>

          <div className="absolute top-1/2 right-0 z-10 -translate-y-1/2 sm:static sm:flex sm:shrink-0 sm:translate-y-0 sm:items-center">
            <FlipbookCircleButton
              label="Page suivante"
              disabled={!hasBook || atEnd}
              onClick={goNext}
              src="/icons/flipbook/next.svg"
              hoverSrc="/icons/flipbook/next-hover.svg"
              disabledSrc="/icons/flipbook/next-disabled.svg"
              size={40}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <p className="type-tag text-brand/50" aria-live="polite">
            {pageCount > 0
              ? `Page ${pageLabel} sur ${pageCount}`
              : "Page — / —"}
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
            <p
              className="type-body-small w-8 text-center text-brand/50"
              aria-live="polite"
            >
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
        Feuilletez l&apos;aperçu du carnet. L&apos;édition complète contient
        l&apos;itinéraire, les adresses secrètes et la carte interactive Google
        My Maps.
      </p>
    </section>
  );
}
