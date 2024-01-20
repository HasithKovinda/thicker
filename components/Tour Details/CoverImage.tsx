import styles from "./CoverImage.module.css";

type CoverImageProps = {
  herf: string;
  onMapButtonClick: () => void;
};

export default function CoverImage({
  herf,
  onMapButtonClick,
}: CoverImageProps) {
  return (
    <div
      className={styles.container}
      style={{
        background: `url(${herf})`,
        objectFit: "cover",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <h1>The Star Gazer</h1>
        <button className={`btn ${styles.view}`} onClick={onMapButtonClick}>
          View on Map
        </button>
      </div>
    </div>
  );
}
