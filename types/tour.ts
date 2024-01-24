import { Difficulty } from "./enum";

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

export type BookingType = {
  id: string;
  fullName: string;
  email: string;
  tourId: string;
  userId: string;
  price: number;
  phoneNumber: string;
  bookingDate: Date;
};

export type Guides = {
  name: string;
  role: string;
  photo: string;
};
