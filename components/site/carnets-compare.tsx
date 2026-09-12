import { SiteIcon } from "@/components/site/site-icon";
import { carnetsCompare } from "@/lib/carnets-content";
import { cn } from "@/lib/utils";

export function CarnetsCompare() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 sm:px-8 lg:px-11">
      <div className="flex flex-col gap-2">
        <p className="type-tag text-brand/30">
          {carnetsCompare.kicker}
        </p>
        <h2 className="type-h2 text-text-brand">
          {carnetsCompare.title}
        </h2>
        <p className="type-body text-brand/50">
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
                    column.featured && "bg-accent-dark",
                  )}
                >
                  {column.featured ? (
                    <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-brand-primary px-3 py-1 type-tag text-text-on-dark">
                      ✦ Populaire
                    </span>
                  ) : null}
                  {column.kicker ? (
                    <p
                      className={cn(
                        "type-tag",
                        column.featured ? "text-text-on-dark" : "text-brand-secondary",
                      )}
                    >
                      {column.kicker}
                    </p>
                  ) : null}
                  <p
                    className={cn(
                      "type-subtitle",
                      column.kicker && "mt-2",
                      column.featured ? "text-text-on-dark" : "text-accent-dark",
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
                  className="h-14 px-7 text-left type-body-small whitespace-nowrap text-brand/50"
                >
                  {feature}
                </th>
                {carnetsCompare.columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      "h-14 px-5 text-center",
                      column.featured && "bg-accent-dark",
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
                            "type-body",
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
                className="bg-bg-muted px-7 py-5 text-left type-tag text-accent-dark"
              >
                Tarif
              </th>
              {carnetsCompare.columns.map((column) => (
                <td
                  key={column.id}
                  className={cn(
                    "px-5 py-5 text-center",
                    column.featured ? "bg-accent-dark" : "bg-bg-muted",
                  )}
                >
                  <p
                    className={cn(
                      "type-subtitle",
                      column.featured ? "text-text-on-dark" : "text-accent-dark",
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
