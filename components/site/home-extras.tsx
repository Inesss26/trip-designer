import Link from "next/link";

import { SiteIcon } from "@/components/site/site-icon";
import { Button } from "@/components/ui/button";

function ExtraBullet({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <SiteIcon src="/icons/diamond.svg" size={8} className="mt-2" />
      <p className="text-[14px] leading-[19.25px] text-brand">
        <span className="font-semibold">{label}</span>{" "}
        <span className="font-light">{children}</span>
      </p>
    </li>
  );
}

export function HomeExtras() {
  return (
    <section
      id="services-complementaires"
      className="mx-auto flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-8 px-4 sm:px-8 lg:px-11"
    >
      <div className="flex flex-col gap-6">
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
          Services complémentaires
        </p>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="max-w-[558px] font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
            Vous préférez organiser{" "}
            <span className="italic text-brand-teal">
              votre voyage vous-même ?
            </span>
          </h2>
          <p className="max-w-[386px] text-[15px] leading-5 font-light text-brand">
            Mes services à la carte et conseils d&apos;experte, pour aller aussi
            loin que vous en avez besoin.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <article className="flex flex-col gap-8 border-l-[3px] border-brand-teal bg-white px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
          <SiteIcon
            src="/icons/extra-consult.svg"
            size={32}
            className="self-start"
          />
          <div className="flex max-w-[345px] flex-col gap-6 lg:gap-8">
            <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
              Consultation experte
            </p>
            <h3 className="font-heading text-[32px] leading-9 text-brand">
              La consultation{" "}
              <span className="block text-[36px] leading-[42px] italic text-brand-teal">
                My Trip Advisor
              </span>
            </h3>
            <p className="text-[15px] leading-5 font-light text-brand">
              <span className="font-semibold">Besoin d&apos;y voir plus clair ?</span>{" "}
              Vous organisez votre voyage mais vous doutez de votre itinéraire,
              hésitez sur une destination ou manquez d&apos;adresses authentiques ?
              Cette session est faite pour vous.
            </p>
          </div>
          <ul className="flex max-w-[414px] flex-col gap-2">
            <ExtraBullet label="Format —">
              Un appel personnalisé de 30 à 40 minutes pour optimiser votre
              projet
            </ExtraBullet>
            <ExtraBullet label="Au programme —">
              Réponses à toutes vos questions, conseils personnalisés,
              recommandations & optimisation d&apos;itinéraire.
            </ExtraBullet>
            <ExtraBullet label="Le livrable —">
              Vous repartez avec des pistes claires et la sérénité d&apos;avancer
              dans la bonne direction.
            </ExtraBullet>
          </ul>
          <div className="flex w-full flex-col items-start justify-between gap-6 lg:w-[282px] lg:items-end lg:self-stretch">
            <div className="text-left lg:text-right">
              <p className="text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
                Tarif
              </p>
              <p className="font-heading text-[44px] font-bold text-brand">
                70 €
              </p>
              <p className="text-[12px] font-medium text-brand-teal">
                100 % déduit si vous réservez une formule
              </p>
            </div>
            <Button asChild variant="brandSecondary" size="cta" className="w-full">
              <Link href="/contact">Réserver mon appel</Link>
            </Button>
          </div>
        </article>

        <article className="flex flex-col gap-8 bg-white px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
          <SiteIcon
            src="/icons/extra-hotel.svg"
            size={32}
            className="self-start"
          />
          <div className="flex max-w-[327px] flex-col gap-6 lg:gap-8">
            <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
              négociation
            </p>
            <h3 className="font-heading text-[24px] leading-[30px] font-bold text-brand">
              Obtenez le meilleur prix pour votre hôtel
            </h3>
            <p className="text-[15px] leading-5 font-light text-brand">
              Je contacte l&apos;hôtel directement pour vous afin d&apos;obtenir le
              meilleur tarif : upgrade, petit-déjeuner, flexibilité inclus.
            </p>
          </div>
          <ul className="flex max-w-[414px] flex-col gap-2">
            <ExtraBullet label="Concept —">
              Je négocie directement avec l&apos;hôtel sur la base de vos critères
              de réservation.
            </ExtraBullet>
            <ExtraBullet label="L'accord —">
              Je perçois 50 % de la somme économisée. Rien si la négociation
              échoue ou si l&apos;offre ne vous intéresse pas.
            </ExtraBullet>
          </ul>
          <div className="flex w-full flex-col items-start justify-between gap-6 lg:w-[290px] lg:items-end lg:self-stretch">
            <div className="text-left lg:text-right">
              <p className="text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
                Tarif
              </p>
              <p className="font-heading text-[20px] font-bold leading-7 text-brand">
                50 % de la somme économisée
              </p>
              <p className="text-[12px] font-medium text-brand-teal">
                Gratuit si l&apos;offre ne vous intéresse pas
              </p>
            </div>
            <Button asChild variant="brandOutline" size="cta" className="w-full">
              <Link href="/contact">Négocie pour moi</Link>
            </Button>
          </div>
        </article>

        <article className="flex flex-col gap-8 bg-white px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
          <SiteIcon
            src="/icons/extra-carte.svg"
            width={25}
            height={32}
            className="self-start"
          />
          <div className="flex max-w-[327px] flex-col gap-6 lg:gap-8">
            <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
              services à la carte
            </p>
            <h3 className="font-heading text-[24px] leading-[30px] font-bold text-brand">
              Un coup de main ciblé
              <br />
              ou un événement spécial
            </h3>
            <p className="text-[15px] leading-5 font-light text-brand">
              Vous gérez votre voyage mais souhaitez déléguer une tâche précise
              ou marquer un moment exceptionnel. Je m&apos;en charge.
            </p>
          </div>
          <div className="w-full max-w-[406px]">
            <p className="text-[9px] font-bold text-brand/50 uppercase">Tarif</p>
            <ul>
              <li className="flex items-center justify-between border-b border-brand/30 py-3 text-brand">
                <span className="text-[14px] font-light">
                  Recherche de transports
                </span>
                <span className="font-heading text-[20px] font-bold">150 €</span>
              </li>
              <li className="flex items-center justify-between border-b border-brand/30 py-3 text-brand">
                <span className="text-[14px] font-light">
                  Recherche d&apos;hébergements
                </span>
                <span className="font-heading text-[20px] font-bold">150 €</span>
              </li>
              <li className="flex items-center justify-between py-3 text-brand">
                <span className="text-[14px] font-light">
                  Moments uniques (EVJF, Lune de miel)
                </span>
                <span className="font-heading text-[20px] font-bold">
                  Sur devis
                </span>
              </li>
            </ul>
          </div>
          <div className="flex w-full items-end justify-end lg:w-[290px] lg:self-stretch">
            <Button asChild variant="brandOutline" size="cta" className="w-full">
              <Link href="/contact">envoyer ma demande</Link>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
