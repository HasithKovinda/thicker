import styles from "./Features.module.css";
import { BiCheck } from "react-icons/bi";

export default function Features() {
  return (
    <article className={styles.features}>
      <h3>Features</h3>
      <div className={styles["feature-container"]}>
        <div>
          <div className={styles["icon-container"]}>
            <BiCheck className={styles.icon} />
          </div>
          <p>Free Download Instagram Logo.</p>
        </div>
        <div>
          <div className={styles["icon-container"]}>
            <BiCheck className={styles.icon} />
          </div>
          <p>
            Illustrator from Instagram Logo 9 Vectors svg vector collection.
          </p>
        </div>
        <div>
          <div className={styles["icon-container"]}>
            <BiCheck className={styles.icon} />
          </div>
          <p>Vectors SVG vector illustration graphic art design format.</p>
        </div>
        <div>
          <div className={styles["icon-container"]}>
            <BiCheck className={styles.icon} />
          </div>
          <p>Following vectors are from the same pack as this vector also.</p>
        </div>
        <div>
          <div className={styles["icon-container"]}>
            <BiCheck className={styles.icon} />
          </div>
          <p>Instagram Logo SVG Vector is a part of Social Websites.</p>
        </div>
      </div>
    </article>
  );
}
