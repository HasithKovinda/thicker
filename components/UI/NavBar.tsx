'use client'

import Link from "next/link";
import styles from  './NavBar.module.css'
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isNavFixed, setIsNavFixed]= useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 80;

      setIsNavFixed(scrollPosition > threshold);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavFixed]);
  return (
    <nav className={`${styles.nav}  ${isNavFixed ? styles.fixed : ''} `}>
       <section className={`section-center ${styles['nav-items']}`}>
        <div>
              <img src="/logo.svg"  alt="logo"/>
          </div>
          <ul>
              <li>
              <Link href='/'>Home</Link>
              </li>
              <li>
              <Link href='/'>About</Link>
              </li>
              <li>
              <Link href='/'>Contact</Link>
              </li>
              <li>
              <Link href='/'>Login</Link>
              </li>
              <li>
              <Link href='/'>SignUp</Link>
              </li>
          </ul>
       </section>
    </nav>
  )
}


