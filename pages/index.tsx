import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Map from "../components/map";
import { useEffect, useState } from "react";
import { getMapData } from "../utils/getMapData";
import { MapData, ListData, Feature } from "../utils/types";
import { getListData } from "../utils/getListData";

const Home: NextPage = () => {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [listData, setListData] = useState<ListData | null>(null);

  async function getData() {
    const mapDataFetch = await getMapData();
    setMapData(mapDataFetch);
    const listDataFetch = await getListData();
    setListData(listDataFetch);
  }
  useEffect(() => {
    getData();
  }, []);

  const filterMarkers = (event: MouseEvent) => {
    if (!mapData) {
      return;
    } else if ((event.target as any).text === "FREE") {
      const filteredMarkersArr: Feature[] = mapData?.features.filter(
        (feature) => feature.properties.sellType === "FREE"
      );
      const updatedMapData: MapData = {
        ...mapData,
        features: filteredMarkersArr,
      };
      setMapData(updatedMapData);
    } else {
      const filteredMarkersArr: Feature[] = mapData?.features.filter(
        (feature) => feature.properties.sellType === "SWAP"
      );
      const updatedMapData: MapData = {
        ...mapData,
        features: filteredMarkersArr,
      };
      setMapData(updatedMapData);
    }
  };

  return (
    <div className={styles.container}>
      {mapData && <Map mapData={mapData} />}
    </div>
  );
};

export default Home;
