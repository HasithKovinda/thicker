import { Guides } from "@/types/tour";
import styles from "./Description.module.css";
import Facilities from "./Facilities";
import Features from "./Features";
import TourGuides from "./TourGuides";

type DescriptionPropType = {
  guides: Guides[];
};

export default function Description({ guides }: DescriptionPropType) {
  return (
    <section className={styles.section}>
      <h2>About Moscow Red City Land</h2>
      <p className={styles.description}>
        There are many reasons why an executive or VIP would choose personal
        security services. Executives could be in charge of large companies that
        are worth millions or more, leaving them to be a high-valued target for
        robbery, assault, and more. There could be threats made against
        executives and even bribery and blackmail from a member of the public or
        disgruntled employees. When it comes to other VIPs, they do not need
        necessarily need to be
      </p>
      <hr />
      <Features />
      <hr />
      <Facilities />
      <hr />
      <TourGuides guides={guides} />
    </section>
  );
}
