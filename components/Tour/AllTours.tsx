import { fetchAllTours } from "@/util/actions";
import React from "react";
import SingleTour from "./SingleTour";
import styles from "./AllTours.module.css";

export default async function AllTours() {
  const tours = await fetchAllTours();
  return (
    <section className={styles.section}>
      {tours.map((tour) => {
        return <SingleTour key={tour.name} {...tour} />;
      })}
    </section>
  );
}
