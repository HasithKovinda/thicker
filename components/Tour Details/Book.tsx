import { useQueryClient } from "@tanstack/react-query";
import styles from "./Book.module.css";
import { BiUser, BiCalendar, BiEnvelope, BiPhone } from "react-icons/bi";
import { FiUsers, FiBookmark } from "react-icons/fi";
import { UserModel } from "@/types/model";

export default function Book() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<UserModel>(["user"]);
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
            <button className={`btn ${styles["book-btn"]}`}>
              {queryData ? "Book a tour" : "Login to Book a tour"}
            </button>
          </div>
        </form>
      </section>
    </aside>
  );
}
