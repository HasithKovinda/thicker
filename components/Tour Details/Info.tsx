import styles from "./Info.module.css";
export default function Info() {
  return (
    <section className={`section-center ${styles.section}`}>
      <div className={styles.heading}>
        <h2>YELLOWSTONE & MT RUSHM</h2>
        <p>
          <span>$120</span>per person
        </p>
      </div>
      <article className={styles.article}>
        <div>
          <div className={styles["img-container"]}>
            <img src="/assert/icons/duration.svg" alt="" />
          </div>
          <div>
            <p>Duration</p>
            <span>4 Days</span>
          </div>
          <div className={styles.line}></div>
        </div>
        <div>
          <div className={styles["img-container"]}>
            <img src="/assert/icons/speedometer.svg" alt="" />
          </div>
          <div>
            <p>Difficulty</p>
            <span>Easy-Moderate</span>
          </div>
          <div className={styles.line}></div>
        </div>
        <div>
          <div className={styles["img-container"]}>
            <img src="/assert/icons/team-group.svg" alt="" />
          </div>
          <div>
            <p>Group Size</p>
            <span>30 Person</span>
          </div>
          <div className={styles.line}></div>
        </div>
        <div>
          <div className={styles["img-container"]}>
            <img src="/assert/icons/icon-1.svg" alt="" />
          </div>
          <div>
            <p>Location</p>
            <span>Moscow, Russia</span>
          </div>
        </div>
      </article>
    </section>
  );
}
