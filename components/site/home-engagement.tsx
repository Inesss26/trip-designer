import Image from "next/image";

import { homeEngagements } from "@/lib/home-content";
import { cn } from "@/lib/utils";

export function HomeEngagement() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-[52px] px-4 sm:px-8 lg:px-11">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-16">
        <p className="shrink-0 type-tag text-brand">
          Mon engagement
        </p>
        <div className="type-h3">
          <p className="text-brand">
            Vous créer un voyage immersif et sur-mesure, pensé comme une
            véritable expérience.
          </p>
          <p className="text-brand/50">
            Bien plus qu&apos;un séjour : des émotions vraies et des souvenirs
            qui restent.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {homeEngagements.map((item) => (
          <article key={item.title} className="flex flex-col">
            <div className="relative h-[220px] w-full overflow-hidden sm:h-[272px]">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={cn("object-cover", item.imageClassName)}
              />
            </div>
            <div className="card-muted flex flex-1 flex-col gap-5 p-8 sm:p-10">
              <p className="type-tag text-brand">
                {item.title}
              </p>
              <p className="type-body text-brand">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
