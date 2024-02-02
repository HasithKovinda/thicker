import { FieldError, Path, UseFormRegister } from "react-hook-form";
import styles from "./Input.module.css";
import { type UseFromRegisterTypes } from "@/types/input";
import { ComponentPropsWithoutRef } from "react";

type InputProps<T extends UseFromRegisterTypes> = {
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  name: Path<T>;
} & ComponentPropsWithoutRef<"input">;

export default function Input<T extends UseFromRegisterTypes>({
  placeholder,
  register,
  error,
  name,
  ...props
}: InputProps<T>) {
  return (
    <div className={styles["input-container"]}>
      <input
        placeholder={placeholder}
        {...register(name)}
        className={
          error?.message
            ? `${styles["error-input"]} ${styles.input}`
            : `${styles.input}`
        }
        {...props}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
}
