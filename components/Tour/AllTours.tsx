"use client";

import { filterTours } from "@/lib/actions/tour/tour";
import React from "react";
import SingleTour from "./SingleTour";
import styles from "./AllTours.module.css";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "@/types/model";
import { useSearchParams } from "next/navigation";
import Loading from "@/UI/Loading";

export default function AllTours({
  price,
  duration,
  groupSize,
  rating,
  difficulty,
  country,
}: Filter) {
  const searchParams = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const { data, isPending } = useQuery({
    queryKey: [
      "tours",
      currentPage,
      price,
      duration,
      groupSize,
      rating,
      difficulty,
      country,
    ],
    queryFn: () =>
      filterTours(currentPage, {
        price,
        duration,
        groupSize,
        rating,
        difficulty,
        country,
      }),
  });

  if (isPending)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading />
      </div>
    );

  if (!data || data.tours.length === 0)
    return <h1 className={styles.data}>No data found</h1>;
  return (
    <section className={styles.section}>
      {data.tours.map((tour) => {
        return <SingleTour key={tour.name} {...tour} />;
      })}
    </section>
  );
}
