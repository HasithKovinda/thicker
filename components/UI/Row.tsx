import OtherInformation from "../Tour Details/OtherInformation";
import Wrapper from "../Tour Details/Wrapper";
import styles from "./Row.module.css";

export default function Row() {
  return (
    <main className={`section-center ${styles.main}`}>
      <Wrapper />
      <OtherInformation />
    </main>
  );
}
