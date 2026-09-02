"use client";

import Image from "next/image";
import { useState } from "react";

import { SiteIcon } from "@/components/site/site-icon";
import { reviewImages } from "@/lib/home-content";
import type { Review, Trip } from "@/lib/data/types";

export function HomeReviews({
  reviews,
  trips = [],
}: {
  reviews: Review[];
  trips?: Trip[];
}) {
  const [index, setIndex] = useState(0);
  const count = reviews.length;
  const review = count > 0 ? reviews[index] : null;
  const trip = review
    ? trips.find((item) => item.id === review.tripId)
    : undefined;

  function go(next: number) {
    if (count === 0) {
      return;
    }
    setIndex((next + count) % count);
  }

  return (
    <section
      id="avis"
      className="mx-auto flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-8 px-4 sm:px-8 lg:px-11"
    >
      <div className="flex flex-col gap-5">
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
          avis clients
        </p>
        <h2 className="max-w-[458px] font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
          Ils ont fait confiance à{" "}
          <span className="italic text-brand-teal">My Trip Designer.</span>
        </h2>
      </div>

      {review ? (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-stretch md:flex-row md:items-center">
            <div className="relative h-[280px] w-full shrink-0 md:h-[480px] md:w-[min(100%,437px)] lg:h-[592px]">
              <Image
                src={reviewImages[index % reviewImages.length]}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 437px"
                className="object-cover"
              />
            </div>
            <blockquote className="relative z-10 flex flex-col gap-5 bg-brand-rose/90 p-6 md:-ml-[94px] md:max-w-[520px] md:p-8">
              <SiteIcon src="/icons/quote.svg" width={33} height={24} />
              <p className="text-[15px] leading-5 font-light italic text-brand">
                {review.content}
              </p>
              <footer className="flex flex-col gap-1">
                <cite className="font-heading text-[24px] leading-[30px] font-bold text-brand not-italic">
                  {review.authorName}
                </cite>
                <p className="text-[12px] font-medium text-brand-teal">
                  {trip
                    ? `- ${trip.title}`
                    : review.authorLocation
                      ? `- ${review.authorLocation}`
                      : null}
                </p>
              </footer>
            </blockquote>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2" aria-hidden>
              {reviews.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Avis ${itemIndex + 1}`}
                  onClick={() => setIndex(itemIndex)}
                  className={
                    itemIndex === index
                      ? "h-2 w-[62px] rounded-full bg-brand-teal"
                      : "size-2 rounded-full bg-brand-sand"
                  }
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Avis précédent"
                className="relative h-10 w-[43px] overflow-clip"
              >
                <img
                  src="/icons/btn-prev.svg"
                  alt=""
                  className="size-full"
                  width={43}
                  height={40}
                />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Avis suivant"
                className="relative h-10 w-[43px] overflow-clip"
              >
                <img
                  src="/icons/btn-next.svg"
                  alt=""
                  className="size-full"
                  width={43}
                  height={40}
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-[15px] font-light text-brand/50">
          Les premiers avis seront publiés au retour des prochains voyageurs.
        </p>
      )}
    </section>
  );
}
