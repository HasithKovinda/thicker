import Booking from "@/components/Dashboard/Bookings/Booking";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default function page() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Booking />
    </HydrationBoundary>
  );
}
