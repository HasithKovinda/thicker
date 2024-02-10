"use server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import User from "@/model/User";
import { type ProfileSettings, type UserModel } from "@/types/model";
import { type ResetPasswordType } from "@/types/userInput";
import { authOptions } from "@/util/nextAuth";

export async function signUpUser(
  user: Omit<UserModel, "photo" | "role">
): Promise<string> {
  const role = "user";

  try {
    const isUserExits = await User.findOne({ email: user.email });
    if (isUserExits) throw new Error("This email address already taken");
    const password = await bcrypt.hash(user.password, 10);
    await User.create({
      ...user,
      password,
      role,
    });
    return "User created successfully";
  } catch (error) {
    throw error;
  }
}

export async function changeProfile({ name, email, photo }: ProfileSettings) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) throw new Error("User not found");
  const id = session.user.id;
  try {
    const updateData: ProfileSettings = { name, email };
    if (photo) {
      updateData.photo = photo;
    }
    const user = await User.findByIdAndUpdate(id, updateData).lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserSession(): Promise<Omit<
  UserModel,
  "password"
> | null> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;
    const data = await User.findById(session.user.id).lean();
    if (!data) return null;
    const user: Omit<UserModel, "password"> = {
      id: data._id.toString(),
      name: data.name,
      email: data.email,
      photo: data.photo,
      role: data.role,
    };

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPassword(
  userId: string,
  options: ResetPasswordType
): Promise<String> {
  const { currentPassword, newPassword, passwordConfirm } = options;
  if (newPassword.trim() !== passwordConfirm.trim())
    throw new Error("Password should match to password confirm");
  try {
    const user: UserModel | null = await User.findById({ _id: userId })
      .select("+password")
      .lean();
    if (!user) {
      throw new Error("User not found");
    }
    const { password } = user;
    const isValid = await bcrypt.compare(currentPassword, password);
    if (!isValid) {
      throw new Error("Password not matched");
    }
    const newHashPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      { _id: userId },
      { password: newHashPassword }
    );
    return "Password Updated Successfully";
  } catch (error) {
    // if (error instanceof Error) {
    //   throw new Error(error.message);
    // }
    // throw new Error("Something went wrong");
    throw error;
  }
}
