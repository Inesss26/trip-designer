import { timingSafeEqual } from "node:crypto";
import { jwtVerify, SignJWT } from "jose";

import { resolveAdminPassword, resolveSessionSecret } from "@/lib/env";

export const SESSION_COOKIE = "mtd_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const ISSUER = "mytripdesigner";
const AUDIENCE = "admin";

function secretKey(): Uint8Array {
  return new TextEncoder().encode(resolveSessionSecret());
}

/**
 * Compare deux chaînes en temps constant, pour ne pas laisser fuiter la
 * longueur ni le préfixe du mot de passe par le temps de réponse.
 */
export function safeCompare(a: string, b: string): boolean {
  const bufferA = Buffer.from(a, "utf8");
  const bufferB = Buffer.from(b, "utf8");

  if (bufferA.length !== bufferB.length) {
    // On compare quand même une valeur de même longueur pour garder un temps
    // d'exécution comparable, puis on renvoie false.
    timingSafeEqual(bufferA, bufferA);
    return false;
  }

  return timingSafeEqual(bufferA, bufferB);
}

export function isValidAdminPassword(candidate: string): boolean {
  const expected = resolveAdminPassword();

  if (!expected) {
    return false;
  }

  return safeCompare(candidate, expected);
}

/** Jeton de session signé, sans donnée personnelle : un simple porteur. */
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
