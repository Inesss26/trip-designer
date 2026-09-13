import Image from "next/image";

import { aboutHero } from "@/lib/about-content";

export function AboutHero() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-10 px-4 pt-12 sm:px-8 sm:pt-16 lg:flex-row lg:justify-between lg:px-11">
      <div className="flex max-w-[518px] flex-col justify-between gap-12">
        <div className="flex flex-col gap-8">
          <p className="type-tag text-brand/30">
            {aboutHero.kicker}
          </p>
          <h1 className="type-h1 text-text-brand">
            {aboutHero.titleStart}{" "}
            <span className="type-h2-italic text-brand-secondary">{aboutHero.titleAccent}</span>
          </h1>
          <p className="type-subtitle text-brand">
            {aboutHero.subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="relative size-[95px]">
            <Image
              src="/images/home/logo.png"
              alt=""
              fill
              sizes="95px"
              className="object-cover"
            />
          </div>
          <p className="type-body text-brand">
            {aboutHero.intro}
          </p>
        </div>
      </div>
      <div className="relative h-[420px] w-full overflow-hidden sm:h-[550px] lg:w-[437px] lg:shrink-0">
        <Image
          src="/images/about/hero.png"
          alt="Agathe, fondatrice de My Trip Designer"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 437px"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
