import Wrapper from "@/components/Tour Details/Wrapper";
import styles from "./Row.module.css";
import OtherInformation from "@/components/Tour Details/OtherInformation";

export default function Row() {
  return (
    <main className={`section-center ${styles.main}`}>
      <Wrapper />
      <OtherInformation />
    </main>
  );
}
