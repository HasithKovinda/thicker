import Image from "next/image";
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
              <Image
                src={img}
                height={400}
                width={500}
                alt={`image-${index + 1}`}
                blurDataURL={img}
                placeholder="blur"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
