import styles from "./ProfileInformation.module.css";

export default function ProfileInformation() {
  return (
    <section className={styles.profile}>
      <h2>Your Profile Information</h2>
      <article className={styles.article}>
        <form className={styles.form}>
          <div>
            <label htmlFor="email">Your User Name</label>
            <input
              type="text"
              id="email"
              className={styles.input}
              value="Hasith Kovinda"
            />
          </div>
          <div>
            <label htmlFor="email">Your Email Address</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value="hasith300@gmail.com"
            />
          </div>
          <div className={styles["image-upload"]}>
            <img
              src="/assert/profile.jpg"
              alt="logo"
              className={styles["profile-img"]}
            />
          </div>
          <div>
            <label className={styles["custom-file-upload"]}>
              <input type="file" accept="image/*" className={styles.input} />
              Choose New Photo
            </label>
          </div>
          <div>
            <button type="submit" className={`btn ${styles.save}`}>
              Save Setting
            </button>
          </div>
        </form>
        <div>
          <img src="/assert/dashboard.jpg" alt="" className={styles.main} />
        </div>
      </article>
    </section>
  );
}
