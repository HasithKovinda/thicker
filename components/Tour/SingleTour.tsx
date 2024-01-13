import styles from "./SingleTour.module.css";
import { FiClock, FiMapPin } from "react-icons/fi";

export default function SingleTour() {
  return (
    <article className={styles["single-tour"]}>
      <div className={styles["main-image"]}>
        <img
          src="/assert/new-tour-1.jpg"
          alt=""
          className={styles["main-img"]}
        />
        <div className={styles.info}>
          <FiClock className={styles.icons} />
          <span>5 days</span>
          <FiMapPin className={styles.icons} />
          <span>Miami, USA</span>
        </div>
        <div className={styles.price}>
          <span>$100</span>
        </div>
      </div>
      <div className={styles.content}>
        <h2>The Sea Explorer</h2>
        <div className={styles.rating}>
          <div className={styles["rating-icons"]}>
            <img src="/assert/rating.svg" alt="" />
            <img src="/assert/rating.svg" alt="" />
            <img src="/assert/rating.svg" alt="" />
            <img src="/assert/rating.svg" alt="" />
            <img src="/assert/rating.svg" alt="" />
          </div>
          <span>05 Reviews</span>
        </div>
        <p>
          Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
      <div className={styles.footer}>
        <button className={`btn ${styles.details}`}>View Details</button>
      </div>
    </article>
  );
}
