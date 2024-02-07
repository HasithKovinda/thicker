import styles from "./Sponsor.module.css";

export default function Sponsor() {
  return (
    <section className={`section-center ${styles.sponsor}`}>
      <div className={styles.container}>
        <div>
          <img src="/sponsors/sponsor-1.png" alt="sponsor-1" />
        </div>
        <div>
          <img src="/sponsors/sponsor-2.png" alt="sponsor-2" />
        </div>
        <div>
          <img src="/sponsors/sponsor-3.png" alt="sponsor-3" />
        </div>
        <div>
          <img src="/sponsors/sponsor-4.png" alt="sponsor-4" />
        </div>
      </div>
    </section>
  );
}
