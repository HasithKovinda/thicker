import styles from "./TourGuides.module.css";
export default function TourGuides() {
  return (
    <section className={styles.guides}>
      <h2>Your Tour Guides</h2>
      <div className="underline"></div>
      <article className={styles["guide-container"]}>
        <div>
          <img src="/assert/profile.jpg" alt="" className={styles.profile} />
          <p>Lead Guide</p>
          <span>George Oliver</span>
        </div>
        <div>
          <img src="/assert/profile.jpg" alt="" className={styles.profile} />
          <p>Tour Guide</p>
          <span>Arthur Leo</span>
        </div>
        <div>
          <img src="/assert/profile.jpg" alt="" className={styles.profile} />
          <p>Tour Guide</p>
          <span>Harry Oscar</span>
        </div>
      </article>
    </section>
  );
}
