import React from "react";
import SingleTour from "./SingleTour";
import styles from "./Tours.module.css";

export default function Tours() {
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
