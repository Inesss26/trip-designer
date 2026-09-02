import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * `<select>` natif aux styles alignés sur les champs shadcn/ui.
 *
 * Le composant Select de shadcn/ui repose sur Radix et n'envoie pas de valeur
 * dans `FormData` sans état contrôlé : dans un formulaire piloté par Server
 * Action, le select natif est plus simple et fonctionne sans JavaScript.
 */
export function NativeSelect({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
