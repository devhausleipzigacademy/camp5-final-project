import { useEffect, useState } from "react";
import { getMapData } from "../utils/getMapData";
import { Feature, MapData } from "../utils/types";

export default function useMapData() {
  const [mapData, setMapData] = useState<MapData | null>(null);

  async function getData() {
    const mapDataFetch = await getMapData();
    setMapData(mapDataFetch);
  }
  useEffect(() => {
    getData();
  }, []);

  const filterMarkers = (event: MouseEvent) => {
    if (!mapData) {
      return;
    } else if ((event.target as any).text === "Free") {
      const filteredMarkersArr: Feature[] = mapData?.features.filter(
        (feature) => feature.type === "FREE"
      );
      const updatedMapData: MapData = {
        ...mapData,
        features: filteredMarkersArr,
      };
      setMapData(updatedMapData);
    } else {
      const filteredMarkersArr: Feature[] = mapData?.features.filter(
        (feature) => feature.type === "SWAP"
      );
      const updatedMapData: MapData = {
        ...mapData,
        features: filteredMarkersArr,
      };
      setMapData(updatedMapData);
    }
  };
  return mapData;
}
