"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styles from "./Map.module.css";
import { MapLocation } from "@/types/model";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

type MapProps = {
  locations: MapLocation[];
  startLocation: [number, number];
};

export default function MapC({ locations, startLocation }: MapProps) {
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
