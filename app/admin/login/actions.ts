"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  createSessionToken,
  isValidAdminPassword,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/auth/session";
import type { LoginState } from "@/app/admin/login/state";
import { adminPassword, isSessionSecretConfigured } from "@/lib/env";
import { loginSchema } from "@/lib/validation/schemas";

/** Ralentit les tentatives ratées, sans prétendre remplacer un vrai rate limit. */
function delayFailure(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 600));
}

function safeRedirectTarget(value: FormDataEntryValue | null): string {
  const target = typeof value === "string" ? value : "";

  // On n'accepte que des chemins internes à l'administration : un `suivant`
  // arbitraire serait une redirection ouverte.
  if (target.startsWith("/admin") && !target.startsWith("/admin/login")) {
    return target;
  }

  return "/admin";
}

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    return { error: "Saisissez le mot de passe." };
  }

  if (process.env.NODE_ENV === "production") {
    if (!adminPassword) {
      return {
        error:
          "La variable ADMIN_PASSWORD n'est pas configurée sur ce déploiement : l'administration est inaccessible.",
      };
    }

    if (!isSessionSecretConfigured()) {
      return {
        error:
          "La variable ADMIN_SESSION_SECRET est absente ou trop courte (32 caractères minimum) : la session ne peut pas être signée.",
      };
    }
  }

  if (!isValidAdminPassword(parsed.data.password)) {
    await delayFailure();
    return { error: "Mot de passe incorrect." };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE,
    await createSessionToken(),
    sessionCookieOptions(),
  );

  redirect(safeRedirectTarget(formData.get("suivant")));
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
