import { FetchedReviewType } from "@/types/model";
import { RefObject, useEffect, useRef, useState } from "react";

export default function useAnimateCard<T extends HTMLElement>(
  cardSize: number,
  maxCardFit: number,
  data?: FetchedReviewType[],
  time: number = 4000
) {
  const ref = useRef<T>(null);
  const [currentWidth, setCurrentWidth] = useState(0);
  const isMove = useRef(false);

  useEffect(() => {
    if (data && ref.current) {
      const numberOfReviews = data.length;
      ref.current.style.width = `${numberOfReviews * cardSize}px`;
    }
    const shiftTransform = () => {
      changeCardView();
    };
    const intervalId = setInterval(shiftTransform, time);
    return () => clearInterval(intervalId);
  }, [data]);

  function changeCardView() {
    const currentTransform =
      ref.current?.style.transform ||
      window.getComputedStyle(ref.current!).getPropertyValue("transform");

    const match = currentTransform.match(/translate3d\(([^,]+),/);
    let currentTranslateX = match ? parseFloat(match[1]) : 0;
    let newTranslateX = isMove.current
      ? currentTranslateX + cardSize
      : currentTranslateX - cardSize;

    if (newTranslateX === -maxCardFit) {
      isMove.current = true;
      currentTranslateX = -maxCardFit;
    }

    if (newTranslateX === 0) {
      currentTranslateX = 0;
      isMove.current = false;
    }

    setCurrentWidth(newTranslateX);
    ref.current!.style!.transform = `translate3d(${newTranslateX}px, 0, 0)`;
  }

  function forward() {
    ref.current!.style!.transform = `translate3d(${
      currentWidth + cardSize
    }px, 0, 0)`;
    setCurrentWidth(currentWidth + cardSize);
  }

  function back() {
    ref.current!.style!.transform = `translate3d(${
      currentWidth - cardSize
    }px, 0, 0)`;
    setCurrentWidth(currentWidth - cardSize);
  }

  function backToStart() {
    ref.current!.style!.transform = `translate3d(${0}px, 0, 0)`;
    isMove.current = false;
    setCurrentWidth(0);
  }
  function backToMiddle(moveSize: number) {
    ref.current!.style!.transform = `translate3d(${moveSize}px, 0, 0)`;
    isMove.current = false;
    setCurrentWidth(moveSize);
  }

  function backToEnd() {
    ref.current!.style!.transform = `translate3d(${-maxCardFit}px, 0, 0)`;
    isMove.current = true;
    setCurrentWidth(-maxCardFit);
  }

  return {
    currentWidth,
    ref,
    setCurrentWidth,
    isMove,
    backToStart,
    backToMiddle,
    backToEnd,
    forward,
    back,
  };
}
