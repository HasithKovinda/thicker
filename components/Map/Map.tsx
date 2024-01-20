"use client";

import styles from "./Map.module.css";
import { MapLocation } from "@/types/tour";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

type MapProps = {
  locations: MapLocation[];
  startLocation: [number, number];
};

export default function MapC({ locations, startLocation }: MapProps) {
  //   console.log(locations);
  console.log();
  return (
    <section className={`${styles.section}`}>
      <div>
        <h1>View Locations On Map</h1>
        <div className="underline"></div>
      </div>
      <MapContainer
        center={[startLocation[1], startLocation[0]]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => {
          console.log(location.coordinates);
          return (
            <Marker
              position={[location.coordinates[1], location.coordinates[0]]}
              key={index}
            >
              <Popup>{location.description}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </section>
  );
}
