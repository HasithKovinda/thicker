import styles from "./Review.module.css";

export default function Review() {
  return (
    <section className={`section-center ${styles.section}`}>
      <div>
        <h1>Top Reviews For Treker</h1>
        <div className="underline"></div>
      </div>
    </section>
  );
}
