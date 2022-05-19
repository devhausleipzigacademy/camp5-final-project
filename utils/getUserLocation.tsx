import { Coord } from "@turf/turf";
import { LngLatLike } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

interface T {}

export default function GetUserLocation() {
  const lat = useRef<T | null>(null);
  const long = useRef<T | null>(null);
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      lat.current = position.coords.latitude;
      long.current = position.coords.longitude;
      console.log(lat);
      console.log(long);
    });
  }, []);
}
