"use client";

import styles from "./TourContent.module.css";
import Filters from "./Filters";
import AllTours from "./AllTours";
import { Filter } from "@/types/tour";
import { useEffect, useState } from "react";
import { Difficulty } from "@/types/enum";
import {
  DEFAULT_DURATION,
  DEFAULT_GROUP_SIZE,
  DEFAULT_PRICE,
  DEFAULT_RATING,
} from "@/util/constant";
import Pagination from "../Pagination/Pagination";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { countTours, filterTours } from "@/util/actions";
import Loading from "@/UI/Loading";
import { useSearchParams } from "next/navigation";

export default function TourContent() {
  const [data, setData] = useState<Filter>({
    price: DEFAULT_PRICE,
    duration: DEFAULT_DURATION,
    groupSize: DEFAULT_GROUP_SIZE,
    rating: DEFAULT_RATING,
    difficulty: Difficulty.ALL,
    country: "all",
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
      <h1 className={`${styles.heading}`}>Filter Your Favorite Tours</h1>
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
