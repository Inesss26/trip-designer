import Image from "next/image";

import { SocialFollowCtas } from "@/components/site/social-follow-ctas";
import { aboutSocial } from "@/lib/about-content";
import { INSTAGRAM_URL } from "@/lib/site";

export function AboutSocial() {
  return (
    <section className="bg-bg-muted px-4 py-16 sm:px-8 sm:py-24 lg:px-11">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex max-w-[436px] flex-col gap-5">
            <p className="type-tag text-brand/30">
              {aboutSocial.kicker}
            </p>
            <h2 className="type-h2 text-text-brand">
              {aboutSocial.title}
              <br />
              <span className="type-h2-italic text-brand-secondary">
                {aboutSocial.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-[437px] type-body text-brand">
            {aboutSocial.text}
          </p>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir le compte Instagram My Trip Designer"
          className="mx-auto block w-full"
        >
          <Image
            src="/images/about/ig-feed.png"
            alt="Publications Instagram My Trip Designer"
            width={2156}
            height={716}
            quality={100}
            unoptimized
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="h-auto w-full object-contain"
          />
        </a>

        <SocialFollowCtas />
      </div>
    </section>
  );
}
