import * as turf from "@turf/turf";
import { Coord, Position } from "@turf/turf";
import getUserLocation from "./getUserLocation";
import { Feature } from "./types";

export default function getDistance(currentFeature: Feature, map: any) {
  let to = turf.point(currentFeature.geometry.coordinates);
  let userLocation = getUserLocation();
  console.log(userLocation);
  let from = turf.point(userLocation);
  let distance = turf.distance(from, to).toFixed(2);
  return distance;
}
