import connect from "@/DB/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/model/user";

export const authOptions = {
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
          user.password,
          credentials.password
        );

        if (!isPasswordMatch) return null;

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo,
        };
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
