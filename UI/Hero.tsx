"use client";

import styles from "./Hero.module.css";
import Lottie from "lottie-react";
import animationData from "../public/animations/Animation - 1707048118566.json";
import Link from "next/link";

export default function Hero() {
  return (
    <main className={`section-center space-top ${styles.hero}`}>
      <div className={styles.heroText}>
        <h1>Never Stop</h1>
        <span>Exploring</span>
        <p>
          Their house is a museum where people come to see ‘em. They really are
          a scream the Addams Family. These days are all Happy and Free. These
          days are all share them with me oh baby.
        </p>
        <div className={styles.wrap}>
          <Link href="/tours" className={styles.button}>
            view all tours
          </Link>
        </div>
        {/* <button className={`btn ${styles["hero-btn"]}`}>view all tours</button> */}
      </div>
      <div className={`${styles["hero-image"]}`}>
        {/* <img src="/assert/hero.svg" alt="hero" /> */}
        <Lottie animationData={animationData} className={styles.image} />
      </div>
    </main>
  );
}
