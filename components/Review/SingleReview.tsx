import styles from "./SingleReview.module.css";

type SingleReviewProp = {
  photo: string;
  review: string;
  rating: number;
  name: string;
};

export default function SingleReview({
  photo,
  review,
  rating,
  name,
}: SingleReviewProp) {
  return (
    <article className={styles.article}>
      <div className={styles.main}>
        <img src="/assert/quotes-1.svg" alt="" className={styles.icon} />
        <img src={photo} className={styles.profile} alt="" />
      </div>
      <div className={styles.content}>
        <p>{review}</p>
      </div>
      <div className={styles.footer}>
        <span>{name}</span>
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
