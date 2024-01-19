"use server";

import connect from "@/DB/db";
import Tours from "@/model/Tours";
import { Difficulty } from "@/types/enum";
import { type TourModel } from "@/types/model";
import { type Filter, type PopularTour } from "@/types/tour";
import {
  DEFAULT_DURATION,
  DEFAULT_GROUP_SIZE,
  DEFAULT_PRICE,
  DEFAULT_RATING,
} from "./constant";

export async function fetchAllTours(): Promise<PopularTour[]> {
  await connect();
  const tours = await Tours.find();
  const tourList: PopularTour[] = tours.map((tour) => {
    return {
      name: tour.name,
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
