"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from "./Reviews.module.css";
import SingleReview from "./SingleReview";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTopReviews } from "@/util/actions";
import { useEffect, useRef, useState } from "react";

type reviewProps = {
  title: string;
  id?: string;
};

export default function Review({ title, id }: reviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { data, isPending } = useQuery({
    queryKey: ["review", id],
    queryFn: () => fetchAllTopReviews(id),
  });
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    // const id = setInterval(() => {
    //   if (!data) return;
    //   setImageIndex((prv) => {
    //     if (data.length - prv > 3) {
    //       return (prv + 1) % data.length;
    //     } else {
    //       return 0;
    //     }
    //   });
    // }, 5000);
    // return () => clearInterval(id);
    let isBegin = false;
    if (data && ref.current) {
      const shiftTransform = () => {
        const currentTransform =
          ref.current?.style.transform ||
          window.getComputedStyle(ref.current!).getPropertyValue("transform");

        const match = currentTransform.match(/translate3d\(([^,]+),/);
        let currentTranslateX = match ? parseFloat(match[1]) : 0;
        console.log(
          "🚀 ~ shiftTransform ~ currentTranslateX:",
          currentTranslateX
        );

        let newTranslateX = isBegin
          ? currentTranslateX + 467
          : currentTranslateX - 467;

        console.log("🚀 ~ shiftTransform ~ newTranslateX:", newTranslateX);
        if (newTranslateX === -2335) {
          isBegin = true;
          currentTranslateX = -2335;
        }

        if (newTranslateX === 0) {
          currentTranslateX = 0;
          isBegin = false;
        }

        ref.current!.style!.transform = `translate3d(${newTranslateX}px, 0, 0)`;
      };

      const intervalId = setInterval(shiftTransform, 4000);

      return () => clearInterval(intervalId);
    }
  }, [data]);

  if (!data) return <h1>No reviews found</h1>;

  function handleForward() {
    if (!data) return;
    setImageIndex((prv) => {
      return (prv + 1) % data.length;
    });
  }

  function handleBack() {
    if (!data) return;
    setImageIndex((prv) => {
      return (prv - 1 + data.length) % data.length;
    });
  }

  if (data && ref.current) {
    const numberOfReviews = data.length;
    ref.current.style.width = `${numberOfReviews * 467}px`;
  }

  return (
    <section className={`section-center ${styles.section}`}>
      <div>
        <div className={styles.heading}>
          <div
            className={`${styles.rounded} ${
              imageIndex === 0 ? styles.disable : ""
            }`}
          >
            <button
              className={`${styles.forward} ${
                imageIndex === 0 ? styles.disable : ""
              }`}
              onClick={handleBack}
              disabled={imageIndex === 0 ? true : false}
            >
              <BiChevronLeft className={styles.icons} />
            </button>
          </div>
          <h1>{title}</h1>
          <div
            className={`${styles.rounded} ${
              imageIndex === data.length - 3 ? styles.disable : ""
            }`}
          >
            <button
              className={`${styles.forward} ${
                imageIndex === data.length - 3 ? styles.disable : ""
              }`}
              onClick={handleForward}
              disabled={imageIndex === data.length - 3 ? true : false}
            >
              <BiChevronRight className={styles.icons} />
            </button>
          </div>
        </div>
        <div className="underline"></div>
        <main className={styles["reviews-container"]}>
          <div className={styles.container} ref={ref}>
            {data.map((review, index) => {
              return (
                <SingleReview
                  key={index}
                  photo={review.user.photo}
                  rating={review.rating}
                  review={review.review}
                  name={review.user.name}
                />
              );
            })}
          </div>
        </main>
      </div>
    </section>
  );
}
