import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Map from "../components/map";
import { useEffect, useState } from "react";
import { getMapData } from "../utils/getMapData";
import { MapData, ListData } from "../utils/types";
import { getListData } from "../utils/getListData";

const Home: NextPage = () => {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [listData, setListData] = useState<ListData | null>(null);

  async function getData() {
    const mapDataFetch = await getMapData();
    setMapData(mapDataFetch);
    const listDataFetch = await getListData();
    setMapData(listDataFetch);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      {mapData && <Map mapData={mapData} />}
    </div>
  );
};

export default Home;
