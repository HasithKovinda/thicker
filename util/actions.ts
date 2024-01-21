"use server";

import connect from "@/DB/db";
import Tours from "@/model/Tours";
import { Difficulty } from "@/types/enum";
import { TourModel, type ReviewModel } from "@/types/model";
import { type Filter, type PopularTour } from "@/types/tour";
import {
  DEFAULT_DURATION,
  DEFAULT_GROUP_SIZE,
  DEFAULT_PRICE,
  DEFAULT_RATING,
} from "./constant";
import Review from "@/model/review";
import user from "@/model/user";
// import user from "@/model/user";

// import UserModel from "@/model/user";

export async function fetchAllTours(): Promise<PopularTour[]> {
  await connect();
  const tours = await Tours.find();
  const tourList: PopularTour[] = tours.map((tour) => {
    return {
      name: tour.name,
      slug: tour.slug,
      duration: tour.duration,
      price: tour.price,
      startLocation: tour.startLocation.description,
      imageCover: tour.imageCover,
      ratingsAverage: tour.ratingsAverage,
      ratingsQuantity: tour.ratingsQuantity,
      summary: tour.summary,
      maxGroupSize: tour.maxGroupSize,
      difficulty: tour.difficulty,
    };
  });
  return tourList;
}

export async function fetchMostPopularTour(): Promise<PopularTour[]> {
  await connect();
  const tours: TourModel[] = await Tours.find();
  const sortByAvgRating = tours.sort(
    (a, b) => b.ratingsAverage - a.ratingsAverage
  );

  const mostPopularTour = sortByAvgRating.splice(0, 3);
  const tourList: PopularTour[] = mostPopularTour.map((tour) => {
    return {
      name: tour.name,
      slug: tour.slug,
      duration: tour.duration,
      price: tour.price,
      startLocation: tour.startLocation.description,
      imageCover: tour.imageCover,
      ratingsAverage: tour.ratingsAverage,
      ratingsQuantity: tour.ratingsQuantity,
      summary: tour.summary,
      maxGroupSize: tour.maxGroupSize,
      difficulty: tour.difficulty,
    };
  });
  return tourList;
}

export async function filterTours({
  price,
  groupSize,
  duration,
  rating,
  difficulty,
}: Filter): Promise<PopularTour[]> {
  await connect();
  let tours: PopularTour[] = await fetchAllTours();
  if (
    !(price !== DEFAULT_PRICE) &&
    !(groupSize !== DEFAULT_GROUP_SIZE) &&
    !(duration !== DEFAULT_DURATION) &&
    !(rating !== DEFAULT_RATING) &&
    difficulty === Difficulty.ALL
  ) {
    return tours;
  }

  const filters = [
    (tour: PopularTour) =>
      difficulty !== Difficulty.ALL && tour.difficulty === difficulty,
    (tour: PopularTour) => price && tour.price >= price,
    (tour: PopularTour) => groupSize && tour.maxGroupSize >= groupSize,
    (tour: PopularTour) => duration && tour.duration >= duration,
    (tour: PopularTour) => rating && rating! <= tour.ratingsAverage,
  ];

  if (difficulty === Difficulty.ALL) {
    filters.shift();
  }

  tours = tours.filter((tour) => filters.every((filter) => filter(tour)));
  return tours;
}

export async function fetchAllTopReviews(id?: string): Promise<ReviewModel[]> {
  console.log(id);
  await connect();
  const options = id
    ? { rating: { $eq: 5 }, tour: id }
    : { rating: { $eq: 5 } };
  console.log(options);

  const allReviews: ReviewModel[] = await Review.find(options)
    .limit(20)
    .populate({ path: "user" })
    .lean();
  const data: ReviewModel[] = JSON.parse(JSON.stringify(allReviews));
  console.log(data);
  console.log(data.length);
  return data;
}

export async function fetchSingleTour(slug: string): Promise<TourModel | null> {
  try {
    await connect();
    const rowData: TourModel | null = await Tours.findOne({ slug })
      .populate({
        path: "guides",
        select: "-_id -__v -active",
      })
      .lean();
    if (!rowData) return null;
    const data: TourModel = JSON.parse(JSON.stringify(rowData));
    // const tour: TourModel[] = rowData.toObject();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("There was error in fetching data");
  }
}
