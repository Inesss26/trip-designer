import { describe, expect, it } from "vitest";

import {
  leadInputSchema,
  reviewInputSchema,
  slugify,
  toFieldErrors,
  tripInputSchema,
} from "@/lib/validation/schemas";

const validTrip = {
  slug: "japon-tokyo",
  title: "Le Japon entre Tokyo et Kyoto",
  destination: "Tokyo, Kyoto",
  country: "Japon",
  durationDays: "15",
  priceFrom: "2450",
  summary: "Un résumé suffisamment long pour passer la validation du formulaire.",
  description: "",
  coverImageUrl: "",
  gallery: "",
  tags: "",
  status: "published",
  isFeatured: "on",
  sortOrder: "2",
};

describe("tripInputSchema", () => {
  it("normalise les champs vides en null et découpe les listes", () => {
    const result = tripInputSchema.parse({
      ...validTrip,
      country: "  ",
      priceFrom: "",
      tags: "Famille, Randonnée ,, Plage",
      gallery: "https://exemple.fr/a.jpg\nhttps://exemple.fr/b.jpg",
    });

    expect(result.country).toBeNull();
    expect(result.priceFrom).toBeNull();
    expect(result.tags).toEqual(["Famille", "Randonnée", "Plage"]);
    expect(result.gallery).toEqual([
      "https://exemple.fr/a.jpg",
      "https://exemple.fr/b.jpg",
    ]);
    expect(result.isFeatured).toBe(true);
    expect(result.durationDays).toBe(15);
    expect(result.sortOrder).toBe(2);
  });

  it("accepte une virgule comme séparateur décimal du tarif", () => {
    const result = tripInputSchema.parse({ ...validTrip, priceFrom: "1990,50" });
    expect(result.priceFrom).toBe(1990.5);
  });

  it("considère l'interrupteur décoché comme faux", () => {
    const result = tripInputSchema.parse({ ...validTrip, isFeatured: "" });
    expect(result.isFeatured).toBe(false);
  });

  it("rejette un identifiant d'URL contenant majuscules ou espaces", () => {
    const result = tripInputSchema.safeParse({
      ...validTrip,
      slug: "Japon Tokyo",
    });

    expect(result.success).toBe(false);
    expect(toFieldErrors(result.error!).slug?.[0]).toContain("minuscules");
  });

  it("rejette une durée nulle ou décimale", () => {
    expect(tripInputSchema.safeParse({ ...validTrip, durationDays: "0" }).success).toBe(
      false,
    );
    expect(
      tripInputSchema.safeParse({ ...validTrip, durationDays: "2.5" }).success,
    ).toBe(false);
  });

  it("rejette une galerie contenant une ligne qui n'est pas une URL", () => {
    const result = tripInputSchema.safeParse({
      ...validTrip,
      gallery: "https://exemple.fr/a.jpg\npas-une-url",
    });

    expect(result.success).toBe(false);
  });

  it("rejette un résumé trop court", () => {
    const result = tripInputSchema.safeParse({ ...validTrip, summary: "Trop court" });
    expect(result.success).toBe(false);
  });
});

describe("leadInputSchema", () => {
  const validLead = {
    name: "Hélène Rousseau",
    email: "helene@exemple.fr",
    phone: "",
    destination: "Vietnam",
    travelPeriod: "",
    partySize: "2",
    budgetRange: "",
    message: "Nous cherchons un itinéraire du nord au sud sur trois semaines.",
  };

  it("accepte une demande complète et nettoie les champs vides", () => {
    const result = leadInputSchema.parse(validLead);

    expect(result.phone).toBeNull();
    expect(result.travelPeriod).toBeNull();
    expect(result.partySize).toBe(2);
  });

  it("rejette une adresse e-mail invalide", () => {
    const result = leadInputSchema.safeParse({ ...validLead, email: "abc" });

    expect(result.success).toBe(false);
    expect(toFieldErrors(result.error!).email?.[0]).toContain("e-mail");
  });

  it("rejette un message trop court", () => {
    const result = leadInputSchema.safeParse({ ...validLead, message: "Bonjour" });

    expect(result.success).toBe(false);
    expect(toFieldErrors(result.error!).message).toBeDefined();
  });
});

describe("reviewInputSchema", () => {
  const validReview = {
    authorName: "Sophie M.",
    authorLocation: "Lyon",
    rating: "5",
    content: "Un accompagnement précis et des adresses que nous n'aurions pas trouvées.",
    tripId: "",
    travelDate: "2026-09-03",
    status: "published",
    isFeatured: "",
    sortOrder: "0",
  };

  it("convertit la note en nombre et le voyage vide en null", () => {
    const result = reviewInputSchema.parse(validReview);

    expect(result.rating).toBe(5);
    expect(result.tripId).toBeNull();
    expect(result.travelDate).toBe("2026-09-03");
  });

  it("rejette une note hors de l'échelle 1-5", () => {
    expect(reviewInputSchema.safeParse({ ...validReview, rating: "6" }).success).toBe(
      false,
    );
    expect(reviewInputSchema.safeParse({ ...validReview, rating: "0" }).success).toBe(
      false,
    );
  });

  it("rejette une date de voyage mal formatée", () => {
    const result = reviewInputSchema.safeParse({
      ...validReview,
      travelDate: "03/09/2026",
    });

    expect(result.success).toBe(false);
  });
});

describe("slugify", () => {
  it("retire les accents, la ponctuation et les majuscules", () => {
    expect(slugify("Pérou : Cusco & la Vallée sacrée")).toBe(
      "perou-cusco-la-vallee-sacree",
    );
    expect(slugify("  Lisbonne  ")).toBe("lisbonne");
    expect(slugify("!!!")).toBe("");
  });
});

describe("toFieldErrors", () => {
  it("regroupe les messages par champ", () => {
    const result = leadInputSchema.safeParse({
      name: "A",
      email: "abc",
      phone: "",
      destination: "",
      travelPeriod: "",
      partySize: "",
      budgetRange: "",
      message: "court",
    });

    const errors = toFieldErrors(result.error!);

    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
    expect(errors.name).toHaveLength(1);
  });
});
