import { SiteIcon } from "@/components/site/site-icon";
import { Button } from "@/components/ui/button";
import { INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/site";

export function SocialFollowCtas() {
  return (
    <div className="flex w-fit flex-col items-stretch gap-4 self-start">
      <Button asChild variant="primary" size="cta">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group gap-2.5"
        >
          <SiteIcon
            src="/icons/instagram-on-dark.svg"
            hoverSrc="/icons/instagram-brand.svg"
            size={16}
          />
          Suivre sur Instagram
        </a>
      </Button>
      <Button asChild variant="tertiary" size="cta" className="bg-white">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group gap-2.5"
        >
          <SiteIcon
            src="/icons/linkedin.svg"
            hoverSrc="/icons/linkedin-on-dark.svg"
            size={16}
          />
          retrouvez moi sur linkedin
        </a>
      </Button>
    </div>
  );
}
