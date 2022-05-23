import { Feature, ListData } from "./types";

export default function flyToStore(listData: ListData, map: any) {
  console.log(map.current);
  (map.current as mapboxgl.Map).flyTo({
    center: listData.coordinates,
    zoom: 15,
  });
}
