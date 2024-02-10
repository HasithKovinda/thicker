import { StripeCheckoutType } from "@/types/model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function createCheckout(
  payload: StripeCheckoutType
): Promise<string | null> {
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: "pay",
    payment_method_types: ["card"],
    customer_email: payload.email,
    client_reference_id: payload.userId,
    mode: "payment",
    line_items: [
      {
        price_data: {
          product_data: {
            name: payload.name,
            description: payload.description,
            images: [payload.image],
          },
          currency: "usd",
          unit_amount: payload.amount * 100,
        },

        quantity: payload.quantity,
      },
    ],
    metadata: {
      bookingDate: payload.bookingDate.toString(),
      tourId: payload.tourId,
      phoneNumber: payload.phone,
      userName: payload.userName,
    },
    success_url: process.env.SUCCESS_URL,
    cancel_url: `${process.env.CANCEL_URL}${payload.slug}`,
  };
  const { url }: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);
  return url;
}
