import Link from "next/link";
import styles from "./Auth.module.css";

export default function SignUp() {
  return (
    <section className={`section-center ${styles.signUp}`}>
      <p>Sign Up</p>
      <article className={styles.container}>
        <div>
          <label htmlFor="name">User Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor="re-password">Renter Password</label>
          <input type="password" name="re-password" id="re-password" required />
        </div>
        <div>
          <button type="submit" className={`btn ${styles["signUp-btn"]}`}>
            Sign Up &#x261B;
          </button>
        </div>
      </article>
      <div className={styles.login}>
        <span>
          Already have an account? <Link href="/login">Login In</Link>
        </span>
      </div>
    </section>
  );
}
