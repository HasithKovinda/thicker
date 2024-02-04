"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import styles from "./Auth.module.css";
import Loading from "@/UI/Loading";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { signInFromSchema } from "@/util/zodSchema/schema";

type LoginProps = {
  callbackUrl?: string;
};

type InputTypes = z.infer<typeof signInFromSchema>;

export default function Login({ callbackUrl }: LoginProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputTypes>({ resolver: zodResolver(signInFromSchema) });

  const queryClient = useQueryClient();

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
    queryClient.invalidateQueries({ queryKey: ["user"] });
    toast.success("Login Successfully Done");

    router.push(callbackUrl ? callbackUrl : "/");
  }
  return (
    <section className={`section-center ${styles.signUp}`}>
      <p>Sign Up</p>
      <form onSubmit={handleSubmit(login)} className={styles.container}>
        <Input
          placeholder="Email Address"
          type="email"
          name="email"
          register={register}
          error={errors.email}
        />

        <Input
          placeholder="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
        />

        <div>
          {isSubmitting ? (
            <Loading />
          ) : (
            <Button hoverType="bgChange" disabled={isSubmitting}>
              Login
            </Button>
          )}
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
