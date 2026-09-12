import Link from "next/link";

import { DiscoveryCta } from "@/components/site/discovery-cta";
import { SiteIcon } from "@/components/site/site-icon";
import { SiteNavLink } from "@/components/site/site-nav-link";
import type { SiteContentMap } from "@/lib/data/types";
import { instagramUrl, LINKEDIN_URL, siteNav } from "@/lib/site";

export function SiteFooter({ content }: { content: SiteContentMap }) {
  const instagram = instagramUrl(content["site.instagram"]);

  return (
    <footer className="mt-auto border-t border-bg-pink bg-bg-main">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-[33px] pb-0 sm:px-8 lg:px-11">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <SiteIcon src="/images/home/logo.png" size={40} alt="" />
            <span>
              <span className="block type-subtitle leading-none text-brand-primary">
                MY TRIP DESIGNER
              </span>
              <span className="mt-1 block type-body-small text-brand-primary-50">
                Créatrice de souvenirs
              </span>
            </span>
          </Link>

          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5 lg:max-w-[666px]">
            <nav aria-label="Pied de page">
              <ul className="flex flex-col gap-2">
                {siteNav.map((item) => (
                  <li key={item.href}>
                    <SiteNavLink href={item.href} className="px-3 py-2">
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
                  <SiteNavLink href={instagram} external className="px-3 py-2">
                    Instagram
                    <SiteIcon
                      src="/icons/external.svg"
                      hoverSrc="/icons/external-hover.svg"
                      size={6}
                    />
                  </SiteNavLink>
                </li>
                <li>
                  <SiteNavLink href={LINKEDIN_URL} external className="px-3 py-2">
                    LinkedIn
                    <SiteIcon
                      src="/icons/external.svg"
                      hoverSrc="/icons/external-hover.svg"
                      size={6}
                    />
                  </SiteNavLink>
                </li>
                <li>
                  <SiteNavLink href="/contact" className="px-3 py-2">
                    Contact
                  </SiteNavLink>
                </li>
                <li>
                  <SiteNavLink href="/formules#faq" className="px-3 py-2">
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
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-4 type-tag text-bg-main sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-11">
          <p>© 2026 My Trip Designer - Agathe Virzi - Tous droits réservés</p>
          <p>Site conçu par inès mathorel</p>
          <p className="flex flex-wrap items-center gap-2">
            <Link href="/admin" className="hover:opacity-70">
              Administration
            </Link>
            <SiteIcon src="/icons/diamond-light.svg" width={6.912} height={6.912} />
            <span>Mentions légales</span>
            <SiteIcon src="/icons/diamond-light.svg" width={6.912} height={6.912} />
            <span>Politique de confidentialité</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
