import Login from "@/components/Auth/Login";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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
