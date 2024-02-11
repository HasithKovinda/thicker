import Login from "@/components/Auth/Login";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In to Thicker Tours | Your Gateway to Adventure",
  description:
    "Access your Thicker Tours account to manage your bookings, save your favorite destinations, and unlock exclusive offers. Log in now to begin your next travel adventure!",
};

type PageProps = {
  searchParams: {
    callbackUrl: string;
  };
};

export default function page({ searchParams }: PageProps) {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Login callbackUrl={searchParams.callbackUrl} />
    </HydrationBoundary>
  );
}
