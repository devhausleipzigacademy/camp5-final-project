import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import createPopUp from "../utils/createPopUp";
import flyToStore from "../utils/flyToStore";
import useMap from "../hooks/useMap";
import { Feature, ListData, MapData } from "../utils/types";
import { Coord } from "@turf/turf";
import Link from "next/link";
import { useLocationStore } from "../stores/locationStore";
import { useMapStore } from "../stores/mapStore";
import addMarkers from "../utils/addMarkers";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

type MapProps = {
  mapData: MapData;
};
const Map = ({ mapData }: MapProps) => {
  const { mapRef, setMapRef } = useMapStore();
  const { location } = useLocationStore();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);
  const [zoom, setZoom] = useState(14);

  // -----creates Map ----- //
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: location,
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);

  const { lng, lat } = useMap(map, setZoom, mapData);

  return (
    <div className="map z-10">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
