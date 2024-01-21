"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import styles from "./Auth.module.css";

const signUpFromSchema = z
  .object({
    name: z.string().min(4, "name should at least 4 character"),
    email: z.string().email("please add a valid email address"),
    password: z
      .string()
      .min(6, "password should have at least 6 charters")
      .max(12, "password should not be exceed 12 charters"),
    passwordConfirm: z
      .string()
      .min(6, "password should have at least 6 charters")
      .max(12, "password should not be exceed 12 charters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "password and password confirm should match",
    path: ["passwordConfirm"],
  });

type InputTypes = z.infer<typeof signUpFromSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputTypes>({ resolver: zodResolver(signUpFromSchema) });

  async function signUp(data: InputTypes) {
    console.log(data);
  }

  return (
    <section className={`section-center ${styles.signUp}`}>
      <p>Sign Up</p>
      <form className={styles.container} onSubmit={handleSubmit(signUp)}>
        <div>
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={
              errors.name
                ? `${styles["error-input"]} ${styles.input}`
                : `${styles.input}`
            }
          />
          {errors.name && (
            <span className={styles.error}>{errors.name?.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={
              errors.email
                ? `${styles["error-input"]} ${styles.input}`
                : `${styles.input}`
            }
          />
          {errors.email && (
            <span className={styles.error}>{errors.email?.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            minLength={6}
            className={
              errors.password
                ? `${styles["error-input"]} ${styles.input}`
                : `${styles.input}`
            }
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password?.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="re-password">Renter Password</label>
          <input
            type="password"
            id="re-password"
            className={
              errors.passwordConfirm
                ? `${styles["error-input"]} ${styles.input}`
                : `${styles.input}`
            }
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <span className={styles.error}>
              {errors.passwordConfirm?.message}
            </span>
          )}
        </div>
        <div>
          <button type="submit" className={`btn ${styles["signUp-btn"]}`}>
            Sign Up &#x261B;
          </button>
        </div>
      </form>
      <div className={styles.login}>
        <span>
          Already have an account? <Link href="/login">Login In</Link>
        </span>
      </div>
    </section>
  );
}
