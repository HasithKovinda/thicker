"use client";

import { fetchAllTours, filterTours } from "@/util/actions";
import React from "react";
import SingleTour from "./SingleTour";
import styles from "./AllTours.module.css";
import { useQuery } from "@tanstack/react-query";
import { Filter, PopularTour } from "@/types/tour";

export default function AllTours({ price, duration, groupSize }: Filter) {
  const { data, isPending } = useQuery({
    queryKey: ["tours", price, duration, groupSize],
    queryFn: () => filterTours({ price, duration, groupSize }),
  });
  console.log(data);
  if (isPending) return <h3>Loding....</h3>;

  if (!data || data.length === 0) return <h1>No data found</h1>;
  return (
    <section className={styles.section}>
      {data.map((tour) => {
        return <SingleTour key={tour.name} {...tour} />;
      })}
    </section>
  );
}
