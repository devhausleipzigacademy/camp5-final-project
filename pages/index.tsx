import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Map from "../components/map";
import { useEffect, useState } from "react";
import { getMapData } from "../utils/getMapData";
import { MapData, ListData, Feature } from "../utils/types";
import { getListData } from "../utils/getListData";
import Button from "../components/Button/Button";
import FilterButtons from "../components/FilterButtons/filterButtons";

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

  return (
    <div className={styles.container}>
      <FilterButtons filterHandler={filterMarkers} />
      {mapData && <Map mapData={mapData} />}
    </div>
  );
};

export default Home;
