import { Difficulty } from "./enum";

export type PopularTour = {
  name: string;
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
  price: number | null;
  duration: number | null;
  groupSize: number | null;
  rating: number | null;
  difficulty: Difficulty;
};
