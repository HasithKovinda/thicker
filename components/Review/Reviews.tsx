"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from "./Reviews.module.css";
import SingleReview from "./SingleReview";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTopReviews } from "@/util/actions";
import { useEffect,useState } from "react";

type reviewProps = {
  title: string;
  //  reviews:ReviewModel []
};

export default function Review({ title }: reviewProps) {
  const { data, isPending } = useQuery({
    queryKey: ["review"],
    queryFn: () => fetchAllTopReviews(),
  });
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      if (!data) return;
      setImageIndex((prv) => {
        if (data.length - prv > 3) {
          return (prv + 1) % data.length;
        } else {
          return 0;
        }
      });
    }, 5000);
    return () => clearInterval(id);
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
      return ((prv - 1) + (data.length)) % data.length;
    });
  }
 
  return (
    <section className={`section-center ${styles.section}`}>
      <div>
        <div className={styles.heading}>
          <div
            className={`${styles.rounded} ${ imageIndex===0? styles.disable : ""}`}
          >
            <button
              className={`${styles.forward} ${
                imageIndex===0 ? styles.disable : ""
              }`}
              onClick={handleBack}
              disabled={imageIndex===0 ? true : false}
            >
              <BiChevronLeft className={styles.icons} />
            </button>
          </div>
          <h1>{title}</h1>
          <div
            className={`${styles.rounded} ${
              imageIndex=== data.length-3 ? styles.disable : ""
            }`}
          >
            <button
              className={`${styles.forward} ${
                imageIndex=== data.length-3 ? styles.disable : ""
              }`}
              onClick={handleForward}
              disabled={imageIndex=== data.length-3 ? true : false}
            >
              <BiChevronRight className={styles.icons} />
            </button>
          </div>
        </div>
        <div className="underline"></div>
        <main className={styles["reviews-container"]}>
          <div className={styles.container}>
            {data.slice(imageIndex, imageIndex + 3).map((review, index) => {
              return (
                <SingleReview
                  photo={review.user.photo}
                  rating={review.rating}
                  review={review.review}
                  key={index}
                />
              );
            })}
          </div>
        </main>
      </div>
    </section>
  );
}
