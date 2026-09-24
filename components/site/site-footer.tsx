import Image from "next/image";
import Link from "next/link";

import { DiscoveryCta } from "@/components/site/discovery-cta";
import { SiteIcon } from "@/components/site/site-icon";
import { SiteNavLink } from "@/components/site/site-nav-link";
import type { SiteContentMap } from "@/lib/data/types";
import { INSTAGRAM_URL, LINKEDIN_URL, siteNav } from "@/lib/site";

export function SiteFooter(_props: { content: SiteContentMap }) {

  return (
    <footer className="mt-auto border-t border-bg-pink bg-bg-main">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pb-0 pt-24 sm:px-8 lg:px-11">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Link href="/" className="inline-flex shrink-0 items-center gap-2">
            <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/home/logo.png"
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col items-start justify-center">
              <span className="type-logo whitespace-nowrap text-[16px] text-brand-primary">
                MY TRIP DESIGNER
              </span>
              <span className="font-body whitespace-nowrap text-[12px] font-light leading-[15px] text-brand-primary-50">
                Créatrice de souvenirs
              </span>
            </span>
          </Link>

          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5 lg:max-w-[666px]">
            <nav aria-label="Pied de page">
              <ul className="flex flex-col gap-2">
                {siteNav.map((item) => (
                  <li key={item.href}>
                    <SiteNavLink href={item.href}>
                      {item.label === "Formules"
                        ? "Formules & Services"
                        : item.label}
                    </SiteNavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Contact et réseaux">
              <ul className="flex flex-col gap-2">
                <li>
                  <SiteNavLink href={INSTAGRAM_URL} external>
                    Instagram
                  </SiteNavLink>
                </li>
                <li>
                  <SiteNavLink href={LINKEDIN_URL} external>
                    LinkedIn
                  </SiteNavLink>
                </li>
                <li>
                  <SiteNavLink href="/contact">
                    Contact
                  </SiteNavLink>
                </li>
                <li>
                  <SiteNavLink href="/formules#faq">
                    FAQ
                  </SiteNavLink>
                </li>
              </ul>
            </nav>

            <div className="flex items-start">
              <DiscoveryCta className="p-2 hover:p-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-brand-primary">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-4 font-body text-[10px] font-normal uppercase tracking-[0.12em] text-bg-main sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-11">
          <p>© 2026 My Trip Designer - Agathe Virzi - Tous droits réservés</p>
          <p>Site conçu par inès mathorel</p>
          <p className="flex flex-wrap items-center justify-end gap-2 text-right">
            <span>Mentions légales</span>
            <SiteIcon src="/icons/diamond-light.svg" width={6.912} height={6.912} />
            <span>Politique de confidentialité</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
