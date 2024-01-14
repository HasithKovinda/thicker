import styles from "./Book.module.css";
import { BiUser, BiCalendar, BiEnvelope, BiPhone } from "react-icons/bi";
import { FiUsers, FiBookmark } from "react-icons/fi";

export default function Book() {
  return (
    <aside className={styles.booking}>
      <section className={styles.container}>
        <h3>Book This Tour</h3>
        <form className={styles.form}>
          <div className={styles["input-container"]}>
            <input type="text" name="name" id="name" placeholder="Full Name" />
            <BiUser className={styles.icon} />
          </div>
          <div className={styles["input-container"]}>
            <input type="email" name="email" id="email" placeholder="Email" />
            <BiEnvelope className={styles.icon} />
          </div>
          <div className={styles["input-container"]}>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone number"
            />
            <BiPhone className={styles.icon} />
          </div>
          {/* <div className={styles["input-container"]}>
            <input type="date" name="email" id="email" placeholder="Email" />
            <BiCalendar className={styles.icon} />
          </div> */}
          <div className={styles["input-container"]}>
            <input
              type="number"
              name="email"
              id="email"
              placeholder="Number Guests"
            />
            <FiUsers className={styles.icon} />
          </div>
          <div>
            <button className={`btn ${styles["book-btn"]}`}>Book now</button>
          </div>
        </form>
      </section>
    </aside>
  );
}
