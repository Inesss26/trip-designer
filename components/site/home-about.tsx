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
      className="mx-auto flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-8 px-4 sm:px-8 lg:flex-row lg:items-end lg:justify-center lg:gap-5 lg:px-11"
    >
      <div className="w-full min-w-0 lg:w-[321px]">
        <h2 className="type-h2 text-text-brand">
          Ciao,
          <br />
          moi c&apos;est{" "}
          <span className="type-h2-italic text-brand-secondary">Agathe !</span>
        </h2>
      </div>

      <div className="relative h-[420px] w-full min-w-0 overflow-hidden sm:h-[520px] lg:h-[629px] lg:w-[437px]">
        <Image
          src="/images/home/agathe.png"
          alt="Agathe, fondatrice de My Trip Designer"
          fill
          sizes="(max-width: 1024px) 100vw, 437px"
          className="object-cover object-top"
        />
      </div>

      <div className="flex w-full min-w-0 flex-col items-start justify-end gap-6 lg:w-[321px]">
        <div className="relative size-[95px]">
          <Image
            src="/images/home/logo.png"
            alt=""
            fill
            sizes="95px"
            className="object-cover"
          />
        </div>
        <div className="type-body text-text-brand">
          <p className="type-body-strong">Créatrice de souvenirs.</p>
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 type-body">
              {paragraph}
            </p>
          ))}
        </div>
        <Button asChild variant="tertiary" size="cta" className="w-full">
          <Link href="/a-propos">découvrir mon histoire</Link>
        </Button>
      </div>
    </section>
  );
}
