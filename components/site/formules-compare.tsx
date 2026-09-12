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
        featured ? (strong ? "text-text-on-dark" : "text-text-on-dark") : "text-accent-dark",
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
        <p className="type-tag text-brand/30">
          {formulesCompare.kicker}
        </p>
        <h2 className="type-h2 text-text-brand">
          {formulesCompare.title}
        </h2>
        <p className="type-body text-brand/50">
          {formulesCompare.subtitle}
        </p>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pt-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[860px] table-fixed border-separate border-spacing-0">
          <caption className="sr-only">
            Comparatif des formules Dolce Vita, La Strada et Far Niente
          </caption>
          <colgroup>
            <col />
            <col className="w-[215px]" />
            <col className="w-[215px]" />
            <col className="w-[215px]" />
          </colgroup>
          <thead>
            <tr className="align-bottom">
              <th />
              {formulesCompare.columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "relative px-5 py-5 text-center",
                    column.featured && "bg-accent-dark",
                  )}
                >
                  {column.featured ? (
                    <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-brand-primary px-3 py-1 type-tag text-text-on-dark">
                      ✦ Populaire
                    </span>
                  ) : null}
                  <p
                    className={cn(
                      "type-tag",
                      column.featured ? "text-text-on-dark" : "text-brand-secondary",
                    )}
                  >
                    {column.kicker}
                  </p>
                  <p
                    className={cn(
                      "mt-2 type-subtitle",
                      column.featured ? "text-text-on-dark" : "text-accent-dark",
                    )}
                  >
                    {column.name}
                  </p>
                  {column.subtitle ? (
                    <p className="mt-2 type-body-small text-accent-dark">
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
                  className="h-[52px] px-7 text-left type-body-small whitespace-nowrap text-accent-dark"
                >
                  {feature}
                </th>
                {formulesCompare.columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      "h-[52px] px-5 text-center",
                      column.featured && "bg-accent-dark",
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
                className="bg-bg-muted px-7 py-5 text-left type-tag text-accent-dark"
              >
                Tarif
              </th>
              {formulesCompare.columns.map((column) => (
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
                  <p
                    className={cn(
                      "type-tag",
                      column.featured ? "text-text-on-dark" : "text-accent-dark",
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

      <p className="mx-auto max-w-[672px] text-center type-body-small text-brand/30">
        {formulesDisclaimer}
      </p>
    </section>
  );
}
