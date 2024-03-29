"use client";

import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import NavLink from "@/components/NavLink";
import Auth from "@/components/Auth/Auth";
import { SCROLL_POSITION_THRESHOLD_VALUE } from "@/util/constant";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [isNavFixed, setIsNavFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = SCROLL_POSITION_THRESHOLD_VALUE;

      setIsNavFixed(scrollPosition > threshold);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNavFixed]);
  return (
    <nav className={`${styles.nav}  ${isNavFixed ? styles.fixed : ""} `}>
      <section className={`section-center ${styles["nav-items"]}`}>
        <div>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              className={styles.logo}
              height={50}
              width={100}
            />
          </Link>
        </div>
        <ul>
          <li>
            <NavLink activeclasstype="normal" type="link" path="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeclasstype="normal" type="link" path="/tours">
              Tours
            </NavLink>
          </li>
          <li>
            <NavLink activeclasstype="normal" type="link" path="/about">
              About
            </NavLink>
          </li>

          <Auth />
        </ul>
      </section>
    </nav>
  );
}
