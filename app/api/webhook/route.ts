import { headers } from "next/headers";
import Stripe from "stripe";
import Booking from "@/model/Booking";
import { NewBookingType } from "@/types/model";
import connect from "@/DB/db";

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;
console.log("🚀 ~ webhookSecret:", webhookSecret);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(request: Request) {
  if (request.method === "POST") {
    const body = await request.text();
    const sig = headers().get("stripe-signature");
    if (!sig || !webhookSecret) {
      throw new Error("Missing stripe signature or webhook secret");
    }
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      return new Response(`Webhook Error: ${err.message}`, {
        status: 404,
      });
    }
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        createBooking(checkoutSessionCompleted);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  return new Response("Ok", {
    status: 200,
  });
}

async function createBooking(event: Stripe.Checkout.Session) {
  console.log("🚀 ~ createBooking ~ event:", event);
  if (!event) return;
  const { metadata } = event;
  const amount = event.amount_total! / 100;
  const email = event.customer_email;
  const userId = event.client_reference_id;
  const { bookingDate, tourId, phoneNumber, userName } = metadata!;
  const payload: Omit<NewBookingType, "id"> = {
    userId: userId!,
    tourId,
    bookingDate: new Date(bookingDate),
    email: email!,
    fullName: userName,
    phoneNumber: phoneNumber,
    price: amount,
  };
  console.log("🚀 ~ createBooking ~ payload:", payload);
  try {
    await connect();
    await Booking.create(payload);
  } catch (error) {
    console.log("🚀 ~ createBooking ~ error:", error);
  }
}
