import { Feature, ListData } from "./types";

export default function flyToStore(feature: Feature, map: any) {
  console.log(map.current);
  (map.current as mapboxgl.Map).flyTo({
    center: feature.geometry.coordinates,
    zoom: 15,
  });
}
