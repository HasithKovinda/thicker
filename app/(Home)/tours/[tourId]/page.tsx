import type { Metadata } from "next";
import NotFound from "@/app/not-found";
import PageContent from "@/components/Tour/PageContent";
import { fetchSingleTour } from "@/lib/actions/tour/tour";
import { type ReactElement } from "react";

const notFound: ReactElement = (
  <NotFound title="Opps! The tour you are looking is not exist!" />
);

export async function generateMetadata({
  params,
}: {
  params: { tourId: string };
}): Promise<Metadata | ReactElement> {
  const tour = await fetchSingleTour(params.tourId);

  if (!tour) return notFound;

  return {
    title: tour?.name,
    description: tour?.summary,
  };
}
export default async function page({ params }: { params: { tourId: string } }) {
  const tours = await fetchSingleTour(params.tourId);

  if (!tours) return notFound;

  return <PageContent tours={tours} />;
}
