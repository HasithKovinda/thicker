import styles from "./SingleReview.module.css";

type SingleReviewProp = {
  photo: string;
  review: string;
  name: string;
};

export default function SingleReview({
  photo,
  review,
  name,
}: SingleReviewProp) {
  return (
    <article className={styles.article}>
      <div className={styles.main}>
        <span className={styles.overlay}></span>
        <div className={styles.container}>
          <img src={photo} className={styles.profile} alt="" />
        </div>
      </div>
      <div>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.content}>
        <p>{review}</p>
      </div>
      <div className={styles.footer}>
        <div className={styles["rating-icons"]}>
          {Array.from({ length: 5 }, (_, i) => {
            return <img src="/assert/rating.svg" alt="rating" key={i} />;
          })}
        </div>
      </div>
    </article>
  );
}
