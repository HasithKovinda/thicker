import styles from "./Facilities.module.css";

export default function Facilities() {
  return (
    <article className={styles.facilities}>
      <h3>Facilities</h3>
      <div className={styles["facilities-container"]}>
        <div>
          <img src="/assert/icons/campings.svg" alt="" />
          <p>Camping Tents</p>
        </div>
        <div>
          <img src="/assert/icons/toilet.svg" alt="" />
          <p>Portable Toilet</p>
        </div>
        <div>
          <img src="/assert/icons/kitchen-tool.svg" alt="" />
          <p>Electric Tent Lights</p>
        </div>
        <div>
          <img src="/assert/icons/lights.svg" alt="" />
          <p>Camping Tents</p>
        </div>
        <div>
          <img src="/assert/icons/smoking.svg" alt="" />
          <p>Smoking Allowed</p>
        </div>
        <div>
          <img src="/assert/icons/wifi-signal.svg" alt="" />
          <p>Wireless Internet</p>
        </div>
      </div>
    </article>
  );
}
