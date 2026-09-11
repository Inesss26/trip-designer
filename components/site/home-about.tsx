import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const aboutParagraphs = [
  "Franco-italienne installée à Rome, j'infuse l'esprit de la Dolce Vita dans chacun de vos voyages. Si l'Italie est mon terrain de jeu quotidien, mon expertise s'étend à l'Europe et au reste du monde pour concevoir des séjours uniques.",
  "Mon obsession ? Ne pas seulement vous faire visiter une destination, mais vous faire repartir avec des souvenirs plein la tête.",
];

export function HomeAbout() {
  return (
    <section
      id="a-propos"
      className="mx-auto flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-8 px-4 sm:px-8 lg:flex-row lg:items-end lg:gap-5 lg:px-40"
    >
      <div className="w-full lg:w-[321px]">
        <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
          Ciao,
          <br />
          moi c&apos;est{" "}
          <span className="italic text-brand-teal">Agathe !</span>
        </h2>
      </div>

      <div className="relative h-[420px] w-full overflow-hidden sm:h-[520px] lg:h-[629px] lg:w-[437px] lg:shrink-0">
        <Image
          src="/images/home/agathe.png"
          alt="Agathe, fondatrice de My Trip Designer"
          fill
          sizes="(max-width: 1024px) 100vw, 437px"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col items-start justify-end gap-6">
        <div className="relative size-[95px]">
          <Image
            src="/images/home/logo.png"
            alt=""
            fill
            sizes="95px"
            className="object-cover"
          />
        </div>
        <div className="text-[15px] leading-5 text-brand">
          <p className="font-semibold">Créatrice de souvenirs.</p>
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 font-light">
              {paragraph}
            </p>
          ))}
        </div>
        <Button asChild variant="brandOutline" size="cta" className="w-full">
          <Link href="/a-propos">découvrir mon histoire</Link>
        </Button>
      </div>
    </section>
  );
}
