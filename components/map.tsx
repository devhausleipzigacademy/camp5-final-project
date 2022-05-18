import React, { useRef, useEffect, useState, MouseEvent } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { GeolocateControl, LngLatLike } from "mapbox-gl";
import { stores } from "../assets/data";
import * as turf from "@turf/turf";
import createPopUp from "../utils/createPopUp";
import flyToStore from "../utils/flyToStore";
import addMarkers from "../utils/addMarkers";
import clsx from "clsx";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

type Feature = {
  type: string;
  geometry: Geometry;
  properties: Properties;
};

type Geometry = {
  type: string;
  coordinates: LngLatLike;
};

type Properties = {
  title: string;
  address: string;
  city: string;
  country: string;
  crossStreet: string;
  postalCode: string;
  state: string;
  owner: string;
};

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(12.37);
  const [lat, setLat] = useState(51.34);
  // coordinates of user
  const [ulng, setULng] = useState(12.37);
  const [ulat, setULat] = useState(51.34);
  const [zoom, setZoom] = useState(14);

  let from = [ulng, ulat];

  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  });

  // -----creates Map ----- //
  useEffect(() => {
    if (map.current) return;
    // @ts-ignore
    map.current = new mapboxgl.Map({
      //@ts-ignore
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  // ----- Map features ----- //
  useEffect(() => {
    if (!map.current) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      setULng(userCoordinates[0]);
      setULat(userCoordinates[1]);
      //@ts-ignore
      map.current.addSource("user-coordinates", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: userCoordinates,
          },
        },
      });
      //@ts-ignore

      map.current.addLayer({
        id: "user-coordinates",
        source: "user-coordinates",
        type: "circle",
      });
      //@ts-ignore

      map.current.flyTo({
        center: userCoordinates,
        zoom: 14,
      });
    });

    // @ts-ignore
    map.current.on("load", () => {
      //@ts-ignore
      map.current.addControl(geolocate);
      // @ts-ignore
      geolocate.trigger();
      // @ts-ignore
      map.addSource("places", {
        type: "geojson",
        data: stores,
      });
    });
    addMarkers(from, map);

    //@ts-ignore
    map.current.on("move", () => {
      //@ts-ignore

      setLng(map.current.getCenter().lng.toFixed(4));
      //@ts-ignore

      setLat(map.current.getCenter().lat.toFixed(4));
      //@ts-ignore

      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  const [drawer, setDrawer] = useState(true);

  return (
    <div className="map">
      <div className={clsx(drawer ? "sidebar" : "sidebar.open")}>
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
                  setDrawer((prev) => !prev);
                  setTimeout(() => flyToStore(feature, map), 300);
                  createPopUp(feature, from, map);
                  const activeItem = document.getElementsByClassName("active");
                  if (activeItem[0]) {
                    activeItem[0].classList.remove("active");
                  }
                  //@ts-ignore
                  const thisElement = document.getElementById(`listing-${i}`);
                  (thisElement as HTMLElement).classList.add("active");
                }}
              >
                <a href="#" className="title" id={`link-${i}`}>
                  <div>{feature.properties.title}</div>
                </a>
              </div>
            ))}
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
