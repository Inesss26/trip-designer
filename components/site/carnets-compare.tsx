import { SiteIcon } from "@/components/site/site-icon";
import { carnetsCompare } from "@/lib/carnets-content";
import { cn } from "@/lib/utils";

const compareRowStyle = {
  gridTemplateColumns: "minmax(12rem, 1fr) 16rem 16rem 16rem",
} as const;

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
        <div
          role="table"
          aria-label="Comparatif du carnet prêt à l'emploi, du carnet sur-mesure et du carnet premium"
          className="flex w-full min-w-[860px] flex-col"
        >
          <div role="row" className="grid gap-x-2" style={compareRowStyle}>
            <div role="columnheader" className="self-end" />
            {carnetsCompare.columns.map((column) => (
              <div
                key={column.id}
                role="columnheader"
                className={cn(
                  "relative px-3 py-5 text-center",
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
              </div>
            ))}
          </div>
          {carnetsCompare.features.map((feature, index) => (
            <div
              key={feature}
              role="row"
              className="grid gap-x-2"
              style={compareRowStyle}
            >
              <div
                role="rowheader"
                className="flex h-14 items-center px-7 text-left type-body-small whitespace-nowrap text-brand/50"
              >
                {feature}
              </div>
              {carnetsCompare.columns.map((column) => (
                <div
                  key={column.id}
                  role="cell"
                  className={cn(
                    "flex h-14 items-center justify-center px-3 text-center",
                    column.featured && "bg-accent-dark",
                  )}
                >
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
                </div>
              ))}
            </div>
          ))}
          <div role="row" className="grid gap-x-2" style={compareRowStyle}>
            <div
              role="rowheader"
              className="bg-bg-muted px-7 py-5 text-left type-tag text-accent-dark"
            >
              Tarif
            </div>
            {carnetsCompare.columns.map((column) => (
              <div
                key={column.id}
                role="cell"
                className={cn(
                  "px-3 py-5 text-center",
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
