"use server";

import mongoose from "mongoose";
import Tours from "@/model/Tours";
import Review from "@/model/Review";
import connect from "@/DB/db";
import { FetchedReviewType, type CreateReviewType } from "@/types/model";

export async function fetchAllTopReviews(
  id?: string
): Promise<FetchedReviewType[]> {
  await connect();
  const match = id
    ? { $match: { rating: 5, tour: new mongoose.Types.ObjectId(id) } }
    : { $match: { rating: 5 } };
  const allReviews = await Review.aggregate([
    match,
    { $group: { _id: "$user", review: { $first: "$$ROOT" } } },
    { $limit: 10 },
    { $replaceRoot: { newRoot: "$review" } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    { $project: { "user.password": 0 } },
    { $sort: { createdAt: -1 } },
  ]);
  const data: FetchedReviewType[] = JSON.parse(JSON.stringify(allReviews));
  return data;
}

export async function createReview(review: CreateReviewType) {
  const id = new mongoose.Types.ObjectId(review.tour);
  await Review.create(review);
  const res: { id: string; nRating: number; avgRating: number }[] =
    await Review.aggregate([
      { $match: { tour: id } },
      {
        $group: {
          _id: "$tour",
          nRating: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
    ]);
  await Tours.findByIdAndUpdate(
    { _id: id },
    {
      ratingsAverage: res[0].avgRating.toFixed(1),
      ratingsQuantity: res[0].nRating,
    }
  );
}
