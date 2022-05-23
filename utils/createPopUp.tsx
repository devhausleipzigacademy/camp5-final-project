import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { Coord } from "@turf/turf";
import type { Feature } from "./types";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export default function createPopUp(
  currentFeature: Feature,
  userLocation: Coord,
  map: any
) {
  console.log(userLocation);
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  console.log(currentFeature, userLocation);
  let distance = turf
    .distance(userLocation as Coord, currentFeature.geometry.coordinates)
    .toFixed(2);
  if (distance < "1") {
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distance = "distance: " + distance + "km";
  }
  console.log(distance);
  const popup: mapboxgl.Popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(`<h3>${currentFeature.properties.title}</h3><p>${distance}</p>`)
    .addTo(map.current as mapboxgl.Map);
}
