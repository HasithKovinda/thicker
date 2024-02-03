import { Difficulty } from "./enum";
import { TourModel, UserModel } from "./model";

export type PopularTour = {
  name: string;
  slug: string;
  duration: number;
  price: number;
  startLocation: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  summary: string;
  maxGroupSize: number;
  difficulty: Difficulty;
};

export type Filter = {
  price: number;
  duration: number;
  groupSize: number;
  rating: number;
  difficulty: Difficulty;
  country: string;
};

export type MapLocation = {
  coordinates: [number, number];
  description: string;
};

type BaseBookingType = {
  id: string;
  fullName: string;
  email: string;
  userId: string;
  price: number;
  phoneNumber: string;
  bookingDate: Date;
};

export type FetchedBookingType = BaseBookingType & {
  tourId: TourModel;
};

export type NewBookingType = BaseBookingType & {
  tourId: string;
};

export type ReviewModel = {
  review: string;
  rating: number;
};

export type FetchedReviewType = ReviewModel & {
  user: UserModel;
  tour: TourModel;
};

export type CreateReviewType = ReviewModel & {
  user: string;
  tour: string;
};

export type Guides = {
  name: string;
  role: string;
  photo: string;
};

export type BookPagination = {
  numberOfResults: number;
  bookings: FetchedBookingType[];
};
