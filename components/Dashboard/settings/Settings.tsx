"use client";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Settings.module.css";
import Input, { FormData } from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const settingsSchema: ZodType<FormData> = z
  .object({
    currentPassword: z
      .string()
      .min(6, "password should have at least 6 charters")
      .max(12, "password should not be exceed 12 charters"),
    newPassword: z
      .string()
      .min(6, "password should have at least 6 charters")
      .max(12, "password should not be exceed 12 charters"),
    passwordConfirm: z
      .string()
      .min(6, "password should have at least 6 charters")
      .max(12, "password should not be exceed 12 charters"),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "password and password confirm should match",
    path: ["passwordConfirm"],
  });

// type InputTypes = z.infer<typeof settingsSchema>;

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(settingsSchema) });

  function abc(data: FormData) {
    console.log(data);
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
        <Button content="reset password" />
      </form>
    </section>
  );
}
