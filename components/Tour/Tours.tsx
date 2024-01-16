import React from "react";
import SingleTour from "./SingleTour";
import styles from "./Tours.module.css";
import { fetchAllTours } from "@/util/actions";

export default async function Tours() {
  await fetchAllTours();
  return (
    <section className={styles.section}>
      <div>
        <h1>Our Popular Tours</h1>
        <div className="underline"></div>
      </div>
      <main className={`${styles["tours-section"]} section-center`}>
        <SingleTour />
        <SingleTour />
        <SingleTour />
      </main>
    </section>
  );
}
