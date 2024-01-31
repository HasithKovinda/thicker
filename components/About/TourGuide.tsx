"use client";

import { tourGuides } from "@/data/static";
import Card from "./Card";
import styles from "./TourGuide.module.css";
import { useEffect, useRef, useState } from "react";
import { NUMBER_OF_MAX_CARD, TOUR_GUIDE_CARD_SIZE } from "@/util/constant";

export default function TourGuide() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentWidth, setCurrentWidth] = useState(0);
  const isMove = useRef(false);

  useEffect(() => {
    const shiftTransform = () => {
      changeReviewCard();
    };
    const intervalId = setInterval(shiftTransform, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const numGuides = tourGuides.length;
  const maxCardSize = numGuides * TOUR_GUIDE_CARD_SIZE;
  const maxCardFitToFrame =
    (tourGuides.length - NUMBER_OF_MAX_CARD) * TOUR_GUIDE_CARD_SIZE;

  const elements = tourGuides.length - NUMBER_OF_MAX_CARD + 1;
  const middleElement = Math.floor(elements / 2);
  const moveSize = -middleElement * TOUR_GUIDE_CARD_SIZE;

  function changeReviewCard() {
    const currentTransform =
      ref.current?.style.transform ||
      window.getComputedStyle(ref.current!).getPropertyValue("transform");

    const match = currentTransform.match(/translate3d\(([^,]+),/);
    let currentTranslateX = match ? parseFloat(match[1]) : 0;
    let newTranslateX = isMove.current
      ? currentTranslateX + TOUR_GUIDE_CARD_SIZE
      : currentTranslateX - TOUR_GUIDE_CARD_SIZE;

    if (newTranslateX === -maxCardFitToFrame) {
      isMove.current = true;
      currentTranslateX = -maxCardFitToFrame;
    }

    if (newTranslateX === 0) {
      currentTranslateX = 0;
      isMove.current = false;
    }

    setCurrentWidth(newTranslateX);
    ref.current!.style!.transform = `translate3d(${newTranslateX}px, 0, 0)`;
  }

  function backToStart() {
    ref.current!.style!.transform = `translate3d(${0}px, 0, 0)`;
    isMove.current = false;
    setCurrentWidth(0);
  }
  function backToMiddle() {
    ref.current!.style!.transform = `translate3d(${moveSize}px, 0, 0)`;
    isMove.current = false;
    console.log("moveSize", moveSize);
    setCurrentWidth(moveSize);
  }

  function backToEnd() {
    ref.current!.style!.transform = `translate3d(${-maxCardFitToFrame}px, 0, 0)`;
    isMove.current = true;
    setCurrentWidth(-maxCardFitToFrame);
  }

  if (ref.current) {
    ref.current.style.width = `${maxCardSize}px`;
  }

  return (
    <section className={`section-center ${styles.guide}`}>
      <h1>Meet Our Tour Guide</h1>
      <main className={styles.main}>
        <div className={styles.article} ref={ref}>
          {tourGuides.map((guide, index) => {
            return (
              <Card
                name={guide.name}
                path={guide.path}
                role={guide.role}
                key={index}
              />
            );
          })}
        </div>
        <article className={styles.move}>
          <div
            className={`${styles.rectangle} ${
              Math.abs(currentWidth) <= TOUR_GUIDE_CARD_SIZE
                ? styles.active
                : ""
            }`}
            onClick={backToStart}
          ></div>
          <div
            className={`${styles.rectangle} ${
              Math.abs(currentWidth) > TOUR_GUIDE_CARD_SIZE &&
              Math.abs(currentWidth) <= Math.abs(moveSize)
                ? styles.active
                : ""
            }`}
            onClick={backToMiddle}
          ></div>
          <div
            className={`${styles.rectangle} ${
              Math.abs(currentWidth) > Math.abs(moveSize) &&
              Math.abs(currentWidth) <= maxCardFitToFrame
                ? styles.active
                : ""
            }`}
            onClick={backToEnd}
          ></div>
        </article>
      </main>
    </section>
  );
}
