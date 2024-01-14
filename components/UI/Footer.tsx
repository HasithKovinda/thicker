import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.section}>
        <div>
          <p className={styles.log}>Thicker</p>
          <p>
            Treker was founded in 1991 by a group of safety-focused
            professionals who created The Wingman Standard for rigorously
            vetting air charter operators
          </p>
        </div>
        <div className={styles.uro}>
          <h4>EUROPE</h4>
          <p>Europe 45 Gloucester Road London DT1M 3BF +44 (0)20 3671 5709</p>
        </div>
        <div>
          <h4>ASIA & PACIFIC</h4>
          <p>2473 Red Road Ste 98 Singapore SG + 1 623 211 6319</p>
        </div>
        <div>
          <h4>NORTH AMERICA</h4>
          <p>Europe 45 Gloucester Road London DT1M 3BF +44 (0)20 3671 5709</p>
        </div>
      </section>
      <p className={styles.rights}>
        Copyright © {new Date().getFullYear()} Treker. All Rights Reserved.
      </p>
    </footer>
  );
}
