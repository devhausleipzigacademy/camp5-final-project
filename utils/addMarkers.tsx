import { Coord } from "@turf/turf";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import createPopUp from "./createPopUp";
import flyToStore from "./flyToStore";
import { Feature } from "./types";

export default function addMarkers(userLocation: Coord, map: any) {
  for (const marker of data.features) {
    const el = document.createElement("img");
    el.id = `marker-${marker.properties.title}`;
    el.className = "marker";
    marker.type === "Feature"
      ? el.setAttribute("src", "swapIcon.svg")
      : el.setAttribute("src", "giftIcon.svg");
    el.addEventListener("click", (e) => {
      flyToStore(marker as Feature, map as mapboxgl.Map);
      createPopUp(marker as Feature, userLocation, map as mapboxgl.Map);
    });
    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates as LngLatLike)
      .addTo(map.current as mapboxgl.Map);
  }
}
