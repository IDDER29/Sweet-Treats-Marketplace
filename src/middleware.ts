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

// In-memory rate limiter for the credentials login endpoint.
// Edge middleware is stateless per invocation — this Map is shared across
// requests only within the same edge worker instance. For production, replace
// with an Upstash Redis counter or Cloudflare rate-limiting rule.
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const MAX_ATTEMPTS = 10; // per IP per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rate-limit credentials login attempts
  if (pathname === "/api/auth/callback/credentials" && req.method === "POST") {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";
    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: "Too many login attempts. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
  }

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
    "/api/auth/callback/credentials",
  ],
};
