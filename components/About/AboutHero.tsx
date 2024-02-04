import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <svg viewBox="0 0 1320 300" className={styles.svg}>
        <text x="50%" y="50%" dy=".35em" textAnchor="middle">
          Crafting Unforgettable Travel Experiences
        </text>
      </svg>
    </section>
  );
}
