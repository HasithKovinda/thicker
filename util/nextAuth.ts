import connect from "@/DB/db";
import { AuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/model/User";
import { UserModel } from "@/types/model";

type ExtendedUser = NextAuthUser & UserModel;

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  jwt: {
    maxAge: 30 * 24 * 60,
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
