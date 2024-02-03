import mongoose, { Types } from "mongoose";
import User from "./user";

interface IQueryModel extends Document {
  email: string;
  message: string;
  userId: Types.ObjectId;
  isRead: boolean;
}

const querySchema = new mongoose.Schema<IQueryModel>({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: [true, " Query must belong to user"],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

let Query: mongoose.Model<IQueryModel>;
try {
  // Try to get the existing model from mongoose
  Query = mongoose.model<IQueryModel>("Query");
} catch {
  // If the model doesn't exist, define it
  Query = mongoose.model<IQueryModel>("Query", querySchema);
}

export default Query;
