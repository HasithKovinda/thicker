"use client";

import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import NavLink from "@/components/NavLink";

export default function NavBar() {
  const [isNavFixed, setIsNavFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 80;

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
          <img src="/logo.svg" alt="logo" className={styles.logo} />
        </div>
        <ul>
          <li>
            <NavLink herf="/">Home</NavLink>
          </li>
          <li>
            <NavLink herf="/about">About</NavLink>
          </li>
          <li>
            <NavLink herf="/tours">Tours</NavLink>
          </li>
          <li>
            <NavLink herf="/login">Login</NavLink>
          </li>
          <li>
            <NavLink herf="/signUp">SignUp</NavLink>
          </li>
        </ul>
      </section>
    </nav>
  );
}
