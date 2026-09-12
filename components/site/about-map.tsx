import { aboutMap } from "@/lib/about-content";

export function AboutMap() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 sm:px-8 lg:px-11">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex max-w-[720px] flex-col gap-5">
          <p className="type-tag text-brand/30">
            {aboutMap.kicker}
          </p>
          <h2 className="type-h2 text-text-brand">
            {aboutMap.title}
          </h2>
        </div>
        <p className="max-w-[323px] type-body text-brand/50">
          {aboutMap.subtitle}
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-end lg:gap-4">
        <div className="relative min-h-[280px] flex-1 overflow-hidden sm:min-h-[420px] lg:min-h-[527px]">
          <img
            src="/images/about/map.svg"
            alt="Carte des destinations visitées par Agathe"
            className="size-full object-contain object-left"
          />
        </div>

        <div className="flex w-full flex-col gap-8 lg:w-[321px] lg:shrink-0">
          <div className="flex flex-wrap gap-6">
            <p className="flex items-center gap-2 type-tag text-brand/50">
              <span className="size-3 rounded-full bg-accent-dark" />
              Pays visités
            </p>
            <p className="flex items-center gap-2 type-tag text-brand/50">
              <span className="size-3 rounded-full bg-bg-muted" />
              À explorer
            </p>
          </div>

          {aboutMap.groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <p className="type-tag text-brand">
                {group.label}
              </p>
              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {group.countries.map((country) => (
                  <li
                    key={country}
                    className="flex items-center gap-1.5 rounded-full bg-bg-muted px-3 py-1.5 type-body-small text-brand"
                  >
                    <span className="size-1.5 rounded-full bg-accent-dark" />
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
