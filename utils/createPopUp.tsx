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

  const popup = new mapboxgl.Popup({ closeOnClick: true })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(`<h3>${currentFeature.properties.title}</h3><p>${distance}km</p>`)
    //@ts-ignore
    .addTo(map.current);
}
