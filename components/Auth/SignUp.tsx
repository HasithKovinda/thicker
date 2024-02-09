"use client";

import styles from "./Auth.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/lib/actions/auth/auth";
import { UserModel } from "@/types/model";
import { useRouter } from "next/navigation";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { signUpFromSchema } from "@/util/zodSchema/schema";
import { type SignUpType } from "@/types/userInput";

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
    onSuccess: () => {
      toast.success("User sign up successfully ");
      reset();
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err.message);
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
