import styles from "./CoverImage.module.css";

type CoverImageProps = {
  herf: string;
};

export default function CoverImage({ herf }: CoverImageProps) {
  return <img src={herf} alt="" className={styles.hero} />;
}
