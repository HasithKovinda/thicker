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
import { Difficulty } from "@/types/enum";

type FilterPops = {
  handleChange: (data: Filter) => void;
};

// const initialState: Filter = {
//   price: null,
//   duration: null,
//   groupSize: null,
//   rating: 1,
// };

export default function Filters({ handleChange }: FilterPops) {
  const [price, setPrice] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [groupSize, setGroupSize] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.ALL);
  const [rating, setRating] = useState<number>(1);

  const isFilterApply = price || duration || groupSize || rating > 1;

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    setDifficulty(event.target.value as Difficulty);
  }

  function getRating(rating: number) {
    if (rating) setRating(rating);
  }

  function clearFilters() {
    setDifficulty(Difficulty.ALL);
    setPrice(null);
    setDuration(null);
    setRating(1);
  }

  useEffect(() => {
    handleChange({
      price: price,
      duration: duration,
      groupSize: groupSize,
      rating,
      difficulty,
    });
  }, [price, duration, groupSize, rating, difficulty]);

  return (
    <aside className={styles.container}>
      <div className={styles.heading}>
        <h2>Filters</h2>
        <img src="/assert/icons/filter.svg" alt="" />
      </div>
      <div className={styles.options}>
        <div>
          <p>Price</p>
          <span>{price ? `$${PRICE_MIN} - $${price}` : `$${PRICE_MIN}`}</span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          min={PRICE_MIN}
          max={PRICE_MAX}
          className={styles.range}
          onChange={(e) => setPrice(+e.target.value)}
        />
      </div>
      <div className={styles.options}>
        <div>
          <p>Duration</p>
          <span>
            {duration
              ? `${DURATION_MIN} Day - ${duration} Day`
              : `${DURATION_MIN} Day`}
          </span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          min={DURATION_MIN}
          max={DURATION_MAX}
          className={styles.range}
          onChange={(e) => setDuration(+e.target.value)}
        />
      </div>
      <div className={styles.options}>
        <div>
          {/* Think About OPtimized */}
          <p>Group Size</p>
          <span>
            {groupSize
              ? `${GROUP_SIZE_MIN} Persons - ${groupSize} Persons`
              : `${GROUP_SIZE_MIN} Persons`}
          </span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          min={GROUP_SIZE_MIN}
          max={GROUP_SIZE_MAX}
          onChange={(e) => setGroupSize(+e.target.value)}
          className={styles.range}
        />
      </div>
      {/* Think About OPtimized */}
      <div className={styles.options}>
        <p>Difficulty</p>
        <select
          name="cars"
          id="cars"
          className={styles.select}
          onChange={handleSelect}
        >
          <option value="all" defaultValue="all">
            All
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>
      </div>
      <div className={styles.options}>
        <p>Customer Reviews</p>
        <StarMatrix rows={5} handleRating={getRating} />
      </div>
      <div className={styles.options}>
        {isFilterApply && (
          <button className={`btn ${styles.clear}`} onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>
    </aside>
  );
}
