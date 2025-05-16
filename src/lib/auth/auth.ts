import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/password";
import { getUserFromDb } from "../db/actions/user/user.actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
