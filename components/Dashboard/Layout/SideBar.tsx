"use client";

import { FiStar, FiBriefcase, FiCreditCard, FiSettings } from "react-icons/fi";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "@/util/actions";

export default function SideBar() {
  // const { data: session } = useSession();
  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserSession(),
  });
  const src = queryData?.photo ? queryData.photo : "assert/default.jpg";
  return (
    <aside className={styles.sidebar}>
      <div className={styles["logo-container"]}>
        <img src="/logo.svg" alt="logo" className={styles.logo} />
      </div>
      <div className={styles["profile-info"]}>
        <img src={src} alt="logo" className={styles.profile} />
        <p>{queryData?.name}</p>
        <span>User</span>
      </div>
      <ul className={styles["section-container"]}>
        <li>
          <Link href="/settings" className={styles.link}>
            <FiSettings className={styles.icon} />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link href="/settings" className={styles.link}>
            <FiBriefcase className={styles.icon} />
            <span>Bookings</span>
          </Link>
        </li>
        <li>
          <Link href="/settings" className={styles.link}>
            <FiStar className={styles.icon} />
            <span>Reviews</span>
          </Link>
        </li>
        <li>
          <Link href="/settings" className={styles.link}>
            <FiSettings className={styles.icon} />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
