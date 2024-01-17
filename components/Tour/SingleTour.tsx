import styles from "./SingleTour.module.css";
import { FiClock, FiMapPin } from "react-icons/fi";
import { BiSolidStar } from "react-icons/bi";

export default function SingleTour({
  name,
  duration,
  imageCover,
  price,
  ratingsAverage,
  ratingsQuantity,
  startLocation,
  summary,
}: PopularTour) {
  console.log(Math.floor(ratingsAverage));
  return (
    <article className={styles["single-tour"]}>
      <div className={styles["main-image"]}>
        <img src={imageCover} alt="" className={styles["main-img"]} />
        <div className={styles.info}>
          <FiClock className={styles.icons} />
          <span>{duration} days</span>
          <span>
            <BiSolidStar className={styles.color} />
          </span>
          <FiMapPin className={styles.icons} />
          <span>{startLocation}</span>
        </div>
        <div className={styles.price}>
          <span>${price}</span>
        </div>
      </div>
      <div className={styles.content}>
        <h2>{name}</h2>
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
        <button className={`btn ${styles.details}`}>View Details</button>
      </div>
    </article>
  );
}
