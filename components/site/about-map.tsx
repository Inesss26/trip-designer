import { aboutMap } from "@/lib/about-content";

export function AboutMap() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 sm:px-8 lg:px-11">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex max-w-[720px] flex-col gap-5">
          <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
            {aboutMap.kicker}
          </p>
          <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
            {aboutMap.title}
          </h2>
        </div>
        <p className="max-w-[323px] text-[15px] leading-5 font-light text-brand/50">
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
            <p className="flex items-center gap-2 text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
              <span className="size-3 rounded-full bg-brand-navy" />
              Pays visités
            </p>
            <p className="flex items-center gap-2 text-[10px] font-bold tracking-[1.7px] text-brand/50 uppercase">
              <span className="size-3 rounded-full bg-brand-sand" />
              À explorer
            </p>
          </div>

          {aboutMap.groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <p className="text-[10px] font-bold tracking-[1.7px] text-brand uppercase">
                {group.label}
              </p>
              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {group.countries.map((country) => (
                  <li
                    key={country}
                    className="flex items-center gap-1.5 rounded-full bg-brand-sand px-3 py-1.5 text-[12px] leading-[15px] font-medium text-brand"
                  >
                    <span className="size-1.5 rounded-full bg-brand-navy" />
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
