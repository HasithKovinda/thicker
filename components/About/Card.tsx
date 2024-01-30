import { guides } from "@/data/static";
import styles from "./Card.module.css";
import { BiPhoneCall } from "react-icons/bi";

export default function Card({ name, path, role }: guides) {
  return (
    <div className={styles["image-card"]}>
      <div className={styles.profile}>
        <img src={path} alt={name} className={styles.image} />
      </div>
      <div className={styles.footer}>
        <div className={styles.info}>
          <p>{name}</p>
          <span>{role}</span>
        </div>
        <div className={styles.icon}>
          <BiPhoneCall />
        </div>
      </div>
    </div>
  );
}
