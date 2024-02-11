"use server";

import Tours from "@/model/Tours";
import { Difficulty } from "@/types/enum";
import { type TourModel } from "@/types/model";
import {
  type PopularTour,
  type Filter,
  type FetchedBookingType,
} from "@/types/model";
import {
  TOUR_PAGE_SIZE,
  DEFAULT_PRICE,
  DEFAULT_GROUP_SIZE,
  DEFAULT_DURATION,
  DEFAULT_RATING,
} from "@/util/constant";
import connect from "@/DB/db";
import Booking from "@/model/Booking";

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

export async function fetchParchedTours(
  userId: string
): Promise<{ id: string; name: string; image: string }[] | null> {
  try {
    await connect();
    const uniqueTourIds = await Booking.distinct("tourId", { userId });
    if (!uniqueTourIds.length) return null;
    const uniqueBookings: FetchedBookingType[] = await Promise.all(
      uniqueTourIds.map(async (tourId) => {
        const booking: FetchedBookingType | null = await Booking.findOne({
          userId,
          tourId,
        })
          .populate("tourId")
          .lean();
        return booking!;
      })
    );
    if (!uniqueBookings.length) return null;
    const bookedToursNames: { id: string; name: string; image: string }[] =
      uniqueBookings.map((book) => {
        return {
          id: book.tourId._id,
          name: book?.tourId.name,
          image: book?.tourId.imageCover,
        };
      });
    return bookedToursNames;
  } catch (error) {
    throw new Error("something went wrong");
  }
}

export async function filterTours(
  currentPage: number,
  { price, groupSize, duration, rating, difficulty, country }: Filter
): Promise<{ count: number; tours: PopularTour[] }> {
  const limit = TOUR_PAGE_SIZE;
  let skip = (currentPage - 1) * limit;
  await connect();
  let tours: PopularTour[] = await fetchAllTours();
  if (
    !(price !== DEFAULT_PRICE) &&
    !(groupSize !== DEFAULT_GROUP_SIZE) &&
    !(duration !== DEFAULT_DURATION) &&
    !(rating !== DEFAULT_RATING) &&
    country === "all" &&
    difficulty === Difficulty.ALL
  ) {
    if (skip === 0) {
      return {
        count: tours.length,
        tours: tours.slice(skip, TOUR_PAGE_SIZE),
      };
    }
    return {
      count: tours.length,
      tours: tours.slice(skip, TOUR_PAGE_SIZE * currentPage),
    };
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

  if (country !== "all") {
    tours = tours.filter(
      (tour) => tour.startLocation.split(",")[1].trim() === country
    );
  }

  if (skip === 0) {
    return {
      count: tours.length,
      tours: tours.slice(skip, TOUR_PAGE_SIZE),
    };
  }
  return {
    count: tours.length,
    tours: tours.slice(skip, TOUR_PAGE_SIZE * currentPage),
  };
}
