import styles from "./SingleReview.module.css";

export default function SingleReview() {
  return (
    <article className={styles.article}>
      <div className={styles.main}>
        <img src="/assert/quotes-1.svg" alt="" className={styles.icon} />
        <img src="/assert/profile.jpg" className={styles.profile} alt="" />
      </div>
      <div className={styles.content}>
        <p>
          We teach martial arts because we love it — not because we want to make
          money on you. Unlike other martial.
        </p>
      </div>
      <div className={styles.footer}>
        <span>Johan Anderson</span>
        <div className={styles["rating-icons"]}>
          <img src="/assert/rating.svg" alt="" />
          <img src="/assert/rating.svg" alt="" />
          <img src="/assert/rating.svg" alt="" />
          <img src="/assert/rating.svg" alt="" />
          <img src="/assert/rating.svg" alt="" />
        </div>
      </div>
    </article>
  );
}
