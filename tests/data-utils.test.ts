import { describe, expect, it } from "vitest";

import {
  byDisplayOrder,
  isSchemaMissingError,
  SCHEMA_MISSING_MESSAGE,
  toNumber,
  toStringArray,
  writeErrorMessage,
} from "@/lib/data/utils";

describe("isSchemaMissingError", () => {
  it("reconnaît les erreurs de schéma absent", () => {
    expect(isSchemaMissingError({ code: "PGRST205" })).toBe(true);
    expect(isSchemaMissingError({ code: "42P01" })).toBe(true);
    expect(
      isSchemaMissingError({
        message: "Could not find the table 'public.trips' in the schema cache",
      }),
    ).toBe(true);
  });

  it("laisse passer les autres erreurs", () => {
    expect(
      isSchemaMissingError({
        code: "23505",
        message: 'duplicate key value violates unique constraint "trips_slug_key"',
      }),
    ).toBe(false);
    expect(isSchemaMissingError({})).toBe(false);
  });
});

describe("writeErrorMessage", () => {
  it("explique le cas du schéma non appliqué", () => {
    expect(
      writeErrorMessage({ code: "PGRST205", message: "peu importe" }),
    ).toBe(SCHEMA_MISSING_MESSAGE);
  });

  it("reprend le message d'origine sinon", () => {
    expect(
      writeErrorMessage({ message: "colonne inconnue" }, "Mise à jour impossible"),
    ).toBe("Mise à jour impossible : colonne inconnue");
  });
});

describe("toNumber", () => {
  it("convertit les numeric renvoyés sous forme de chaîne", () => {
    expect(toNumber("2450.00")).toBe(2450);
    expect(toNumber(15)).toBe(15);
  });

  it("renvoie null pour les valeurs absentes ou invalides", () => {
    expect(toNumber(null)).toBeNull();
    expect(toNumber(undefined)).toBeNull();
    expect(toNumber("")).toBeNull();
    expect(toNumber("abc")).toBeNull();
  });
});

describe("toStringArray", () => {
  it("accepte un tableau, une chaîne JSON, et ignore le reste", () => {
    expect(toStringArray(["a", "b"])).toEqual(["a", "b"]);
    expect(toStringArray('["a","b"]')).toEqual(["a", "b"]);
    expect(toStringArray([1, "a", null])).toEqual(["a"]);
    expect(toStringArray("pas du json")).toEqual([]);
    expect(toStringArray(null)).toEqual([]);
  });
});

describe("byDisplayOrder", () => {
  it("trie par ordre manuel puis par date de création décroissante", () => {
    const items = [
      { sortOrder: 2, createdAt: "2026-01-01T00:00:00.000Z" },
      { sortOrder: 1, createdAt: "2026-01-01T00:00:00.000Z" },
      { sortOrder: 1, createdAt: "2026-02-01T00:00:00.000Z" },
    ];

    expect([...items].sort(byDisplayOrder)).toEqual([
      { sortOrder: 1, createdAt: "2026-02-01T00:00:00.000Z" },
      { sortOrder: 1, createdAt: "2026-01-01T00:00:00.000Z" },
      { sortOrder: 2, createdAt: "2026-01-01T00:00:00.000Z" },
    ]);
  });
});
