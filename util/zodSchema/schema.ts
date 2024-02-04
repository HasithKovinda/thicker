import { type ZodType, z } from "zod";
import {
  type SignUpType,
  type QueryType,
  type ResetPasswordType,
} from "@/types/userInput";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const signInFromSchema = z.object({
  email: z.string().email("please add a valid email address"),
  password: z
    .string()
    .min(6, "password should have at least 6 charters")
    .max(12, "password should not be exceed 12 charters"),
});

export const signUpFromSchema: ZodType<SignUpType> = z
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

export const bookingSchema = z.object({
  name: z
    .string({ required_error: "Please enter a value for name" })
    .min(4, "Name should be at least 4 charters")
    .max(15, "Name should bre not exceed 15 charters"),
  email: z
    .string({ required_error: "Please enter a value for email" })
    .email("please enter a valid email"),
  phone: z
    .string({ required_error: "Please enter a value for phone number" })
    .regex(phoneRegex, "Invalid phone number"),
  bookingDate: z
    .string({ required_error: "Please enter a value for booking date" })
    .refine(
      (value) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(value);
      },
      {
        message: "Invalid date format. Please use YYYY-MM-DD",
      }
    )
    .transform((dateString) => new Date(dateString)),
});

export const settingsSchema: ZodType<ResetPasswordType> = z
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

export const querySchema: ZodType<QueryType> = z.object({
  email: z.string().email().optional(),
  message: z
    .string()
    .min(10, "Message should not be at least 10 characters")
    .max(500, "Message should not be exceed 500 characters"),
});

export const profileFromSchema = z.object({
  name: z.string().min(4, "name should at least 4 character"),
  email: z.string().email("please add a valid email address"),
});
