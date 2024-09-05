import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { businessesLogIn, getBusinessesByEmail } from "./utils/api";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
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
            console.log("response", response);
            if (response?.success) {
              return {
                id: businesses.data.id, // return user details
                name: businesses.data.name,
                email: businesses.data.email,
              };
            } else {
              throw new Error("Password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          console.error("Authorize error:", error.message);
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
});
