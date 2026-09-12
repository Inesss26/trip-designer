import type { ComponentProps } from "react";
import Link from "next/link";

import { SiteIcon } from "@/components/site/site-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DiscoveryCta({
  href = "/contact",
  label = "Appel découverte",
  className,
  ...props
}: {
  href?: string;
  label?: string;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "brandGhost", size: "cta" }),
        "h-auto w-auto gap-4 px-3 py-3",
        className,
      )}
      {...props}
    >
      {label}
      <SiteIcon
        src="/icons/arrow-cta.svg"
        hoverSrc="/icons/arrow-cta-hover.svg"
        size={8}
        className="-translate-x-1.5 transition-transform duration-200 group-hover:translate-x-0"
      />
    </Link>
  );
}
