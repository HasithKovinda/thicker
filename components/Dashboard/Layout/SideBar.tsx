"use client";

import styles from "./SideBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  FiStar,
  FiBriefcase,
  FiUser,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";
import { type UserModel } from "@/types/model";

export default function SideBar() {
  const pathName = usePathname();
  console.log("🚀 ~ SideBar ~ pathName:", pathName);
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
            <FiUser className={styles.icon} />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/bookings" className={styles.link}>
            <FiBriefcase className={styles.icon} />
            <span>Bookings</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/reviews" className={styles.link}>
            <FiStar className={styles.icon} />
            <span>Reviews</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/query" className={styles.link}>
            <FiHelpCircle className={styles.icon} />
            <span>Query</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className={styles.link}>
            <FiSettings className={styles.icon} />
            <span>Setting</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
