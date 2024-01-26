import mongoose, { Types } from "mongoose";
import user from "./user";
import Tours from "./Tours";

interface IReviewModel extends Document {
  review: string;
  rating: number;
  user: Types.ObjectId;
  tour: Types.ObjectId;
  createdAt: Date;
}

const reviewSchema = new mongoose.Schema<IReviewModel>({
  review: {
    type: String,
    required: [true, "Please provide a review"],
    trim: true,
  },
  rating: {
    type: Number,
    default: 4,
    min: [1, "Tour rating average above 1"],
    max: [5, "Tour rating average below 1"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: user,
    required: [true, " Review must belong to user"],
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: Tours,
    required: [true, "Review must belong to tour"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let Review: mongoose.Model<IReviewModel>;
try {
  // Try to get the existing model from mongoose
  Review = mongoose.model<IReviewModel>("Review");
} catch {
  // If the model doesn't exist, define it
  Review = mongoose.model<IReviewModel>("Review", reviewSchema);
}

export default Review;
