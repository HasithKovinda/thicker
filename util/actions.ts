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
  BOOKING_PAGE_SIZE,
  TOUR_PAGE_SIZE,
} from "./constant";
import Review from "@/model/review";
import User from "@/model/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { v2 as cloudinary } from "cloudinary";
import Booking from "@/model/booking";

import mongoose from "mongoose";
import { QueryType, ResetPasswordType } from "@/types/input";
import Query from "@/model/query";

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

const toursData = [
  {
    startLocation: {
      description: "Oxford, England",
      type: "Point",
      coordinates: [-1.2577, 51.752],
    },
    ratingsAverage: 4.6,
    ratingsQuantity: 12,
    images: [
      "https://res.cloudinary.com/dehxgov2k/image/upload/v1706949543/Tours/youwd55iwrpga21smnnr.jpg",
      "https://res.cloudinary.com/dehxgov2k/image/upload/v1706949517/Tours/zzmvwtfvefkoit76lkdh.jpg",
      "https://res.cloudinary.com/dehxgov2k/image/upload/v1706950257/Tours/zyhoq3ttdlv0bgwpy39q.jpg",
    ],
    startDates: [
      "2022-07-05T09:00:00.000Z",
      "2022-10-15T09:00:00.000Z",
      "2023-04-01T09:00:00.000Z",
    ],
    name: "Oxford University Tour",
    duration: 2,
    maxGroupSize: 10,
    guides: ["5c8a22c62f8fb814b56fa18b", "5c8a23412f8fb814b56fa18c"],
    price: 980,
    difficulty: "easy",
    summary:
      "Explore the historic halls and prestigious colleges of Oxford University on this guided tour.",
    description:
      "Step into the hallowed halls of Oxford University, one of the world's oldest and most prestigious educational institutions, and discover the secrets of its storied past. Explore the university's historic colleges, libraries, and chapels as you stroll through its picturesque campus, and learn about the famous scholars and literary figures who have walked its cobblestone streets. Visit iconic landmarks such as the Bodleian Library, Christ Church Cathedral, and Radcliffe Camera, and marvel at the stunning architecture and timeless beauty of these historic buildings. With knowledgeable guides leading the way, you'll gain insight into the university's rich history, academic traditions, and cultural significance. Whether you're a prospective student, a history buff, or simply curious to learn more, this guided tour offers a fascinating glimpse into the heart of Oxford.",
    imageCover:
      "https://res.cloudinary.com/dehxgov2k/image/upload/v1706949537/Tours/rbyyeom0o88swfeeux1d.jpg",
    slug: "oxford-university-tour",
    locations: [
      {
        description: "Bodleian Library",
        type: "Point",
        coordinates: [-1.2572, 51.7547],
        day: 1,
      },
      {
        description: "Ashmolean Museum",
        type: "Point",
        coordinates: [-1.2602, 51.755],
        day: 1,
      },
      {
        description: "Oxford Botanic Garden",
        type: "Point",
        coordinates: [-1.252, 51.7512],
        day: 1,
      },
      {
        description: "Magdalen College",
        type: "Point",
        coordinates: [-1.2434, 51.7528],
        day: 2,
      },
      {
        description: "University of Oxford Museum of Natural History",
        type: "Point",
        coordinates: [-1.2573, 51.758],
        day: 2,
      },
    ],
  },
];

export async function fetchMostPopularTour(): Promise<PopularTour[]> {
  // await Tours.insertMany(toursData);
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

export async function countTours(): Promise<number> {
  const res = await Tours.countDocuments();
  return res;
}

export async function filterTours(
  currentPage: number,
  { price, groupSize, duration, rating, difficulty, country }: Filter
): Promise<{ count: number; tours: PopularTour[] }> {
  const limit = TOUR_PAGE_SIZE;
  let skip = (currentPage - 1) * limit;
  await connect();
  let tours: PopularTour[] = await fetchAllTours();
  if (
    !(price !== DEFAULT_PRICE) &&
    !(groupSize !== DEFAULT_GROUP_SIZE) &&
    !(duration !== DEFAULT_DURATION) &&
    !(rating !== DEFAULT_RATING) &&
    country === "all" &&
    difficulty === Difficulty.ALL
  ) {
    if (skip === 0) {
      return {
        count: tours.length,
        tours: tours.slice(skip, TOUR_PAGE_SIZE),
      };
    }
    return {
      count: tours.length,
      tours: tours.slice(skip, TOUR_PAGE_SIZE * currentPage),
    };
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

  if (country !== "all") {
    console.log(country);
    console.log(tours[0].startLocation.split(",")[1]);
    tours = tours.filter(
      (tour) => tour.startLocation.split(",")[1].trim() === country
    );
    console.log(tours.length);
  }

  if (skip === 0) {
    console.log(
      "🚀 ~  tours: tours.slice(skip, PAGE_SIZE):",
      tours.slice(skip, TOUR_PAGE_SIZE)
    );
    return {
      count: tours.length,
      tours: tours.slice(skip, TOUR_PAGE_SIZE),
    };
  }
  return {
    count: tours.length,
    tours: tours.slice(skip, TOUR_PAGE_SIZE * currentPage),
  };
}

export async function fetchAllTopReviews(
  id?: string
): Promise<FetchedReviewType[]> {
  await connect();
  const match = id
    ? { $match: { rating: 5, tour: new mongoose.Types.ObjectId(id) } }
    : { $match: { rating: 5 } };
  const allReviews = await Review.aggregate([
    match,
    { $group: { _id: "$user", review: { $first: "$$ROOT" } } },
    { $limit: 10 },
    { $replaceRoot: { newRoot: "$review" } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    { $project: { "user.password": 0 } },
    { $sort: { createdAt: -1 } },
  ]);
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
    const limit = BOOKING_PAGE_SIZE;
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

export async function createQuery(
  data: QueryType,
  userId: string
): Promise<string> {
  try {
    await Query.create({ ...data, userId });
    return "Query created successfully";
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function fetchQuery(userId: string): Promise<number> {
  try {
    const queries = await Query.countDocuments({ userId, isRead: true });
    return queries;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
