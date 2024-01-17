"use server";

import connect from "@/DB/db";
import Tours from "@/model/Tours";
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
}: // difficulty,
Filter): Promise<PopularTour[]> {
  console.log(groupSize);
  let tours: PopularTour[] = await fetchAllTours();
  if (!price && !groupSize && !duration) {
    return tours;
  }

  if (price) {
    tours = tours.filter((tour) => tour.price >= price);
  } else if (groupSize) {
    tours = tours.filter((tour) => tour.maxGroupSize >= groupSize);
  } else if (duration) {
    tours = tours.filter((tour) => tour.duration >= duration);
  }

  // tours = tours.filter((tour) => tour.difficulty === difficulty);

  console.log(tours);

  return tours;
}
