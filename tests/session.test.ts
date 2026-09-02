import { describe, expect, it } from "vitest";

const SECRET = "un-secret-de-test-suffisamment-long-1234";
const PASSWORD = "mot-de-passe-attendu";

// lib/env.ts lit l'environnement au chargement du module : ces valeurs doivent
// être posées avant le premier import dynamique de lib/auth/session.
process.env.ADMIN_SESSION_SECRET = SECRET;
process.env.ADMIN_PASSWORD = PASSWORD;

const session = await import("@/lib/auth/session");
const { SignJWT } = await import("jose");

function signWith(secret: string, expiresAt?: number) {
  const token = new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("mytripdesigner")
    .setAudience("admin")
    .setIssuedAt();

  return token
    .setExpirationTime(expiresAt ?? "1h")
    .sign(new TextEncoder().encode(secret));
}

describe("session administrateur", () => {
  it("accepte un jeton qu'elle vient de signer", async () => {
    const token = await session.createSessionToken();
    await expect(session.verifySessionToken(token)).resolves.toBe(true);
  });

  it("refuse un jeton absent, vide ou tronqué", async () => {
    const token = await session.createSessionToken();

    await expect(session.verifySessionToken(undefined)).resolves.toBe(false);
    await expect(session.verifySessionToken("")).resolves.toBe(false);
    await expect(session.verifySessionToken(token.slice(0, -4))).resolves.toBe(
      false,
    );
  });

  it("refuse un jeton signé avec un autre secret", async () => {
    const forged = await signWith("un-autre-secret-de-32-caracteres-xx");
    await expect(session.verifySessionToken(forged)).resolves.toBe(false);
  });

  it("refuse un jeton expiré", async () => {
    const expired = await signWith(SECRET, Math.floor(Date.now() / 1000) - 60);
    await expect(session.verifySessionToken(expired)).resolves.toBe(false);
  });

  it("compare les mots de passe sans échouer sur les longueurs différentes", () => {
    expect(session.safeCompare("abcdef", "abcdef")).toBe(true);
    expect(session.safeCompare("abcdef", "abcdeg")).toBe(false);
    expect(session.safeCompare("abc", "abcdef")).toBe(false);
    expect(session.safeCompare("", "")).toBe(true);
  });

  it("valide le mot de passe administrateur configuré", () => {
    expect(session.isValidAdminPassword(PASSWORD)).toBe(true);
    expect(session.isValidAdminPassword(PASSWORD.toUpperCase())).toBe(false);
    expect(session.isValidAdminPassword("")).toBe(false);
  });

  it("marque le cookie httpOnly", () => {
    const options = session.sessionCookieOptions();

    expect(options.httpOnly).toBe(true);
    expect(options.sameSite).toBe("lax");
    expect(options.path).toBe("/");
  });
});
