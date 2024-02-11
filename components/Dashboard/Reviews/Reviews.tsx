"use client";
import StarRating from "@/components/Rating/StarRating";
import styles from "./Reviews.module.css";
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserModel } from "@/types/model";
import { createReview } from "@/lib/actions/review/review";
import { fetchParchedTours } from "@/lib/actions/tour/tour";

import Loading from "@/UI/Loading";
import Image from "next/image";
import { type CreateReviewType } from "@/types/model";
import toast from "react-hot-toast";

const reviewSchema = z.object({
  review: z
    .string()
    .min(15, "Your review should have at least 15 characters")
    .max(100, "Your review should not exceed 100 characters"),
  tourName: z.string().trim().min(1, "Select tour that you purchased"),
});

type InputTypes = z.infer<typeof reviewSchema>;

const initialState = {
  name: "",
  image: "",
  id: "",
};

export default function Reviews() {
  const [tour, setTour] = useState<{ id: string; name: string; image: string }>(
    initialState
  );
  const [rating, setRating] = useState(0);
  const [resetRating, setResetRating] = useState(false);
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<UserModel>(["user"]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputTypes>({ resolver: zodResolver(reviewSchema) });

  const { mutate } = useMutation({
    mutationFn: (data: CreateReviewType) => createReview(data),
    onSuccess: () => {
      toast.success("Review created successfully");
      reset();
      setTour(initialState);
      setResetRating(!resetRating);
      queryClient.invalidateQueries({ queryKey: ["review", tour.id] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { data, isPending } = useQuery({
    queryKey: ["bookedToursName"],
    queryFn: () => fetchParchedTours(queryData?.id!),
  });

  function handleInput(inputData: InputTypes) {
    if (!rating) return toast.error("Select value for rating");
    if (!tour.id) return toast.error("Select tour for rating");
    const image = data?.find((tour) => tour.name === inputData.tourName);
    if (!image) return;
    mutate({
      review: inputData.review,
      rating,
      user: queryData?.id!,
      tour: image.id!,
    });
  }

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    const tour = data?.find((tour) => tour.name === event.target.value);
    setTour(tour!);
  }

  if (isPending)
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );

  if (!data) return <h2>Your not purchased any bookings</h2>;

  return (
    <section className={styles.reviews}>
      <div className={styles.heading}>
        <h2>Share Your Experience With Us⭐</h2>
        <p>
          After exploring our captivating tour packages, express your thoughts!
          Your reviews not only help us improve but also guide fellow travelers
          to unforgettable experiences. Let your journey inspire others!
        </p>
      </div>
      <article className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(handleInput)}>
          <div>
            <select
              id="tours"
              className={styles.drop}
              {...register("tourName")}
              onChange={handleSelect}
            >
              <option disabled selected value="">
                Select tour you purchased
              </option>
              {data.map((tour, index) => {
                return (
                  <option value={tour.name} key={index}>
                    {tour.name}
                  </option>
                );
              })}
            </select>
            {errors.tourName && (
              <span className={styles.error}>{errors.tourName.message}</span>
            )}
          </div>
          <div>
            <StarRating
              messages={[
                "Poor 😒",
                "Fair 😢",
                "Good 😗",
                "Very Good 😋",
                "Excellent 🤩",
              ]}
              reset={resetRating}
              onSetRating={setRating}
            />
          </div>
          <textarea
            rows={5}
            cols={50}
            placeholder="Give Your Review"
            {...register("review")}
          ></textarea>
          {errors.review && (
            <span className={styles.error}>{errors.review.message}</span>
          )}
          <div>
            <button className={styles.submit} disabled={isSubmitting}>
              {isSubmitting ? "Creating...:" : "Submit The Review"}
            </button>
          </div>
        </form>
        {tour.image && (
          <article>
            <Image
              src={tour.image}
              alt={tour.image}
              width={400}
              height={400}
              className={styles.image}
            />
            <p className={styles.title}>{tour.name}</p>
          </article>
        )}
      </article>
    </section>
  );
}
