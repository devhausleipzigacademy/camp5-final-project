import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { stores } from "../assets/data";
import createPopUp from "../utils/createPopUp";
import flyToStore from "../utils/flyToStore";
import useMap from "../hooks/useMap";
import { Feature } from "../utils/types";
import { Coord } from "@turf/turf";
import Image from "next/image";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);
  const [zoom, setZoom] = useState(14);

  // -----creates Map ----- //
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  const { userLocation, lng, lat } = useMap(map, setZoom);

  const [drawer, setDrawer] = useState(true);

  return (
    <div className="map">
      {/* <div className={clsx(drawer ? "sidebar" : "sidebar.open")}>
        <button
          onClick={() => {
            setDrawer((prev) => !prev);
          }}
          className="rounded-md h-2 bg-primary w-48 fixed left-1/4"
        ></button>
        <div id="listings" className="listings">
          {stores.features.length &&
            stores.features.map((feature, i) => (
              <div
                key={i}
                id={`listing-${i}`}
                className="item"
                onClick={() => {
                  flyToStore(feature as Feature, map);
                  createPopUp(feature as Feature, userLocation as Coord, map);
                  const activeItem = document.getElementsByClassName("active");
                  if (activeItem[0]) {
                    activeItem[0].classList.remove("active");
                  }

                  const thisElement = document.getElementById(`listing-${i}`);
                  (thisElement as HTMLElement).classList.add("active");
                }}
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={feature.properties.productImage}
                    alt=""
                    layout="intrinsic"
                    // sizes="100vw"
                    height={50}
                    width={50}
                    objectFit="cover"
                  />
                  <div className="flex w-full justify-between">
                    <a href="#" className="title" id={`link-${i}`}>
                      <div className="flex-col">
                        <div>{feature.properties.title}</div>
                        <div>{"distance away"}</div>
                      </div>
                    </a>
                    <Image
                      src={feature.properties.ownerImage}
                      alt=""
                      layout="intrinsic"
                      // sizes="100vw"
                      height={50}
                      width={50}
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div> */}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
