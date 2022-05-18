import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { Coord } from "@turf/turf";

export default function createPopUp(
  currentFeature: any,
  userLocation: Coord,
  map: any
) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  let distance = turf
    .distance(userLocation as Coord, currentFeature.geometry.coordinates)
    .toFixed(2);
  const popup: mapboxgl.Popup = new mapboxgl.Popup({ closeOnClick: true })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `<h3>${currentFeature.properties.title}</h3><h4>${distance}km</h4>`
    )
    .addTo(map.current as mapboxgl.Map);
}
