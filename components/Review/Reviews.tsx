"use client";

import styles from "./Reviews.module.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTopReviews } from "@/lib/actions/review/review";
import SingleReview from "./SingleReview";
import useAnimateCard from "@/hooks/useAnimateCard";
import Loading from "@/UI/Loading";
import { NUMBER_OF_MAX_CARD, REVIEW_CARD_Size } from "@/util/constant";

type reviewProps = {
  title: string;
  id?: string;
};

export default function Review({ title, id }: reviewProps) {
  const { data, isPending } = useQuery({
    queryKey: ["review", id],
    queryFn: () => fetchAllTopReviews(id),
  });

  const numberElementsFits = data?.length! - NUMBER_OF_MAX_CARD;
  const fitElementsWidthSize = numberElementsFits * REVIEW_CARD_Size;

  const {
    ref,
    forward,
    back,
    currentWidth: imageIndex,
  } = useAnimateCard<HTMLDivElement>(
    REVIEW_CARD_Size,
    fitElementsWidthSize,
    data!,
    3000
  );

  if (isPending)
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );

  function handleForward() {
    forward();
  }

  function handleBack() {
    back();
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
            {data?.map((review, index) => {
              return (
                <SingleReview
                  key={index}
                  photo={review.user.photo}
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
