import styles from "./Row.module.css";
import Wrapper from "@/components/Tour Details/Wrapper";
import OtherInformation from "@/components/Tour Details/OtherInformation";
import { type Guides } from "@/types/model";

type RowPropType = {
  guides: Guides[];
  tourId: string;
  price: number;
  description: string;
  title: string;
};

export default function Row({
  guides,
  tourId,
  price,
  description,
  title,
}: RowPropType) {
  return (
    <main className={`section-center ${styles.main}`}>
      <Wrapper guides={guides} description={description} title={title} />
      <OtherInformation tourId={tourId} price={price} />
    </main>
  );
}
