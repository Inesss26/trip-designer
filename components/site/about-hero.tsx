import Image from "next/image";

import { aboutHero } from "@/lib/about-content";

export function AboutHero() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-10 px-4 pt-12 sm:px-8 sm:pt-16 lg:flex-row lg:justify-between lg:px-11">
      <div className="contents lg:flex lg:max-w-[518px] lg:flex-col lg:justify-between lg:gap-12">
        <div className="order-1 flex flex-col gap-8">
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
        <div className="order-3 flex flex-col gap-5 lg:order-none">
          <div className="relative z-10 -mt-[88px] pl-6 lg:mt-0 lg:pl-0">
            <div className="relative size-[95px]">
              <Image
                src="/images/home/logo.png"
                alt=""
                fill
                sizes="95px"
                className="object-cover"
              />
            </div>
          </div>
          <p className="type-body text-brand">
            {aboutHero.intro}
          </p>
        </div>
      </div>
      <div className="relative order-2 h-[420px] w-full overflow-hidden sm:h-[550px] lg:order-none lg:w-[437px] lg:shrink-0">
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
