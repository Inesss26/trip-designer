import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const navLinkClass =
  "inline-flex items-center gap-2.5 rounded-[10px] type-button text-brand-primary-50 transition-colors hover:text-brand-primary";

export function SiteNavLink({
  href,
  children,
  active,
  className,
  external,
  ...props
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href">) {
  const classes = cn(
    navLinkClass,
    active && "text-brand-primary",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn("group", classes)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
