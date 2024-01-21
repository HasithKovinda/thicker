import { UserModel } from "./model";

declare module "next-auth" {
  interface Session {
    user: UserModel;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserModel;
  }
}
