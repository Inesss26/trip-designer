import Image from "next/image";

import { aboutVision } from "@/lib/about-content";

export function AboutVision() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 sm:px-8 lg:px-11">
      <div className="flex max-w-[666px] flex-col gap-5">
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
          {aboutVision.kicker}
        </p>
        <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
          {aboutVision.title}{" "}
          <span className="italic text-brand-teal">{aboutVision.titleAccent}</span>
        </h2>
        <p className="text-[15px] leading-5 font-light text-brand/50">
          {aboutVision.subtitle}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {aboutVision.pillars.map((pillar) => (
          <article key={pillar.kicker} className="flex flex-col">
            <div className="relative h-[220px] overflow-hidden sm:h-[272px]">
              <Image
                src={pillar.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-5 bg-brand-sand p-8 sm:p-10">
              <p className="text-[10px] font-bold tracking-[1.7px] text-brand uppercase">
                {pillar.kicker}
              </p>
              <p className="text-[15px] leading-5 font-light text-brand">
                {pillar.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
