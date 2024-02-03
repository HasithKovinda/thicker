"use client";

import { ZodType, z } from "zod";
import styles from "./Query.module.css";
import { QueryType } from "@/types/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserModel } from "@/types/model";
import { createQuery } from "@/util/actions";

const querySchema: ZodType<QueryType> = z.object({
  email: z.string().email().optional(),
  message: z
    .string()
    .min(10, "Message should not be at least 10 characters")
    .max(500, "Message should not be exceed 500 characters"),
});

export default function Query() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QueryType>({ resolver: zodResolver(querySchema) });

  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<UserModel>(["user"]);

  const { mutate } = useMutation({
    mutationFn: (data: QueryType) => createQuery(data, queryData?.id!),
    onSuccess: () => {
      toast.success("Query Send Successfully");
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  function handleInput(data: QueryType) {
    let email = data.email ? data.email : queryData?.email;
    mutate({ message: data.message, email });
  }

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h1>Ask Us Anything ❓</h1>
        <p>
          Welcome to our Query page! Whether you have inquiries about tours,
          bookings, or any aspect of our service, feel free to ask. Your
          questions help us serve you better. Leave your query below, and our
          dedicated team will provide you with the assistance you need. We're
          here to ensure your journey with us is smooth and memorable.
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(handleInput)}>
        <div>
          <Input
            placeholder="Your Email(Optional)"
            type="email"
            name="email"
            register={register}
            error={errors.email}
            defaultValue={queryData?.email}
          />
          <div>
            <textarea
              rows={10}
              cols={50}
              placeholder="Your Query"
              {...register("message")}
            ></textarea>
            {errors.message && (
              <span className={styles.error}>{errors.message.message}</span>
            )}
          </div>
          <Button hoverType="transform" disabled={isSubmitting}>
            {isSubmitting ? "submitting...." : "send query"}
          </Button>
        </div>
      </form>
    </section>
  );
}
