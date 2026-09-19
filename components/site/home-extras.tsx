import { SiteIcon } from "@/components/site/site-icon";
import { ZcalLink } from "@/components/site/zcal-link";
import { Button } from "@/components/ui/button";
import {
  MAILTO_A_LA_CARTE,
  MAILTO_NEGOTIATION,
  ZCAL_ADVISOR_URL,
} from "@/lib/site";

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
      <p className="type-body text-text-brand">
        <span className="type-body-strong">{label}</span>{" "}
        <span className="type-body">{children}</span>
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
        <p className="type-tag text-brand/30">
          Services complémentaires
        </p>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="max-w-[558px] type-h2 text-text-brand">
            Vous préférez organiser{" "}
            <span className="type-h2-italic text-brand-secondary">
              votre voyage vous-même ?
            </span>
          </h2>
          <p className="max-w-[386px] type-body text-brand">
            Mes services à la carte et conseils d&apos;experte, pour aller aussi
            loin que vous en avez besoin.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <article className="card grid grid-cols-1 items-start gap-8 border-l-[3px] border-brand-secondary lg:grid-cols-[32px_minmax(0,1fr)_minmax(0,1.2fr)_minmax(16.5rem,16.5rem)] lg:items-end">
          <SiteIcon
            src="/icons/extra-consult.svg"
            size={32}
            className="self-start"
          />
          <div className="flex min-w-0 flex-col gap-6 lg:gap-8">
            <p className="type-tag text-brand/30">
              Consultation experte
            </p>
            <h3 className="type-h3 text-text-brand">
              La consultation{" "}
              <span className="block type-h2-italic text-brand-secondary">
                My Trip Advisor
              </span>
            </h3>
            <p className="type-body text-brand">
              <span className="type-body-strong">Besoin d&apos;y voir plus clair ?</span>{" "}
              Vous organisez votre voyage mais vous doutez de votre itinéraire,
              hésitez sur une destination ou manquez d&apos;adresses authentiques ?
              Cette session est faite pour vous.
            </p>
          </div>
          <ul className="flex min-w-0 flex-col gap-2">
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
          <div className="flex min-w-0 w-full flex-col items-start justify-between gap-6 lg:items-end lg:self-stretch">
            <div className="text-left lg:text-right">
              <p className="type-tag text-brand/50">
                Tarif
              </p>
              <p className="type-h2 text-text-brand">
                70 €
              </p>
              <p className="type-body-small text-brand-secondary">
                100 % déduit si vous réservez une formule
              </p>
            </div>
            <Button asChild variant="dark" size="cta" className="w-full">
              <ZcalLink href={ZCAL_ADVISOR_URL}>Réserver mon appel</ZcalLink>
            </Button>
          </div>
        </article>

        <article className="card grid grid-cols-1 items-start gap-8 lg:grid-cols-[32px_minmax(0,1fr)_minmax(0,1.2fr)_minmax(16.5rem,16.5rem)] lg:items-end">
          <SiteIcon
            src="/icons/extra-hotel.svg"
            size={32}
            className="self-start"
          />
          <div className="flex min-w-0 flex-col gap-6 lg:gap-8">
            <p className="type-tag text-brand/30">
              négociation
            </p>
            <h3 className="type-subtitle text-brand">
              Obtenez le meilleur prix pour votre hôtel
            </h3>
            <p className="type-body text-brand">
              Je contacte l&apos;hôtel directement pour vous afin d&apos;obtenir le
              meilleur tarif : upgrade, petit-déjeuner, flexibilité inclus.
            </p>
          </div>
          <ul className="flex min-w-0 flex-col gap-2">
            <ExtraBullet label="Concept —">
              Je négocie directement avec l&apos;hôtel sur la base de vos critères
              de réservation.
            </ExtraBullet>
            <ExtraBullet label="L'accord —">
              Je perçois 50 % de la somme économisée. Rien si la négociation
              échoue ou si l&apos;offre ne vous intéresse pas.
            </ExtraBullet>
          </ul>
          <div className="flex min-w-0 w-full flex-col items-start justify-between gap-6 lg:items-end lg:self-stretch">
            <div className="text-left lg:text-right">
              <p className="type-tag text-brand/50">
                Tarif
              </p>
              <p className="type-subtitle text-text-brand">
                50 % de la somme économisée
              </p>
              <p className="type-body-small text-brand-secondary">
                Gratuit si l&apos;offre ne vous intéresse pas
              </p>
            </div>
            <Button asChild variant="tertiary" size="cta" className="w-full">
              <a href={MAILTO_NEGOTIATION}>Négocie pour moi</a>
            </Button>
          </div>
        </article>

        <article className="card grid grid-cols-1 items-start gap-8 lg:grid-cols-[32px_minmax(0,1fr)_minmax(0,1.2fr)_minmax(16.5rem,16.5rem)] lg:items-end">
          <SiteIcon
            src="/icons/extra-carte.svg"
            width={25}
            height={32}
            className="self-start"
          />
          <div className="flex min-w-0 flex-col gap-6 lg:gap-8">
            <p className="type-tag text-brand/30">
              services à la carte
            </p>
            <h3 className="type-subtitle text-brand">
              Un coup de main ciblé{"\u00A0"}ou un événement spécial
            </h3>
            <p className="type-body text-brand">
              Vous gérez votre voyage mais souhaitez déléguer une tâche précise
              ou marquer un moment exceptionnel. Je m&apos;en charge.
            </p>
          </div>
          <div className="min-w-0 w-full">
            <p className="type-tag text-brand-primary-50">Tarif</p>
            <ul>
              <li className="flex items-center justify-between gap-5 border-b border-brand-primary-30 py-3 text-text-brand">
                <span className="type-body min-w-0 flex-1">
                  Recherche de transports
                </span>
                <span className="type-subtitle shrink-0 text-right whitespace-nowrap">
                  150 €
                </span>
              </li>
              <li className="flex items-center justify-between gap-5 border-b border-brand-primary-30 py-3 text-text-brand">
                <span className="type-body min-w-0 flex-1">
                  Recherche d&apos;hébergements
                </span>
                <span className="type-subtitle shrink-0 text-right whitespace-nowrap">
                  150 €
                </span>
              </li>
              <li className="flex items-center justify-between gap-5 py-3 text-text-brand">
                <span className="type-body min-w-0 flex-1">
                  Moments uniques (EVJF, Lune de miel)
                </span>
                <span className="type-subtitle shrink-0 text-right whitespace-nowrap">
                  Sur devis
                </span>
              </li>
            </ul>
          </div>
          <div className="flex min-w-0 w-full items-end justify-end lg:self-stretch">
            <Button asChild variant="tertiary" size="cta" className="w-full">
              <a href={MAILTO_A_LA_CARTE}>envoyer ma demande</a>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
