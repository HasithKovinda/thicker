"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./Book.module.css";
import { BiUser, BiEnvelope, BiPhone } from "react-icons/bi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserSession } from "@/lib/actions/auth/auth";
import { createBooking } from "@/lib/actions/booking/booking";
import { bookingSchema } from "@/util/zodSchema/schema";

type InputTypes = z.infer<typeof bookingSchema>;

type BookingProps = {
  tourId: string;
  price: number;
};

export default function Book({ tourId, price }: BookingProps) {
  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserSession(),
  });

  const {
    register,
    handleSubmit,
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
          <div className={styles["input-container"]}>
            <input
              type="date"
              id="date"
              placeholder="Booking Date"
              {...register("bookingDate")}
              className={!errors.bookingDate ? `${styles.space}` : ""}
            />
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
