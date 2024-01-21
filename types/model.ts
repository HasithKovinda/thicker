import { Document, Schema, Types } from "mongoose";
import { Difficulty } from "./enum";

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

export type UserModel = {
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
};

export type ReviewModel = Document & {
  review: string;
  rating: number;
  user: UserModel;
  tour: Types.ObjectId;
  createdAt: Date;
};
