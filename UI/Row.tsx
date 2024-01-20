import Wrapper from "@/components/Tour Details/Wrapper";
import styles from "./Row.module.css";
import OtherInformation from "@/components/Tour Details/OtherInformation";
import { userModel } from "@/types/model";
import { Guides } from "@/types/tour";

type RowPropType = {
  guides: Guides[];
};

export default function Row({ guides }: RowPropType) {
  return (
    <main className={`section-center ${styles.main}`}>
      <Wrapper guides={guides} />
      <OtherInformation />
    </main>
  );
}
