import styles from "./SocialMedia.module.css";

export default function SocialMedia() {
  return (
    <aside className={styles["links"]}>
      <h3>Follow us</h3>
      <div className={styles.container}>
        <img
          src="/assert/icons/facebook.svg"
          alt="facebook"
          className={styles.icon}
        />
        <p> 1250M +</p>
        <span>Followers</span>
      </div>
      <div className={styles.container}>
        <img
          src="/assert/icons/youtube.svg"
          alt="youtube"
          className={styles.icon}
        />
        <p> 1250M +</p>
        <span>Followers</span>
      </div>
      <div className={styles.container}>
        <img
          src="/assert/icons/twitter.svg"
          alt="twitter"
          className={styles.icon}
        />
        <p> 1250M +</p>
        <span>Followers</span>
      </div>
      <div className={styles.container}>
        <img
          src="/assert/icons/tiktok.svg"
          alt="tiktok"
          className={styles.icon}
        />
        <p> 1250M +</p>
        <span>Followers</span>
      </div>
    </aside>
  );
}
