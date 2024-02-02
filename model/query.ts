import mongoose from "mongoose";

interface IQueryModel extends Document {
  email: string;
  message: string;
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
