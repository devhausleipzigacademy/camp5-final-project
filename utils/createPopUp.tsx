import mapboxgl from "mapbox-gl";
import { Coord } from "@turf/turf";
import { Feature } from "./types";

export default function createPopUp(
  currentFeature: Feature,
  map: any,
  distance: string
) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  const popup: mapboxgl.Popup = new mapboxgl.Popup({ closeOnClick: true })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `<div>
      <h3>${currentFeature.properties.title}</h3>
      <span>${distance}</span>
      <p>${currentFeature.properties.owner}</p>
      </div>`
    )
    .addTo(map.current as mapboxgl.Map);
}
