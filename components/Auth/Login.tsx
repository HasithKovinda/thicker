import Link from "next/link";
import styles from "./Auth.module.css";

export default function Login() {
  return (
    <section className={`section-center ${styles.signUp}`}>
      <p>Sign Up</p>
      <article className={styles.container}>
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
          <button type="submit" className={`btn ${styles["signUp-btn"]}`}>
            Login
          </button>
        </div>
      </article>
      <div className={styles.login}>
        <span>
          Don't have a account? <Link href="/signUp">Sign Up</Link> Now
        </span>
      </div>
    </section>
  );
}
