"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styles from "./NavLink.module.css";

type NavLinkProps = {
  children: ReactNode;
  herf: string;
};

export default function NavLink({ herf, children }: NavLinkProps) {
  const pathName = usePathname();
  const activePath = herf === pathName ? true : false;
  return (
    <Link
      href={herf}
      className={activePath ? `${styles.link} ${styles.active}` : styles.link}
    >
      {children}
    </Link>
  );
}
