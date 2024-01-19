"use client";

import { fetchAllTours, filterTours } from "@/util/actions";
import React from "react";
import SingleTour from "./SingleTour";
import styles from "./AllTours.module.css";
import { useQuery } from "@tanstack/react-query";
import { Filter, PopularTour } from "@/types/tour";

export default function AllTours({
  price,
  duration,
  groupSize,
  rating,
  difficulty,
}: Filter) {
  const { data, isPending } = useQuery({
    queryKey: ["tours", price, duration, groupSize, rating, difficulty],
    queryFn: () =>
      filterTours({ price, duration, groupSize, rating, difficulty }),
  });
  if (isPending) return <h3>Loading....</h3>;

  if (!data || data.length === 0)
    return <h1 className={styles.data}>No data found</h1>;
  return (
    <section className={styles.section}>
      {data.map((tour) => {
        return <SingleTour key={tour.name} {...tour} />;
      })}
    </section>
  );
}
