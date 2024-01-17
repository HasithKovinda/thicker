import styles from "./TourContent.module.css";
import Filters from "./Filters";
import AllTours from "./AllTours";

export default function TourContent() {
  return (
    <main className={styles.main}>
      <h1 className={`${styles.heading}`}>Filter Your Favorite Tours</h1>
      <div className="underline"></div>
      <section className={styles.container}>
        <Filters />
        <AllTours />
      </section>
    </main>
  );
}
