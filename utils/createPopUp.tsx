import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { Coord } from "@turf/turf";
import { Feature } from "./types";
import getDistance from "./getDistance";

export default function createPopUp(
  currentFeature: Feature,
  userLocation: Coord,
  map: any
) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  console.log(currentFeature, userLocation);
  let distance = getDistance(currentFeature, userLocation);
  if (distance < "1") {
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distance = distance + " km away";
  }
  const popup: mapboxgl.Popup = new mapboxgl.Popup({ closeOnClick: true })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `<div>
      <h3>${currentFeature.properties.title}</h3>
      <span>${distance}</span>
      <p>${currentFeature.properties.owner}</p>
      </div>`
    )
    //@ts-ignore
    .addTo(map.current as mapboxgl.Map);
}
