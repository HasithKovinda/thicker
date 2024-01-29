"use server";
import bcrypt from "bcrypt";
import connect from "@/DB/db";
import Tours from "@/model/Tours";
import { Difficulty } from "@/types/enum";
import { TourModel, UserModel, type ReviewModel } from "@/types/model";
import {
  type NewBookingType,
  type Filter,
  type PopularTour,
  FetchedBookingType,
  BookPagination,
  FetchedReviewType,
  CreateReviewType,
} from "@/types/tour";
import {
  DEFAULT_DURATION,
  DEFAULT_GROUP_SIZE,
  DEFAULT_PRICE,
  DEFAULT_RATING,
  PAGE_SIZE,
} from "./constant";
import Review from "@/model/review";
import User from "@/model/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import Booking from "@/model/booking";
import { CgLayoutGrid } from "react-icons/cg";
import mongoose from "mongoose";
import { ResetPasswordType } from "@/types/input";

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

export async function fetchAllTopReviews(
  id?: string
): Promise<FetchedReviewType[]> {
  await connect();
  const options = id
    ? { rating: { $eq: 5 }, tour: id }
    : { rating: { $eq: 5 } };
  const allReviews: FetchedReviewType[] = await Review.find(options)
    .sort({ createdAt: -1 })
    .limit(8)
    .populate({ path: "user" })
    .lean();
  const data: FetchedReviewType[] = JSON.parse(JSON.stringify(allReviews));
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

export async function createBooking(bookingData: Omit<NewBookingType, "id">) {
  try {
    await Booking.create(bookingData);
    return "Booking created successfully";
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchBookings(
  page: number,
  userId: string
): Promise<BookPagination | null> {
  try {
    const limit = PAGE_SIZE;
    const skip = (page - 1) * limit;
    const numberBookings = await Booking.countDocuments({ userId });
    const bookings: FetchedBookingType[] = await Booking.find({ userId })
      .skip(skip)
      .limit(limit)
      .populate({ path: "tourId" })
      .lean();

    const res = JSON.parse(JSON.stringify(bookings));

    const data: BookPagination = {
      numberOfResults: numberBookings,
      bookings: res,
    };
    return data;
  } catch (error) {
    return null;
  }
}

export async function fetchParchedTours(
  userId: string
): Promise<{ id: string; name: string; image: string }[] | null> {
  try {
    const uniqueTourIds = await Booking.distinct("tourId", { userId });
    if (!uniqueTourIds.length) return null;
    const uniqueBookings: FetchedBookingType[] = await Promise.all(
      uniqueTourIds.map(async (tourId) => {
        const booking: FetchedBookingType | null = await Booking.findOne({
          userId,
          tourId,
        })
          .populate("tourId")
          .lean();
        return booking!;
      })
    );
    if (!uniqueBookings.length) return null;
    const bookedToursNames: { id: string; name: string; image: string }[] =
      uniqueBookings.map((book) => {
        return {
          id: book.tourId._id,
          name: book?.tourId.name,
          image: book?.tourId.imageCover,
        };
      });
    return bookedToursNames;
  } catch (error) {
    throw new Error("something went wrong");
  }
}

export async function createReview(review: CreateReviewType) {
  const id = new mongoose.Types.ObjectId(review.tour);
  await Review.create(review);
  const res: { id: string; nRating: number; avgRating: number }[] =
    await Review.aggregate([
      { $match: { tour: id } },
      {
        $group: {
          _id: "$tour",
          nRating: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
    ]);
  await Tours.findByIdAndUpdate(
    { _id: id },
    {
      ratingsAverage: res[0].avgRating.toFixed(1),
      ratingsQuantity: res[0].nRating,
    }
  );
}

export async function resetPassword(
  userId: string,
  options: ResetPasswordType
): Promise<String> {
  const { currentPassword, newPassword, passwordConfirm } = options;
  if (newPassword.trim() !== passwordConfirm.trim())
    throw new Error("Password should match to password confirm");
  try {
    const user: UserModel | null = await User.findById({ _id: userId })
      .select("+password")
      .lean();
    if (!user) {
      throw new Error("User not found");
    }
    const { password } = user;
    const isValid = await bcrypt.compare(currentPassword, password);
    if (!isValid) {
      throw new Error("Password not matched");
    }
    const newHashPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      { _id: userId },
      { password: newHashPassword }
    );
    return "Password Updated Successfully";
  } catch (error) {
    // if (error instanceof Error) {
    //   throw new Error(error.message);
    // }
    // throw new Error("Something went wrong");
    throw error;
  }
}
