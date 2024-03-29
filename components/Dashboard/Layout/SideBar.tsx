"use client";

import styles from "./SideBar.module.css";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import {
  FiStar,
  FiBriefcase,
  FiUser,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";
import { type UserModel } from "@/types/model";
import NavLink from "@/components/NavLink";
import Image from "next/image";

export default function SideBar() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<UserModel>(["user"]);
  const src = queryData?.photo ? queryData.photo : "assert/default.jpg";
  return (
    <aside className={styles.sidebar}>
      <div className={styles["logo-container"]}>
        <Link href="/">
          <Image
            src="/logo.svg"
            height={140}
            width={140}
            alt="logo"
            className={styles.logo}
          />
        </Link>
      </div>
      <div className={styles["profile-info"]}>
        <Image
          src={src}
          alt="logo"
          height={140}
          width={140}
          className={styles.profile}
        />
        <p>{queryData?.name}</p>
        <span>User</span>
      </div>
      <ul className={styles["section-container"]}>
        <li>
          <NavLink activeclasstype="sideBar" path="/dashboard" type="link">
            <FiUser className={styles.icon} />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclasstype="sideBar"
            path="/dashboard/bookings"
            type="link"
          >
            <FiBriefcase className={styles.icon} />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclasstype="sideBar"
            path="/dashboard/reviews"
            type="link"
          >
            <FiStar className={styles.icon} />
            <span>Reviews</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclasstype="sideBar"
            path="/dashboard/query"
            type="link"
          >
            <FiHelpCircle className={styles.icon} />
            <span>Query</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeclasstype="sideBar"
            path="/dashboard/settings"
            type="link"
          >
            <FiSettings className={styles.icon} />
            <span>Setting</span>
          </NavLink>
        </li>
      </ul>
      <div className={styles.footer}>
        <p>Copyright © {new Date().getFullYear()}</p>
        <p>Treker All Rights Reserved🎖️ </p>
      </div>
    </aside>
  );
}
