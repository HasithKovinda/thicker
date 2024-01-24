import styles from "./OtherInformation.module.css";
import Book from "./Book";
import SocialMedia from "./SocialMedia";

type OtherInformationProps = {
  tourId: string;
  price: number;
};

export default function OtherInformation({
  tourId,
  price,
}: OtherInformationProps) {
  return (
    <section className={styles.other}>
      <Book tourId={tourId} price={price} />
      <SocialMedia />
    </section>
  );
}
