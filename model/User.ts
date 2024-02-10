import mongoose from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
}

const userSchema = new mongoose.Schema<IUser>({
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

let User: mongoose.Model<IUser>;
try {
  // Try to get the existing model from mongoose
  User = mongoose.model<IUser>("User");
} catch {
  // If the model doesn't exist, define it
  User = mongoose.model<IUser>("User", userSchema);
}
export default User;
