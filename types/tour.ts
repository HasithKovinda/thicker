import { Difficulty } from "./enum";
import { TourModel } from "./model";

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
};

export type MapLocation = {
  coordinates: [number, number];
  description: string;
};

// export type BookingType = {
//   id: string;
//   fullName: string;
//   email: string;
//   tourId: string;
//   userId: string;
//   price: number;
//   phoneNumber: string;
//   bookingDate: Date;
// };

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

export type Guides = {
  name: string;
  role: string;
  photo: string;
};

export type BookPagination = {
  numberOfResults: number;
  bookings: FetchedBookingType[];
};
