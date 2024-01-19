import { ReviewModel } from "@/types/model";
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema<ReviewModel>(
  {
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
      ref: "User",
      required: [true, " Review must belong to user"],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to tour"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
);



export default mongoose.models.Review || mongoose.model("Review", reviewSchema);