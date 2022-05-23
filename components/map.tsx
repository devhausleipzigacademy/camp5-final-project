import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import createPopUp from "../utils/createPopUp";
import flyToStore from "../utils/flyToStore";
import useMap from "../hooks/useMap";
import { Feature, MapData } from "../utils/types";
import { Coord } from "@turf/turf";
import Link from "next/link";
import { useLocationStore } from "../stores/locationStore";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

type MapProps = {
  mapData: MapData;
};
const Map = ({ mapData }: MapProps) => {
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
  const { lng, lat } = useMap(map, setZoom, mapData);
  return (
    <div className="map">
      <div className="sidebar">
        <div className="heading">
          <h1>Our locations</h1>
        </div>
        <div id="listings" className="listings">
          {mapData.features &&
            mapData.features.length &&
            mapData.features.map((feature, i) => (
              <div
                key={i}
                id={`listing-${i}`}
                className="item"
                onClick={() => {
                  flyToStore(feature as Feature, map);
                  createPopUp(feature as Feature, location, map);
                  const activeItem = document.getElementsByClassName("active");
                  if (activeItem[0]) {
                    activeItem[0].classList.remove("active");
                  }

                  const thisElement = document.getElementById(`listing-${i}`);
                  (thisElement as HTMLElement).classList.add("active");
                }}
              >
                <Link href="/" className="title" id={`link-${i}`}>
                  <div>{feature.properties.title}</div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
