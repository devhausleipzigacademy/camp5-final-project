import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";

export default function createPopUp(
  currentFeature: any,
  from: number[],
  map: any
) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  let distance = turf
    .distance(from, currentFeature.geometry.coordinates)
    .toFixed(2);
  if (distance < "1") {
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distance = distance + " km away";
  }
  const popup = new mapboxgl.Popup({ closeOnClick: true })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `<div>
      <h3>${currentFeature.properties.title}</h3>
      <span>${distance}</span>
      <p>${currentFeature.properties.owner}</p>
      </div>`
    )
    //@ts-ignore
    .addTo(map.current);
}
