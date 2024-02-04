"use client";

import styles from "./TourContent.module.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AllTours from "./AllTours";
import Pagination from "../Pagination/Pagination";
import BackgroundVideo from "@/UI/BackgroundVideo";
import Filters from "./Filters";
import { filterTours } from "@/lib/actions/tour/tour";
import { type Filter } from "@/types/model";
import { Difficulty } from "@/types/enum";
import {
  DEFAULT_COUNTRY_VALUE,
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
    country: DEFAULT_COUNTRY_VALUE,
  });

  const [count, setCount] = useState(0);

  function handleChange(newData: Filter) {
    setData(newData);
  }

  const searchParams = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  useEffect(() => {
    async function fetchFilterTours() {
      const res = await filterTours(currentPage, data);
      setCount(res.count);
    }
    fetchFilterTours();
  }, [data]);

  return (
    <main className={styles.main}>
      <BackgroundVideo />
      <h1 className={`${styles.heading}`}>Your Favorite Tours</h1>
      <div className="underline"></div>
      <div className={styles.pagination}>
        <Pagination numberOfResults={count} pageTypes="tour" />
      </div>
      <section className={styles.container}>
        <Filters handleChange={handleChange} />
        <AllTours {...data} />
      </section>
    </main>
  );
}
