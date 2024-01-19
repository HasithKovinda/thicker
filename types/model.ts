import { Document, Schema, Types } from "mongoose";
import { Difficulty } from "./enum";

type Location = {
  type: "Point";
  coordinates: [number, number];
  address: string;
  description: string;
};

export type TourModel = Document & {
  name: string;
  slug?: string;
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
  secretTour: boolean;
  startLocation: {
    type: "Point";
    coordinates: [number, number];
    address: string;
    description: string;
  };
  locations: Location[];
  guides: Types.ObjectId[];
};

export type ReviewModel = Document & {
  review: string;
  rating:number
  user: Types.ObjectId
  tour: Types.ObjectId
  createdAt:Date
}
