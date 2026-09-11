import Link from "next/link";

import { SiteIcon } from "@/components/site/site-icon";
import { Button } from "@/components/ui/button";
import type { SiteContentMap } from "@/lib/data/types";
import { instagramUrl, LINKEDIN_URL, siteNav } from "@/lib/site";

export function SiteFooter({ content }: { content: SiteContentMap }) {
  const instagram = instagramUrl(content["site.instagram"]);

  return (
    <footer className="mt-auto border-t border-brand-rose bg-brand-cream">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-8 pb-0 sm:px-8 lg:px-11">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <SiteIcon src="/images/home/logo.png" size={40} alt="" />
            <span>
              <span className="block font-logo text-[20px] leading-none text-brand">
                MY TRIP DESIGNER
              </span>
              <span className="mt-1 block text-[12px] font-light leading-[15px] text-brand/50">
                Créatrice de souvenirs
              </span>
            </span>
          </Link>

          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5 lg:max-w-[666px]">
            <nav aria-label="Pied de page">
              <ul className="flex flex-col gap-1">
                {siteNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block px-3 py-2 text-[12px] font-medium tracking-[0.72px] text-brand/50 uppercase transition-opacity hover:opacity-70"
                    >
                      {item.label === "Formules"
                        ? "Formules & Services"
                        : item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Contact et réseaux">
              <ul className="flex flex-col gap-1">
                <li>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-[12px] font-medium tracking-[0.72px] text-brand/50 uppercase transition-opacity hover:opacity-70"
                  >
                    Instagram
                    <SiteIcon src="/icons/external.svg" size={6} />
                  </a>
                </li>
                <li>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-[12px] font-medium tracking-[0.72px] text-brand/50 uppercase transition-opacity hover:opacity-70"
                  >
                    LinkedIn
                    <SiteIcon src="/icons/external.svg" size={6} />
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-block px-3 py-2 text-[12px] font-medium tracking-[0.72px] text-brand/50 uppercase transition-opacity hover:opacity-70"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formules#faq"
                    className="inline-block px-3 py-2 text-[12px] font-medium tracking-[0.72px] text-brand/50 uppercase transition-opacity hover:opacity-70"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-start">
              <Button
                asChild
                variant="brandGhost"
                size="cta"
                className="h-auto w-auto px-2 py-2"
              >
                <Link href="/contact">
                  Appel découverte
                  <SiteIcon src="/icons/arrow-cta.svg" size={8} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-brand">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-4 text-[10px] tracking-[0.6px] text-brand-cream uppercase sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-11">
          <p>© 2026 My Trip Designer - Agathe Virzi - Tous droits réservés</p>
          <p>Site conçu par inès mathorel</p>
          <p className="flex flex-wrap items-center gap-2">
            <Link href="/admin" className="hover:opacity-70">
              Administration
            </Link>
            <SiteIcon src="/icons/diamond-light.svg" size={7} />
            <span>Mentions légales</span>
            <SiteIcon src="/icons/diamond-light.svg" size={7} />
            <span>Politique de confidentialité</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
