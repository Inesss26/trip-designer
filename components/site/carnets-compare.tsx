import { SiteIcon } from "@/components/site/site-icon";
import { carnetsCompare } from "@/lib/carnets-content";
import { cn } from "@/lib/utils";

export function CarnetsCompare() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 sm:px-8 lg:px-11">
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-bold tracking-[1.7px] text-brand/30 uppercase">
          {carnetsCompare.kicker}
        </p>
        <h2 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.84px] text-brand sm:text-[42px] sm:leading-[48px]">
          {carnetsCompare.title}
        </h2>
        <p className="text-[15px] leading-5 font-light text-brand/50">
          {carnetsCompare.subtitle}
        </p>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pt-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[860px] border-separate border-spacing-x-5 border-spacing-y-0">
          <caption className="sr-only">
            Comparatif du carnet prêt à l&apos;emploi, du carnet sur-mesure et du
            carnet premium
          </caption>
          <thead>
            <tr className="align-bottom">
              <th className="w-[min(100%,387px)]" />
              {carnetsCompare.columns.map((column) => (
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
                  {column.kicker ? (
                    <p
                      className={cn(
                        "text-[10px] font-bold tracking-[1.7px] uppercase",
                        column.featured ? "text-white" : "text-brand-teal",
                      )}
                    >
                      {column.kicker}
                    </p>
                  ) : null}
                  <p
                    className={cn(
                      "font-heading text-[24px] leading-[30px] font-bold",
                      column.kicker && "mt-2",
                      column.featured ? "text-white" : "text-brand-navy",
                    )}
                  >
                    {column.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {carnetsCompare.features.map((feature, index) => (
              <tr key={feature}>
                <th
                  scope="row"
                  className="h-14 px-7 text-left text-[12px] leading-[15px] font-medium whitespace-nowrap text-brand/50"
                >
                  {feature}
                </th>
                {carnetsCompare.columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      "h-14 px-5 text-center",
                      column.featured && "bg-brand-navy",
                    )}
                  >
                    <span className="flex items-center justify-center">
                      {column.cells[index].type === "check" ? (
                        <SiteIcon
                          src={
                            column.featured
                              ? "/icons/diamond-light.svg"
                              : "/icons/diamond.svg"
                          }
                          size={10}
                        />
                      ) : (
                        <span
                          className={cn(
                            "text-[16px] font-light tracking-[-0.3px]",
                            column.featured ? "text-brand-sand" : "text-brand/30",
                          )}
                        >
                          —
                        </span>
                      )}
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
              {carnetsCompare.columns.map((column) => (
                <td
                  key={column.id}
                  className={cn(
                    "px-5 py-5 text-center",
                    column.featured ? "bg-brand-navy" : "bg-brand-sand",
                  )}
                >
                  <p
                    className={cn(
                      "font-heading leading-[30px] font-bold",
                      column.id === "sur-mesure" ? "text-[16px]" : "text-[20px]",
                      column.featured ? "text-white" : "text-brand-navy",
                    )}
                  >
                    {column.price}
                  </p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
