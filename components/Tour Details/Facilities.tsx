import styles from "./Facilities.module.css";

export default function Facilities() {
  return (
    <article className={styles.facilities}>
      <h3>Facilities</h3>
      <div className={styles["facilities-container"]}>
        <div>
          <img src="/assert/icons/campings.svg" alt="campings" />
          <p>Camping Tents</p>
        </div>
        <div>
          <img src="/assert/icons/toilet.svg" alt="toilet" />
          <p>Portable Toilet</p>
        </div>
        <div>
          <img src="/assert/icons/kitchen-tool.svg" alt="kitchen-tool" />
          <p>Electric Tent Lights</p>
        </div>
        <div>
          <img src="/assert/icons/lights.svg" alt="lights" />
          <p>Camping Tents</p>
        </div>
        <div>
          <img src="/assert/icons/smoking.svg" alt="smoking" />
          <p>Smoking Allowed</p>
        </div>
        <div>
          <img src="/assert/icons/wifi-signal.svg" alt="wifi-signal" />
          <p>Wireless Internet</p>
        </div>
      </div>
    </article>
  );
}
