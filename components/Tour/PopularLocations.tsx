import styles from "./PopularLocations.module.css";

type PopularLocationsPrps = {
  images: string[];
};

export default function PopularLocations({ images }: PopularLocationsPrps) {
  return (
    <div className={`section-center ${styles.popular}`}>
      <div className={styles.heading}>
        <h1>Most popular locations</h1>
        <div className="underline"></div>
      </div>
      <div className={styles.container}>
        {images.map((img, index) => {
          return (
            <div key={index}>
              <img src={img} alt={`image-${index + 1}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
