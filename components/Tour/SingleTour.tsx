"use client";
import styles from "./SingleTour.module.css";
import { FiClock, FiMapPin } from "react-icons/fi";
import { BiSolidStar } from "react-icons/bi";
import { type PopularTour } from "@/types/tour";
import Link from "next/link";

export default function SingleTour({
  name,
  duration,
  imageCover,
  price,
  ratingsAverage,
  ratingsQuantity,
  startLocation,
  summary,
  slug,
}: PopularTour) {
  const countries = [
    { name: "USA", class: "fi fi-us" },
    { name: "Australia", class: "fi fi-au" },
    { name: "England", class: "fi fi-gb" },
    { name: "CAN", class: "fi fi-ca" },
  ];
  const className = countries.find(
    (country) => startLocation.split(",")[1].trim() === country.name
  );
  return (
    <article className={styles["single-tour"]}>
      <div className={styles["main-image"]}>
        <img src={imageCover} alt="" className={styles["main-img"]} />
        <div className={styles.info}>
          <FiClock className={styles.icons} />
          <span>{duration} days</span>
          <FiMapPin className={styles.icons} />
          <span>{startLocation}</span>
        </div>
        <div className={styles.price}>
          <span>${price}</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2>{name}</h2>
          <span className={className?.class}></span>
        </div>
        <div className={styles.rating}>
          <div className={styles["rating-icons"]}>
            <img src="/assert/rating.svg" alt="" />
            <img src="/assert/rating.svg" alt="" />
            <img src="/assert/rating.svg" alt="" />
            <img src="/assert/rating.svg" alt="" />
            <img src="/assert/rating.svg" alt="" />
          </div>
          <span>0{ratingsQuantity} Reviews</span>
        </div>
      </div>
      <div className={styles.summary}>
        <p>{summary}</p>
      </div>
      <div className={styles.footer}>
        <Link className={`btn ${styles.details}`} href={`tours/${slug}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
