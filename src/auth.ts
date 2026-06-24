import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { businessesLogIn, getBusinessesByEmail } from "./utils/api";
import type { UserRole } from "@/types";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt", // Use JWT strategy for sessions
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email : undefined;
        const password = typeof credentials?.password === "string" ? credentials.password : undefined;
        if (!email || !password) {
          throw new Error("Missing credentials");
        }

        try {
          const businesses = await getBusinessesByEmail(email);

          if (businesses?.success && businesses.data) {
            const response = await businessesLogIn(email, password);
            if (response?.success) {
              return {
                id: businesses.data.id,
                name: businesses.data.name,
                email: businesses.data.email,
                role: "business" as UserRole,
              };
            } else {
              throw new Error("Password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch {
          throw new Error("Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // JWT callback to include user ID + role
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        const role = (user as { role?: UserRole }).role;
        if (role) token.role = role;
      }
      // Google sign-in is the customer entry point.
      if (account?.provider === "google" && !token.role) {
        token.role = "customer";
      }
      return token;
    },
    // Session callback to pass user ID + role to the session
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = String(token.id); // Add user ID to the session
      }
      const role = token.role as UserRole | undefined;
      if (role) {
        session.user.role = role;
      }
      return session;
    },
  },
});
