import { StripeCheckoutType } from "@/types/model";
import Stripe from "stripe";
import getStripe from "../helper/get-stripejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function createCheckout(
  payload: StripeCheckoutType
): Promise<string | null> {
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: "pay",
    payment_method_types: ["card"],
    customer_email: payload.email,
    client_reference_id: payload.tourId,
    mode: "payment",
    line_items: [
      {
        price_data: {
          product_data: {
            name: payload.name,
            description: payload.description,
            images: [payload.image],
            metadata: {
              bookingDate: payload.bookingDate.toString(),
            },
          },
          currency: "usd",
          unit_amount: payload.amount * 100,
        },

        quantity: payload.quantity,
      },
    ],
    success_url: "http://localhost:3000/payment/success",
    cancel_url: `http://localhost:3000/tours/${payload.slug}`,
  };
  const { url }: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);
  return url;
}
