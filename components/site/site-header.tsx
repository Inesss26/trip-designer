"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { DiscoveryCta } from "@/components/site/discovery-cta";
import { SiteIcon } from "@/components/site/site-icon";
import { SiteNavLink } from "@/components/site/site-nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { INSTAGRAM_URL, isNavActive, siteNav } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-main">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 sm:px-8 lg:px-11">
        <Link
          href="/"
          className="type-logo shrink-0 whitespace-nowrap text-brand-primary"
        >
          MY TRIP DESIGNER
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden shrink-0 items-stretch gap-10 lg:flex"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-stretch justify-center gap-2">
              {siteNav.map((item) => (
                <SiteNavLink
                  key={item.href}
                  href={item.href}
                  active={isNavActive(pathname, item.href)}
                  className="flex self-stretch items-center justify-center whitespace-nowrap text-center"
                >
                  {item.label}
                </SiteNavLink>
              ))}
            </div>
            <div className="w-px self-stretch bg-brand-primary-30" />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group inline-flex items-center"
            >
              <SiteIcon
                src="/icons/instagram.svg"
                hoverSrc="/icons/instagram-hover.svg"
                size={20}
              />
            </a>
          </div>
          <DiscoveryCta className="py-2" />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <DiscoveryCta label="Appel" className="py-2" />
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function MenuTrigger() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-brand-primary"
      aria-label="Ouvrir le menu"
    >
      <Menu />
    </Button>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <MenuTrigger />;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuTrigger />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-bg-main font-body text-brand-primary"
      >
        <SheetHeader>
          <SheetTitle className="type-subtitle text-left text-brand-primary">
            MY TRIP DESIGNER
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {siteNav.map((item) => (
            <SheetClose asChild key={item.href}>
              <SiteNavLink
                href={item.href}
                active={isNavActive(pathname, item.href)}
              >
                {item.label}
              </SiteNavLink>
            </SheetClose>
          ))}
          <div className="mt-4">
            <SheetClose asChild>
              <DiscoveryCta />
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
