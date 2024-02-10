import { authOptions } from "@/util/nextAuth";
import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth";

const handler = NextAuth(authOptions);

export default handler;
