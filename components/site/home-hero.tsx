import Image from "next/image";

import { homeHeroCopy, homeStats } from "@/lib/home-content";

export function HomeHero() {
  return (
    <section className="flex flex-col items-center">
      <div className="relative h-[380px] w-full sm:h-[480px] lg:h-[550px]">
        <Image
          src="/images/home/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-accent-dark/5 to-brand-primary/30"
        />
        <p className="absolute inset-x-4 bottom-24 text-center type-h1-display text-text-on-dark sm:bottom-32">
          MY TRIP DESIGNER
        </p>
      </div>

      <div className="relative z-10 flex w-full max-w-[821px] -translate-y-[75px] flex-col items-center gap-3 px-4 text-center sm:-translate-y-[95px]">
        <div className="relative size-[110px] overflow-hidden sm:size-[150px]">
          <Image
            src="/images/home/logo.png"
            alt="Logo My Trip Designer"
            fill
            sizes="150px"
            className="object-cover"
          />
        </div>
        <h1 className="type-h3 text-text-brand">
          {homeHeroCopy.title}
        </h1>
        <p className="max-w-2xl type-body text-brand/50 whitespace-pre-line">
          {homeHeroCopy.subtitle}
        </p>
      </div>

      <div className="grid w-full max-w-[1440px] grid-cols-1 gap-8 px-4 pb-8 text-center sm:grid-cols-3 sm:gap-[30px] sm:px-8 lg:px-[253px]">
        {homeStats.map((stat) => (
          <div key={stat.label}>
            <p className="type-h1 leading-none text-text-brand">
              {stat.value}
            </p>
            <p className="mt-1 type-body text-text-brand">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
