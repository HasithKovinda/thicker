import NavBar from "@/UI/NavBar";
import Footer from "@/UI/Footer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavBar />
        {children}
        <Footer />
      </HydrationBoundary>
    </>
  );
}
