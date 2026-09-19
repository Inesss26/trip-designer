import type { ComponentProps } from "react";

import { ZCAL_DISCOVERY_URL } from "@/lib/site";

export function ZcalLink({
  href = ZCAL_DISCOVERY_URL,
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
