"use server";

import Booking from "@/model/Booking";
import {
  type NewBookingType,
  type BookPagination,
  type FetchedBookingType,
} from "@/types/model";
import { BOOKING_PAGE_SIZE } from "@/util/constant";

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
