import { describe, expect, it } from "vitest";

import { carnets, countCarnets } from "@/lib/carnets-content";

describe("catalogue des carnets", () => {
  it("ne conserve que Barcelone, Florence, Londres et Palerme", () => {
    expect(carnets.map((carnet) => carnet.slug)).toEqual([
      "barcelone",
      "florence",
      "londres",
      "palerme",
    ]);
  });

  it("affiche les compteurs de filtres demandés", () => {
    expect(countCarnets("tous")).toBe(4);
    expect(countCarnets("italie")).toBe(2);
    expect(countCarnets("europe")).toBe(4);
    expect(countCarnets("monde")).toBe(0);
  });
});
