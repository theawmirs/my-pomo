import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/password";
import { getUserFromDb } from "../db/actions/user/user.actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        let user = null;

        user = await getUserFromDb(email as string);

        if (!user) {
          throw new Error("User not found.");
        }

        const isPasswordValid = await verifyPassword(password as string, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Pass the user id to the token
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the user id to the session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
});
