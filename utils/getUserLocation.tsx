import { Coord } from "@turf/turf";
import { LngLatLike } from "mapbox-gl";
import { useEffect, useState } from "react";

export default function getUserLocation() {
  let userCoordinates: number[] = [];
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      userCoordinates = [position.coords.longitude, position.coords.latitude];
    });
    console.log("something happens");
  }, []);
  return userCoordinates;
}
