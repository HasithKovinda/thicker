"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ProfileInformation.module.css";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeProfile } from "@/lib/actions/auth/auth";
import { uploadImage } from "@/lib/actions/helper/uploadImage";
import Loading from "@/UI/Loading";
import { type UserModel, type ProfileSettings } from "@/types/model";
import { profileFromSchema } from "@/util/zodSchema/schema";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/util/constant";
import Input from "@/components/Input/Input";

type ImageType = {
  submit: boolean;
  file: File | null;
};

const initialState: ImageType = {
  submit: false,
  file: null,
};

type InputTypes = z.infer<typeof profileFromSchema>;

export default function ProfileInformation() {
  const [image, setImage] = useState<ImageType>(initialState);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputTypes>({ resolver: zodResolver(profileFromSchema) });

  const queryClient = useQueryClient();
  const [dataImg, setData] = useState("");
  const queryData = queryClient.getQueryData<UserModel>(["user"]);
  const { mutate } = useMutation({
    mutationFn: (data: ProfileSettings) => changeProfile(data),
    onSuccess: () => {
      toast.success("Profile settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  async function changeSettings(data: InputTypes) {
    let photo;
    if (image.submit || !image.file) {
      try {
        photo = await uploadImage(dataImg, image.file?.name!);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        return;
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
          <Input
            type="text"
            defaultValue={queryData?.name}
            placeholder="Your User Name"
            name="name"
            register={register}
            error={errors.name}
          />
          <Input
            type="email"
            defaultValue={queryData?.email}
            placeholder="Your Email Address"
            name="email"
            register={register}
            error={errors.email}
          />
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
