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
  difficulty: "easy" | "medium" | "difficult";
};

export type Filter = {
  price?: number;
  duration?: number;
  groupSize?: number;
  // difficulty: "easy" | "medium" | "difficult" | "all";
};
