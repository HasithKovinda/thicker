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
  activeclasstype: "normal" | "sideBar";
};

type LinkProps = {
  type: "link";
} & BaseProps;

type NavLinkProps = ButtonProps | LinkProps;

export default function NavLink(props: NavLinkProps) {
  const { children, path, activeclasstype } = props;
  const pathName = usePathname();
  const activePath = path === pathName ? true : false;
  const generalClass =
    activeclasstype === "normal"
      ? `${styles.link}`
      : `${styles["link-sidebar"]}`;

  const className =
    activeclasstype === "normal"
      ? `${styles.active}`
      : `${styles["sidebar-active"]}`;
  const classActive = activePath
    ? `${generalClass} ${className}`
    : generalClass;

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
