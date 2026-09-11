import Image from "next/image";

import { Button } from "@/components/ui/button";
import { aboutSocial } from "@/lib/about-content";
import { instagramUrl, LINKEDIN_URL } from "@/lib/site";

const tiles = [
  { src: "/images/about/ig-1.png", position: "object-cover" },
  { src: "/images/about/ig-feed.png", position: "object-cover object-[25%_center]" },
  { src: "/images/about/ig-feed.png", position: "object-cover object-left" },
  { src: "/images/about/ig-feed.png", position: "object-cover object-right" },
];

export function AboutSocial({ instagram }: { instagram?: string }) {
  const instagramHref = instagramUrl(instagram);

  return (
    <section className="bg-brand-sand px-4 py-16 sm:px-8 sm:py-24 lg:px-11">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex max-w-[436px] flex-col gap-5">
            <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
              {aboutSocial.kicker}
            </p>
            <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
              {aboutSocial.title}{" "}
              <span className="italic text-brand-teal">
                {aboutSocial.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-[437px] text-[15px] leading-5 font-light text-brand">
            {aboutSocial.text}
          </p>
        </div>

        <div className="grid h-[360px] grid-cols-2 gap-px overflow-hidden border border-brand/30 bg-brand/30 sm:h-[450px] lg:grid-cols-4">
          {tiles.map((tile, index) => (
            <div key={`${tile.src}-${index}`} className="relative min-h-0">
              <Image
                src={tile.src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={tile.position}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4">
          <Button asChild variant="brand" size="cta">
            <a href={instagramHref} target="_blank" rel="noreferrer">
              Suivre sur Instagram @my_trip_designer
            </a>
          </Button>
          <Button asChild variant="brandOutline" size="cta">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              retrouvez moi aussi sur linkedin
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
