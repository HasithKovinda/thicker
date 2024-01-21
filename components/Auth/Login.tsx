"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import styles from "./Auth.module.css";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type LoginProps = {
  callbackUrl?: string;
};

const signUpFromSchema = z.object({
  email: z.string().email("please add a valid email address"),
  password: z
    .string()
    .min(6, "password should have at least 6 charters")
    .max(12, "password should not be exceed 12 charters"),
});

type InputTypes = z.infer<typeof signUpFromSchema>;

export default function Login({ callbackUrl }: LoginProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputTypes>({ resolver: zodResolver(signUpFromSchema) });

  async function login(data: InputTypes) {
    const res = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!res?.ok) {
      toast.error(res?.error!);
      return;
    }
    toast.success("Login Successfully Done");
    router.push(callbackUrl ? callbackUrl : "/");
  }
  return (
    <section className={`section-center ${styles.signUp}`}>
      <p>Sign Up</p>
      <form onSubmit={handleSubmit(login)} className={styles.container}>
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
          <button
            type="submit"
            className={`btn ${styles["signUp-btn"]}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading.." : "Login"}
          </button>
        </div>
      </form>
      <div className={styles.login}>
        <span>
          Don't have a account? <Link href="/signUp">Sign Up</Link> Now
        </span>
      </div>
    </section>
  );
}
