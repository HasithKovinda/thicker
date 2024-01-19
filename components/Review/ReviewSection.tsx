
import Review from "./Reviews";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";


export default async function ReviewSection() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <Review title="Top Reviews For Treker"/>
  </HydrationBoundary>
  
  )
}
