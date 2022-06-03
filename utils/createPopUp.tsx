import mapboxgl from "mapbox-gl";
import type { Feature, ListData } from "./types";
import * as turf from "@turf/turf";

export default function createPopUp(
  feature: Feature,
  userLocation: number[],
  map: any
) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  let distanceNo: string;
  let distance = turf
    .distance(userLocation, feature.geometry.coordinates)
    .toFixed(2);
  if (distance < "1") {
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distanceNo = distance;
    distance = "distance: " + distance + "km";
  }

  const popup: mapboxgl.Popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `
          <div>
          <h3>${feature.properties.title}</h3>
          <span>${distance}</span>
          <p>${feature.properties.owner}</p>
          </div>
    `
    )
    .addTo(map.current as mapboxgl.Map);
}
