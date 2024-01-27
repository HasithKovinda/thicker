import { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  hoverType: "bgChange" | "transform";
} & ComponentPropsWithoutRef<"button">;

export default function Button({ children, hoverType, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        hoverType === "bgChange" ? styles.bgChange : styles.transform
      } `}
      {...props}
    >
      {children}
    </button>
  );
}
