"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, PropsWithoutRef, ReactNode } from "react";
import styles from "./NavLink.module.css";

type ButtonProps = {
  type: "button";
} & ComponentPropsWithoutRef<"button"> &
  BaseProps;

type BaseProps = {
  children: ReactNode;
  path: string;
};

type LinkProps = {
  type: "link";
} & BaseProps;

type NavLinkProps = ButtonProps | LinkProps;

export default function NavLink(props: NavLinkProps) {
  const { children, path } = props;
  const pathName = usePathname();
  const activePath = path === pathName ? true : false;
  const classActive = activePath
    ? `${styles.link} ${styles.active}`
    : styles.link;
  if (props.type === "link")
    return (
      <Link
        href={props.type === "link" ? props.path : ""}
        className={classActive}
      >
        {children}
      </Link>
    );

  return (
    <button className={`${styles["login-btn"]} ${classActive}`} {...props}>
      {children}
    </button>
  );
}
