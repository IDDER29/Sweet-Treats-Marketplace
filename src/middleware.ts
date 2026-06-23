import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Coarse, edge-safe auth gate. We intentionally do NOT import the full
// NextAuth config here (its credentials provider pulls in Node-only deps
// that break the Edge bundle). Middleware only checks for a session cookie
// to redirect anonymous users away from protected areas; fine-grained
// role enforcement happens in Server Components via `requireRole()`.

const PROTECTED_PREFIXES = ["/business", "/delivery-provider", "/customer"];

// Auth.js (next-auth v5) session cookie names, plus v4 fallbacks.
const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const hasSession = SESSION_COOKIES.some((name) => req.cookies.has(name));
  if (!hasSession) {
    const url = new URL("/auth/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/business/:path*",
    "/delivery-provider/:path*",
    "/customer/:path*",
  ],
};
