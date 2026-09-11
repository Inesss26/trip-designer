"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { SiteIcon } from "@/components/site/site-icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { instagramUrl, isNavActive, siteNav } from "@/lib/site";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  label,
  active,
  className,
}: {
  href: string;
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-3 text-[12px] font-medium tracking-[0.72px] uppercase transition-opacity hover:opacity-70",
        active ? "text-brand" : "text-brand/50",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader({ instagram }: { instagram?: string }) {
  const pathname = usePathname();

  return (
    <header className="relative z-20 bg-brand-cream">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-5 sm:px-8 lg:px-11">
        <Link
          href="/"
          className="font-logo text-[22px] leading-none text-brand sm:text-[24px]"
        >
          MY TRIP DESIGNER
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-10 lg:flex"
        >
          <div className="flex items-center gap-2">
            {siteNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={isNavActive(pathname, item.href)}
              />
            ))}
          </div>
          <div className="h-8 w-px bg-brand/30" />
          <a
            href={instagramUrl(instagram)}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <SiteIcon src="/icons/instagram.svg" size={20} />
          </a>
          <Button
            asChild
            variant="brandGhost"
            size="cta"
            className="h-auto w-auto px-2 py-3"
          >
            <Link href="/contact">
              Appel découverte
              <SiteIcon src="/icons/arrow-cta.svg" size={8} />
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            asChild
            variant="brandGhost"
            size="cta"
            className="h-auto w-auto px-2 py-3 text-[10px]"
          >
            <Link href="/contact">
              Appel
              <SiteIcon src="/icons/arrow-cta.svg" size={8} />
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-brand"
                aria-label="Ouvrir le menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-brand-cream font-site text-brand"
            >
              <SheetHeader>
                <SheetTitle className="font-logo text-left text-xl text-brand">
                  MY TRIP DESIGNER
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {siteNav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <NavLink
                      href={item.href}
                      label={item.label}
                      active={isNavActive(pathname, item.href)}
                    />
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="mt-4 px-3 py-3 text-[12px] font-bold tracking-[2px] uppercase"
                  >
                    Appel découverte
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
