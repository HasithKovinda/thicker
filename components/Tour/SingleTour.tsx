"use client";
import Link from "next/link";
import { FiClock, FiMapPin } from "react-icons/fi";
import styles from "./SingleTour.module.css";
import { type PopularTour } from "@/types/model";
import { COUNTRIES } from "@/util/constant";
import TourRating from "@/UI/TourRating";
import Image from "next/image";

export default function SingleTour({
  name,
  duration,
  imageCover,
  price,
  ratingsQuantity,
  startLocation,
  summary,
  slug,
  ratingsAverage,
}: PopularTour) {
  const className = COUNTRIES.find(
    (country) => startLocation.split(",")[1].trim() === country.name
  );
  return (
    <article className={styles["single-tour"]}>
      <div className={styles["main-image"]}>
        <Image
          src={imageCover}
          height={300}
          width={300}
          alt={name}
          blurDataURL={imageCover}
          placeholder="blur"
          loading="lazy"
          className={styles["main-img"]}
        />
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
            <TourRating ratingNumber={ratingsAverage} />
          </div>
          <span className={styles.count}>
            <span>({ratingsAverage})</span>
            {ratingsQuantity} Reviews
          </span>
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
