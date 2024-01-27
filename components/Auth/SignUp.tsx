"use client";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import styles from "./Auth.module.css";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/util/actions";
import { UserModel } from "@/types/model";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { type SignUpType } from "@/types/input";
import Input from "../Input/Input";
import Button from "../Button/Button";

const signUpFromSchema: ZodType<SignUpType> = z
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

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpType>({ resolver: zodResolver(signUpFromSchema) });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (user: UserModel) => signUpUser(user),
    onSuccess: (data) => {
      toast.success("User sign up successfully ");
      reset();
      router.push("/");
    },
    onError: (err) => {
      toast.error("Something went wrong");
    },
  });

  async function signUp(data: SignUpType) {
    const { passwordConfirm, ...user } = data;
    mutate(user as UserModel);
  }

  return (
    <section className={`section-center ${styles.signUp}`}>
      <p>Sign Up</p>
      <form className={styles.container} onSubmit={handleSubmit(signUp)}>
        <Input
          placeholder="User Name"
          register={register}
          name="name"
          type="text"
          error={errors.name}
        />

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

        <Input
          placeholder="Renter Password"
          type="password"
          name="passwordConfirm"
          register={register}
          error={errors.passwordConfirm}
        />

        <div>
          <Button hoverType="bgChange">
            {isPending ? "Loading..." : <span>Sign Up &#x261B;</span>}
          </Button>
        </div>
      </form>
      <div className={styles.login}>
        <span>
          Already have an account? <Link href="/api/auth/signin">Login In</Link>
        </span>
      </div>
    </section>
  );
}
