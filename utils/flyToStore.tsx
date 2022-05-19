import { Feature } from "./types";

export default function flyToStore(currentFeature: Feature, map: any) {
  (map.current as mapboxgl.Map).flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15,
  });
}
