import * as turf from "@turf/turf";
import { Feature, ListData } from "./types";
import { useLocationStore } from "../stores/locationStore";

export default function useDistance(feature: Feature) {
  let to = turf.point(feature.geometry.coordinates);
  const { location } = useLocationStore();
  let from = turf.point(location);
  let distance = turf.distance(from, to).toFixed(2);
  if (distance < "1") {
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distance = distance + " km away";
  }
  return distance;
}
