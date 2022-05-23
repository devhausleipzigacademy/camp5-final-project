import mapboxgl from "mapbox-gl";
import { Coord } from "@turf/turf";
import type { Feature, ListData } from "./types";
import * as turf from "@turf/turf";

export default function createPopUp(
  listData: ListData,
  userLocation: number[],
  map: any
) {
  console.log(userLocation);
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  let distance = turf.distance(userLocation, listData.coordinates).toFixed(2);
  if (distance < "1") {
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distance = "distance: " + distance + "km";
  }
  console.log(distance);
  const popup: mapboxgl.Popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(listData.coordinates)
    .setHTML(
      `<div>
      <h3>${listData.title}</h3>
      <span>${distance}</span>
      <p>${listData.owner}</p>
      </div>`
    )
    .addTo(map.current as mapboxgl.Map);
}
