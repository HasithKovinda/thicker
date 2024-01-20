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
