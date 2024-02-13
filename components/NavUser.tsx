import Link from "next/link";
import styles from "./NavUser.module.css";
import Image from "next/image";

type NavUserProps = {
  name: string;
  image: string | undefined;
};

export default function NavUser({ name, image }: NavUserProps) {
  const imagePath = image ? image : "/assert/default.jpg";
  return (
    <Link href="/dashboard" className={styles.user}>
      <Image
        src={imagePath}
        height={40}
        width={40}
        alt="profile image"
        className={styles.profile}
      />
      <span>{name}</span>
    </Link>
  );
}
