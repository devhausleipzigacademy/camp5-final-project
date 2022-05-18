import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { stores } from "../assets/data";
import * as turf from "@turf/turf";
import { Coord } from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

type Feature = {
  type: string;
  geometry: Geometry;
  properties: Properties;
};

type Geometry = {
  type: string;
  coordinates: [number, number];
};

type Properties = {
  title: string;
  address: string;
  city: string;
  country: string;
  crossStreet: string;
  postalCode: string;
  state: string;
};

const Map = () => {
  const mapContainer = useRef(null);
  const map: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);
  const [lng, setLng] = useState(12.37);
  const [lat, setLat] = useState(51.34);
  const [userLocation, setUserLocation] = useState<Coord>();
  const [zoom, setZoom] = useState(14);

  let from = userLocation;

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      //@ts-ignore
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    function addMarkers() {
      for (const marker of stores.features) {
        const el = document.createElement("img");
        el.id = `marker-${marker.properties.title}`;
        el.className = "marker";
        marker.type === "Feature"
          ? el.setAttribute("src", "swapIcon.svg")
          : el.setAttribute("src", "giftIcon.svg");
        el.addEventListener("click", (e) => {
          flyToStore(marker as Feature);
          createPopUp(marker as Feature);
        });
        new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates as LngLatLike)
          .addTo(map.current as mapboxgl.Map);
      }
    }
    addMarkers();
    if (!map.current) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];

      (map.current as mapboxgl.Map).addSource("user-coordinates", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: userCoordinates,
          },
        } as any,
      });
      setUserLocation(userCoordinates);

      (map.current as mapboxgl.Map).addLayer({
        id: "user-coordinates",
        source: "user-coordinates",
        type: "circle",
      });

      (map.current as mapboxgl.Map).flyTo({
        center: userCoordinates as LngLatLike,
        zoom: 14,
      });
    });

    map.current.on("load", () => {
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });
      (map.current as mapboxgl.Map).addControl(geolocate);
      geolocate.trigger();
      (map.current as mapboxgl.Map).addSource("places", {
        type: "geojson",
        data: stores as any,
      });
    });

    (map.current as mapboxgl.Map).on("move", () => {
      setLng(Number((map.current as mapboxgl.Map).getCenter().lng.toFixed(4)));
      setLat(Number((map.current as mapboxgl.Map).getCenter().lat.toFixed(4)));
      setZoom(Number((map.current as mapboxgl.Map).getZoom().toFixed(2)));
    });
  }, []);

  function createPopUp(currentFeature: Feature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    let distance = turf
      .distance(from as Coord, currentFeature.geometry.coordinates)
      .toFixed(2);
    const popup: mapboxgl.Popup = new mapboxgl.Popup({ closeOnClick: true })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>${currentFeature.properties.title}</h3><h4>${distance}km</h4>`
      )
      .addTo(map.current as mapboxgl.Map);
  }

  function flyToStore(currentFeature: Feature) {
    (map.current as mapboxgl.Map).flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    });
  }

  return (
    <div>
      <div className="sidebar">
        <div className="heading">
          <h1>Our locations</h1>
        </div>
        <div id="listings" className="listings">
          {stores.features.length &&
            stores.features.map((feature, i) => (
              <div
                key={i}
                id={`listing-${i}`}
                className="item"
                onClick={() => {
                  flyToStore(feature as Feature);
                  createPopUp(feature as Feature);
                  const activeItem = document.getElementsByClassName("active");
                  if (activeItem[0]) {
                    activeItem[0].classList.remove("active");
                  }

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
