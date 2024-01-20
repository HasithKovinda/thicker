import Review from "@/components/Review/Reviews";
import Row from "@/UI/Row";
import CoverImage from "@/components/Tour Details/CoverImage";
import Info from "@/components/Tour Details/Info";
// import MapC from "@/components/Map/MapC";
import { fetchSingleTour } from "@/util/actions";
import { MapLocation } from "@/types/tour";

import dynamic from "next/dynamic";

const MapC = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
});

export default async function page({ params }: { params: { tourId: string } }) {
  const tours = await fetchSingleTour(params.tourId);

  if (!tours) return <h1>Tour not found</h1>;

  const { locations, startLocation } = tours;
  const mapLocations: MapLocation[] = locations.map((location) => {
    return {
      description: location.description,
      coordinates: location.coordinates,
    };
  });
  return (
    <main>
      <CoverImage herf="/assert/new-tour-4.jpg" />
      <Info />
      <Row />
      <Review title="Review For The Tour" />
      <MapC
        locations={mapLocations}
        startLocation={startLocation.coordinates}
      />
    </main>
  );
}
