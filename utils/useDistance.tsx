import * as turf from "@turf/turf";
import useUserLocation from "./useUserLocation";
import { Feature } from "./types";

export default function useDistance(currentFeature: Feature) {
  let to = turf.point(currentFeature.geometry.coordinates);
  let userLocation = useUserLocation();
  let from = turf.point(userLocation);
  let distance = turf.distance(from, to).toFixed(2);
  if (distance < "1") {
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distance = distance + " km away";
  }
  return distance;
}
