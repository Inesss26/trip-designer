import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

import { SiteIcon } from "@/components/site/site-icon";
import { cn } from "@/lib/utils";

const navLinkClass =
  "group inline-flex items-center gap-[10px] rounded-[10px] px-3 py-2 type-nav-cta text-brand-primary-50 transition-colors hover:font-semibold hover:text-brand-primary";

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
    active
      ? "font-semibold text-brand-primary"
      : "font-medium",
    className,
  );

  const content = (
    <>
      {children}
      {external ? (
        <SiteIcon
          src={active ? "/icons/external-hover.svg" : "/icons/external.svg"}
          hoverSrc="/icons/external-hover.svg"
          size={6}
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
