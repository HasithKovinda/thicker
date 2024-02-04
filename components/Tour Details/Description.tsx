import { type Guides } from "@/types/model";
import styles from "./Description.module.css";
import Facilities from "./Facilities";
import Features from "./Features";
import TourGuides from "./TourGuides";

type DescriptionPropType = {
  guides: Guides[];
  description: string;
  title: string;
};

export default function Description({
  guides,
  description,
  title,
}: DescriptionPropType) {
  return (
    <section className={styles.section}>
      <h2>About {title}</h2>
      <p className={styles.description}>{description}</p>
      <hr />
      <Features />
      <hr />
      <Facilities />
      <hr />
      <TourGuides guides={guides} />
    </section>
  );
}
