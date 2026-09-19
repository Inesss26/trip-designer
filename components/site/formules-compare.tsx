import { SiteIcon } from "@/components/site/site-icon";
import { formulesCompare, formulesDisclaimer } from "@/lib/formules-content";
import { cn } from "@/lib/utils";

const compareRowStyle = {
  gridTemplateColumns: "minmax(12rem, 1fr) 215px 215px 215px",
  columnGap: "20px",
} as const;

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
          "type-body",
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
        strong ? "type-body-strong" : "type-body",
        featured
          ? strong
            ? "text-text-on-dark"
            : "text-bg-main"
          : "text-accent-dark",
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
        <p className="type-tag text-brand/30">{formulesCompare.kicker}</p>
        <h2 className="type-h2 text-text-brand">{formulesCompare.title}</h2>
        <p className="type-body text-brand/50">{formulesCompare.subtitle}</p>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pt-4 sm:mx-0 sm:px-0">
        <div
          role="table"
          aria-label="Comparatif des formules Dolce Vita, La Strada et Far Niente"
          className="flex w-full min-w-[900px] flex-col"
        >
          <div role="row" className="grid items-stretch" style={compareRowStyle}>
            <div role="columnheader" />
            {formulesCompare.columns.map((column) => (
              <div
                key={column.id}
                role="columnheader"
                className={cn(
                  "relative flex flex-col items-center justify-start gap-2 px-5 py-5 text-center",
                  column.featured && "bg-accent-dark",
                )}
              >
                {column.featured ? (
                  <span className="absolute top-[-10px] left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap bg-brand-primary px-3 py-1 type-tag text-text-on-dark">
                    ✦ Populaire
                  </span>
                ) : null}
                <p
                  className={cn(
                    "type-tag",
                    column.featured
                      ? "text-text-on-dark"
                      : "text-brand-secondary",
                  )}
                >
                  {column.kicker}
                </p>
                <p
                  className={cn(
                    "type-subtitle",
                    column.featured ? "text-text-on-dark" : "text-accent-dark",
                  )}
                >
                  {column.name}
                </p>
                {column.subtitle ? (
                  <p className="type-body-small text-accent-dark">
                    {column.subtitle}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          {formulesCompare.features.map((feature, index) => (
            <div
              key={feature}
              role="row"
              className="grid"
              style={compareRowStyle}
            >
              <div
                role="rowheader"
                className="flex h-[52px] items-center px-7 text-left type-body-small whitespace-nowrap text-accent-dark"
              >
                {feature}
              </div>
              {formulesCompare.columns.map((column) => (
                <div
                  key={column.id}
                  role="cell"
                  className={cn(
                    "flex h-[52px] items-center justify-center px-5 text-center",
                    column.featured && "bg-accent-dark",
                  )}
                >
                  <CompareCell
                    cell={column.cells[index]}
                    featured={column.featured}
                  />
                </div>
              ))}
            </div>
          ))}

          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 bg-bg-muted" />
            <div role="row" className="relative grid" style={compareRowStyle}>
              <div
                role="rowheader"
                className="flex min-h-[89px] items-center px-7 text-left type-tag text-accent-dark"
              >
                Tarif
              </div>
              {formulesCompare.columns.map((column) => (
                <div
                  key={column.id}
                  role="cell"
                  className={cn(
                    "flex min-h-[89px] flex-col items-center justify-center gap-1 px-5 py-5 text-center",
                    column.featured && "bg-accent-dark",
                  )}
                >
                  <p
                    className={cn(
                      "font-heading text-[20px] leading-[30px] font-bold",
                      column.featured ? "text-text-on-dark" : "text-accent-dark",
                    )}
                  >
                    {column.price}
                  </p>
                  <p
                    className={cn(
                      "font-body text-[10px] leading-[15px] font-medium",
                      column.featured ? "text-text-on-dark" : "text-accent-dark",
                    )}
                  >
                    {column.priceCaption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto max-w-[672px] text-center type-body-small text-brand/30">
        {formulesDisclaimer}
      </p>
    </section>
  );
}
