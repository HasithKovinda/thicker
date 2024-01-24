"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./Book.module.css";
import { BiUser, BiCalendar, BiEnvelope, BiPhone } from "react-icons/bi";
import { FiUsers, FiBookmark } from "react-icons/fi";
import { UserModel } from "@/types/model";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBooking, getUserSession } from "@/util/actions";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// const schema = z.object({
//   bookingDate: z.string().date(),
// });

const bookingSchema = z.object({
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

type InputTypes = z.infer<typeof bookingSchema>;

type BookingProps = {
  tourId: string;
  price: number;
};

export default function Book({ tourId, price }: BookingProps) {
  // const queryClient = useQueryClient();
  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserSession(),
  });
  // const queryData = queryClient.getQueryData<UserModel>(["user"]);
  // const queryCache = queryClient.getQueryCache();

  console.log("🚀 ~ Book ~ queryData:", queryData);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputTypes>({ resolver: zodResolver(bookingSchema) });
  console.log("suerID", queryData?.id!);
  function handleBookingData(data: InputTypes) {
    console.log(queryData);
    const { name, email, phone, bookingDate } = data;
    createBooking({
      fullName: name,
      email,
      phoneNumber: phone,
      bookingDate,
      price,
      tourId,
      userId: queryData?.id!,
    });
  }
  return (
    <aside className={styles.booking}>
      <section className={styles.container}>
        <h3>Book This Tour</h3>
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleBookingData)}
        >
          <div className={styles["input-container"]}>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              className={!errors.name ? `${styles.space}` : ""}
              {...register("name")}
            />
            <BiUser className={styles.icon} />
          </div>
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
          <div className={styles["input-container"]}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className={!errors.email ? `${styles.space}` : ""}
              {...register("email")}
            />
            <BiEnvelope className={styles.icon} />
          </div>
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
          <div className={styles["input-container"]}>
            <input
              type="tel"
              id="phone"
              placeholder="Phone number"
              {...register("phone")}
              className={!errors.phone ? `${styles.space}` : ""}
            />
            <BiPhone className={styles.icon} />
          </div>
          {errors.phone && (
            <span className={styles.error}>{errors.phone.message}</span>
          )}
          {/* <div className={styles["input-container"]}>
            <input type="date" name="email" id="email" placeholder="Email" />
            <BiCalendar className={styles.icon} />
          </div> */}
          <div className={styles["input-container"]}>
            <input
              type="date"
              id="date"
              placeholder="Booking Date"
              {...register("bookingDate")}
              className={!errors.bookingDate ? `${styles.space}` : ""}
            />
            {/* <FiUsers className={styles.icon} /> */}
          </div>
          {errors.bookingDate && (
            <span className={styles.error}>{errors.bookingDate.message}</span>
          )}
          <div>
            <button className={`btn ${styles["book-btn"]}`}>
              {queryData ? "Book a tour" : "Login to Book a tour"}
            </button>
          </div>
        </form>
      </section>
    </aside>
  );
}
