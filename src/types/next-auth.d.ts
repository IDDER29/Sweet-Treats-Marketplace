import { DefaultSession } from "next-auth";
import type { UserRole } from "@/types";

// Augment NextAuth's types so `session.user.id`, `session.user.role`, and the
// JWT carry our fields with proper typing.

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      role?: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}
