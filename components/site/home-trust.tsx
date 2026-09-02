import Image from "next/image";

import { SiteIcon } from "@/components/site/site-icon";
import { homeBenefits } from "@/lib/home-content";

export function HomeTrust() {
  return (
    <section className="flex flex-col lg:flex-row lg:items-stretch">
      <div className="flex w-full flex-col justify-center px-4 py-16 sm:px-8 lg:w-[min(100%,710px)] lg:py-[100px] lg:pl-[11vw] lg:pr-12">
        <div className="flex max-w-[552px] flex-col gap-[52px]">
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-[28px] leading-9 text-brand sm:text-[32px]">
              Vous rêvez de votre prochain voyage, mais ...
            </h2>
            <p className="text-[15px] leading-5 font-light text-brand">
              Entre le{" "}
              <span className="font-semibold text-brand-teal">
                manque de temps
              </span>{" "}
              pour chercher les bonnes adresses, la peur de tomber dans les{" "}
              <span className="font-semibold text-brand-teal">
                pièges à touristes
              </span>{" "}
              et la gestion de toute la logistique, planifier votre séjour se
              transforme vite en{" "}
              <span className="font-semibold text-brand-teal">stress.</span>
            </p>
            <p className="text-[15px] leading-5 font-light text-brand">
              Vous méritez bien mieux que le stress des préparatifs pour vos
              vacances.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-heading text-[28px] leading-9 text-brand sm:text-[32px]">
              Et si vous faisiez confiance à un{" "}
              <span className="text-brand-teal">travel planner</span> ?
            </h3>
            <ul className="flex flex-col gap-5">
              {homeBenefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-5">
                  <SiteIcon src={benefit.icon} size={20} className="mt-0.5" />
                  <div className="flex flex-col gap-1 text-[15px] leading-5 text-brand">
                    <p className="font-semibold">{benefit.title}</p>
                    <p className="font-light">{benefit.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative min-h-[360px] w-full lg:min-h-[720px] lg:flex-1">
        <Image
          src="/images/home/trust.png"
          alt="Intérieur italien baigné de lumière"
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
