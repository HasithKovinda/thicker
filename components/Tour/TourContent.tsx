"use client";

import styles from "./TourContent.module.css";
import Filters from "./Filters";
import AllTours from "./AllTours";
import { Filter } from "@/types/tour";
import { useState } from "react";

export default function TourContent() {
  const [data, setData] = useState<Filter>({
    price: undefined,
    duration: undefined,
    groupSize: undefined,
  });

  function handleChange(newData: Filter) {
    setData(newData);
  }

  return (
    <main className={styles.main}>
      <h1 className={`${styles.heading}`}>Filter Your Favorite Tours</h1>
      <div className="underline"></div>
      <section className={styles.container}>
        <Filters handleChange={handleChange} />
        <AllTours {...data} />
      </section>
    </main>
  );
}
