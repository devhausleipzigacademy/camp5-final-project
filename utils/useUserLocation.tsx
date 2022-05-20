import { Coord } from "@turf/turf";
import { LngLatLike } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export default function useUserLocation() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      // console.log(lat);
      // console.log(long);
    });
  }, [setLat, setLong]);
  let userLocation: number[] = [long, lat];
  console.log(userLocation);
  return userLocation;
}
