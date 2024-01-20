import CoverImage from "../Tour Details/CoverImage";
import styles from "./TourCover.module.css";

export default function TourCover() {
  return (
    <header className={styles.cover}>
      {/* <CoverImage herf="/assert/cover.jpg" /> */}
      <div>
        <h1>Treker is a World Leading Online Tour Booking Platform</h1>
      </div>
    </header>
  );
}
