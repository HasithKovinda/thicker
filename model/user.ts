import mongoose from "mongoose";
import { UserModel } from "@/types/model";

const userSchema = new mongoose.Schema<UserModel>({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please provide an email"],
  },
  role: {
    type: String,
    enum: ["user", "guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    select: false,
  },
  photo: {
    type: String,
  },
});

let User: mongoose.Model<UserModel>;
try {
  // Try to get the existing model from mongoose
  User = mongoose.model<UserModel>("User");
} catch {
  // If the model doesn't exist, define it
  User = mongoose.model<UserModel>("User", userSchema);
}
export default User;
