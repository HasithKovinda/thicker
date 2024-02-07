import { imageGallery } from "@/data/static";
import styles from "./Gallery.module.css";

export default function Gallery() {
  return (
    <section className={`section-center ${styles.gallery}`}>
      <div className={styles.container}>
        {imageGallery.map((img, index) => {
          return (
            <div className={styles["img-area"]} key={index}>
              <div className={styles["image-box"]}>
                <img src={img.src} alt={img.title} />
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
