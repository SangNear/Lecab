import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js only loads this file as Edge middleware — not `proxy.ts` or other names.
 *
 * - Protected routes: require `refreshToken`; else → /login
 * - Auth routes (/login, /register): if already logged in → /
 */
export function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/review",
    "/add-a-word",
  ],
};