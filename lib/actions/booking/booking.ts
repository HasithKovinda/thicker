"use server";

import Booking from "@/model/Booking";
import Tours from "@/model/Tours";
import {
  type NewBookingType,
  type BookPagination,
  type FetchedBookingType,
  TourModel,
  StripeCheckoutType,
} from "@/types/model";
import { BOOKING_PAGE_SIZE } from "@/util/constant";
import { createCheckout } from "../stripe/stripe";
import { redirect } from "next/navigation";

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

export async function createBooking(bookingData: Omit<NewBookingType, "id">) {
  try {
    const tour = (await Tours.findById(bookingData.tourId)) as TourModel;
    if (!tour) throw new Error("Tour not found");
    const checkoutSessionData: StripeCheckoutType = {
      name: tour.name,
      email: bookingData.email,
      userId: bookingData.userId,
      tourId: bookingData.tourId,
      phone: bookingData.phoneNumber,
      userName: bookingData.fullName,
      description: tour.description,
      image: tour.imageCover,
      amount: tour.price,
      bookingDate: bookingData.bookingDate,
      slug: tour.slug,
      quantity: 1,
    };
    const session = await createCheckout(checkoutSessionData);
    if (!session) throw new Error("something went wrong");
    redirect(session);
    // return session;
    // revalidatePath(`${session}`);
  } catch (error) {
    throw error;
  }
}
