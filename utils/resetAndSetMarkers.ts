import { useLocationStore } from "../stores/locationStore";
import { useMapStore } from "../stores/mapStore";
import { useMarkerStore } from "../stores/markerStore";
import addMarkers from "./addMarkers";
import { MapData } from "./types";

const { marker } = useMarkerStore();
const { location } = useLocationStore();
const { mapRef } = useMapStore();

export default function resetAndSetMarkers(updatedMapData: MapData) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  marker?.forEach((m) => m.remove());
  const markerElements = document.getElementsByClassName("marker");
  while (markerElements.length > 0) {
    markerElements[0].remove();
  }
  addMarkers(location, mapRef, updatedMapData as MapData);
}
