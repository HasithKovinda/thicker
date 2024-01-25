"use client";

import { FiStar, FiBriefcase, FiCreditCard, FiSettings } from "react-icons/fi";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserModel } from "@/types/model";

export default function SideBar() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<UserModel>(["user"]);
  const src = queryData?.photo ? queryData.photo : "assert/default.jpg";
  return (
    <aside className={styles.sidebar}>
      <div className={styles["logo-container"]}>
        <Link href="/">
          <img src="/logo.svg" alt="logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles["profile-info"]}>
        <img src={src} alt="logo" className={styles.profile} />
        <p>{queryData?.name}</p>
        <span>User</span>
      </div>
      <ul className={styles["section-container"]}>
        <li>
          <Link href="/dashboard" className={styles.link}>
            <FiSettings className={styles.icon} />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/bookings" className={styles.link}>
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
