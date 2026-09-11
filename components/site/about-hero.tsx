import Image from "next/image";

import { aboutHero } from "@/lib/about-content";

export function AboutHero() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-10 px-4 pt-12 sm:px-8 sm:pt-16 lg:flex-row lg:justify-between lg:px-11">
      <div className="flex max-w-[518px] flex-col justify-between gap-12">
        <div className="flex flex-col gap-8">
          <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
            {aboutHero.kicker}
          </p>
          <h1 className="font-heading text-[40px] leading-[44px] font-bold tracking-[-1.2px] text-brand sm:text-[64px] sm:leading-[68px] sm:tracking-[-1.92px]">
            {aboutHero.titleStart}{" "}
            <span className="italic text-brand-teal">{aboutHero.titleAccent}</span>
          </h1>
          <p className="font-heading text-[24px] leading-[30px] font-bold text-brand">
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
          <p className="text-[15px] leading-5 font-light text-brand">
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
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
