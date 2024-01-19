import {userModel } from "@/types/model";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<userModel>(
  {
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
  },
 
);

export default mongoose.models.User || mongoose.model("User", userSchema);