"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { SiteIcon } from "@/components/site/site-icon";
import type { Review, Trip } from "@/lib/data/types";
import { reviewImages } from "@/lib/home-content";
import { cn } from "@/lib/utils";

function tripLine(review: Review, trips: Trip[]) {
  const trip = trips.find((item) => item.id === review.tripId);
  if (trip) {
    return `- ${trip.title}`;
  }
  if (review.authorLocation) {
    return `- ${review.authorLocation}`;
  }
  return null;
}

function trackOffset(viewport: HTMLElement, track: HTMLElement, index: number) {
  const slides = track.children;
  const count = slides.length;
  const current = slides[index] as HTMLElement | undefined;
  if (!current || count === 0) {
    return 0;
  }

  const viewportWidth = viewport.clientWidth;
  const maxOffset = Math.max(0, track.scrollWidth - viewportWidth);

  if (index >= count - 1) {
    return -maxOffset;
  }

  return -Math.min(maxOffset, current.offsetLeft);
}

export function HomeReviews({
  reviews,
  trips = [],
}: {
  reviews: Review[];
  trips?: Trip[];
}) {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = reviews.length;
  const atStart = index <= 0;
  const atEnd = count === 0 || index >= count - 1;

  const updateOffset = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }
    setOffset(trackOffset(viewport, track, index));
  }, [index]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    updateOffset();

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport) {
      return;
    }

    const observer = new ResizeObserver(updateOffset);
    observer.observe(viewport);
    if (track) {
      observer.observe(track);
    }

    return () => observer.disconnect();
  }, [isMounted, updateOffset]);

  function goTo(next: number) {
    if (count === 0) {
      return;
    }
    setIndex(Math.max(0, Math.min(count - 1, next)));
  }

  return (
    <section
      id="avis"
      className="mx-auto flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-8 px-4 sm:px-8 lg:px-11"
    >
      <div className="flex flex-col gap-5">
        <p className="type-tag text-brand/30">
          avis clients
        </p>
        <h2 className="max-w-[458px] type-h2 text-text-brand">
          Ils ont fait confiance à{" "}
          <span className="type-h2-italic text-brand-secondary">My Trip Designer.</span>
        </h2>
      </div>

      {count > 0 ? (
        <div className="flex flex-col gap-8">
          <div ref={viewportRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-start gap-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:items-center lg:gap-6"
              style={isMounted ? { transform: `translateX(${offset}px)` } : undefined}
            >
              {reviews.map((review, itemIndex) => (
                <article
                  key={review.id}
                  className="flex w-[calc(100%-3.5rem)] shrink-0 basis-[calc(100%-3.5rem)] flex-col items-stretch lg:h-[592px] lg:w-[min(895px,calc(100%-7.5rem))] lg:basis-[min(895px,calc(100%-7.5rem))] lg:flex-row lg:items-center"
                  aria-hidden={itemIndex !== index}
                >
                  <div className="relative h-[280px] w-full shrink-0 overflow-hidden lg:mr-[-94px] lg:h-full lg:w-[437px]">
                    <Image
                      src={reviewImages[itemIndex % reviewImages.length]}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 437px"
                      className="object-cover"
                    />
                  </div>
                  <blockquote className="relative z-10 flex flex-col gap-5 bg-bg-pink-muted p-6 lg:flex-1 lg:p-8">
                    <SiteIcon src="/icons/quote.svg" width={33} height={24} />
                    <p className="type-body-italic text-brand">
                      {review.content}
                    </p>
                    <footer className="flex flex-col gap-1">
                      <cite className="type-subtitle text-brand not-italic">
                        {review.authorName}
                      </cite>
                      <p className="type-body-small text-brand-secondary">
                        {tripLine(review, trips)}
                      </p>
                    </footer>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {reviews.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Avis ${itemIndex + 1}`}
                  aria-current={itemIndex === index ? "true" : undefined}
                  onClick={() => goTo(itemIndex)}
                  className={cn(
                    "h-2 rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    itemIndex === index
                      ? "w-[62px] bg-brand-secondary"
                      : "w-2 bg-bg-muted",
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={atStart}
                aria-label="Avis précédent"
                className="relative h-10 w-[43px] overflow-clip disabled:cursor-default"
              >
                <img
                  src={atStart ? "/icons/btn-prev-muted.svg" : "/icons/btn-prev.svg"}
                  alt=""
                  width={43}
                  height={40}
                  className="size-full"
                />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={atEnd}
                aria-label="Avis suivant"
                className="relative h-10 w-[43px] overflow-clip disabled:cursor-default"
              >
                <img
                  src={atEnd ? "/icons/btn-next-muted.svg" : "/icons/btn-next.svg"}
                  alt=""
                  width={43}
                  height={40}
                  className="size-full"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="type-body text-brand/50">
          Les premiers avis seront publiés au retour des prochains voyageurs.
        </p>
      )}
    </section>
  );
}
