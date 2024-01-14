import styles from "./OtherInformation.module.css";
import Book from "./Book";
import SocialMedia from "./SocialMedia";

export default function OtherInformation() {
  return (
    <section className={styles.other}>
      <Book />
      <SocialMedia />
    </section>
  );
}
