"use client";

import StarMatrix from "@/UI/StarMatri";
import styles from "./Filters.module.css";
import { type ChangeEvent, useState, useEffect } from "react";
import {
  DURATION_MAX,
  DURATION_MIN,
  GROUP_SIZE_MAX,
  GROUP_SIZE_MIN,
  PRICE_MAX,
  PRICE_MIN,
} from "@/util/constant";

import { Filter } from "@/types/tour";

type FilterPops = {
  handleChange: (data: Filter) => void;
};

export default function Filters({ handleChange }: FilterPops) {
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [difficulty, setDifficulty] = useState("all");

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {}

  // const { data } = useQuery({
  //   queryKey: ["tours", price, duration, groupSize],
  //   queryFn: () => filterTours({ price, duration, groupSize }),
  // });

  useEffect(() => {
    handleChange({ price: +price, duration: +duration, groupSize: +groupSize });
  }, [price, duration, groupSize]);

  return (
    <aside className={styles.container}>
      <div className={styles.heading}>
        <h2>Filters</h2>
        <img src="/assert/icons/filter.svg" alt="" />
      </div>
      <div className={styles.options}>
        <div>
          <p>Price</p>
          <span>
            ${PRICE_MIN} - ${price}
          </span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          min={PRICE_MIN}
          max={PRICE_MAX}
          className={styles.range}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className={styles.options}>
        <div>
          <p>Duration</p>
          <span>
            {DURATION_MIN} Day - {duration} Days
          </span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          min={DURATION_MIN}
          max={DURATION_MAX}
          className={styles.range}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div className={styles.options}>
        <div>
          <p>Group Size</p>
          <span>
            {GROUP_SIZE_MIN} Persons - {groupSize} Persons
          </span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          min={GROUP_SIZE_MIN}
          max={GROUP_SIZE_MAX}
          onChange={(e) => setGroupSize(e.target.value)}
          className={styles.range}
        />
      </div>
      <div className={styles.options}>
        <p>Difficulty</p>
        <select
          name="cars"
          id="cars"
          className={styles.select}
          onChange={handleSelect}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>
      </div>
      <div className={styles.options}>
        <p>Customer Reviews</p>
        <StarMatrix rows={5} />
      </div>
      <div className={styles.options}>
        <button className={`btn ${styles.clear}`}>Clear Filters</button>
      </div>
    </aside>
  );
}
