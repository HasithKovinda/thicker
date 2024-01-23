"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ProfileInformation.module.css";
import { ChangeEvent, useState } from "react";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/util/constant";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeProfile, getUserSession, uploadImage } from "@/util/actions";
import toast from "react-hot-toast";
import Loading from "@/UI/Loading";

type ImageType = {
  submit: boolean;
  file: File | null;
};

const initialState: ImageType = {
  submit: false,
  file: null,
};

const profileFromSchema = z.object({
  name: z.string().min(4, "name should at least 4 character"),
  email: z.string().email("please add a valid email address"),
});

type InputTypes = z.infer<typeof profileFromSchema>;

export default function ProfileInformation() {
  // const { data: session } = useSession();
  const [image, setImage] = useState<ImageType>(initialState);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<InputTypes>({ resolver: zodResolver(profileFromSchema) });

  const queryClient = useQueryClient();
  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserSession(),
  });
  const [dataImg, setData] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProfileSettings) => changeProfile(data),
    onSuccess: () => {
      toast.success("Profile settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  async function changeSettings(data: InputTypes) {
    let photo;
    if (image.submit || !image.file) {
      try {
        photo = await uploadImage(dataImg);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    }
    const { name, email } = data;
    mutate({ name, email, photo });
  }

  function checkImage(e: ChangeEvent<HTMLInputElement>) {
    setError("");
    console.log(image.file!);
    const file = e.target.files?.[0];
    if (!file) return;
    if (ACCEPTED_IMAGE_TYPES.includes(file?.name)) {
      setError(".jpg, .jpeg, .png and .webp files are accepted.");
      return;
    }
    if (file?.size > MAX_FILE_SIZE) {
      setError("Max file size is 5MB.");
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;

        if (typeof result === "string") {
          const base64String = result.split(",")[1];
          setData(base64String);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      setImage({ submit: true, file: e.target.files[0] });
    }
  }
  const src = image.submit
    ? URL.createObjectURL(image.file!)
    : "/assert/default.jpg";
  return (
    <section className={styles.profile} onSubmit={handleSubmit(changeSettings)}>
      <h2>Your Profile Information</h2>
      <article className={styles.article}>
        <form className={styles.form}>
          <div>
            <label htmlFor="email">Your User Name</label>
            <input
              type="text"
              id="name"
              className={
                errors.name
                  ? `${styles["error-input"]} ${styles.input}`
                  : `${styles.input}`
              }
              defaultValue={queryData?.name!}
              {...register("name")}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name?.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="email">Your Email Address</label>
            <input
              type="email"
              id="email"
              className={
                errors.email
                  ? `${styles["error-input"]} ${styles.input}`
                  : `${styles.input}`
              }
              defaultValue={queryData?.email!}
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email?.message}</span>
            )}
          </div>

          <div className={styles["image-upload"]}>
            <img src={src} alt="logo" className={styles["profile-img"]} />
          </div>
          <div>
            <label className={styles["custom-file-upload"]}>
              <input
                id="profile"
                type="file"
                accept="image/*"
                className={styles.input}
                onChange={checkImage}
              />
              Choose New Photo
            </label>
            {error && <span className={styles.error}>{error}</span>}
          </div>
          <div>
            {isSubmitting ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className={`btn ${styles.save}`}
                disabled={isSubmitting}
              >
                Save Setting
              </button>
            )}
          </div>
        </form>
        <div>
          <img src="/assert/dashboard.jpg" alt="" className={styles.main} />
        </div>
      </article>
    </section>
  );
}
