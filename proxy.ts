import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

/**
 * Redirige les visiteurs non connectés vers l'écran de connexion.
 *
 * Ce contrôle est un confort de navigation : l'autorisation qui fait foi est
 * celle de `app/admin/layout.tsx` et de chaque Server Action
 * (voir lib/auth/guard.ts).
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";
  const hasSession = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );

  if (!hasSession && !isLoginRoute) {
    const loginUrl = new URL("/admin/login", request.url);

    if (pathname !== "/admin") {
      loginUrl.searchParams.set("suivant", `${pathname}${search}`);
    }

    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
