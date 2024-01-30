import { tourGuides } from "@/data/static";
import Card from "./Card";
import styles from "./TourGuide.module.css";

export default function TourGuide() {
  return (
    <section className={`section-center ${styles.guide}`}>
      <h1>Meet Our Tour Guide</h1>
      <main className={styles.main}>
        <article className={styles.article}>
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
        </article>
      </main>
    </section>
  );
}
