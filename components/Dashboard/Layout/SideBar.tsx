import { FiStar, FiBriefcase, FiCreditCard, FiSettings } from "react-icons/fi";
import styles from "./SideBar.module.css";
import Link from "next/link";

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
      <ul className={styles["section-container"]}>
        <li>
          <Link href="/settings" className={styles.link}>
            <FiSettings className={styles.icon} />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link href="/settings" className={styles.link}>
            <FiBriefcase className={styles.icon} />
            <span>Bookings</span>
          </Link>
        </li>
        <li>
          <Link href="/settings" className={styles.link}>
            <FiStar className={styles.icon} />
            <span>Reviews</span>
          </Link>
        </li>
        <li>
          <Link href="/settings" className={styles.link}>
            <FiSettings className={styles.icon} />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
