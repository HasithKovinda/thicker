"use client";

import { tourGuides } from "@/data/static";
import Card from "./Card";
import styles from "./TourGuide.module.css";
import useAnimateCard from "@/hooks/useAnimateCard";
import { NUMBER_OF_MAX_CARD, TOUR_GUIDE_CARD_SIZE } from "@/util/constant";

export default function TourGuide() {
  const numGuides = tourGuides.length;
  const maxCardSize = numGuides * TOUR_GUIDE_CARD_SIZE;
  const maxCardFitToFrame =
    (tourGuides.length - NUMBER_OF_MAX_CARD) * TOUR_GUIDE_CARD_SIZE;

  const elements = tourGuides.length - NUMBER_OF_MAX_CARD + 1;
  const middleElement = Math.floor(elements / 2);
  const moveSize = -middleElement * TOUR_GUIDE_CARD_SIZE;

  const { ref, currentWidth, backToMiddle, backToStart, backToEnd } =
    useAnimateCard<HTMLDivElement>(TOUR_GUIDE_CARD_SIZE, maxCardFitToFrame);

  function handleStart() {
    backToStart();
  }
  function handleMiddle() {
    backToMiddle(moveSize);
  }

  function handleEnd() {
    backToEnd();
  }

  if (ref.current) {
    ref.current.style.width = `${maxCardSize}px`;
  }

  return (
    <section className={`section-center ${styles.guide}`}>
      <h1>Meet Our Tour Guide</h1>
      <main className={styles.main}>
        <div className={styles["guide-container"]} ref={ref}>
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
            onClick={handleStart}
          ></div>
          <div
            className={`${styles.rectangle} ${
              Math.abs(currentWidth) > TOUR_GUIDE_CARD_SIZE &&
              Math.abs(currentWidth) <= Math.abs(moveSize)
                ? styles.active
                : ""
            }`}
            onClick={handleMiddle}
          ></div>
          <div
            className={`${styles.rectangle} ${
              Math.abs(currentWidth) > Math.abs(moveSize) &&
              Math.abs(currentWidth) <= maxCardFitToFrame
                ? styles.active
                : ""
            }`}
            onClick={handleEnd}
          ></div>
        </article>
      </main>
    </section>
  );
}
