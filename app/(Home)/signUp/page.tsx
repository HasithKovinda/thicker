import SignUp from "@/components/Auth/SignUp";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up for Thicker Tours | Start Exploring Today",
  description:
    "Join Thicker Tours today to gain access to our extensive collection of tour packages, personalized recommendations, and member-only discounts. Sign up now and embark on your next journey!",
};

export default function page() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SignUp />;
    </HydrationBoundary>
  );
}
