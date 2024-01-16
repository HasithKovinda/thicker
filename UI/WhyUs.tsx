import { dataLeft, dataRight } from "@/data/static";
import styles from "./WhyUs.module.css";
import SingleIcon from "./SingleIcon";
export default function WhyUs() {
  return (
    <section className={`section-center ${styles.section}`}>
      <div>
        <h1>Why Choose Treker</h1>
        <div className="underline"></div>
      </div>
      <article className={styles.article}>
        <div>
          {dataLeft.map((left) => {
            return <SingleIcon {...left} key={left.tittle} />;
          })}
        </div>
        <div className={styles["main-image"]}>
          <img src="/assert/why-image-1.svg" alt="" />
        </div>
        <div className={styles.left}>
          {dataRight.map((left) => {
            return <SingleIcon {...left} key={left.tittle} />;
          })}
        </div>
      </article>
    </section>
  );
}
