import Image from "next/image";
import styles from "./About.module.css";

export default async function About() {
  return (
    <section className={`section-center ${styles.section}`}>
      <h1 className={`${styles.heading}`}>About Thicker</h1>
      <div className={`${styles.underline}`}></div>
      <div className={`${styles["about-container"]}`}>
        <div>
          <div>
            <Image
              src="/assert/about.png"
              height={500}
              width={500}
              alt="bg-one"
            />
          </div>
          <div className={styles.image}>
            <Image
              src="/assert/about.svg"
              height={500}
              width={500}
              alt="about"
            />
          </div>
        </div>
        <div className={styles.content}>
          <h1>World Best Travel Company</h1>
          <p>
            Established in 2014, our commitment to crafting unparalleled travel
            experiences has made us the epitome of the 'World's Best Travel
            Company.Over the years, we've proudly served over 500,000
            adventurers of all ages, transforming their outdoor aspirations into
            extraordinary realities.
          </p>
        </div>
      </div>
    </section>
  );
}
