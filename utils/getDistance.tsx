import * as turf from "@turf/turf";
import { Coord, Position } from "@turf/turf";
import useMap from "../hooks/useMap";
import getUserLocation from "./getUserLocation";
import { Feature } from "./types";

export default function getDistance(currentFeature: Feature, map: any) {
  let to = turf.point(currentFeature.geometry.coordinates);
  let userLocation = getUserLocation();
  let from = turf.point(userLocation);
  let distance = turf.distance(from, to).toFixed(2);
  if (distance < "1") {
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distance = distance + " km away";
  }
  return distance;
}
