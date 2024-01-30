import styles from "./AboutFeature.module.css";

export default function AboutFeature() {
  return (
    <section className={styles.section}>
      <div className={styles.features}>
        <div className={styles.heading}>
          <div>
            <span>Are you ready to travel?</span>
            <h1>Treker is a World Leading Online</h1>
            <h1>Tour Booking Platform</h1>
          </div>
        </div>
        <div className={styles.container}>
          <div>
            <div className={styles.round}>
              <p>07+</p>
            </div>
            <span>Years Exp</span>
          </div>
          <div>
            <div className={styles.round}>
              <p>2k+</p>
            </div>
            <span>Top Hosts</span>
          </div>
          <div>
            <div className={styles.round}>
              <p>50+</p>
            </div>
            <span>Top Country</span>
          </div>
          <div>
            <div className={styles.round}>
              <p>10M+</p>
            </div>
            <span>Client Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
