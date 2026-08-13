import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Auth.js session cookie names (http + https). */
const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "__Host-authjs.session-token",
];

function hasSession(req: NextRequest) {
  return SESSION_COOKIES.some((name) => req.cookies.has(name));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!hasSession(req)) {
      const loginUrl = new URL("/admin/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/admin/login" && hasSession(req)) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
