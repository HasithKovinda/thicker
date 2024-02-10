import NotFound from "@/app/not-found";
import PageContent from "@/components/Tour/PageContent";
import { fetchSingleTour } from "@/lib/actions/tour/tour";

export default async function page({ params }: { params: { tourId: string } }) {
  const tours = await fetchSingleTour(params.tourId);

  if (!tours)
    return <NotFound title="Opps! The tour you are looking is not exist!" />;

  return <PageContent tours={tours} />;
}
