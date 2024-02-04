"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import Row from "@/UI/Row";
import Review from "../Review/Reviews";
import CoverImage from "../Tour Details/CoverImage";
import Info from "../Tour Details/Info";
import { Guides, MapLocation } from "@/types/model";
import { TourModel } from "@/types/model";

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
});

type PageContentProps = {
  tours: TourModel;
};

export default function PageContent({ tours }: PageContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    locations,
    imageCover,
    maxGroupSize,
    duration,
    difficulty,
    name,
    price,
    startLocation,
    guides,
    description,
  } = tours;
  const mapLocations: MapLocation[] = locations.map((location) => {
    return {
      description: location.description,
      coordinates: location.coordinates,
    };
  });

  console.log(tours._id);

  const tourGuides: Guides[] = guides.map((guide) => {
    return {
      name: guide.name,
      role: guide.role,
      photo: guide.photo,
    };
  });

  function handleClick() {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <main>
      <CoverImage herf={imageCover} onMapButtonClick={handleClick} />
      <Info
        startLocation={startLocation.description}
        groupSize={maxGroupSize}
        duration={duration}
        difficulty={difficulty}
        title={name}
        price={price}
      />
      <Row
        guides={tourGuides}
        tourId={tours._id}
        price={price}
        title={name}
        description={description}
      />
      <div ref={ref}>
        <Map
          locations={mapLocations}
          startLocation={startLocation.coordinates}
        />
      </div>
      <Review title="Review For The Tour" id={tours._id} />
    </main>
  );
}
