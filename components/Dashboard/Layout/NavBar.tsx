import NavUser from "../../NavUser";
import styles from "./NavBar.module.css";
export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div>
        <h2>Hello Welcome Back,Hasith Kovinda</h2>
        <p>Manage Your Profile and checkout your information</p>
      </div>
      <div className={styles["nav-heading"]}>
        <NavUser name="Hasith Kovinda" image={undefined} />
        <button>Sign out</button>
      </div>
    </nav>
  );
}
