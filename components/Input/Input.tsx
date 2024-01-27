import { FieldError, Path, UseFormRegister } from "react-hook-form";
import styles from "./Input.module.css";
import { type UseFromRegisterTypes } from "@/types/input";

type InputProps<T extends UseFromRegisterTypes> = {
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  name: Path<T>;
};

export default function Input<T extends UseFromRegisterTypes>({
  type,
  placeholder,
  register,
  error,
  name,
}: InputProps<T>) {
  return (
    <div className={styles["input-container"]}>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={
          error?.message
            ? `${styles["error-input"]} ${styles.input}`
            : `${styles.input}`
        }
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
}
