import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db1";

const handler = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const [rows]: any = await db.query(
          "SELECT * FROM users WHERE email_user = ?",
          [credentials.email]
        );

        if (!rows.length) return null;

        const user = rows[0];
        const valid = await bcrypt.compare(
          credentials.password,
          user.password_user
        );

        if (!valid) return null;

        return {
          id: user.id,
          name: user.nama_lengkap_user,
          email: user.email_user,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
