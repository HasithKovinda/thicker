"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import styles from "./Auth.module.css";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/util/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "@/UI/Loading";
import Input from "../Input/Input";
import Button from "../Button/Button";

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
