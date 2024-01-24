"use server";
import bcrypt from "bcrypt";
import connect from "@/DB/db";
import Tours from "@/model/Tours";
import { Difficulty } from "@/types/enum";
import { TourModel, UserModel, type ReviewModel } from "@/types/model";
import { type BookingType, type Filter, type PopularTour } from "@/types/tour";
import {
  DEFAULT_DURATION,
  DEFAULT_GROUP_SIZE,
  DEFAULT_PRICE,
  DEFAULT_RATING,
} from "./constant";
import Review from "@/model/review";
import User from "@/model/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import Booking from "@/model/booking";
import { CgLayoutGrid } from "react-icons/cg";

//Auth Sever Actions

export async function signUpUser(user: Omit<UserModel, "photo" | "role">) {
  const role = "user";

  try {
    const password = await bcrypt.hash(user.password, 10);
    await User.create({ ...user, password, role });
    return "user created successfully";
  } catch (error) {
    throw new Error("Can not create the user");
  }
}

export async function changeProfile({ name, email, photo }: ProfileSettings) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) throw new Error("User not found");
  const id = session.user.id;
  try {
    const updateData: ProfileSettings = { name, email };
    if (photo) {
      updateData.photo = photo;
    }
    const user = await User.findByIdAndUpdate(id, updateData).lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserSession(): Promise<Omit<
  UserModel,
  "password"
> | null> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;
    const data = await User.findById(session.user.id).lean();
    if (!data) return null;
    const user: Omit<UserModel, "password"> = {
      id: data._id.toString(),
      name: data.name,
      email: data.email,
      photo: data.photo,
      role: data.role,
    };

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAllTours(): Promise<PopularTour[]> {
  await connect();
  const tours = await Tours.find();
  const tourList: PopularTour[] = tours.map((tour) => {
    return {
      name: tour.name,
      slug: tour.slug,
      duration: tour.duration,
      price: tour.price,
      startLocation: tour.startLocation.description,
      imageCover: tour.imageCover,
      ratingsAverage: tour.ratingsAverage,
      ratingsQuantity: tour.ratingsQuantity,
      summary: tour.summary,
      maxGroupSize: tour.maxGroupSize,
      difficulty: tour.difficulty,
    };
  });
  return tourList;
}

export async function fetchMostPopularTour(): Promise<PopularTour[]> {
  await connect();
  const tours: TourModel[] = await Tours.find();
  const sortByAvgRating = tours.sort(
    (a, b) => b.ratingsAverage - a.ratingsAverage
  );

  const mostPopularTour = sortByAvgRating.splice(0, 3);
  const tourList: PopularTour[] = mostPopularTour.map((tour) => {
    return {
      name: tour.name,
      slug: tour.slug,
      duration: tour.duration,
      price: tour.price,
      startLocation: tour.startLocation.description,
      imageCover: tour.imageCover,
      ratingsAverage: tour.ratingsAverage,
      ratingsQuantity: tour.ratingsQuantity,
      summary: tour.summary,
      maxGroupSize: tour.maxGroupSize,
      difficulty: tour.difficulty,
    };
  });
  return tourList;
}

export async function filterTours({
  price,
  groupSize,
  duration,
  rating,
  difficulty,
}: Filter): Promise<PopularTour[]> {
  await connect();
  let tours: PopularTour[] = await fetchAllTours();
  if (
    !(price !== DEFAULT_PRICE) &&
    !(groupSize !== DEFAULT_GROUP_SIZE) &&
    !(duration !== DEFAULT_DURATION) &&
    !(rating !== DEFAULT_RATING) &&
    difficulty === Difficulty.ALL
  ) {
    return tours;
  }

  const filters = [
    (tour: PopularTour) =>
      difficulty !== Difficulty.ALL && tour.difficulty === difficulty,
    (tour: PopularTour) => price && tour.price >= price,
    (tour: PopularTour) => groupSize && tour.maxGroupSize >= groupSize,
    (tour: PopularTour) => duration && tour.duration >= duration,
    (tour: PopularTour) => rating && rating! <= tour.ratingsAverage,
  ];

  if (difficulty === Difficulty.ALL) {
    filters.shift();
  }

  tours = tours.filter((tour) => filters.every((filter) => filter(tour)));
  return tours;
}

export async function fetchAllTopReviews(id?: string): Promise<ReviewModel[]> {
  await connect();
  const options = id
    ? { rating: { $eq: 5 }, tour: id }
    : { rating: { $eq: 5 } };
  const allReviews: ReviewModel[] = await Review.find(options)
    .limit(20)
    .populate({ path: "user" })
    .lean();
  const data: ReviewModel[] = JSON.parse(JSON.stringify(allReviews));
  return data;
}

export async function fetchSingleTour(slug: string): Promise<TourModel | null> {
  try {
    await connect();
    const rowData: TourModel | null = await Tours.findOne({ slug })
      .populate({
        path: "guides",
        select: "-_id -__v -active",
      })
      .lean();
    if (!rowData) return null;
    const data: TourModel = JSON.parse(JSON.stringify(rowData));
    // const tour: TourModel[] = rowData.toObject();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("There was error in fetching data");
  }
}

export async function uploadImage(
  baseString: string,
  fileName: string
): Promise<string> {
  const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

  if (!CLOUD_NAME || !API_KEY || API_SECRET) {
    throw new Error("Please setup env values");
  }

  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });

  type CloudinaryUploadResult = {
    url: string;
    secure_url: string;
  };
  const arrayBuffer = Buffer.from(baseString, "base64").buffer;

  const blob = new Blob([arrayBuffer]);

  const file = new File([blob], fileName);

  const arrayBufferTwo = await (file as Blob).arrayBuffer();

  const buffer = new Uint8Array(arrayBufferTwo);
  try {
    const photo: CloudinaryUploadResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: ["user-profile-image"],
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result!);
            }
          )
          .end(buffer);
      }
    );
    const data = photo.url;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot upload the image!");
  }
}

export async function createBooking(bookingData: Omit<BookingType, "id">) {
  console.log("🚀 ~ createBooking ~ bookingData:", bookingData);
  console.log("dasdsad");
  try {
    const booking = await Booking.create(bookingData);
    return "Booking created successfully";
  } catch (error) {
    return null;
    console.log(error);
  }
  // console.log("🚀 ~ createBooking ~ booking:", booking);
}
