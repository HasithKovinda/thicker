import PageContent from "@/components/Tour/PageContent";
import { fetchSingleTour } from "@/util/actions";

export default async function page({ params }: { params: { tourId: string } }) {
  const tours = await fetchSingleTour(params.tourId);

  if (!tours) return <h1>Tour not found</h1>;

  return <PageContent tours={tours} />;
}
