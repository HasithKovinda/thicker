import Wrapper from "@/components/Tour Details/Wrapper";
import styles from "./Row.module.css";
import OtherInformation from "@/components/Tour Details/OtherInformation";
import { Guides } from "@/types/tour";

type RowPropType = {
  guides: Guides[];
  tourId: string;
  price: number;
};

export default function Row({ guides, tourId, price }: RowPropType) {
  return (
    <main className={`section-center ${styles.main}`}>
      <Wrapper guides={guides} />
      <OtherInformation tourId={tourId} price={price} />
    </main>
  );
}
