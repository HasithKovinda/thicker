import styles from "./SingleReview.module.css";


type SingleReviewProp={
  photo:string,
  review:string
  rating:number
}

export default function SingleReview({photo,review,rating}:SingleReviewProp) {
  return (
    <article className={styles.article}>
      <div className={styles.main}>
        <img src="/assert/quotes-1.svg" alt="" className={styles.icon} />
        <img src={photo} className={styles.profile} alt="" />
      </div>
      <div className={styles.content}>
        <p>
          {review}
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
