import Image from "next/image";

import { aboutVision } from "@/lib/about-content";
import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export function AboutVision() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 sm:px-8 lg:px-11">
      <div className="flex max-w-[666px] flex-col gap-5">
        <p className="type-tag text-brand/30">
          {aboutVision.kicker}
        </p>
        <Reveal>
          <h2 className="type-h2 text-text-brand">
            {aboutVision.title}{" "}
            <span className="type-h2-italic text-brand-secondary">{aboutVision.titleAccent}</span>
          </h2>
        </Reveal>
        <p className="type-body text-brand/50">
          {aboutVision.subtitle}
        </p>
      </div>

      <Stagger className="grid gap-5 lg:grid-cols-3">
        {aboutVision.pillars.map((pillar) => (
          <StaggerItem key={pillar.kicker}>
          <article className="flex h-full flex-col">
            <div className="relative h-[220px] overflow-hidden sm:h-[272px]">
              <Image
                src={pillar.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className={cn(
                  "object-cover",
                  "imageClassName" in pillar ? pillar.imageClassName : "object-center",
                )}
              />
            </div>
            <div className="card-muted flex flex-1 flex-col gap-5 p-8 sm:p-10">
              <p className="type-tag text-brand">
                {pillar.kicker}
              </p>
              <p className="type-body text-brand">
                {pillar.text}
              </p>
            </div>
          </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
