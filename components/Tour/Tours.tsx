import React from "react";
import SingleTour from "./SingleTour";
import styles from "./Tours.module.css";
import { fetchMostPopularTour } from "@/util/actions";

export default async function Tours() {
  const data = await fetchMostPopularTour();
  return (
    <section className={styles.section}>
      <div>
        <h1>Our Popular Tours</h1>
        <div className="underline"></div>
      </div>

      <main className={`${styles["tours-section"]} section-center`}>
        {data.map((tour) => {
          return <SingleTour key={tour.name} {...tour} />;
        })}
      </main>
    </section>
  );
}
