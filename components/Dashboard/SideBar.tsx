import styles from "./SideBar.module.css";

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles["logo-container"]}>
        <img src="/logo.svg" alt="logo" className={styles.logo} />
      </div>
      <div className={styles["profile-info"]}>
        <img src="/assert/profile.jpg" alt="logo" className={styles.profile} />
        <p>Hasith kovinda</p>
        <span>User</span>
      </div>
    </aside>
  );
}
