import styles from "./Content.module.css";

export default function Content({ children }: { children: React.ReactNode }) {
  return <section className={styles.section}>{children}</section>;
}
