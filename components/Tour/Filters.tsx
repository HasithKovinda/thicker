"use client";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { type ChangeEvent, useState, useEffect } from "react";
import StarMatrix from "@/UI/StarMatrix";
import styles from "./Filters.module.css";
import { type Filter } from "@/types/model";
import { Difficulty } from "@/types/enum";
import {
  COUNTRIES,
  DEFAULT_COUNTRY_VALUE,
  DEFAULT_DURATION,
  DEFAULT_GROUP_SIZE,
  DEFAULT_PRICE,
  DEFAULT_RATING,
  DURATION_MAX,
  DURATION_MIN,
  GROUP_SIZE_MAX,
  GROUP_SIZE_MIN,
  OPTIONS,
  PRICE_MAX,
  PRICE_MIN,
} from "@/util/constant";

type FilterPops = {
  handleChange: (data: Filter) => void;
};

export default function Filters({ handleChange }: FilterPops) {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [groupSize, setGroupSize] = useState(DEFAULT_GROUP_SIZE);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.ALL);
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [country, setCountry] = useState(DEFAULT_COUNTRY_VALUE);

  const isFilterApply =
    DEFAULT_PRICE < price ||
    DEFAULT_DURATION < duration ||
    DEFAULT_GROUP_SIZE < groupSize ||
    rating > DEFAULT_PRICE ||
    difficulty !== Difficulty.ALL ||
    country !== DEFAULT_COUNTRY_VALUE;

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    setDifficulty(event.target.value.toLowerCase() as Difficulty);
  }

  function getRating(rating: number) {
    if (rating) setRating(rating);
  }

  function clearFilters() {
    setDifficulty(Difficulty.ALL);
    setPrice(DEFAULT_PRICE);
    setDuration(DEFAULT_DURATION);
    setRating(DEFAULT_RATING);
    setGroupSize(DEFAULT_GROUP_SIZE);
    setCountry(DEFAULT_COUNTRY_VALUE);
  }
  useEffect(() => {
    handleChange({
      price: price,
      duration: duration,
      groupSize: groupSize,
      rating,
      difficulty,
      country,
    });
  }, [price, duration, groupSize, rating, difficulty, country]);

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
            {DEFAULT_PRICE >= price
              ? `$${PRICE_MIN}`
              : `$${PRICE_MIN} - $${price}`}
          </span>
        </div>
        <input
          type="range"
          name="price"
          id="price"
          value={price}
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
            {DEFAULT_DURATION >= duration
              ? `${DURATION_MIN} Day`
              : `${DURATION_MIN} Day - ${duration} Day`}
          </span>
        </div>
        <input
          type="range"
          name="duration"
          id="duration"
          value={duration}
          min={DURATION_MIN}
          max={DURATION_MAX}
          className={styles.range}
          onChange={(e) => setDuration(+e.target.value)}
        />
      </div>
      <div className={styles.options}>
        <div>
          <p>Group Size</p>
          <span>
            {DEFAULT_GROUP_SIZE >= groupSize
              ? `${GROUP_SIZE_MIN} Persons`
              : `${GROUP_SIZE_MIN} Persons - ${groupSize} Persons`}
          </span>
        </div>
        <input
          type="range"
          name="group_size"
          id="group_size"
          min={GROUP_SIZE_MIN}
          max={GROUP_SIZE_MAX}
          value={groupSize}
          onChange={(e) => setGroupSize(+e.target.value)}
          className={styles.range}
        />
      </div>
      <div className={styles.options}>
        <p>Country</p>
        <div className={styles.country}>
          {COUNTRIES.map((country, i) => {
            return (
              <span
                className={country.class}
                key={i}
                onClick={() => setCountry(country.name)}
              ></span>
            );
          })}
        </div>
      </div>
      <div className={styles.options}>
        <p>Difficulty</p>
        <select
          name="cars"
          id="cars"
          className={styles.select}
          onChange={handleSelect}
          defaultValue={difficulty}
        >
          {OPTIONS.map((option, index) => {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          })}
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
