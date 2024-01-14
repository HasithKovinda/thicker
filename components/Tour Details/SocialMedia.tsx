import styles from "./SocialMedia.module.css";

export default function SocialMedia() {
  return (
    <aside className={styles["links"]}>
      <h3>Follow us</h3>
      <div className={styles.container}>
        <img src="/assert/icons/facebook.svg" alt="" className={styles.icon} />
        <p> 1250M +</p>
        <span>Followers</span>
      </div>
      <div className={styles.container}>
        <img src="/assert/icons/youtube.svg" alt="" className={styles.icon} />
        <p> 1250M +</p>
        <span>Followers</span>
      </div>
      <div className={styles.container}>
        <img src="/assert/icons/twitter.svg" alt="" className={styles.icon} />
        <p> 1250M +</p>
        <span>Followers</span>
      </div>
      <div className={styles.container}>
        <img src="/assert/icons/tiktok.svg" alt="" className={styles.icon} />
        <p> 1250M +</p>
        <span>Followers</span>
      </div>
    </aside>
  );
}
