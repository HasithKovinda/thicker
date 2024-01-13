import styles from "./NewLetter.module.css";
import { BiEnvelope, BiLogoTelegram } from "react-icons/bi";

function NewLetter() {
  return (
    <section className={`section-center ${styles.section}`}>
      <h1>Subscribe Our News Letter</h1>
      <div className="underline"></div>
      <article className={styles.article}>
        <div className={styles.content}>
          <span>Newsletter</span>
          <h2>SUBSCRIBE NOW</h2>
          <p>
            Fight School has specialized in martial arts since 1986 and has one
            of the most innovative programs in the nation.
          </p>
          <div className={styles.form}>
            <form className={styles.container}>
              <BiEnvelope className={styles.email} />
              <input type="text" placeholder="Your Email Address" />
              <button className={`btn ${styles.submit}`}>
                SubsCribe
                <span>
                  <BiLogoTelegram />
                </span>
              </button>
            </form>
          </div>
        </div>
      </article>
    </section>
  );
}

export default NewLetter;
