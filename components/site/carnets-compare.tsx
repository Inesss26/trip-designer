import { SiteIcon } from "@/components/site/site-icon";
import { carnetsCompare } from "@/lib/carnets-content";
import { cn } from "@/lib/utils";

const compareRowStyle = {
  gridTemplateColumns:
    "minmax(0, 1.35fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
  columnGap: "16px",
} as const;

const extraFeature = "Programme détaillé jour par jour";
const itineraryNote = "La Strada uniquement";

const features = [
  carnetsCompare.features[0],
  carnetsCompare.features[1],
  carnetsCompare.features[2],
  carnetsCompare.features[3],
  extraFeature,
  carnetsCompare.features[4],
];

type CompareColumn = (typeof carnetsCompare.columns)[number];
type CompareCell =
  | CompareColumn["cells"][number]
  | { type: "text"; value: string };

function cellFor(column: CompareColumn, featureIndex: number): CompareCell {
  if (featureIndex === 4) {
    return column.featured ? { type: "check" } : { type: "dash" };
  }

  const sourceIndex = featureIndex > 4 ? 4 : featureIndex;

  if (column.id === "sur-mesure" && featureIndex === 3) {
    return { type: "text", value: itineraryNote };
  }

  return column.cells[sourceIndex];
}

function CompareCellView({
  cell,
  featured,
}: {
  cell: CompareCell;
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

  if (cell.type === "text") {
    return (
      <span
        className={cn(
          "type-body",
          featured ? "text-bg-main" : "text-accent-dark",
        )}
      >
        {cell.value}
      </span>
    );
  }

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

export function CarnetsCompare() {
  return (
    <section className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-8 px-4 sm:px-8 lg:px-11">
      <div className="flex flex-col gap-2">
        <p className="type-tag text-brand/30">{carnetsCompare.kicker}</p>
        <h2 className="type-h2 text-text-brand">{carnetsCompare.title}</h2>
        <p className="type-body text-brand/50">{carnetsCompare.subtitle}</p>
      </div>

      <div className="min-w-0 w-full overflow-x-auto pt-3">
        <div
          role="table"
          aria-label="Comparatif du carnet prêt à l'emploi, du carnet sur-mesure et du carnet premium"
          className="flex w-full min-w-[36rem] flex-col sm:min-w-0"
        >
          <div
            role="row"
            className="grid items-end"
            style={compareRowStyle}
          >
            <div role="columnheader" className="min-w-0" />
            {carnetsCompare.columns.map((column) => (
              <div
                key={column.id}
                role="columnheader"
                className={cn(
                  "relative flex min-w-0 flex-col items-center justify-center px-3 py-5 text-center sm:px-5",
                  column.kicker && "gap-2",
                  column.featured && "bg-accent-dark",
                )}
              >
                {column.featured ? (
                  <span className="absolute top-[-10px] left-1/2 z-10 flex w-max -translate-x-1/2 flex-nowrap items-center gap-1 whitespace-nowrap bg-brand-primary px-3 py-1 type-tag text-text-on-dark">
                    <span aria-hidden="true">✦</span>
                    Populaire
                  </span>
                ) : null}
                {column.kicker ? (
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
                ) : null}
                <p
                  className={cn(
                    "type-subtitle",
                    column.featured ? "text-text-on-dark" : "text-accent-dark",
                  )}
                >
                  {column.name}
                </p>
              </div>
            ))}
          </div>

          {features.map((feature, index) => (
            <div
              key={feature}
              role="row"
              className="grid"
              style={compareRowStyle}
            >
              <div
                role="rowheader"
                className="flex min-h-14 min-w-0 items-center px-4 py-2 text-left type-body-small text-brand/50 sm:px-7"
              >
                {feature}
              </div>
              {carnetsCompare.columns.map((column) => (
                <div
                  key={column.id}
                  role="cell"
                  className={cn(
                    "flex h-14 min-w-0 items-center justify-center px-3 text-center sm:px-5",
                    column.featured && "bg-accent-dark",
                  )}
                >
                  <CompareCellView
                    cell={cellFor(column, index)}
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
                className="flex h-[70px] min-w-0 items-center px-4 py-5 text-left type-tag text-accent-dark sm:px-7"
              >
                Tarif
              </div>
              {carnetsCompare.columns.map((column) => (
                <div
                  key={column.id}
                  role="cell"
                  className={cn(
                    "flex h-[70px] min-w-0 items-center justify-center px-3 py-5 text-center sm:px-5",
                    column.featured &&
                      "bg-[color-mix(in_srgb,var(--color-accent-dark)_78%,black)]",
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
