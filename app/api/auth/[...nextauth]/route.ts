import connect from "@/DB/db";
import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/model/User";
import { UserModel } from "@/types/model";

type ExtendedUser = NextAuthUser & UserModel;

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  //   Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "User Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password)
          throw new Error("user name or password required");
        await connect();

        const user = await User.findOne({ email: credentials.username }).select(
          "+password"
        );

        if (!user) throw new Error("email or password not match!");

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) throw new Error("email or password not match!");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          role: user.role,
        };
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as ExtendedUser;
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
