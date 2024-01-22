import Link from "next/link";
import styles from "./NavUser.module.css";

type NavUserProps = {
  name: string;
  image: string | undefined;
};

export default function NavUser({ name, image }: NavUserProps) {
  const imagePath = image ? image : "/assert/default.jpg";
  return (
    <Link href="/dashboard" className={styles.user}>
      <img src={imagePath} alt="" className={styles.profile} />
      <span>{name}</span>
    </Link>
  );
}
