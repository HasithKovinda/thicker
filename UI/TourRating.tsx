import styles from "./TourRating.module.css";

type TourRatingProp = {
  ratingNumber: number;
};

export default function TourRating({ ratingNumber }: TourRatingProp) {
  const widthSize = Number(
    (ratingNumber - Math.floor(ratingNumber)).toFixed(1)
  );
  const applyWith = widthSize === 0 ? 30 : widthSize * 3 * 10;
  const gap = 1 - widthSize;
  return (
    <div className={styles.section}>
      {Array.from({ length: 5 }, (_, i) => {
        if (ratingNumber >= i + 1) {
          return (
            <div className={styles.container} key={i}>
              <div
                className={styles.progress}
                // style={{
                //   width:
                //     ratingNumber - widthSize === i + 1
                //       ? `${applyWith}px`
                //       : `30px`,
                // }}
                style={{ width: `30px` }}
              ></div>
              <img src="/download.png" className={styles.icon} />
            </div>
          );
        } else {
          return (
            <div className={styles.container} key={i}>
              <div
                className={styles.progress}
                style={{
                  width:
                    ratingNumber + gap === i + 1 ? `${applyWith}px` : `0px`,
                }}
              ></div>
              <img src="/download.png" className={styles.icon} />
            </div>
          );
        }
      })}
    </div>
  );
}
