import Image from "next/image";
import Link from "next/link";

import { CarnetCard, CarnetMeta } from "@/components/site/carnet-card";
import { CarnetFlipbook } from "@/components/site/carnet-flipbook-lazy";
import { CarnetsBenefits } from "@/components/site/carnets-benefits";
import { CarnetsCompare } from "@/components/site/carnets-compare";
import { HomeCta } from "@/components/site/home-close";
import { SiteIcon } from "@/components/site/site-icon";
import { ZcalLink } from "@/components/site/zcal-link";
import { Button } from "@/components/ui/button";
import {
  carnetIncludes,
  formatCarnetPrice,
  type Carnet,
} from "@/lib/carnets-content";
import { cn } from "@/lib/utils";

export function CarnetPurchase({
  carnet,
  related,
}: {
  carnet: Carnet;
  related: Carnet[];
}) {
  const orderHref = `/contact?carnet=${carnet.slug}`;

  return (
    <>
      <div className="flex flex-col">
      <section className="relative h-[240px] w-full overflow-hidden sm:h-[350px]">
        <Image
          src={carnet.heroImage}
          alt={carnet.title}
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover",
            carnet.heroImageClassName ?? "object-center",
          )}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 to-transparent"
        />
      </section>

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-4 pt-12 pb-0 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-11 lg:pt-16 lg:pb-0">
        <div className="flex min-w-0 flex-1 flex-col gap-11">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <CarnetMeta
                location={carnet.location}
                durationDays={carnet.durationDays}
                durationClassName="text-brand"
              />
              <h1 className="type-h1 text-text-brand">
                {carnet.title}
              </h1>
            </div>
            <div className="flex flex-col gap-5">
              <p className="type-body-strong text-text-brand">
                {carnet.tagline}
              </p>
              <p className="type-body text-brand/50">
                {carnet.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {carnet.gallery.map((src, index) => (
              <div
                key={src}
                className="relative h-[144px] overflow-hidden bg-bg-muted"
              >
                <Image
                  src={src}
                  alt={`${carnet.title} — aperçu ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 30vw, 280px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="type-h3 text-text-brand">
              Informations clés
            </h2>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {(
                [
                  {
                    label: "Saison",
                    value: carnet.keyFacts.season,
                    icon: "/icons/carnets/season.svg",
                    iconWidth: 19.5,
                    iconHeight: 17.5,
                  },
                  {
                    label: "Formalités",
                    value: carnet.keyFacts.formalities,
                    icon: "/icons/carnets/formalities.svg",
                    iconWidth: 14.5,
                    iconHeight: 17.5,
                  },
                  {
                    label: "Transports",
                    value: carnet.keyFacts.transport,
                    icon: "/icons/carnets/transport.svg",
                    iconWidth: 21.5,
                    iconHeight: 15.5,
                  },
                ] as const
              ).map((item) => (
                <div key={item.label} className="flex min-w-0 flex-col gap-5">
                  <dt className="flex items-center gap-3 type-tag text-brand/50">
                    <SiteIcon
                      src={item.icon}
                      width={item.iconWidth}
                      height={item.iconHeight}
                    />
                    {item.label}
                  </dt>
                  <dd className="type-body text-brand/50">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="type-h3 text-text-brand">
              Ce que vous trouverez dans ce carnet
            </h2>
            <ul className="flex flex-col gap-3">
              {carnet.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <SiteIcon
                    src="/icons/diamond.svg"
                    size={8}
                    className="shrink-0"
                  />
                  <p className="type-body text-brand/50">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="w-full shrink-0 lg:sticky lg:top-8 lg:w-[437px]">
          <div className="card flex flex-col gap-8 border-t-2 border-brand-secondary pt-[34px] pb-8">
            <div className="flex flex-col gap-4">
              <p className="type-tag text-brand/30">
                Accès immédiat
              </p>
              <p className="type-h2 text-brand">
                {formatCarnetPrice()}
              </p>
              <p className="type-body-small text-brand/50">
                Paiement unique
              </p>
            </div>
            <div className="h-px w-[276px] max-w-full bg-brand/30" />
            <ul className="flex flex-col gap-3">
              {carnetIncludes.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <SiteIcon src="/icons/diamond.svg" size={8} />
                  <p className="type-body text-brand/50">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4">
            <Button asChild variant="dark" size="cta" className="w-full">
                <Link href={orderHref}>Commander ce carnet</Link>
              </Button>
              <p className="flex items-center justify-center gap-2 type-body-small text-brand/30">
                <SiteIcon src="/icons/carnets/lock.svg" width={9} height={10} />
                Paiement sécurisé
              </p>
            </div>
          </div>
          <div className="upsell-box flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="relative size-5 shrink-0 overflow-visible">
                <SiteIcon
                  src="/icons/carnets/sparkle.svg"
                  width={21.5}
                  height={21.5}
                  className="absolute inset-[-3.75%]"
                />
              </span>
              <p className="min-w-0 flex-1 type-body-strong text-brand">
                Vous préférez un programme jour par jour 100 % sur mesure ?
              </p>
            </div>
            <p className="type-body text-brand/50">
              Avec la formule Far Niente, j&apos;ajoute un itinéraire détaillé
              jour par jour à votre carnet, personnalisé à vos dates, ainsi
              qu&apos;une carte interactive My Maps.
            </p>
            <p className="type-body-italic text-brand/50">
              (Sur devis — selon le nombre de jours, dès 40 €/j)
            </p>
            <Button asChild variant="tertiary" size="cta" className="w-full bg-white">
              <ZcalLink>réserver mon Appel</ZcalLink>
            </Button>
          </div>
        </aside>
      </section>

      <CarnetFlipbook />
      <CarnetsCompare />
      </div>

      <CarnetsBenefits />

      {related.length > 0 ? (
        <div>
          <section className="bg-bg-muted px-4 py-16 sm:px-8 sm:py-16 lg:px-11">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <h2 className="type-h2 text-text-brand">
                  Explorez d&apos;autres destinations
                </h2>
                <Button asChild variant="tertiary" size="cta">
                  <Link href="/carnets">Voir les autres carnets</Link>
                </Button>
              </div>
              <div className="grid gap-px bg-brand/30 lg:grid-cols-3">
                {related.map((item) => (
                  <CarnetCard key={item.slug} carnet={item} />
                ))}
              </div>
            </div>
          </section>
          <HomeCta />
        </div>
      ) : (
        <HomeCta />
      )}
    </>
  );
}
