import styles from "./AboutContent.module.css";

export default function AboutContent() {
  return (
    <section className={`section-center ${styles.container}`}>
      <article>
        <img src="/assert/about-image-3.svg" alt="" className={styles.image} />
      </article>
      <article className={styles.heading}>
        <h1>World Best Travel Agency</h1>
        <p>
          Since 2014, we’ve helped more than 500,000 people of all ages enjoy
          the best outdoor experience of their lives. Whether it’s for one day
          or a two-week vacation, close to home or a foreign land.
        </p>
        <div className={styles["icons-container"]}>
          <div className={styles.feature}>
            <img src="/assert/about-icon-1.svg" alt="" />
            <span>Expert Team for Support</span>
          </div>
          <div className={styles.feature}>
            <img src="/assert/about-icon-2.svg" alt="" />
            <span>Urgent Support for Client</span>
          </div>
        </div>
        <blockquote>
          "Since 2014, we’ve helped more than 500,000 people of all ages enjoy
          the best outdoor experience of their lives."
        </blockquote>
        <div className={styles.footer}>
          <img src="/assert/founder.webp" alt="" />
          <div>
            <p>Jonathon bLIL</p>
            <span>Founder of treker</span>
          </div>
        </div>
      </article>
    </section>
  );
}
