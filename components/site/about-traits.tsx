import Image from "next/image";

import { SiteIcon } from "@/components/site/site-icon";
import { aboutTraits } from "@/lib/about-content";

function Trait({
  title,
  text,
  icon,
  iconWidth,
  iconHeight,
}: {
  title: string;
  text: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
}) {
  return (
    <div className="flex items-center gap-5 px-3">
      <SiteIcon src={icon} width={iconWidth} height={iconHeight} />
      <div className="flex flex-col gap-3">
        <h3 className="type-subtitle text-brand">
          {title}
        </h3>
        <p className="type-body text-brand/50">{text}</p>
      </div>
    </div>
  );
}

export function AboutTraits() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 sm:px-8 lg:px-11">
      <div className="flex w-full flex-col items-stretch gap-8 lg:-mb-[100px] lg:flex-row lg:items-center lg:gap-5 lg:py-10">
        <div className="flex flex-1 flex-col justify-between gap-12 lg:min-h-[560px]">
          <div className="flex flex-col gap-5">
            <p className="type-tag text-brand-primary-30">
              {aboutTraits.kicker}
            </p>
            <h2 className="type-h2 text-text-brand">
              {aboutTraits.title}
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            {aboutTraits.left.map((trait) => (
              <Trait key={trait.title} {...trait} />
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-[437px] overflow-hidden sm:h-[560px] lg:h-[643px]">
          <Image
            src="/images/about/portrait.png"
            alt="Portrait d'Agathe"
            fill
            sizes="(max-width: 1024px) 100vw, 437px"
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-1 flex-col justify-end gap-8 lg:min-h-[560px]">
          {aboutTraits.right.map((trait) => (
            <Trait key={trait.title} {...trait} />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8 flex max-w-[666px] flex-col items-center gap-4 py-6 text-center lg:mt-0">
        <div className="relative size-[150px]">
          <Image
            src="/images/home/logo.png"
            alt=""
            fill
            sizes="150px"
            className="object-cover"
          />
        </div>
        <p className="type-quote text-text-brand">
          “Bien plus qu'un simple voyage, je vous invite à ressentir chaque
          destination. Dans toute sa{" "}
          <span className="text-brand-secondary">Dolce Vita.</span>”
        </p>
        <p className="type-tag text-brand/30">
          {aboutTraits.quoteAuthor}
        </p>
      </div>
    </section>
  );
}
