import mongoose, { Types } from "mongoose";
import Tours from "./Tours";
import User from "./user";

interface IBooking extends Document {
  fullName: string;
  email: string;
  tourId: Types.ObjectId;
  userId: Types.ObjectId;
  price: number;
  phoneNumber: string;
  bookingDate: Date;
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Please provide an email"],
    },
    tourId: {
      type: mongoose.Schema.ObjectId,
      ref: Tours,
      required: [true, "booking must have a tour"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: [true, "booking must have an user"],
    },
    price: {
      type: Number,
      required: [true, "Booking must have a price"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Booking must have a phone number"],
    },
    bookingDate: {
      type: Date,
      required: [true, "Booking must have a date"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

let Booking: mongoose.Model<IBooking>;
try {
  // Try to get the existing model from mongoose
  Booking = mongoose.model<IBooking>("Booking");
} catch {
  // If the model doesn't exist, define it
  Booking = mongoose.model<IBooking>("Booking", bookingSchema);
}
export default Booking;
