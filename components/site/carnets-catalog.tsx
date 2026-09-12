"use client";

import { useMemo, useState } from "react";

import { CarnetCard } from "@/components/site/carnet-card";
import {
  carnetFilters,
  carnets,
  countCarnets,
  filterCarnets,
  type CarnetFilterId,
} from "@/lib/carnets-content";
import { cn } from "@/lib/utils";

export function CarnetsCatalog() {
  const [filter, setFilter] = useState<CarnetFilterId>("tous");
  const visible = useMemo(() => filterCarnets(carnets, filter), [filter]);

  return (
    <div className="flex w-full flex-col gap-8">
      <div
        role="tablist"
        aria-label="Filtrer les carnets"
        className="flex overflow-x-auto"
      >
        {carnetFilters.map((item) => {
          const active = filter === item.id;
          const count = countCarnets(item.id);

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item.id)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 px-6 py-4 type-tag",
                active
                  ? "border-b-2 border-brand text-brand"
                  : "text-brand/50 hover:text-brand",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 type-tag",
                  active
                    ? "bg-brand-secondary text-text-on-dark"
                    : "bg-bg-muted text-brand/30",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-px bg-brand/30 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((carnet) => (
          <CarnetCard key={carnet.slug} carnet={carnet} />
        ))}
      </div>
    </div>
  );
}
