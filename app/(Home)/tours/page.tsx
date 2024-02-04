import TourContent from "@/components/Tour/TourContent";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

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
