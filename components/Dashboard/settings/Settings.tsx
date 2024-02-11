"use client";

import styles from "./Settings.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { resetPassword } from "@/lib/actions/auth/auth";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { settingsSchema } from "@/util/zodSchema/schema";
import { type UserModel } from "@/types/model";
import { type ResetPasswordType } from "@/types/userInput";

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordType>({ resolver: zodResolver(settingsSchema) });

  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<UserModel>(["user"]);
  const { mutate } = useMutation({
    mutationFn: (data: { userId: string; options: ResetPasswordType }) =>
      resetPassword(data.userId, data.options),
    onSuccess: (data) => {
      toast.success("Password Reset Successfully");
      signOut({ callbackUrl: process.env.NEXT_PUBLIC_LOGIN_URL });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function abc(data: ResetPasswordType) {
    if (!queryData?.id) return;
    mutate({ userId: queryData.id, options: data });
  }

  return (
    <section>
      <div className={styles.heading}>
        <h2>Secure Your Account</h2>
        <p>
          Enhance your account's security on our user-friendly platform. This
          will to ensure your account safe and personalized experience while
          exploring our diverse tour packages.
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(abc)}>
        <Input
          type="password"
          placeholder="Your Current Password"
          name="currentPassword"
          register={register}
          error={errors.currentPassword}
        />
        <Input
          type="password"
          placeholder="New Password"
          name="newPassword"
          register={register}
          error={errors.newPassword}
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          name="passwordConfirm"
          register={register}
          error={errors.passwordConfirm}
        />
        <Button hoverType="transform" disabled={isSubmitting}>
          {isSubmitting ? "Updating.." : "reset password"}
        </Button>
      </form>
    </section>
  );
}
