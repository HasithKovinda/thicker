import { imageGallery } from "@/data/static";
import styles from "./Gallery.module.css";
import Image from "next/image";

export default function Gallery() {
  return (
    <section className={`section-center ${styles.gallery}`}>
      <div className={styles.heading}>
        <h1>Explore Our Visual Journey</h1>
        <div className="underline"></div>
      </div>
      <div className={styles.container}>
        {imageGallery.map((img, index) => {
          return (
            <div className={styles["img-area"]} key={index}>
              <div className={styles["image-box"]}>
                <Image
                  src={img.src}
                  height={300}
                  width={480}
                  alt={img.title}
                  blurDataURL={img.src}
                  placeholder="blur"
                  loading="lazy"
                />
              </div>
              <div className={styles["img-text"]}>
                <h3>{img.title}</h3>
                <p>{img.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
