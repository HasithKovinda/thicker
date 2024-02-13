import { guides } from "@/data/static";
import styles from "./Card.module.css";
import { BiPhoneCall } from "react-icons/bi";
import Image from "next/image";

export default function Card({ name, path, role }: guides) {
  return (
    <div className={styles["image-card"]}>
      <div className={styles.profile}>
        <Image
          src={path}
          height={400}
          width={400}
          alt={name}
          blurDataURL={path}
          placeholder="blur"
          loading="lazy"
          className={styles.image}
        />
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
