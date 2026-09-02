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
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.05),rgba(0,0,0,0.05)),linear-gradient(180deg,rgba(30,72,84,0.05),rgba(61,0,0,0.3))]"
        />
        <p className="absolute inset-x-4 bottom-24 text-center font-heading text-[40px] leading-none text-white sm:bottom-32 sm:text-6xl lg:text-[88px]">
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
        <h1 className="font-heading text-[26px] leading-9 text-brand sm:text-[32px]">
          {homeHeroCopy.title}
        </h1>
        <p className="max-w-2xl text-[15px] leading-5 font-light text-brand/50 whitespace-pre-line">
          {homeHeroCopy.subtitle}
        </p>
      </div>

      <div className="grid w-full max-w-[1440px] grid-cols-1 gap-8 px-4 pb-8 text-center sm:grid-cols-3 sm:gap-[30px] sm:px-8 lg:px-[253px]">
        {homeStats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-[40px] font-bold leading-none text-brand sm:text-[52px]">
              {stat.value}
            </p>
            <p className="mt-1 text-[15px] font-light leading-5 text-brand">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
