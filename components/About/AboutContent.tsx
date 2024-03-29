import Image from "next/image";
import styles from "./AboutContent.module.css";

export default function AboutContent() {
  return (
    <section className={`section-center ${styles.container}`}>
      <article>
        <Image
          src="/assert/about-image-3.svg"
          alt="about-image"
          className={styles.image}
          height={600}
          width={600}
        />
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
            <Image
              src="/assert/about-icon-1.svg"
              height={60}
              width={70}
              alt="about-icon-1"
            />
            <span>Expert Team for Support</span>
          </div>
          <div className={styles.feature}>
            <Image
              src="/assert/about-icon-2.svg"
              height={60}
              width={70}
              alt="about-icon-2"
            />
            <span>Urgent Support for Client</span>
          </div>
        </div>
        <blockquote>
          "Since 2014, we’ve helped more than 500,000 people of all ages enjoy
          the best outdoor experience of their lives."
        </blockquote>
        <div className={styles.footer}>
          <Image
            src="/assert/founder.webp"
            height={80}
            width={80}
            alt="fonder"
          />
          <div>
            <p>Jonathon bLIL</p>
            <span>Founder of treker</span>
          </div>
        </div>
      </article>
    </section>
  );
}
