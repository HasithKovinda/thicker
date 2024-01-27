import { FieldError, UseFormRegister } from "react-hook-form";
import styles from "./Input.module.css";
export type FormData = {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
};

type InputProps = {
  type: string;
  placeholder: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  name: ValidFieldNames;
};

type ValidFieldNames = "newPassword" | "currentPassword" | "passwordConfirm";

export default function Input({
  type,
  placeholder,
  register,
  error,
  valueAsNumber,
  name,
}: InputProps) {
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
