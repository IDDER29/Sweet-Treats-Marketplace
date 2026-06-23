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
      async authorize(credentials: any) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        try {
          const businesses = await getBusinessesByEmail(credentials.email);

          if (businesses?.success) {
            const response = await businessesLogIn(
              credentials.email,
              credentials.password
            );
            if (response?.success) {
              return {
                id: businesses.data.id, // return user details
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
        } catch (error) {
          console.error(
            "Authorize error:",
            error instanceof Error ? error.message : String(error)
          );
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
