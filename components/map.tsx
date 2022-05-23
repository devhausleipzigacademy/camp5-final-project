import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import useMap from "../hooks/useMap";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

const Map = (props) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  return (
    <div className="map">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
