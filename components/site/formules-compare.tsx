import { SiteIcon } from "@/components/site/site-icon";
import { formulesCompare, formulesDisclaimer } from "@/lib/formules-content";
import { cn } from "@/lib/utils";

function CompareCell({
  cell,
  featured,
}: {
  cell: (typeof formulesCompare.columns)[number]["cells"][number];
  featured: boolean;
}) {
  if (cell.type === "check") {
    return (
      <SiteIcon
        src={featured ? "/icons/diamond-light.svg" : "/icons/diamond.svg"}
        size={10}
      />
    );
  }

  if (cell.type === "dash") {
    return (
      <span
        className={cn(
          "text-[16px] font-light tracking-[-0.3px]",
          featured ? "text-brand-sand" : "text-brand/30",
        )}
      >
        —
      </span>
    );
  }

  const strong = "strong" in cell && cell.strong;

  return (
    <span
      className={cn(
        "text-center text-[15px] leading-5",
        strong ? "font-semibold" : "font-light",
        featured ? (strong ? "text-white" : "text-brand-cream") : "text-brand-navy",
      )}
    >
      {cell.value}
    </span>
  );
}

export function FormulesCompare() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 sm:px-8 lg:px-11">
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
          {formulesCompare.kicker}
        </p>
        <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
          {formulesCompare.title}
        </h2>
        <p className="text-[15px] leading-5 font-light text-brand/50">
          {formulesCompare.subtitle}
        </p>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pt-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[860px] border-separate border-spacing-x-5 border-spacing-y-0">
          <caption className="sr-only">
            Comparatif des formules Dolce Vita, La Strada et Far Niente
          </caption>
          <thead>
            <tr className="align-bottom">
              <th className="w-[min(100%,387px)]" />
              {formulesCompare.columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "relative w-[215px] px-5 py-5 text-center",
                    column.featured && "bg-brand-navy",
                  )}
                >
                  {column.featured ? (
                    <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-brand px-3 py-1 text-[7px] font-bold tracking-[1.4px] text-white uppercase">
                      ✦ Populaire
                    </span>
                  ) : null}
                  <p
                    className={cn(
                      "text-[10px] font-bold tracking-[1.7px] uppercase",
                      column.featured ? "text-white" : "text-brand-teal",
                    )}
                  >
                    {column.kicker}
                  </p>
                  <p
                    className={cn(
                      "mt-2 font-heading text-[24px] leading-[30px] font-bold",
                      column.featured ? "text-white" : "text-brand-navy",
                    )}
                  >
                    {column.name}
                  </p>
                  {column.subtitle ? (
                    <p className="mt-2 text-[12px] leading-[15px] font-medium text-brand-navy">
                      {column.subtitle}
                    </p>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formulesCompare.features.map((feature, index) => (
              <tr key={feature}>
                <th
                  scope="row"
                  className="h-[52px] px-7 text-left text-[12px] leading-[15px] font-medium whitespace-nowrap text-brand-navy"
                >
                  {feature}
                </th>
                {formulesCompare.columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      "h-[52px] px-5 text-center",
                      column.featured && "bg-brand-navy",
                    )}
                  >
                    <span className="flex items-center justify-center">
                      <CompareCell
                        cell={column.cells[index]}
                        featured={column.featured}
                      />
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th
                scope="row"
                className="bg-brand-sand px-7 py-5 text-left text-[10px] font-bold tracking-[1.7px] text-brand-navy uppercase"
              >
                Tarif
              </th>
              {formulesCompare.columns.map((column) => (
                <td
                  key={column.id}
                  className={cn(
                    "px-5 py-5 text-center",
                    column.featured ? "bg-brand-navy" : "bg-brand-sand",
                  )}
                >
                  <p
                    className={cn(
                      "font-heading text-[20px] leading-[30px] font-bold",
                      column.featured ? "text-white" : "text-brand-navy",
                    )}
                  >
                    {column.price}
                  </p>
                  <p
                    className={cn(
                      "text-[10px] leading-[15px] font-medium",
                      column.featured ? "text-white" : "text-brand-navy",
                    )}
                  >
                    {column.priceCaption}
                  </p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mx-auto max-w-[672px] text-center text-[12px] leading-[15px] font-medium text-brand/30">
        {formulesDisclaimer}
      </p>
    </section>
  );
}
