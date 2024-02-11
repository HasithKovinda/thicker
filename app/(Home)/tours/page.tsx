import TourContent from "@/components/Tour/TourContent";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Our Exciting Tour Packages | Thicker Tours",
  description:
    "Browse through a wide selection of immersive tour packages offered by Thicker Tours. Use our convenient filters to find the perfect destination and itinerary for your next adventure.",
};

export default async function page() {
  const queryClient = new QueryClient();
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <TourCover /> */}
        <TourContent />
      </HydrationBoundary>
    </main>
  );
}
