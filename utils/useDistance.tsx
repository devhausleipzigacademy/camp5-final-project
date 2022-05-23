import * as turf from "@turf/turf";
import { ListData } from "./types";
import { useLocationStore } from "../stores/locationStore";

export default function useDistance(listData: ListData) {
  let to = turf.point(listData.coordinates);
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
