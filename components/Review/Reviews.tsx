"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from "./Reviews.module.css";
import SingleReview from "./SingleReview";
import { useEffect, useState } from "react";

type reviewProps = {
  title: string;
};

const a = [1, 2, 3, 4, 5, 6, 7];

export default function Review({ title }: reviewProps) {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setImageIndex((prv) => {
        if ((a.length-prv)>3) {
          return (prv + 1) % a.length;
        } else {
          return 0;
        }
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className={`section-center ${styles.section}`}>
      <div>
        <div className={styles.heading}>
          <div>
            <BiChevronLeft className={styles.icons} />
          </div>
          <h1>{title}</h1>
          <div>
            <BiChevronRight className={styles.icons} />
          </div>
        </div>
        <div className="underline"></div>
        <main className={styles["reviews-container"]}>
          <div className={styles.container}>
            {a.slice(imageIndex, imageIndex + 3).map((f, i) => {
              return <SingleReview key={i} />;
            })}
          </div>
        </main>
      </div>
    </section>
  );
}
