import Link from "next/link";

import { Button } from "@/components/ui/button";

function Bullet({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={
          accent
            ? "text-[9px] font-bold tracking-[2.25px] text-brand-teal uppercase"
            : "text-[9px] font-bold tracking-[2.25px] text-brand/50 uppercase"
        }
      >
        ✦
      </span>
      <p className="text-[15px] leading-5 font-light text-brand">{children}</p>
    </li>
  );
}

export function CarnetsUpsell() {
  return (
    <section className="mx-auto flex w-full max-w-[1124px] flex-col gap-8 px-4 sm:px-8 lg:px-11">
      <div className="flex max-w-[672px] flex-col gap-5">
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
          pour aller plus loin
        </p>
        <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
          Votre destination
          <br />
          n&apos;est pas dans la liste ?
        </h2>
        <p className="text-[14px] leading-[22.75px] font-light text-brand/50">
          Vous ne trouvez pas votre bonheur dans mes carnets prêts à l&apos;emploi
          ? Je conçois votre carnet 100 % personnalisé selon vos dates, vos
          envies et votre budget.
        </p>
      </div>

      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        <article className="flex flex-col justify-between gap-8 bg-white p-8 sm:p-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
                inclu dans vos formules
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-[32px] leading-9 text-brand">
                  Carnet d&apos;itinéraire
                </h3>
                <p className="text-[15px] leading-5 font-semibold text-brand/50">
                  Inclus dans les formules Dolce Vita & La Strada
                </p>
              </div>
            </div>
            <p className="text-[15px] leading-5 font-light text-brand">
              L&apos;essentiel de votre voyage regroupé au même endroit : vos
              hébergements de charme, vos transports et mes meilleures adresses
              locales.
            </p>
            <ul className="flex flex-col gap-2">
              <Bullet>Hébergements & Transports</Bullet>
              <Bullet>Recommandations sur-mesure</Bullet>
              <Bullet>Carnet de voyage personnalisé</Bullet>
            </ul>
          </div>
          <Button asChild variant="brandOutline" size="cta" className="w-full">
            <Link href="/formules">découvrir les formules</Link>
          </Button>
        </article>

        <article className="flex flex-col gap-8 border-t-2 border-brand-teal bg-white px-8 pt-[42px] pb-10 shadow-[0_2px_3px_rgba(61,0,0,0.2)] sm:px-10">
          <div className="flex flex-col gap-6">
            <p className="inline-flex w-fit items-center gap-2 bg-brand-teal px-3 py-1 text-white uppercase">
              <span className="text-[9px] font-bold tracking-[2.25px]">✦</span>
              <span className="text-[10px] font-bold tracking-[1.7px]">
                l&apos;expérience clé en main
              </span>
            </p>
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-[32px] leading-9 text-brand">
                Carnet sur-mesure premium
              </h3>
              <p className="text-[15px] leading-5 font-semibold text-brand-teal">
                Inclus avec la formules Far Niente
              </p>
            </div>
          </div>
          <p className="text-[15px] leading-5 font-light text-brand">
            Pour ne rien avoir à penser sur place : je planifie vos journées de
            A à Z avec un programme quotidien détaillé et intègre tout dans
            votre carte interactive mobile.
          </p>
          <ul className="flex flex-col gap-2">
            <Bullet accent>Programme détaillé jour par jour</Bullet>
            <Bullet accent>Réservation d&apos;activités & visites</Bullet>
            <Bullet accent>Carte interactive My Maps</Bullet>
          </ul>
          <p className="text-[12px] leading-[15px] font-medium text-brand/30">
            Astuce : Le carnet prêt à l&apos;emploi à 39,90€ est cumulable avec
            l&apos;option Far Niente (+40 €/j) pour créer votre Carnet Premium
            !
          </p>
          <Button asChild variant="brandSecondary" size="cta" className="w-full">
            <Link href="/contact">Commander mon carnet</Link>
          </Button>
        </article>
      </div>
    </section>
  );
}
