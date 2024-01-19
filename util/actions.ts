"use server";

import connect from "@/DB/db";
import Tours from "@/model/Tours";
import { Difficulty } from "@/types/enum";
import { TourModel } from "@/types/model";
import { Filter, PopularTour } from "@/types/tour";

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
  console.log(difficulty);
  console.log(Difficulty.ALL);
  console.log(difficulty !== Difficulty.ALL);

  let tours: PopularTour[] = await fetchAllTours();
  if (
    !price &&
    !groupSize &&
    !duration &&
    !rating &&
    difficulty === Difficulty.ALL
  ) {
    return tours;
  }

  console.log("LLLLLLLLLLLLLLLLLLLL");

  if (difficulty !== Difficulty.ALL) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAA");
    tours = tours.filter((tour) => tour.difficulty === difficulty);
  } else if (price) {
    tours = tours.filter((tour) => tour.price >= price);
  } else if (groupSize) {
    tours = tours.filter((tour) => tour.maxGroupSize >= groupSize);
  } else if (duration) {
    tours = tours.filter((tour) => tour.duration >= duration);
  } else if (rating) {
    tours = tours.filter((tour) => rating <= tour.ratingsAverage);
  }
  return tours;
}
