import * as turf from "@turf/turf";
import { Coord } from "@turf/turf";
import { Feature } from "./types";

export default function getDistance(
  currentFeature: Feature,
  userLocation: Coord
) {
  let distance = turf
    .distance(userLocation as Coord, currentFeature.geometry.coordinates)
    .toFixed(2);
  return distance;
}
