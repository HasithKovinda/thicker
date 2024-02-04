import { Guides } from "@/types/model";
import styles from "./TourGuides.module.css";

type TourGuidesPropType = {
  guides: Guides[];
};

export default function TourGuides({ guides }: TourGuidesPropType) {
  return (
    <section className={styles.guides}>
      <h2>Your Tour Guides</h2>
      <div className="underline"></div>
      <article className={styles["guide-container"]}>
        {guides.map((guide, index) => {
          return (
            <div key={index}>
              <img
                src={guide.photo}
                alt={guide.name}
                className={styles.profile}
              />
              <p>{guide.role} Guide</p>
              <span>{guide.name}</span>
            </div>
          );
        })}
      </article>
    </section>
  );
}
