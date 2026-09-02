export const siteNav = [
  { href: "/", label: "Accueil" },
  { href: "/#formules", label: "Formules" },
  { href: "/#voyages", label: "Carnets de voyage" },
  { href: "/#a-propos", label: "À propos" },
] as const;

export const INSTAGRAM_URL = "https://www.instagram.com/my_trip_designer/";
export const LINKEDIN_URL = "https://www.linkedin.com/";

export function instagramUrl(handle?: string): string {
  if (!handle) {
    return INSTAGRAM_URL;
  }

  const slug = handle.replace(/^@/, "").trim();
  return slug ? `https://www.instagram.com/${slug}/` : INSTAGRAM_URL;
}
