import * as turf from "@turf/turf";
import { Coord } from "@turf/turf";
import getUserLocation from "./getUserLocation";
import { Feature } from "./types";

export default function getDistance(currentFeature: Feature, map: any) {
  let to = turf.point(currentFeature.geometry.coordinates);
  let from = turf.point(getUserLocation(map) as []);
  let distance = turf.distance(from, to).toFixed(2);
  return distance;
}
