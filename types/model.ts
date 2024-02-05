import { type Document } from "mongoose";
import { Difficulty } from "./enum";

//Tour Models
export type Location = {
  type: "Point";
  coordinates: [number, number];
  address: string;
  description: string;
};

export type TourModel = Document & {
  _id: string;
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  difficulty: Difficulty;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount?: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  createdAt: Date;
  startDates: Date[];
  startLocation: {
    type: "Point";
    coordinates: [number, number];
    address: string;
    description: string;
  };
  locations: Location[];
  guides: UserModel[];
};

//User
export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
};

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

export type ProfileSettings = {
  name: string;
  email: string;
  photo?: string;
};

export type StripeCheckoutType = {
  name: string;
  email: string;
  tourId: string;
  description: string;
  image: string;
  amount: number;
  bookingDate: Date;
  quantity: number;
  slug: string;
};

// Review
// export type ReviewModel = Document & {
//   review: string;
//   rating: number;
//   user: UserModel;
//   tour: Types.ObjectId;
//   createdAt: Date;
// };
