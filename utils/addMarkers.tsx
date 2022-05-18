import mapboxgl from "mapbox-gl";
import { stores } from "../assets/data";
import createPopUp from "./createPopUp";
import flyToStore from "./flyToStore";

export default function addMarkers(from: number[], map: any) {
  for (const marker of stores.features) {
    const el = document.createElement("img");
    el.id = `marker-${marker.properties.title}`;
    el.className = "marker";
    marker.type === "Feature"
      ? el.setAttribute("src", "swapIcon.svg")
      : el.setAttribute("src", "giftIcon.svg");
    el.addEventListener("click", (e) => {
      flyToStore(marker, map);
      createPopUp(marker, from, map);
    });
    new mapboxgl.Marker(el, { offset: [0, -23] })
      //@ts-ignore
      .setLngLat(marker.geometry.coordinates)
      //@ts-ignore
      .addTo(map.current);
  }
}
