import styles from "./Button.module.css";

type ButtonProps = {
  content: string;
};

export default function Button({ content }: ButtonProps) {
  return <button className={styles.button}>{content}</button>;
}
