"use client";

import styles from "./TourContent.module.css";
import Filters from "./Filters";
import AllTours from "./AllTours";
import { Filter } from "@/types/tour";
import { useState } from "react";
import { Difficulty } from "@/types/enum";
import {
  DEFAULT_DURATION,
  DEFAULT_GROUP_SIZE,
  DEFAULT_PRICE,
  DEFAULT_RATING,
} from "@/util/constant";

export default function TourContent() {
  const [data, setData] = useState<Filter>({
    price: DEFAULT_PRICE,
    duration: DEFAULT_DURATION,
    groupSize: DEFAULT_GROUP_SIZE,
    rating: DEFAULT_RATING,
    difficulty: Difficulty.ALL,
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
