"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from "./Reviews.module.css";
import SingleReview from "./SingleReview";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTopReviews } from "@/util/actions";
import { useEffect, useRef, useState } from "react";
import { NUMBER_OF_MAX_CARD, REVIEW_CARD_Size } from "@/util/constant";

type reviewProps = {
  title: string;
  id?: string;
};

export default function Review({ title, id }: reviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMove = useRef(false);
  const { data } = useQuery({
    queryKey: ["review", id],
    queryFn: () => fetchAllTopReviews(id),
  });
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (data && ref.current) {
      const shiftTransform = () => {
        changeReviewCard();
      };

      const intervalId = setInterval(shiftTransform, 4000);

      return () => clearInterval(intervalId);
    }
  }, [data]);

  if (!data) return <h1>No reviews found</h1>;
  const numberElementsFits = data.length - NUMBER_OF_MAX_CARD;
  const fitElementsWidthSize = numberElementsFits * REVIEW_CARD_Size;

  function changeReviewCard() {
    if (data) {
      const currentTransform =
        ref.current?.style.transform ||
        window.getComputedStyle(ref.current!).getPropertyValue("transform");

      const match = currentTransform.match(/translate3d\(([^,]+),/);
      let currentTranslateX = match ? parseFloat(match[1]) : 0;
      let newTranslateX = isMove.current
        ? currentTranslateX + REVIEW_CARD_Size
        : currentTranslateX - REVIEW_CARD_Size;

      if (newTranslateX === -fitElementsWidthSize) {
        isMove.current = true;
        currentTranslateX = -fitElementsWidthSize;
      }

      if (newTranslateX === 0) {
        currentTranslateX = 0;
        isMove.current = false;
      }

      setImageIndex(newTranslateX);
      ref.current!.style!.transform = `translate3d(${newTranslateX}px, 0, 0)`;
    }
  }

  function handleForward() {
    ref.current!.style!.transform = `translate3d(${
      imageIndex + REVIEW_CARD_Size
    }px, 0, 0)`;
    setImageIndex(imageIndex + REVIEW_CARD_Size);
  }

  function handleBack() {
    ref.current!.style!.transform = `translate3d(${
      imageIndex - REVIEW_CARD_Size
    }px, 0, 0)`;
    setImageIndex(imageIndex - REVIEW_CARD_Size);
  }

  if (data && ref.current) {
    const numberOfReviews = data.length;
    ref.current.style.width = `${numberOfReviews * REVIEW_CARD_Size}px`;
  }

  return (
    <section className={`section-center ${styles.section}`}>
      <div>
        <div className={styles.heading}>
          <div
            className={`${styles.rounded} ${
              Math.abs(imageIndex) === fitElementsWidthSize
                ? styles.disable
                : ""
            }`}
          >
            <button
              className={`${styles.forward} ${
                Math.abs(imageIndex) === fitElementsWidthSize
                  ? styles.disable
                  : ""
              }`}
              onClick={handleBack}
              disabled={Math.abs(imageIndex) === fitElementsWidthSize}
            >
              <BiChevronLeft className={styles.icons} />
            </button>
          </div>
          <h1>{title}</h1>
          <div
            className={`${styles.rounded} ${
              imageIndex === 0 ? styles.disable : ""
            }`}
          >
            <button
              className={`${styles.forward} ${
                imageIndex === 0 ? styles.disable : ""
              }`}
              onClick={handleForward}
              disabled={imageIndex === 0}
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
