import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from "./Reviews.module.css";
import SingleReview from "./SingleReview";

export default function Review() {
  return (
    <section className={`section-center ${styles.section}`}>
      <div>
        <div className={styles.heading}>
          <div>
            <BiChevronLeft className={styles.icons} />
          </div>
          <h1>Top Reviews For Treker</h1>
          <div>
            <BiChevronRight className={styles.icons} />
          </div>
        </div>
        <div className="underline"></div>
        <main className={styles.container}>
          <SingleReview />
          <SingleReview />
          <SingleReview />
        </main>
      </div>
    </section>
  );
}
