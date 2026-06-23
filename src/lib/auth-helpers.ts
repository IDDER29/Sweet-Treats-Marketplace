// Server-side auth helpers for fine-grained, role-based access control in
// pages and layouts. Middleware handles the coarse "is logged in" gate
// (edge-safe); these run in Server Components where the full session +
// role is available.

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { UserRole } from "@/types";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

/**
 * Require a logged-in user with the given role. Redirects to login if not
 * authenticated, or to the homepage if authenticated as the wrong role.
 * Call at the top of a protected Server Component / layout.
 */
export async function requireRole(role: UserRole) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/auth/login");
  }
  if (user.role && user.role !== role) {
    redirect("/");
  }
  return user;
}
