import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal";
import { SiteIcon } from "@/components/site/site-icon";
import { carnetBenefits } from "@/lib/carnets-content";

export function CarnetsBenefits() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 sm:px-8 lg:px-11">
      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
        <div className="flex max-w-[375px] flex-col gap-5">
          <p className="type-tag text-brand/30">
            dans votre carnet
          </p>
          <Reveal>
            <h2 className="type-h2 text-text-brand">
              Tout votre séjour
              <span className="block type-h2-italic text-brand-secondary">
                dans la poche.
              </span>
            </h2>
          </Reveal>
          <p className="type-body text-brand/50">
            Tout ce dont vous avez besoin est réuni au même endroit, organisé
            pour voyager sans friction.
          </p>
        </div>

        <Stagger className="grid w-full gap-px bg-brand/30 sm:grid-cols-2 lg:max-w-[664px]">
          {carnetBenefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
            <article
              className="card flex min-h-[250px] h-full flex-col justify-between"
            >
              <SiteIcon
                src={benefit.icon}
                width={benefit.iconWidth}
                height={benefit.iconHeight}
              />
              <div className="flex flex-col gap-3">
                <h3 className="type-subtitle text-brand">
                  {benefit.title}
                </h3>
                <p className="type-body text-brand/50">
                  {benefit.text}
                </p>
              </div>
            </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
