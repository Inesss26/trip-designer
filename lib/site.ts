export const siteNav = [
  { href: "/", label: "Accueil" },
  { href: "/formules", label: "Formules" },
  { href: "/carnets", label: "Carnets de voyage" },
  { href: "/a-propos", label: "À propos" },
] as const;

export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
export const CONTACT_EMAIL = "contact@mytripdesigner.fr";

export function discoveryCallHref(): string {
  return CALENDLY_URL || "/contact#formulaire";
}

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  const path = href.split("#")[0];
  if (!path || path === "/") {
    return false;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

export const INSTAGRAM_URL = "https://www.instagram.com/my_trip_designer/";
export const LINKEDIN_URL = "https://www.linkedin.com/";

export function instagramUrl(handle?: string): string {
  if (!handle) {
    return INSTAGRAM_URL;
  }

  const slug = handle.replace(/^@/, "").trim();
  return slug ? `https://www.instagram.com/${slug}/` : INSTAGRAM_URL;
}
